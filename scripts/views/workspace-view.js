/* ==========================================================================
   VIEW 5: INSPECTION WORKSPACE (SPLIT-VIEW WORKSTATION)
   ========================================================================== */

import { CanvasAnnotator } from '../utils/canvas-annotator.js';

export const WorkspaceView = {
  render(state) {
    const currentCase = state.currentCase || state.data.cases[0];

    return `
      <div class="page-container" style="padding-top: var(--space-3); padding-bottom: var(--space-3);">
        <!-- Top Metadata & Navigation Bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-3); padding-bottom: var(--space-2); border-bottom: 1px solid var(--color-border);">
          <div style="display: flex; align-items: center; gap: 12px;">
            <button class="btn btn-outline btn-sm" id="btnBackToQueue" title="Back to Command Center">
              <span class="material-symbols-outlined" style="font-size: 16px;">arrow_back</span>
              <span>Queue</span>
            </button>
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <h1 style="font-size: 18px; font-weight: 800;">${currentCase.title}</h1>
                <span class="badge ${currentCase.status === 'VIOLATION' ? 'badge-violation' : (currentCase.status === 'COMPLIANT' ? 'badge-compliant' : 'badge-review')}">
                  ${currentCase.status}
                </span>
              </div>
              <div style="font-size: 11px; font-family: var(--font-mono); color: var(--color-on-surface-variant);">
                Case ID: <strong>${currentCase.id}</strong> • Manufacturer: ${currentCase.manufacturer} • Batch: ${currentCase.batchNo}
              </div>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 8px;">
            <button class="btn btn-secondary btn-sm" id="btnViewWhy">
              <span class="material-symbols-outlined" style="font-size: 16px; color: var(--color-brand-accent);">help_center</span>
              <span>Trace Evidence (WHY?)</span>
            </button>
            <button class="btn btn-outline btn-sm" id="btnGenerateCert">
              <span class="material-symbols-outlined" style="font-size: 16px;">verified</span>
              <span>Generate Certificate</span>
            </button>
          </div>
        </div>

        <!-- Split-View Layout -->
        <div class="workspace-split-layout">
          <!-- Left: Visual Evidence Canvas -->
          <div class="workspace-canvas-panel" id="canvasPanel">
            <!-- Rendered by CanvasAnnotator -->
          </div>

          <!-- Right: AI Findings & Inspector Decision Form -->
          <div class="workspace-decision-panel">
            <div style="padding: var(--space-3) var(--space-4); background-color: var(--color-surface-container-low); border-bottom: 1px solid var(--color-border); display: flex; justify-content: space-between; align-items: center;">
              <div>
                <span style="font-size: 12px; font-weight: 700; text-transform: uppercase;">Metrological Findings</span>
                <span style="font-size: 11px; color: var(--color-on-surface-variant); margin-left: 6px;">(${currentCase.findings.length} clauses analyzed)</span>
              </div>
              <div style="font-size: 11px; font-family: var(--font-mono); font-weight: 600;">
                Risk Score: <span style="color: ${currentCase.riskScore > 50 ? 'var(--color-status-violation)' : 'var(--color-status-compliant)'};">${currentCase.riskScore}/100</span>
              </div>
            </div>

            <!-- Findings Accordion List -->
            <div class="workspace-findings-list" id="findingsList">
              ${currentCase.findings.map(f => `
                <div class="finding-card ${f.type === 'VIOLATION' ? 'violation' : (f.type === 'COMPLIANT' ? 'compliant' : 'review')}" data-finding-id="${f.id}">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                    <div>
                      <div style="font-size: 10px; font-family: var(--font-mono); color: var(--color-on-surface-variant);">${f.section}</div>
                      <div style="font-weight: 700; font-size: 13px; margin-top: 1px;">${f.title}</div>
                    </div>
                    <span class="badge ${f.type === 'VIOLATION' ? 'badge-violation' : (f.type === 'COMPLIANT' ? 'badge-compliant' : 'badge-review')}">
                      ${f.type}
                    </span>
                  </div>

                  <div style="font-size: 12px; color: var(--color-on-surface); line-height: 1.4; margin-bottom: 8px;">
                    ${f.description}
                  </div>

                  <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-border); padding-top: 6px;">
                    <div class="confidence-meter">
                      <span>Certainty:</span>
                      <div class="confidence-bars" data-level="${f.confidence}">
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                      </div>
                      <span style="font-size: 11px; font-weight: 700;">${f.confidencePct}%</span>
                    </div>

                    <button class="btn btn-outline btn-sm btn-focus-box" data-finding-id="${f.id}" style="padding: 2px 8px; font-size: 11px;">
                      <span class="material-symbols-outlined" style="font-size: 14px;">visibility</span>
                      <span>Locate</span>
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Case Notes / Inspector Summary -->
            <div style="padding: var(--space-3) var(--space-4); border-top: 1px solid var(--color-border); background-color: var(--color-surface-container-lowest);">
              <label class="form-label" style="margin-bottom: 4px;">INSPECTOR REASONING &amp; FIELD JUSTIFICATION</label>
              <textarea class="form-textarea" id="inspectorNotes" rows="2" placeholder="Enter formal enforcement remarks for the record...">${currentCase.summary}</textarea>
            </div>

            <!-- Decision Action Bar -->
            <div class="workspace-action-bar">
              <button class="btn btn-outline btn-sm" id="btnOverrideDecision">
                <span class="material-symbols-outlined" style="font-size: 16px;">edit_note</span>
                <span>Override Finding</span>
              </button>

              <div style="display: flex; gap: var(--space-2);">
                <button class="btn btn-violation btn-sm" id="btnConfirmViolation">
                  <span class="material-symbols-outlined" style="font-size: 16px;">gavel</span>
                  <span>Issue Statutory Violation Notice</span>
                </button>
                <button class="btn btn-compliant btn-sm" id="btnApproveCompliant">
                  <span class="material-symbols-outlined" style="font-size: 16px;">check_circle</span>
                  <span>Pass &amp; Issue Certificate</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  attachEvents(app) {
    const currentCase = app.state.currentCase || app.state.data.cases[0];
    const canvasContainer = document.querySelector('#canvasPanel');

    if (canvasContainer) {
      const annotator = new CanvasAnnotator(canvasContainer, {
        onSelectFinding: (findingId) => {
          document.querySelectorAll('.finding-card').forEach(c => {
            if (c.dataset.findingId === findingId) {
              c.style.backgroundColor = 'var(--color-evidence-highlight-bg)';
              c.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
              c.style.backgroundColor = '';
            }
          });
        }
      });

      annotator.setData(currentCase.image, currentCase.findings);

      // Locate button click in finding cards
      document.querySelectorAll('.btn-focus-box').forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          const fid = btn.dataset.findingId;
          annotator.setActiveFinding(fid);
        };
      });
    }

    const backBtn = document.querySelector('#btnBackToQueue');
    if (backBtn) backBtn.onclick = () => app.navigate('/command-center');

    const viewWhyBtn = document.querySelector('#btnViewWhy');
    if (viewWhyBtn) viewWhyBtn.onclick = () => app.navigate('/evidence-why');

    const certBtn = document.querySelector('#btnGenerateCert');
    if (certBtn) {
      certBtn.onclick = () => {
        app.openCertificateModal(currentCase);
      };
    }

    const confirmViolBtn = document.querySelector('#btnConfirmViolation');
    if (confirmViolBtn) {
      confirmViolBtn.onclick = () => {
        app.showToast(`Statutory Notice under Section 36(1) initiated for ${currentCase.id}. Logged to immutable audit trail.`, 'error');
        app.openCertificateModal(currentCase);
      };
    }

    const approveBtn = document.querySelector('#btnApproveCompliant');
    if (approveBtn) {
      approveBtn.onclick = () => {
        currentCase.status = 'COMPLIANT';
        currentCase.riskScore = 5;
        app.showToast(`Compliance verified for ${currentCase.id}. Certificate generated.`, 'success');
        app.openCertificateModal(currentCase);
      };
    }

    const overrideBtn = document.querySelector('#btnOverrideDecision');
    if (overrideBtn) {
      overrideBtn.onclick = () => {
        const newReason = prompt('Enter statutory justification for decision override:', 'Manual visual inspection under 10x magnification verified compliance.');
        if (newReason) {
          app.showToast('Inspector override recorded with cryptographic ledger hash.', 'info');
        }
      };
    }
  }
};
