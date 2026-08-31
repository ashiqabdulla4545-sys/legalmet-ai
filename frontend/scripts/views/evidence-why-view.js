/* ==========================================================================
   VIEW 6: EVIDENCE TRACEABILITY (EXPLAINABLE AI - WHY?)
   ========================================================================== */

export const EvidenceWhyView = {
  render(state) {
    const currentCase = state.currentCase || state.data.cases[0];
    const violation = currentCase.findings.find(f => f.type === 'VIOLATION') || currentCase.findings[0];

    return `
      <div class="page-container">
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: var(--space-6);">
          <div>
            <div style="font-size: 11px; font-family: var(--font-mono); color: var(--color-on-surface-variant); text-transform: uppercase; letter-spacing: 0.05em;">
              EXPLAINABLE AI (XAI) • STATUTORY PROVENANCE LEDGER
            </div>
            <h1 style="font-size: 26px; font-weight: 800; margin-top: 4px;">
              Evidence Explanation: ${violation ? violation.title : 'Dual MRP Anomaly'}
            </h1>
            <div style="font-size: 12px; font-family: var(--font-mono); color: var(--color-on-surface-variant); margin-top: 2px;">
              Case ID: <strong>${currentCase.id}</strong> • Article: ${currentCase.title}
            </div>
          </div>

          <div style="display: flex; gap: var(--space-2);">
            <button class="btn btn-secondary btn-sm" id="btnBackToWorkspace">
              <span class="material-symbols-outlined" style="font-size: 16px;">arrow_back</span>
              <span>Back to Workspace</span>
            </button>
            <button class="btn btn-primary btn-sm" id="btnExportDossier">
              <span class="material-symbols-outlined" style="font-size: 16px;">download</span>
              <span>Export Evidence Dossier</span>
            </button>
          </div>
        </div>

        <!-- Visual Provenance Pipeline Chain -->
        <div class="provenance-chain-box">
          <div class="provenance-node">
            <div class="provenance-icon-circle">
              <span class="material-symbols-outlined">image</span>
            </div>
            <div style="font-weight: 700; font-size: 12px;">Raw Label Pixels</div>
            <div style="font-size: 10px; font-family: var(--font-mono); color: var(--color-on-surface-variant);">600 DPI Scan</div>
          </div>

          <span class="material-symbols-outlined provenance-arrow">arrow_forward</span>

          <div class="provenance-node">
            <div class="provenance-icon-circle">
              <span class="material-symbols-outlined">text_fields</span>
            </div>
            <div style="font-weight: 700; font-size: 12px;">Token Extraction</div>
            <div style="font-size: 10px; font-family: var(--font-mono); color: var(--color-on-surface-variant);">₹380.00 / ₹420.00</div>
          </div>

          <span class="material-symbols-outlined provenance-arrow">arrow_forward</span>

          <div class="provenance-node">
            <div class="provenance-icon-circle" style="background-color: var(--color-brand-accent);">
              <span class="material-symbols-outlined">layers</span>
            </div>
            <div style="font-weight: 700; font-size: 12px;">Layer Differential</div>
            <div style="font-size: 10px; font-family: var(--font-mono); color: var(--color-on-surface-variant);">Adhesive Sticker</div>
          </div>

          <span class="material-symbols-outlined provenance-arrow">arrow_forward</span>

          <div class="provenance-node">
            <div class="provenance-icon-circle">
              <span class="material-symbols-outlined">gavel</span>
            </div>
            <div style="font-weight: 700; font-size: 12px;">Statutory Rule</div>
            <div style="font-size: 10px; font-family: var(--font-mono); color: var(--color-on-surface-variant);">PCR Rule 6(1)(e)</div>
          </div>

          <span class="material-symbols-outlined provenance-arrow">arrow_forward</span>

          <div class="provenance-node">
            <div class="provenance-icon-circle" style="background-color: var(--color-status-violation);">
              <span class="material-symbols-outlined">warning</span>
            </div>
            <div style="font-weight: 700; font-size: 12px;">Enforcement Action</div>
            <div style="font-size: 10px; font-family: var(--font-mono); color: var(--color-status-violation); font-weight: 700;">Sec 36(1) Notice</div>
          </div>
        </div>

        <!-- 2-Column Deep Dive Analysis -->
        <div style="display: grid; grid-template-columns: 1.1fr 0.9fr; gap: var(--space-6);">
          <!-- Left: Technical Evidence Detail -->
          <div class="card">
            <div class="card-header">
              <span class="card-title">Algorithmic Evidence Rationale</span>
              <span class="badge badge-violation">CERTAINTY 96%</span>
            </div>

            <div style="margin-bottom: var(--space-4);">
              <h4 style="font-size: 14px; margin-bottom: 6px;">Visual Multi-Layer Segmentation</h4>
              <p style="font-size: 13px; color: var(--color-on-surface); line-height: 1.5; margin-bottom: 12px;">
                The vision transformer engine performed spatial layer decomposition on the packaging's price panel. It detected a physical adhesive boundary with a height variance of 0.42mm above the base substrate.
              </p>

              <div style="background-color: var(--color-surface-container-low); padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--color-border); font-family: var(--font-mono); font-size: 11px; line-height: 1.6;">
                <div>[LAYER_0: Base Carton] Token: "₹ 380.00 (Incl. of all taxes)" [DPI: 600, Ink: Offset]</div>
                <div>[LAYER_1: Adhesive Sticker] Token: "₹ 420.00" [DPI: 300, Ink: Thermal Direct]</div>
                <div style="color: var(--color-status-violation); font-weight: 700;">[ANOMALY] Alteration delta: +₹ 40.00 (+10.5% overprint increase)</div>
              </div>
            </div>

            <div style="border-top: 1px solid var(--color-border); padding-top: var(--space-4);">
              <h4 style="font-size: 14px; margin-bottom: 6px;">Confidence Calculation Breakdown</h4>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 600; margin-bottom: 2px;">
                    <span>OCR Visual Sharpness &amp; Character Integrity</span>
                    <span class="mono">99.1%</span>
                  </div>
                  <div class="progress-track"><div class="progress-fill status-ok" style="width: 99.1%;"></div></div>
                </div>

                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 600; margin-bottom: 2px;">
                    <span>Adhesive Boundary Edge Gradient (Sobel Filter)</span>
                    <span class="mono">94.8%</span>
                  </div>
                  <div class="progress-track"><div class="progress-fill status-ok" style="width: 94.8%;"></div></div>
                </div>

                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 600; margin-bottom: 2px;">
                    <span>Legal Rule Deterministic Match</span>
                    <span class="mono">100.0%</span>
                  </div>
                  <div class="progress-track"><div class="progress-fill status-ok" style="width: 100%;"></div></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Statutory Authority & Penalty Matrix -->
          <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div class="card-header">
                <span class="card-title">Statutory Basis &amp; Penal Code</span>
                <span class="badge badge-neutral">LM ACT 2009</span>
              </div>

              <div style="margin-bottom: var(--space-4);">
                <div style="font-size: 11px; font-family: var(--font-mono); color: var(--color-on-surface-variant);">PRIMARY RULE IN BREACH</div>
                <div style="font-size: 15px; font-weight: 800; margin: 2px 0 8px;">
                  Rule 6(1)(e) - Alteration of Retail Sale Price
                </div>
                <div style="font-size: 12px; color: var(--color-on-surface); line-height: 1.5; background-color: var(--color-surface-container-low); padding: 10px 12px; border-left: 3px solid var(--color-primary); border-radius: 2px;">
                  "No individual or retail establishment shall alter, overprint, obscure, or affix supplementary stickers modifying the printed retail price without statutory authorization from the Controller of Legal Metrology."
                </div>
              </div>

              <div style="margin-bottom: var(--space-4);">
                <div style="font-size: 11px; font-family: var(--font-mono); color: var(--color-on-surface-variant);">ENFORCEMENT PENALTY CLAUSE</div>
                <div style="font-size: 15px; font-weight: 800; margin: 2px 0 8px;">
                  Section 36(1) - Legal Metrology Act, 2009
                </div>
                <div style="font-size: 12px; color: var(--color-on-surface); line-height: 1.5;">
                  <strong>1st Offence:</strong> Fine up to <strong>₹ 25,000</strong><br />
                  <strong>2nd Offence:</strong> Fine up to <strong>₹ 50,000</strong><br />
                  <strong>Subsequent Offence:</strong> Fine up to <strong>₹ 1,00,000</strong> or Imprisonment up to 1 Year, or both.
                </div>
              </div>
            </div>

            <!-- Ledger Registration Notice -->
            <div style="padding: 12px; background-color: #f3f9f3; border: 1px solid var(--color-status-compliant-border); border-radius: var(--radius-sm); font-size: 11px;">
              <div style="font-weight: 700; color: var(--color-status-compliant); margin-bottom: 2px;">
                ✓ TAMPER-EVIDENT EVIDENCE ANCHOR
              </div>
              <div style="font-family: var(--font-mono); color: #333; word-break: break-all;">
                Block: #8841-DL-PROV-901 • SHA256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  attachEvents(app) {
    const backBtn = document.querySelector('#btnBackToWorkspace');
    if (backBtn) backBtn.onclick = () => app.navigate('/workspace');

    const exportBtn = document.querySelector('#btnExportDossier');
    if (exportBtn) {
      exportBtn.onclick = () => {
        app.showToast('Evidence dossier exported with high-resolution bounding crops and statutory citations.', 'success');
      };
    }
  }
};
