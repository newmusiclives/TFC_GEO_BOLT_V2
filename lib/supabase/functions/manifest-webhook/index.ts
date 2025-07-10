// Manifest Financial Webhook Handler
// This Edge Function processes webhooks from Manifest Financial payment service

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.38.4";

// Environment variables
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const MANIFEST_WEBHOOK_SECRET = Deno.env.get("MANIFEST_WEBHOOK_SECRET") || "";

// Create Supabase client with service role key for admin access
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Verify Manifest webhook signature
function verifySignature(payload: string, signature: string): boolean {
  if (!MANIFEST_WEBHOOK_SECRET) {
    console.error("MANIFEST_WEBHOOK_SECRET is not set");
    return false;
  }

  try {
    // In a real implementation, you would verify the signature using crypto
    // This is a placeholder for the actual verification logic
    // const hmac = crypto.createHmac('sha256', MANIFEST_WEBHOOK_SECRET);
    // const expectedSignature = hmac.update(payload).digest('hex');
    // return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
    
    // For now, we'll just check if the signature exists
    return signature.length > 0;
  } catch (error) {
    console.error("Error verifying signature:", error);
    return false;
  }
}

serve(async (req: Request) => {
  // CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, manifest-signature",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };

  // Handle OPTIONS request
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    // Get the signature from the request headers
    const signature = req.headers.get("manifest-signature") || "";
    
    // Get the request body
    const body = await req.text();
    
    // Verify the signature
    if (!verifySignature(body, signature)) {
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    // Parse the webhook payload
    const payload = JSON.parse(body);
    const eventType = payload.type;
    
    // Process different event types
    if (eventType === "charge.succeeded") {
      await handleSuccessfulCharge(payload.data);
    } else if (eventType === "charge.failed") {
      await handleFailedCharge(payload.data);
    } else if (eventType === "transfer.succeeded") {
      await handleSuccessfulTransfer(payload.data);
    } else {
      console.log(`Unhandled event type: ${eventType}`);
    }
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing webhook:", error);
    
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

// Handle successful charge events
async function handleSuccessfulCharge(data: any) {
  try {
    // Extract relevant data from the charge
    const {
      id: manifestPaymentId,
      amount,
      currency,
      metadata,
    } = data;
    
    // Extract metadata
    const {
      artistId,
      showId,
      donorId,
      donorName,
      donorEmail,
      donorMessage,
      isAnonymous,
    } = metadata;
    
    if (!artistId) {
      throw new Error("Artist ID is required in metadata");
    }
    
    // Process the donation using the database function
    const { data: result, error } = await supabase.rpc("process_complete_donation", {
      p_show_id: showId || null,
      p_artist_id: artistId,
      p_donor_id: donorId || null,
      p_amount: amount / 100, // Convert from cents to dollars
      p_currency: currency.toUpperCase(),
      p_manifest_payment_id: manifestPaymentId,
      p_donor_name: donorName || null,
      p_donor_email: donorEmail || null,
      p_donor_message: donorMessage || null,
      p_is_anonymous: isAnonymous === "true" || isAnonymous === true,
    });
    
    if (error) {
      throw error;
    }
    
    console.log("Donation processed successfully:", result);
    return result;
  } catch (error) {
    console.error("Error handling successful charge:", error);
    throw error;
  }
}

// Handle failed charge events
async function handleFailedCharge(data: any) {
  try {
    const { id: manifestPaymentId, metadata } = data;
    
    // If we have a pending donation record, update it to failed
    if (manifestPaymentId) {
      const { error } = await supabase
        .from("donations")
        .update({
          status: "failed",
          failed_at: new Date().toISOString(),
          failure_reason: data.failure_reason || "Payment failed",
        })
        .eq("manifest_payment_id", manifestPaymentId);
      
      if (error) {
        throw error;
      }
    }
    
    console.log("Failed charge handled:", manifestPaymentId);
  } catch (error) {
    console.error("Error handling failed charge:", error);
    throw error;
  }
}

// Handle successful transfer events (payouts to artists)
async function handleSuccessfulTransfer(data: any) {
  try {
    const { id: transferId, metadata } = data;
    
    // If this is a payout to an artist, update the relevant records
    if (metadata && metadata.artistId) {
      const { error } = await supabase
        .from("donations")
        .update({
          manifest_transfer_id: transferId,
        })
        .eq("artist_id", metadata.artistId)
        .is("manifest_transfer_id", null)
        .eq("status", "completed");
      
      if (error) {
        throw error;
      }
    }
    
    console.log("Transfer processed:", transferId);
  } catch (error) {
    console.error("Error handling successful transfer:", error);
    throw error;
  }
}