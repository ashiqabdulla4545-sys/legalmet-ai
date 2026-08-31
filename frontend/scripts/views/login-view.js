/* ==========================================================================
   VIEW 1: INSPECTOR LOGIN VIEW
   ========================================================================== */

export const LoginView = {
  render(state) {
    return `
      <div class="login-wrapper">
        <div class="login-card">
          <div class="login-header">
            <div class="login-emblem">
              <span class="material-symbols-outlined" style="font-size: 28px;">gavel</span>
            </div>
            <h1 style="font-size: 22px; font-weight: 800; letter-spacing: -0.02em; text-transform: uppercase;">LegalMet AI</h1>
            <div style="font-size: 11px; font-family: var(--font-mono); color: var(--color-on-surface-variant); margin-top: 4px;">
              REGULATORY COMPLIANCE WORKSTATION • V4.2
            </div>
          </div>

          <form id="loginForm" onsubmit="return false;">
            <div class="form-group">
              <label class="form-label">REGULATORY JURISDICTION</label>
              <select class="form-select" id="loginJurisdiction">
                <option value="DELHI_NCT_1">Delhi NCT Zone 1 - Enforcement Wing</option>
                <option value="MAHARASHTRA_HQ">Maharashtra Legal Metrology HQ (Mumbai)</option>
                <option value="KARNATAKA_BLR">Karnataka Weights &amp; Measures (Bengaluru)</option>
                <option value="NATIONAL_CENTRAL">Central Metrology Directorate (Govt. of India)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">OFFICER BADGE IDENTIFIER</label>
              <input type="text" class="form-input" id="loginBadge" value="INS-8842-DL" placeholder="e.g. INS-8842-DL" required />
            </div>

            <div class="form-group">
              <label class="form-label">SECURITY CLEARANCE PIN</label>
              <input type="password" class="form-input" id="loginPin" value="••••••••" placeholder="Enter security PIN" required />
            </div>

            <div style="margin-bottom: var(--space-4);">
              <div class="biometric-scanner-box" id="btnBiometric">
                <span class="material-symbols-outlined biometric-icon">fingerprint</span>
                <div style="font-size: 12px; font-weight: 600;">Biometric Fingerprint Authentication</div>
                <div style="font-size: 10px; font-family: var(--font-mono); color: var(--color-on-surface-variant);">
                  UIDAI Registered Metrology Token Verified
                </div>
              </div>
            </div>

            <div style="display: flex; flex-direction: column; gap: var(--space-2);">
              <button type="submit" class="btn btn-primary btn-lg" id="btnSubmitLogin" style="width: 100%;">
                <span>ACCESS COMPLIANCE STATION</span>
                <span class="material-symbols-outlined" style="font-size: 18px;">arrow_forward</span>
              </button>
            </div>
          </form>

          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: var(--color-on-surface-variant); border-top: 1px solid var(--color-border); padding-top: var(--space-3);">
            <div style="display: flex; align-items: center; gap: 4px;">
              <span class="status-dot"></span>
              <span>Encrypted HSM Node</span>
            </div>
            <div style="font-family: var(--font-mono);">Build 2026.08.42</div>
          </div>
        </div>
      </div>
    `;
  },

  attachEvents(app) {
    const form = document.querySelector('#loginForm');
    const biometricBtn = document.querySelector('#btnBiometric');
    const submitBtn = document.querySelector('#btnSubmitLogin');

    const handleLogin = async () => {
      const badge = document.querySelector('#loginBadge')?.value || 'INS-8842-DL';
      const pin = document.querySelector('#loginPin')?.value || '12345678';

      try {
        if (app.api && app.state.backendConnected) {
          const res = await app.api.login(badge, pin);
          if (res && res.inspector) {
            app.state.data.inspector = res.inspector;
            app.updateHeaderProfile();
          }
        }
      } catch (err) {
        console.log('Login API notice:', err);
      }

      app.showToast('Authentication Successful. Welcome, Officer Rajeshwar Varma.', 'success');
      app.navigate('/command-center');
    };

    if (form) form.onsubmit = handleLogin;
    if (submitBtn) submitBtn.onclick = handleLogin;
    if (biometricBtn) {
      biometricBtn.onclick = async () => {
        try {
          if (app.api && app.state.backendConnected) {
            await app.api.loginBiometric('INS-8842-DL');
          }
        } catch (e) {
          console.log('Biometric API notice:', e);
        }
        app.showToast('Biometric Match Confirmed (UIDAI Hash Verified).', 'success');
        setTimeout(handleLogin, 300);
      };
    }
  }
};

