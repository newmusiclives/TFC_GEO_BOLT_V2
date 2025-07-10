/**
 * Manifest Financial API Client
 * 
 * This client handles interactions with the Manifest Financial API for payment processing
 * and artist payouts. It implements the 2-tier referral model where artists receive 87.1%
 * of donations after all fees (platform: 5%, processing: 2.9%, referrals: 5%).
 */

import { DONATION_CONFIG } from '@/lib/constants';

// Types
interface CreatePaymentIntentParams {
  amount: number;
  currency?: string;
  artistId: string;
  showId?: string;
  donorId?: string;
  donorName?: string;
  donorEmail?: string;
  donorMessage?: string;
  isAnonymous?: boolean;
}

interface PaymentIntentResponse {
  id: string;
  clientSecret: string;
  amount: number;
  currency: string;
  status: string;
  fees: {
    platform: number;
    processing: number;
    referral: number;
    total: number;
  };
  netAmount: number;
}

export class ManifestClient {
  private apiKey: string;
  private publicKey: string;
  private baseUrl: string;
  private isTest: boolean;

  constructor() {
    this.apiKey = process.env.MANIFEST_API_KEY || '';
    this.publicKey = process.env.NEXT_PUBLIC_MANIFEST_PUBLIC_KEY || '';
    this.baseUrl = 'https://api.manifest.financial';
    this.isTest = this.publicKey.startsWith('pk_test_');
    
    if (!this.apiKey || !this.publicKey) {
      console.warn('Manifest Financial API keys not configured properly');
    }
  }

  /**
   * Create a payment intent for a donation
   */
  async createPaymentIntent(params: CreatePaymentIntentParams): Promise<PaymentIntentResponse> {
    try {
      const { 
        amount, 
        currency = DONATION_CONFIG.currency, 
        artistId,
        showId,
        donorId,
        donorName,
        donorEmail,
        donorMessage,
        isAnonymous = false
      } = params;

      // Calculate fees
      const platformFee = amount * DONATION_CONFIG.platformFeeRate;
      const processingFee = amount * DONATION_CONFIG.processingFeeRate;
      const referralFee = amount * 0.05; // 2.5% direct + 2.5% tier2
      const totalFees = platformFee + processingFee + referralFee;
      const netAmount = amount - totalFees;

      // Convert amount to cents for Manifest API
      const amountInCents = Math.round(amount * 100);

      // Prepare metadata
      const metadata = {
        artistId,
        showId: showId || null,
        donorId: donorId || null,
        donorName: donorName || null,
        donorEmail: donorEmail || null,
        donorMessage: donorMessage || null,
        isAnonymous: isAnonymous.toString(),
        platformFee: platformFee.toFixed(2),
        processingFee: processingFee.toFixed(2),
        referralFee: referralFee.toFixed(2),
        netAmount: netAmount.toFixed(2),
      };

      // Make API request to Manifest
      const response = await fetch(`${this.baseUrl}/v1/payment_intents`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amountInCents,
          currency: currency.toLowerCase(),
          payment_method_types: ['card'],
          metadata,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Manifest API error: ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();

      // Format the response
      return {
        id: data.id,
        clientSecret: data.client_secret,
        amount,
        currency: currency.toUpperCase(),
        status: data.status,
        fees: {
          platform: platformFee,
          processing: processingFee,
          referral: referralFee,
          total: totalFees,
        },
        netAmount,
      };
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  }

  /**
   * Get the public key for client-side initialization
   */
  getPublicKey(): string {
    return this.publicKey;
  }

  /**
   * Check if the client is in test mode
   */
  isTestMode(): boolean {
    return this.isTest;
  }

  /**
   * Calculate donation breakdown including all fees
   */
  calculateDonationBreakdown(amount: number): {
    gross: number;
    platformFee: number;
    processingFee: number;
    processingFeeCents: number;
    referralFee: number;
    totalFees: number;
    artistNet: number;
    artistPercentage: number;
    fanPayment: number;
  } {
    // Platform fee is 15% (includes 5% referral fees)
    const platformFee = amount * 0.15;
    const referralFee = amount * 0.05; // 2.5% direct + 2.5% tier2
    
    // Artist gets exactly 80% of donation amount
    const artistNet = amount * 0.80;
    
    // Processing fee (2.9% + $0.30) is added on top for the fan
    const processingFeePercent = amount * DONATION_CONFIG.processingFeeRate;
    const processingFeeCents = DONATION_CONFIG.processingFeeCents;
    const processingFee = processingFeePercent + processingFeeCents;
    
    // Total amount fan pays
    const fanPayment = amount + processingFee;
    
    // Total fees (for display purposes)
    const totalFees = platformFee;
    
    // Artist percentage is fixed at 80%
    const artistPercentage = 80.0;

    return {
      gross: amount,
      platformFee,
      processingFee,
      processingFeeCents,
      referralFee,
      totalFees,
      artistNet,
      artistPercentage,
      fanPayment,
    };
  }
}

// Export singleton instance
export const manifestClient = new ManifestClient();