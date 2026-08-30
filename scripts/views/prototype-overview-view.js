/* ==========================================================================
   VIEW 13: PROTOTYPE ARCHITECTURE & SYSTEM OVERVIEW
   ========================================================================== */

export const PrototypeOverviewView = {
  render(state) {
    const screens = [
      { path: '/login', title: '1. Inspector Login', desc: 'Secure biometric & jurisdiction gateway', icon: 'lock' },
      { path: '/command-center', title: '2. Command Center', desc: 'Compliance KPIs & active review queue', icon: 'dashboard' },
      { path: '/intake', title: '3. New Inspection Intake', desc: 'Packaging dropzone & preset loader', icon: 'add_box' },
      { path: '/ai-status', title: '4. AI Pipeline Status', desc: 'Live OCR & rule engine execution tracker', icon: 'neurology' },
      { path: '/workspace', title: '5. Inspection Workspace', desc: 'Split-view workstation with packaging canvas', icon: 'splitscreen' },
      { path: '/evidence-why', title: '6. Evidence Traceability (WHY?)', desc: 'XAI token provenance & penalty matrix', icon: 'help_center' },
      { path: '/batch-reports', title: '7. Batch Intelligence & Reports', desc: 'Aggregated analytics & certificate generator', icon: 'analytics' },
      { path: '/audit-trail', title: '8. Audit Trail Ledger', desc: 'Immutable SHA-256 tamper-evident chain', icon: 'history' },
      { path: '/regulatory-intel', title: '9. Regulatory Library', desc: 'LM Act, PCR 2011 & Font height calculator', icon: 'menu_book' },
      { path: '/risk-radar', title: '10. Risk Radar Heatmap', desc: 'Geographic surveillance & high-risk hubs', icon: 'radar' },
      { path: '/global-search', title: '11. Global Omnibar Search', desc: 'Universal multi-entity search (Ctrl+K)', icon: 'search' },
      { path: '/system-health', title: '12. System Health & Settings', desc: 'Perception telemetry & RBAC credentials', icon: 'settings' }
    ];

    return `
      <div class="page-container">
        <!-- Header -->
        <div style="text-align: center; max-width: 760px; margin: 0 auto var(--space-8);">
          <span class="badge badge-info" style="margin-bottom: 8px;">STITCH MCP ARCHITECTURE</span>
          <h1 style="font-size: 32px; font-weight: 800; letter-spacing: -0.03em;">LegalMet AI: Compliance Station</h1>
          <p style="font-size: 14px; color: var(--color-on-surface-variant); margin-top: 8px; line-height: 1.6;">
            A complete, high-fidelity regulatory tech workstation engineered for Legal Metrology officers, state packaging inspectors, and compliance adjudicators.
          </p>
        </div>

        <!-- 3-Column Screen Navigator Grid -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4); margin-bottom: var(--space-8);">
          ${screens.map(s => `
            <div class="card screen-nav-card" data-path="${s.path}" style="cursor: pointer; transition: transform var(--transition-fast), border-color var(--transition-fast);">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                <div style="width: 36px; height: 36px; border-radius: var(--radius-sm); background-color: var(--color-surface-container); display: flex; align-items: center; justify-content: center;">
                  <span class="material-symbols-outlined" style="font-size: 20px; color: var(--color-primary);">${s.icon}</span>
                </div>
                <div>
                  <h3 style="font-size: 14px; font-weight: 700;">${s.title}</h3>
                  <div style="font-size: 10px; font-family: var(--font-mono); color: var(--color-on-surface-variant);">${s.path}</div>
                </div>
              </div>
              <p style="font-size: 12px; color: var(--color-on-surface-variant); line-height: 1.4;">${s.desc}</p>
            </div>
          `).join('')}
        </div>

        <!-- Design Principles Card -->
        <div class="card" style="background-color: var(--color-surface-container-low);">
          <div class="card-header">
            <span class="card-title">Core Metrological Design Philosophy</span>
            <span class="badge badge-compliant">LEGALMET CORE</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4); font-size: 12px;">
            <div>
              <strong style="display: block; margin-bottom: 2px; color: var(--color-primary);">1. AI Assists, Evidence Explains</strong>
              Visual bounding boxes, OCR layer decomposition, and token attention graphs ensure zero black-box obscurity.
            </div>
            <div>
              <strong style="display: block; margin-bottom: 2px; color: var(--color-primary);">2. Inspector Decides</strong>
              Full manual override, field justification logging, and tamper-evident SHA-256 state hashes maintain human accountability.
            </div>
            <div>
              <strong style="display: block; margin-bottom: 2px; color: var(--color-primary);">3. Statutory Precision</strong>
              Direct deterministic cross-referencing with the Legal Metrology Act 2009 and Packaged Commodities Rules 2011.
            </div>
          </div>
        </div>
      </div>
    `;
  },

  attachEvents(app) {
    document.querySelectorAll('.screen-nav-card').forEach(card => {
      card.onclick = () => {
        const path = card.dataset.path;
        app.navigate(path);
      };
      card.onmouseenter = () => {
        card.style.transform = 'translateY(-2px)';
        card.style.borderColor = 'var(--color-primary)';
      };
      card.onmouseleave = () => {
        card.style.transform = 'translateY(0)';
        card.style.borderColor = 'var(--color-border)';
      };
    });
  }
};
