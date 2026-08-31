/* ==========================================================================
   VIEW 10: RISK RADAR & DECISION SUPPORT VIEW
   ========================================================================== */

export const RiskRadarView = {
  render(state) {
    const radar = state.data.riskRadarData;

    return `
      <div class="page-container">
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: var(--space-6);">
          <div>
            <div style="font-size: 11px; font-family: var(--font-mono); color: var(--color-on-surface-variant); text-transform: uppercase; letter-spacing: 0.05em;">
              GEOGRAPHIC SURVEILLANCE &amp; PREDICTIVE RISK TRIAGE
            </div>
            <h1 style="font-size: 26px; font-weight: 800; margin-top: 4px;">Risk Radar Dashboard</h1>
          </div>

          <div style="display: flex; gap: var(--space-2);">
            <button class="btn btn-accent btn-sm" id="btnPlanRaid">
              <span class="material-symbols-outlined" style="font-size: 16px;">crisis_alert</span>
              <span>Deploy Inspection Squad</span>
            </button>
          </div>
        </div>

        <!-- 2-Column Layout -->
        <div class="radar-layout-grid">
          <!-- Left: Heatmap Canvas Simulation -->
          <div class="card">
            <div class="card-header">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="material-symbols-outlined" style="font-size: 20px;">radar</span>
                <span class="card-title">Metrology Enforcement Hotspot Map</span>
              </div>
              <span class="badge badge-violation">3 HIGH RISK HUBS</span>
            </div>

            <div class="heatmap-canvas-container" style="background: radial-gradient(circle at 40% 40%, rgba(209, 52, 56, 0.18), transparent 45%), radial-gradient(circle at 75% 65%, rgba(255, 92, 53, 0.15), transparent 40%), #1a1b19; border-radius: var(--radius-sm); display: flex; flex-direction: column; justify-content: space-between; padding: var(--space-4);">
              <div style="display: flex; justify-content: space-between; color: #fff;">
                <span style="font-size: 11px; font-family: var(--font-mono); color: #888;">GEO-COORDINATES: DELHI-NCR (28.6139° N, 77.2090° E)</span>
                <span class="badge badge-violation">LIVE TRACKING</span>
              </div>

              <!-- Hotspot Markers Overlay -->
              <div style="position: relative; height: 260px;">
                <!-- Hotspot 1: Azadpur -->
                <div style="position: absolute; top: 25%; left: 35%; transform: translate(-50%, -50%); text-align: center;">
                  <div style="width: 28px; height: 28px; border-radius: 50%; background-color: var(--color-status-violation); animation: pulseDot 1.2s infinite; margin: 0 auto; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 11px; font-weight: 800;">
                    88
                  </div>
                  <div style="color: #fff; font-size: 10px; font-weight: 700; text-shadow: 0 1px 4px #000; margin-top: 4px;">
                    Azadpur Mandi
                  </div>
                </div>

                <!-- Hotspot 2: Okhla Hub -->
                <div style="position: absolute; top: 65%; left: 70%; transform: translate(-50%, -50%); text-align: center;">
                  <div style="width: 24px; height: 24px; border-radius: 50%; background-color: var(--color-brand-accent); animation: pulseDot 1.6s infinite; margin: 0 auto; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 10px; font-weight: 800;">
                    64
                  </div>
                  <div style="color: #fff; font-size: 10px; font-weight: 700; text-shadow: 0 1px 4px #000; margin-top: 4px;">
                    Okhla Phase-III
                  </div>
                </div>

                <!-- Hotspot 3: Narela -->
                <div style="position: absolute; top: 20%; left: 65%; transform: translate(-50%, -50%); text-align: center;">
                  <div style="width: 22px; height: 22px; border-radius: 50%; background-color: var(--color-brand-accent); animation: pulseDot 1.8s infinite; margin: 0 auto; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 10px; font-weight: 800;">
                    58
                  </div>
                  <div style="color: #fff; font-size: 10px; font-weight: 700; text-shadow: 0 1px 4px #000; margin-top: 4px;">
                    Narela Ind. Area
                  </div>
                </div>

                <!-- Hotspot 4: South Delhi (Low Risk) -->
                <div style="position: absolute; top: 75%; left: 40%; transform: translate(-50%, -50%); text-align: center;">
                  <div style="width: 18px; height: 18px; border-radius: 50%; background-color: var(--color-status-compliant); margin: 0 auto; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 9px; font-weight: 800;">
                    12
                  </div>
                  <div style="color: #ccc; font-size: 9px; font-weight: 600; text-shadow: 0 1px 4px #000; margin-top: 4px;">
                    South Delhi Malls
                  </div>
                </div>
              </div>

              <div style="display: flex; justify-content: space-between; font-size: 10px; font-family: var(--font-mono); color: #aaa;">
                <span>Density Filter: Violations &gt; 50/sq.km</span>
                <span>Spatial Confidence: 99.4%</span>
              </div>
            </div>
          </div>

          <!-- Right: High-Risk Commodity & Zone Leaderboard -->
          <div style="display: flex; flex-direction: column; gap: var(--space-4);">
            <!-- High Risk Categories -->
            <div class="card">
              <div class="card-header">
                <span class="card-title">High-Risk Commodity Watchlist</span>
                <span class="badge badge-violation">SURVEILLANCE</span>
              </div>

              <div style="display: flex; flex-direction: column; gap: var(--space-3);">
                ${radar.highRiskCommodities.map(c => `
                  <div style="background-color: var(--color-surface-container-low); padding: 10px 12px; border-radius: var(--radius-sm); border-left: 3px solid ${c.riskPct > 70 ? 'var(--color-status-violation)' : 'var(--color-brand-accent)'};">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span style="font-weight: 700; font-size: 13px;">${c.name}</span>
                      <span class="mono" style="font-weight: 800; color: ${c.riskPct > 70 ? 'var(--color-status-violation)' : 'var(--color-brand-accent)'};">
                        ${c.riskPct}% Risk
                      </span>
                    </div>
                    <div style="font-size: 11px; color: var(--color-on-surface-variant); margin-top: 2px;">
                      Dominant Defect: ${c.issue}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Jurisdictional Zones List -->
            <div class="card">
              <div class="card-header">
                <span class="card-title">Zone Priority Triage</span>
              </div>

              <div class="data-table-container" style="border: none;">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Zone Name</th>
                      <th>Violations</th>
                      <th>Risk</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${radar.zones.map(z => `
                      <tr>
                        <td style="font-weight: 600; font-size: 12px;">${z.name}</td>
                        <td class="mono" style="font-weight: 700;">${z.violations}</td>
                        <td>
                          <span class="badge ${z.risk === 'CRITICAL' ? 'badge-violation' : (z.risk === 'HIGH' ? 'badge-review' : 'badge-compliant')}">
                            ${z.risk}
                          </span>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  attachEvents(app) {
    const raidBtn = document.querySelector('#btnPlanRaid');
    if (raidBtn) {
      raidBtn.onclick = async () => {
        try {
          if (app.api && app.state.backendConnected) {
            await app.api.deploySquad('Z-01', 'Inspection Squadron 04 (Mobile OCR Unit)');
          }
        } catch (e) {
          console.log('Squad deploy notice:', e);
        }
        app.showToast('Inspection Squadron 04 dispatched to Azadpur Mandi with mobile OCR scanner kits.', 'success');
      };
    }
  }
};
