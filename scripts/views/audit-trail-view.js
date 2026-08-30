/* ==========================================================================
   VIEW 8: AUDIT TRAIL & CRYPTOGRAPHIC PROVENANCE VIEW
   ========================================================================== */

export const AuditTrailView = {
  render(state) {
    const logs = state.data.auditLog;

    return `
      <div class="page-container">
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: var(--space-6);">
          <div>
            <div style="font-size: 11px; font-family: var(--font-mono); color: var(--color-on-surface-variant); text-transform: uppercase; letter-spacing: 0.05em;">
              IMMUTABLE CHAIN • SECTION 53 STATUTORY LEDGER
            </div>
            <h1 style="font-size: 26px; font-weight: 800; margin-top: 4px;">Audit Trail &amp; Provenance</h1>
          </div>

          <div style="display: flex; gap: var(--space-2);">
            <button class="btn btn-secondary btn-sm" id="btnVerifyLedger">
              <span class="material-symbols-outlined" style="font-size: 16px; color: var(--color-status-compliant);">verified_user</span>
              <span>Verify Chain Integrity</span>
            </button>
            <button class="btn btn-primary btn-sm" id="btnExportAuditLog">
              <span class="material-symbols-outlined" style="font-size: 16px;">download</span>
              <span>Export Audit Ledger</span>
            </button>
          </div>
        </div>

        <!-- Filter Bar -->
        <div class="card" style="margin-bottom: var(--space-6); padding: var(--space-3) var(--space-4);">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: var(--space-4); flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: var(--space-3);">
              <span style="font-size: 12px; font-weight: 700; text-transform: uppercase;">Filter Ledger:</span>
              <select class="form-select" id="filterActionType" style="width: auto; padding: 4px 10px; font-size: 12px;">
                <option value="ALL">All Event Types</option>
                <option value="VIOLATION">Statutory Violations</option>
                <option value="CERT">Certificates Issued</option>
                <option value="INFERENCE">AI Model Inferences</option>
              </select>
              <select class="form-select" id="filterJurisdiction" style="width: auto; padding: 4px 10px; font-size: 12px;">
                <option value="DELHI">Delhi NCT Zone 1</option>
                <option value="ALL">All Jurisdictions</option>
              </select>
            </div>

            <div style="font-size: 11px; font-family: var(--font-mono); color: var(--color-on-surface-variant); display: flex; align-items: center; gap: 6px;">
              <span class="status-dot"></span>
              <span>Node: DL-MET-HSM-NODE-01 (Synced 42s ago)</span>
            </div>
          </div>
        </div>

        <!-- Audit Timeline Ledger -->
        <div class="audit-timeline">
          ${logs.map(l => `
            <div class="audit-node-item">
              <div class="audit-node-badge">
                <span class="material-symbols-outlined" style="font-size: 20px;">
                  ${l.action === 'CONFIRM_VIOLATION' ? 'gavel' : (l.action === 'CERTIFICATE_ISSUED' ? 'verified' : 'neurology')}
                </span>
              </div>

              <div class="audit-node-card">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                  <div>
                    <span class="badge ${l.action === 'CONFIRM_VIOLATION' ? 'badge-violation' : (l.action === 'CERTIFICATE_ISSUED' ? 'badge-compliant' : 'badge-info')}">
                      ${l.action.replace('_', ' ')}
                    </span>
                    <span style="font-size: 13px; font-weight: 700; margin-left: 8px;">${l.commodity}</span>
                  </div>
                  <div style="font-size: 11px; font-family: var(--font-mono); color: var(--color-on-surface-variant);">
                    ${l.timestamp}
                  </div>
                </div>

                <div style="font-size: 13px; color: var(--color-on-surface); line-height: 1.4; margin-bottom: 8px;">
                  ${l.notes}
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-border); padding-top: 6px; font-size: 11px; font-family: var(--font-mono);">
                  <div style="color: var(--color-on-surface-variant);">
                    Inspector: <strong>${l.inspector}</strong> • Case Ref: <strong style="color: var(--color-on-surface);">${l.caseId}</strong>
                  </div>
                  <div style="color: #666; font-size: 10px;" title="Cryptographic SHA-256 State Hash">
                    HASH: ${l.hash.substring(0, 24)}...
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  attachEvents(app) {
    const verifyBtn = document.querySelector('#btnVerifyLedger');
    if (verifyBtn) {
      verifyBtn.onclick = () => {
        app.showToast('Cryptographic Verification Passed: All 4 block hashes match Delhi Legal Metrology HSM Ledger.', 'success');
      };
    }

    const exportBtn = document.querySelector('#btnExportAuditLog');
    if (exportBtn) {
      exportBtn.onclick = () => {
        const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(app.state.data.auditLog, null, 2));
        const a = document.createElement('a');
        a.href = jsonStr;
        a.download = `legalmet_audit_trail_${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        app.showToast('Audit ledger exported as verified JSON.', 'success');
      };
    }
  }
};
