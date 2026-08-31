/* ==========================================================================
   VIEW 4: AI PROCESSING STATUS & PIPELINE VIEW
   ========================================================================== */

export const AiStatusView = {
  render(state) {
    const currentCase = state.currentCase || state.data.cases[0];

    return `
      <div class="page-container">
        <div class="pipeline-container">
          <!-- Header -->
          <div style="text-align: center;">
            <span class="badge badge-info" style="margin-bottom: 8px;">REAL-TIME INFERENCE TELEMETRY</span>
            <h1 style="font-size: 28px; font-weight: 800;">AI Perception &amp; Rule Engine</h1>
            <div style="font-size: 13px; color: var(--color-on-surface-variant); margin-top: 4px;">
              Inspecting Consignment: <strong class="mono" style="color: var(--color-on-surface);">${currentCase.id}</strong> (${currentCase.title})
            </div>
          </div>

          <!-- Overall Pipeline Progress Bar -->
          <div class="card" style="padding: var(--space-4);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-weight: 700; font-size: 13px;">Pipeline Execution Progress</span>
              <span class="mono" id="pipelineProgressLabel" style="font-weight: 700; color: var(--color-brand-accent);">100% (Completed)</span>
            </div>
            <div class="progress-track" style="height: 10px;">
              <div class="progress-fill" id="pipelineProgressBar" style="width: 100%; background: linear-gradient(90deg, #ff5c35, #107c10);"></div>
            </div>
          </div>

          <!-- Stepper Stage Cards -->
          <div class="pipeline-stepper">
            <div class="pipeline-step-card completed">
              <div class="pipeline-step-icon">
                <span class="material-symbols-outlined">document_scanner</span>
              </div>
              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-weight: 700; font-size: 14px;">1. Multi-Spectral OCR &amp; Character Extraction</span>
                  <span class="badge badge-compliant">99.2% CERTAINTY</span>
                </div>
                <div style="font-size: 12px; color: var(--color-on-surface-variant); margin-top: 2px;">
                  Extracted 42 textual tokens across front, back, and peripheral label panels.
                </div>
              </div>
            </div>

            <div class="pipeline-step-card completed">
              <div class="pipeline-step-icon">
                <span class="material-symbols-outlined">crop_free</span>
              </div>
              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-weight: 700; font-size: 14px;">2. Bounding Box &amp; Spatial Segmentation</span>
                  <span class="badge badge-compliant">4 ZONES DETECTED</span>
                </div>
                <div style="font-size: 12px; color: var(--color-on-surface-variant); margin-top: 2px;">
                  Segmented Principal Display Panel (PDP), MRP Area, Net Qty Area, and Grievance Block.
                </div>
              </div>
            </div>

            <div class="pipeline-step-card completed">
              <div class="pipeline-step-icon">
                <span class="material-symbols-outlined">gavel</span>
              </div>
              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-weight: 700; font-size: 14px;">3. Legal Metrology Act (2009) &amp; PCR Rule Cross-Check</span>
                  <span class="badge badge-violation">ANOMALY DETECTED</span>
                </div>
                <div style="font-size: 12px; color: var(--color-on-surface-variant); margin-top: 2px;">
                  Tested against 18 statutory declarations (Rule 6, Rule 12, Rule 18, Schedule II).
                </div>
              </div>
            </div>

            <div class="pipeline-step-card completed">
              <div class="pipeline-step-icon">
                <span class="material-symbols-outlined">warning</span>
              </div>
              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-weight: 700; font-size: 14px;">4. Price Alteration &amp; Dual MRP Classifier</span>
                  <span class="badge badge-violation">RULE 6(1)(e) BREACH</span>
                </div>
                <div style="font-size: 12px; color: var(--color-on-surface-variant); margin-top: 2px;">
                  Flagged secondary sticker price ₹420.00 obscuring factory base ₹380.00.
                </div>
              </div>
            </div>

            <div class="pipeline-step-card completed">
              <div class="pipeline-step-icon">
                <span class="material-symbols-outlined">verified</span>
              </div>
              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-weight: 700; font-size: 14px;">5. Evidence Provenance &amp; Ledger Cryptographic Token</span>
                  <span class="badge badge-info">SHA-256 SEALED</span>
                </div>
                <div style="font-size: 12px; color: var(--color-on-surface-variant); margin-top: 2px;">
                  Generated immutable audit hash e3b0c44298fc1c149afbf4c8996fb92427ae41e4.
                </div>
              </div>
            </div>
          </div>

          <!-- Real-Time Terminal Log -->
          <div class="card" style="padding: 0; overflow: hidden;">
            <div style="padding: 8px 16px; background-color: #1a1b19; border-bottom: 1px solid #2f312e; display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 11px; font-family: var(--font-mono); color: #888;">AI EXECUTION LOG STREAM</span>
              <span class="status-dot"></span>
            </div>
            <div class="terminal-box" id="terminalLogs">
[15:19:02.110] [VISION_CORE] Loading high-resolution vector artwork for LM-2026-8841...
[15:19:02.240] [PREPROCESSING] Applied contrast normalization (Gamma=1.2, DPI=600 equivalent).
[15:19:02.312] [OCR_ENGINE] Detected text block [x:160, y:80, w:480, h:70] -> "HIMALAYAN BREWS" (conf: 0.99)
[15:19:02.385] [OCR_ENGINE] Detected text block [x:160, y:315, w:200, h:30] -> "Net Quantity: 500 g" (conf: 0.99)
[15:19:02.441] [RULE_ENGINE] Rule 12 Validation: Standard unit 'g' matches Schedule 1. [PASS]
[15:19:02.502] [OCR_ENGINE] Detected dual layer at [x:420, y:370]: Token 1: "₹ 380.00" | Token 2: "₹ 420.00"
[15:19:02.580] [CLASSIFIER_ANOMALY] Visual depth differential indicates adhesive sticker overlay.
[15:19:02.620] [RULE_ENGINE] Rule 6(1)(e) Violation: Unauthorized price overprint without statutory approval. [FLAGGED]
[15:19:02.710] [PROVENANCE] Hashed bounding boxes and OCR tokens with SHA-256.
[15:19:02.795] [PIPELINE_COMPLETE] Inferences ready for inspector review and sign-off.
            </div>
          </div>

          <!-- Bottom Action -->
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <button class="btn btn-secondary" id="btnBackToIntake">
              <span class="material-symbols-outlined" style="font-size: 18px;">arrow_back</span>
              <span>Intake Screen</span>
            </button>
            <button class="btn btn-primary btn-lg" id="btnOpenWorkspace">
              <span>OPEN INSPECTION WORKSPACE</span>
              <span class="material-symbols-outlined" style="font-size: 20px;">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  attachEvents(app) {
    const currentCase = app.state.currentCase;
    if (app.api && app.state.backendConnected && currentCase) {
      app.api.analyzeCase(currentCase.id).then(res => {
        if (res && res.logs) {
          const logTerminal = document.querySelector('.terminal-window');
          if (logTerminal) {
            logTerminal.innerHTML = res.logs.map(l => `<div class="terminal-line"><span class="terminal-timestamp">${l.slice(0, 10)}</span> ${l.slice(11)}</div>`).join('');
          }
        }
      }).catch(err => console.log('Pipeline run API notice:', err));
    }

    const openWsBtn = document.querySelector('#btnOpenWorkspace');
    if (openWsBtn) {
      openWsBtn.onclick = () => {
        app.navigate('/workspace');
      };
    }

    const backBtn = document.querySelector('#btnBackToIntake');
    if (backBtn) {
      backBtn.onclick = () => {
        app.navigate('/intake');
      };
    }
  }
};
