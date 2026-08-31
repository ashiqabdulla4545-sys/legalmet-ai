/* ==========================================================================
   VIEW 2: COMMAND CENTER DASHBOARD
   ========================================================================== */

export const CommandCenterView = {
  render(state) {
    const kpis = state.data.kpis;
    const cases = state.data.cases;

    return `
      <div class="page-container">
        <!-- Header Banner -->
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: var(--space-6);">
          <div>
            <div style="font-size: 11px; font-family: var(--font-mono); color: var(--color-on-surface-variant); text-transform: uppercase; letter-spacing: 0.05em;">
              EXECUTIVE COMPLIANCE DESK • ${state.data.inspector.jurisdiction}
            </div>
            <h1 style="font-size: 26px; font-weight: 800; margin-top: 4px;">Command Center Dashboard</h1>
          </div>
          <div style="display: flex; gap: var(--space-2);">
            <button class="btn btn-secondary btn-sm" id="btnQuickSearch">
              <span class="material-symbols-outlined" style="font-size: 16px;">search</span>
              <span>Global Search</span>
            </button>
            <button class="btn btn-accent btn-sm" id="btnNewIntake">
              <span class="material-symbols-outlined" style="font-size: 16px;">add_box</span>
              <span>New Inspection Intake</span>
            </button>
          </div>
        </div>

        <!-- 4-Stat Metrics Row -->
        <div class="command-grid">
          <div class="kpi-card">
            <span class="kpi-label">Overall Compliance Rate</span>
            <div class="kpi-value" style="color: var(--color-status-compliant);">${kpis.overallCompliance}%</div>
            <div class="kpi-subtext">
              <span class="material-symbols-outlined" style="font-size: 14px; color: var(--color-status-compliant);">trending_up</span>
              <span>+2.4% vs last reporting quarter</span>
            </div>
          </div>

          <div class="kpi-card">
            <span class="kpi-label">Intake Units Today</span>
            <div class="kpi-value">${kpis.inspectedToday}</div>
            <div class="kpi-subtext">
              <span class="material-symbols-outlined" style="font-size: 14px;">inventory_2</span>
              <span>FMCG, Oils, Cosmetics &amp; Pharma</span>
            </div>
          </div>

          <div class="kpi-card">
            <span class="kpi-label">Critical Violations</span>
            <div class="kpi-value" style="color: var(--color-status-violation);">${kpis.violationsPending}</div>
            <div class="kpi-subtext">
              <span class="material-symbols-outlined" style="font-size: 14px; color: var(--color-status-violation);">warning</span>
              <span>3 Dual MRP overprint notices</span>
            </div>
          </div>

          <div class="kpi-card">
            <span class="kpi-label">Perception Health</span>
            <div class="kpi-value" style="color: var(--color-status-info);">${kpis.systemPerceptionHealth}%</div>
            <div class="kpi-subtext">
              <span class="material-symbols-outlined" style="font-size: 14px; color: var(--color-status-info);">speed</span>
              <span>Avg inference latency 138ms</span>
            </div>
          </div>
        </div>

        <!-- Main Dashboard Split: Review Queue + Perception Health -->
        <div class="dashboard-sections-grid">
          <!-- Left: Active Review Queue -->
          <div class="card">
            <div class="card-header">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="material-symbols-outlined" style="font-size: 20px;">queue_play_next</span>
                <span class="card-title">Priority Inspection Review Queue</span>
              </div>
              <span class="badge badge-info">${cases.length} PENDING DECISIONS</span>
            </div>

            <div class="review-queue-list">
              ${cases.map(c => `
                <div class="queue-item" data-case-id="${c.id}">
                  <div class="queue-item-left">
                    <div style="width: 44px; height: 44px; background-color: var(--color-surface-container); border: 1px solid var(--color-border); border-radius: var(--radius-xs); display: flex; align-items: center; justify-content: center; overflow: hidden;">
                      <img src="${c.image}" alt="Thumb" style="width: 100%; height: 100%; object-fit: cover;" />
                    </div>
                    <div class="queue-item-meta">
                      <div class="queue-item-title">${c.title}</div>
                      <div class="queue-item-sub">${c.id} • ${c.manufacturer}</div>
                      <div style="font-size: 11px; margin-top: 2px; color: #555;">${c.summary}</div>
                    </div>
                  </div>

                  <div style="display: flex; align-items: center; gap: var(--space-3);">
                    <div style="text-align: right;">
                      <span class="badge ${c.status === 'VIOLATION' ? 'badge-violation' : (c.status === 'COMPLIANT' ? 'badge-compliant' : 'badge-review')}">
                        ${c.status}
                      </span>
                      <div style="font-size: 10px; font-family: var(--font-mono); color: var(--color-on-surface-variant); margin-top: 2px;">
                        Risk ${c.riskScore}/100
                      </div>
                    </div>
                    <button class="btn btn-primary btn-sm btn-open-workspace" data-case-id="${c.id}">
                      <span>Review</span>
                      <span class="material-symbols-outlined" style="font-size: 14px;">arrow_forward</span>
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Right: System Perception Health & Quick Actions -->
          <div style="display: flex; flex-direction: column; gap: var(--space-4);">
            <div class="card perception-health-card">
              <div class="card-header">
                <span class="card-title">System Perception Health</span>
                <span class="badge badge-compliant">OPTIMAL</span>
              </div>

              <div class="health-meter-row">
                <div class="health-meter-header">
                  <span>OCR Engine Confidence</span>
                  <span class="mono">98.2%</span>
                </div>
                <div class="progress-track">
                  <div class="progress-fill status-ok" style="width: 98.2%;"></div>
                </div>
              </div>

              <div class="health-meter-row">
                <div class="health-meter-header">
                  <span>Clause Bounding Precision</span>
                  <span class="mono">96.5%</span>
                </div>
                <div class="progress-track">
                  <div class="progress-fill status-ok" style="width: 96.5%;"></div>
                </div>
              </div>

              <div class="health-meter-row">
                <div class="health-meter-header">
                  <span>Camera Distortion Calibration</span>
                  <span class="mono">99.8%</span>
                </div>
                <div class="progress-track">
                  <div class="progress-fill status-ok" style="width: 99.8%;"></div>
                </div>
              </div>

              <div class="health-meter-row">
                <div class="health-meter-header">
                  <span>Legal Rule Matrix Sync</span>
                  <span class="mono">PCR-2026-v3</span>
                </div>
                <div class="progress-track">
                  <div class="progress-fill status-ok" style="width: 100%;"></div>
                </div>
              </div>
            </div>

            <!-- Quick Navigation Shortcuts -->
            <div class="card">
              <div class="card-header">
                <span class="card-title">Enforcement Workflows</span>
              </div>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <button class="btn btn-secondary" style="justify-content: flex-start;" id="btnNavRiskRadar">
                  <span class="material-symbols-outlined" style="font-size: 18px;">radar</span>
                  <span>Open Risk Radar Map</span>
                </button>
                <button class="btn btn-secondary" style="justify-content: flex-start;" id="btnNavBatchReports">
                  <span class="material-symbols-outlined" style="font-size: 18px;">analytics</span>
                  <span>Batch Intelligence &amp; Reports</span>
                </button>
                <button class="btn btn-secondary" style="justify-content: flex-start;" id="btnNavRegulatory">
                  <span class="material-symbols-outlined" style="font-size: 18px;">menu_book</span>
                  <span>Browse Legal Metrology Statutes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  attachEvents(app) {
    document.querySelectorAll('.btn-open-workspace').forEach(btn => {
      btn.onclick = () => {
        const caseId = btn.dataset.caseId;
        app.selectCase(caseId);
        app.navigate('/workspace');
      };
    });

    const newIntakeBtn = document.querySelector('#btnNewIntake');
    if (newIntakeBtn) newIntakeBtn.onclick = () => app.navigate('/intake');

    const quickSearchBtn = document.querySelector('#btnQuickSearch');
    if (quickSearchBtn) quickSearchBtn.onclick = () => app.navigate('/global-search');

    const riskRadarBtn = document.querySelector('#btnNavRiskRadar');
    if (riskRadarBtn) riskRadarBtn.onclick = () => app.navigate('/risk-radar');

    const batchReportsBtn = document.querySelector('#btnNavBatchReports');
    if (batchReportsBtn) batchReportsBtn.onclick = () => app.navigate('/batch-reports');

    const regulatoryBtn = document.querySelector('#btnNavRegulatory');
    if (regulatoryBtn) regulatoryBtn.onclick = () => app.navigate('/regulatory-intel');
  }
};
