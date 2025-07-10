(function() {
  'use strict';

  // TrueFans GeoConnect - Live Music Submission Form Embed Script
  // This script creates an embeddable submission form for venues

  const TRUEFANS_API_BASE = 'https://api.truefans.ai';
  const FORM_STYLES = `
    .truefans-form * {
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    .truefans-form {
      max-width: 100%;
      margin: 0 auto;
    }
    .truefans-form input,
    .truefans-form select,
    .truefans-form textarea {
      width: 100%;
      padding: 10px;
      border-radius: 6px;
      margin-bottom: 10px;
      font-size: 14px;
    }
    .truefans-form label {
      display: block;
      margin-bottom: 5px;
      font-size: 14px;
      font-weight: 500;
    }
    .truefans-form button {
      cursor: pointer;
      width: 100%;
      padding: 12px;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      font-size: 16px;
      transition: opacity 0.2s;
    }
    .truefans-form button:hover {
      opacity: 0.9;
    }
    .truefans-form .upload-area {
      border: 2px dashed rgba(255,255,255,0.3);
      border-radius: 6px;
      padding: 20px;
      text-align: center;
      cursor: pointer;
      transition: border-color 0.2s;
    }
    .truefans-form .upload-area:hover {
      border-color: rgba(255,255,255,0.5);
    }
    .truefans-form .form-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 15px;
    }
    @media (min-width: 640px) {
      .truefans-form .form-grid {
        grid-template-columns: 1fr 1fr;
      }
    }
    .truefans-form .success-message {
      text-align: center;
      padding: 30px;
    }
    .truefans-form .success-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
    }
    .truefans-form .success-icon svg {
      width: 30px;
      height: 30px;
    }
  `;

  // Default configuration
  const defaultConfig = {
    venueId: '',
    venueName: 'Music Venue',
    primaryColor: '#8B5CF6',
    accentColor: '#EC4899',
    backgroundColor: '#1F2937',
    textColor: '#FFFFFF',
    borderRadius: '8',
    showVenueLogo: true,
    showVenueInfo: true,
    customMessage: '',
    allowFileUploads: true
  };

  // Get configuration from script data attribute
  function getConfig() {
    const script = document.currentScript || 
      document.querySelector('script[data-venue-config]');
    
    if (!script) return defaultConfig;
    
    try {
      const configAttr = script.getAttribute('data-venue-config');
      if (!configAttr) return defaultConfig;
      
      const config = JSON.parse(decodeURIComponent(configAttr));
      return { ...defaultConfig, ...config };
    } catch (e) {
      console.error('TrueFans: Error parsing configuration', e);
      return defaultConfig;
    }
  }

  // Create the form HTML
  function createFormHTML(config) {
    const musicIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>`;
    const uploadIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>`;
    const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
    
    return `
      <div class="truefans-form" id="truefans-submission-form-${config.venueId}">
        <div class="form-container">
          ${config.showVenueInfo ? `
            <div style="text-align: center; margin-bottom: 24px;">
              ${config.showVenueLogo ? `
                <div style="width: 64px; height: 64px; border-radius: 50%; background-color: ${config.primaryColor}20; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
                  <div style="color: ${config.primaryColor};">${musicIcon}</div>
                </div>
              ` : ''}
              <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 8px;">${config.venueName}</h2>
              <p style="font-size: 14px; opacity: 0.8;">Live Music Submission</p>
            </div>
          ` : ''}
          
          ${config.customMessage ? `
            <div style="margin-bottom: 24px; padding: 16px; border-radius: 8px; background-color: ${config.primaryColor}20;">
              <p style="font-size: 14px;">${config.customMessage}</p>
            </div>
          ` : ''}
          
          <form id="truefans-submission-form-element">
            <div class="form-grid">
              <div>
                <label for="artist-name">Artist Name *</label>
                <input type="text" id="artist-name" name="artistName" placeholder="Your artist name" required>
              </div>
              <div>
                <label for="genre">Genre *</label>
                <select id="genre" name="genre" required>
                  <option value="">Select genre</option>
                  <option value="rock">Rock</option>
                  <option value="jazz">Jazz</option>
                  <option value="blues">Blues</option>
                  <option value="electronic">Electronic</option>
                  <option value="folk">Folk</option>
                  <option value="hip-hop">Hip Hop</option>
                  <option value="country">Country</option>
                  <option value="classical">Classical</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div class="form-grid">
              <div>
                <label for="email">Email *</label>
                <input type="email" id="email" name="email" placeholder="your@email.com" required>
              </div>
              <div>
                <label for="phone">Phone</label>
                <input type="tel" id="phone" name="phone" placeholder="(555) 123-4567">
              </div>
            </div>
            
            <div>
              <label for="preferred-date">Preferred Performance Date</label>
              <input type="date" id="preferred-date" name="preferredDate">
            </div>
            
            <div class="form-grid">
              <div>
                <label for="website">Website</label>
                <input type="url" id="website" name="website" placeholder="https://yourwebsite.com">
              </div>
              <div>
                <label for="social-links">Social Media</label>
                <input type="text" id="social-links" name="socialLinks" placeholder="@yourusername or links">
              </div>
            </div>
            
            <div>
              <label for="message">Tell us about your music</label>
              <textarea id="message" name="message" rows="4" placeholder="Describe your style, experience, and what makes your performance special..."></textarea>
            </div>
            
            ${config.allowFileUploads ? `
              <div>
                <label for="file-upload">Press Kit / Media (Optional)</label>
                <div class="upload-area" id="upload-area">
                  <div style="color: ${config.textColor}; opacity: 0.6; margin-bottom: 8px;">${uploadIcon}</div>
                  <input type="file" id="file-upload" name="files" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp3,.wav" style="display: none;">
                  <div style="font-size: 14px; opacity: 0.8; margin-bottom: 4px;">
                    Drop files here or click to upload
                  </div>
                  <div style="font-size: 12px; opacity: 0.6;">
                    PDF, DOC, images, or audio files (max 10MB each)
                  </div>
                  <div id="file-list" style="margin-top: 12px; font-size: 14px;"></div>
                </div>
              </div>
            ` : ''}
            
            <button type="submit" style="background-color: ${config.primaryColor}; color: white; margin-top: 24px;">
              Submit Application
            </button>
          </form>
        </div>
        
        <div class="success-message" style="display: none;">
          <div class="success-icon" style="background-color: ${config.primaryColor};">
            <div style="color: white;">${checkIcon}</div>
          </div>
          <h3 style="font-size: 24px; font-weight: 700; margin-bottom: 8px;">Submission Received!</h3>
          <p style="opacity: 0.8; margin-bottom: 24px;">
            Thank you for your submission. We'll review your application and get back to you within 5-7 business days.
          </p>
          <button id="submit-another" style="background-color: ${config.primaryColor}; color: white;">
            Submit Another
          </button>
        </div>
        
        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.2); text-align: center;">
          <p style="font-size: 12px; opacity: 0.6;">
            Powered by TrueFans GeoConnect
          </p>
        </div>
      </div>
    `;
  }

  // Initialize the form
  function initForm() {
    const config = getConfig();
    const targetElement = document.getElementById('truefans-submission-form');
    
    if (!targetElement) {
      console.error('TrueFans: Target element not found');
      return;
    }
    
    // Add styles
    const styleElement = document.createElement('style');
    styleElement.textContent = FORM_STYLES;
    document.head.appendChild(styleElement);
    
    // Set form HTML
    targetElement.innerHTML = createFormHTML(config);
    
    // Apply custom styles
    const formElement = document.getElementById(`truefans-submission-form-${config.venueId}`);
    if (formElement) {
      formElement.style.backgroundColor = config.backgroundColor;
      formElement.style.color = config.textColor;
      formElement.style.borderRadius = `${config.borderRadius}px`;
    }
    
    // Set up form submission
    const form = document.getElementById('truefans-submission-form-element');
    const formContainer = document.querySelector('.form-container');
    const successMessage = document.querySelector('.success-message');
    
    if (form && formContainer && successMessage) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
          submitButton.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; gap: 8px;"><div style="width: 16px; height: 16px; border: 2px solid white; border-bottom-color: transparent; border-radius: 50%; animation: truefans-spin 1s linear infinite;"></div>Submitting...</div>';
          submitButton.disabled = true;
        }
        
        // Simulate API call
        setTimeout(() => {
          formContainer.style.display = 'none';
          successMessage.style.display = 'block';
        }, 2000);
      });
      
      // Set up "Submit Another" button
      const submitAnotherButton = document.getElementById('submit-another');
      if (submitAnotherButton) {
        submitAnotherButton.addEventListener('click', function() {
          form.reset();
          formContainer.style.display = 'block';
          successMessage.style.display = 'none';
          
          const submitButton = form.querySelector('button[type="submit"]');
          if (submitButton) {
            submitButton.innerHTML = 'Submit Application';
            submitButton.disabled = false;
          }
        });
      }
      
      // Set up file upload
      if (config.allowFileUploads) {
        const fileInput = document.getElementById('file-upload');
        const uploadArea = document.getElementById('upload-area');
        const fileList = document.getElementById('file-list');
        
        if (fileInput && uploadArea && fileList) {
          uploadArea.addEventListener('click', function() {
            fileInput.click();
          });
          
          fileInput.addEventListener('change', function() {
            fileList.innerHTML = '';
            if (fileInput.files && fileInput.files.length > 0) {
              for (let i = 0; i < fileInput.files.length; i++) {
                const file = fileInput.files[i];
                fileList.innerHTML += `<div style="opacity: 0.8;">${file.name}</div>`;
              }
            }
          });
          
          // Drag and drop
          uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            uploadArea.style.borderColor = 'rgba(255,255,255,0.5)';
          });
          
          uploadArea.addEventListener('dragleave', function() {
            uploadArea.style.borderColor = 'rgba(255,255,255,0.3)';
          });
          
          uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            uploadArea.style.borderColor = 'rgba(255,255,255,0.3)';
            
            if (e.dataTransfer && e.dataTransfer.files.length > 0) {
              fileInput.files = e.dataTransfer.files;
              
              // Trigger change event
              const event = new Event('change');
              fileInput.dispatchEvent(event);
            }
          });
        }
      }
    }
    
    // Add keyframe animation for spinner
    const spinnerAnimation = document.createElement('style');
    spinnerAnimation.textContent = `
      @keyframes truefans-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(spinnerAnimation);
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initForm);
  } else {
    initForm();
  }
})();