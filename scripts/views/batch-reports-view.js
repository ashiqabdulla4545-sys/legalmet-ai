/* ==========================================================================
   VIEW 7: BATCH INTELLIGENCE & REPORTS VIEW
   ========================================================================== */

export const BatchReportsView = {
  render(state) {
    const stats = state.data.batchStats;

    return `
      <div class="page-container">
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: var(--space-6);">
          <div>
            <div style="font-size: 11px; font-family: var(--font-mono); color: var(--color-on-surface-variant); text-transform: uppercase; letter-spacing: 0.05em;">
              ENFORCEMENT INTELLIGENCE &amp; AUDIT REPORTS
            </div>
            <h1 style="font-size: 26px; font-weight: 800; margin-top: 4px;">Batch Intelligence &amp; Reports</h1>
          </div>

          <div style="display: flex; gap: var(--space-2);">
            <button class="btn btn-outline btn-sm" id="btnPrintReport">
              <span class="material-symbols-outlined" style="font-size: 16px;">print</span>
              <span>Print Dossier</span>
            </button>
            <button class="btn btn-primary btn-sm" id="btnGenerateCertFromBatch">
              <span class="material-symbols-outlined" style="font-size: 16px;">picture_as_pdf</span>
              <span>Generate Metrology Certificate</span>
            </button>
          </div>
        </div>

        <!-- 3-Stat KPI Summary -->
        <div class="reports-stats-grid">
          <div class="kpi-card">
            <span class="kpi-label">Total Pre-Packaged Articles Audited</span>
            <div class="kpi-value">${stats.totalInspected.toLocaleString()}</div>
            <div class="kpi-subtext">Across 42 industrial zones</div>
          </div>

          <div class="kpi-card">
            <span class="kpi-label">Fully Compliant Packages</span>
            <div class="kpi-value" style="color: var(--color-status-compliant);">${stats.totalCompliant.toLocaleString()}</div>
            <div class="kpi-subtext">88.4% passing rate</div>
          </div>

          <div class="kpi-card">
            <span class="kpi-label">Statutory Violation Notices</span>
            <div class="kpi-value" style="color: var(--color-status-violation);">${stats.totalViolations.toLocaleString()}</div>
            <div class="kpi-subtext">11.6% non-conformance rate</div>
          </div>
        </div>

        <!-- 2-Column Analytics Layout -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-6); margin-bottom: var(--space-6);">
          <!-- Left: Recurring Findings by Category -->
          <div class="card">
            <div class="card-header">
              <span class="card-title">Recurring Violations by Category</span>
              <span class="badge badge-neutral">TOP 5 DEFECTS</span>
            </div>

            <p style="font-size: 12px; color: var(--color-on-surface-variant); margin-bottom: var(--space-3);">
              Distribution of non-compliant declarations detected across all FMCG, Cosmetics, and Edible commodities.
            </p>

            <div class="bar-chart-mock">
              ${stats.categories.map(c => `
                <div class="bar-row">
                  <div class="bar-row-label" title="${c.name}">${c.name}</div>
                  <div class="bar-row-track">
                    <div class="bar-row-fill" style="width: ${c.pct * 2.5}%; background-color: ${c.color};"></div>
                  </div>
                  <div style="width: 70px; text-align: right; font-family: var(--font-mono); font-weight: 700; font-size: 11px;">
                    ${c.count} (${c.pct}%)
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Right: Manufacturer Compliance Leaderboard -->
          <div class="card">
            <div class="card-header">
              <span class="card-title">Packer Compliance Matrix</span>
              <span class="badge badge-info">SURVEILLANCE RADAR</span>
            </div>

            <div class="data-table-container" style="border: none;">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Manufacturer</th>
                    <th>Audited</th>
                    <th>Violation Rate</th>
                    <th>Risk</th>
                  </tr>
                </thead>
                <tbody>
                  ${stats.manufacturers.map(m => `
                    <tr>
                      <td style="font-weight: 600;">${m.name}</td>
                      <td class="mono">${m.inspected}</td>
                      <td class="mono" style="font-weight: 700; color: ${m.risk === 'HIGH' ? 'var(--color-status-violation)' : 'var(--color-status-compliant)'};">
                        ${m.violationRate}
                      </td>
                      <td>
                        <span class="badge ${m.risk === 'HIGH' ? 'badge-violation' : 'badge-compliant'}">
                          ${m.risk}
                        </span>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Generated Regulatory Reports History Table -->
        <div class="card">
          <div class="card-header">
            <span class="card-title">Formal Metrology Reports Registry</span>
            <span class="badge badge-neutral">EXPORT CENTER</span>
          </div>

          <div class="data-table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Report Reference</th>
                  <th>Commodity / Case</th>
                  <th>Generated By</th>
                  <th>Date &amp; Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="mono" style="font-weight: 700;">DL-MET-REP-2026-8841</td>
                  <td>Darjeeling Royal Gold Tea (500 g)</td>
                  <td>Insp. R. Varma (DL-MET-904)</td>
                  <td class="mono">2026-08-30 14:48</td>
                  <td><span class="badge badge-violation">NOTICE ISSUED</span></td>
                  <td>
                    <button class="btn btn-outline btn-sm btn-download-sample-report" data-case-id="LM-2026-8841">
                      <span class="material-symbols-outlined" style="font-size: 14px;">download</span>
                      <span>Certificate</span>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td class="mono" style="font-weight: 700;">DL-MET-CERT-2026-8842</td>
                  <td>Kisan Pure Mustard Oil (1 L)</td>
                  <td>Insp. R. Varma (DL-MET-904)</td>
                  <td class="mono">2026-08-30 13:20</td>
                  <td><span class="badge badge-compliant">VERIFIED</span></td>
                  <td>
                    <button class="btn btn-outline btn-sm btn-download-sample-report" data-case-id="LM-2026-8842">
                      <span class="material-symbols-outlined" style="font-size: 14px;">download</span>
                      <span>Certificate</span>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td class="mono" style="font-weight: 700;">DL-MET-REP-2026-8843</td>
                  <td>Apex Hydro Protein Bar (75 g)</td>
                  <td>Insp. R. Varma (DL-MET-904)</td>
                  <td class="mono">2026-08-30 11:42</td>
                  <td><span class="badge badge-violation">FONT DEFECT</span></td>
                  <td>
                    <button class="btn btn-outline btn-sm btn-download-sample-report" data-case-id="LM-2026-8843">
                      <span class="material-symbols-outlined" style="font-size: 14px;">download</span>
                      <span>Certificate</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  attachEvents(app) {
    const printBtn = document.querySelector('#btnPrintReport');
    if (printBtn) {
      printBtn.onclick = () => window.print();
    }

    const genCertBtn = document.querySelector('#btnGenerateCertFromBatch');
    if (genCertBtn) {
      genCertBtn.onclick = () => {
        const c = app.state.currentCase || app.state.data.cases[0];
        app.openCertificateModal(c);
      };
    }

    document.querySelectorAll('.btn-download-sample-report').forEach(btn => {
      btn.onclick = () => {
        const caseId = btn.dataset.caseId;
        const targetCase = app.state.data.cases.find(c => c.id === caseId) || app.state.data.cases[0];
        app.openCertificateModal(targetCase);
      };
    });
  }
};
