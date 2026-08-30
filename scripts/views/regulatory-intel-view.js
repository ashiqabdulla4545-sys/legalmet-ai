/* ==========================================================================
   VIEW 9: REGULATORY INTELLIGENCE (LEGAL STATUTES & RULE ENGINE)
   ========================================================================== */

export const RegulatoryIntelView = {
  render(state) {
    const statutes = state.data.statutes;

    return `
      <div class="page-container">
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: var(--space-6);">
          <div>
            <div style="font-size: 11px; font-family: var(--font-mono); color: var(--color-on-surface-variant); text-transform: uppercase; letter-spacing: 0.05em;">
              STATUTORY REPOSITORY • LEGAL METROLOGY ACT, 2009 &amp; PCR 2011
            </div>
            <h1 style="font-size: 26px; font-weight: 800; margin-top: 4px;">Regulatory Library &amp; Statutes</h1>
          </div>

          <div style="display: flex; gap: var(--space-2);">
            <button class="btn btn-primary btn-sm" id="btnBrowseRules">
              <span class="material-symbols-outlined" style="font-size: 16px;">library_books</span>
              <span>All 24 Enactments</span>
            </button>
          </div>
        </div>

        <!-- 2-Column Layout: Statute Browser + Interactive Font Height Calculator -->
        <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: var(--space-6);">
          <!-- Left: Searchable Statutes & Rules List -->
          <div>
            <div class="card" style="margin-bottom: var(--space-4); padding: var(--space-3) var(--space-4);">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="material-symbols-outlined" style="font-size: 18px; color: var(--color-on-surface-variant);">search</span>
                <input type="text" class="form-input" id="ruleSearchInput" placeholder="Search legal sections, clauses, 'Dual MRP', 'Rule 6(1)', 'Schedule II'..." style="border: none; padding: 4px 0;" />
              </div>
            </div>

            <div style="display: flex; flex-direction: column; gap: var(--space-4);" id="statutesContainer">
              ${statutes.map(s => `
                <div class="card">
                  <div class="card-header">
                    <div>
                      <div style="font-size: 10px; font-family: var(--font-mono); color: var(--color-on-surface-variant);">${s.actNo} • Enacted ${s.enacted}</div>
                      <div style="font-size: 15px; font-weight: 800; margin-top: 2px;">${s.name}</div>
                    </div>
                    <span class="badge badge-info">${s.sections.length} KEY CLAUSES</span>
                  </div>

                  <div style="display: flex; flex-direction: column; gap: var(--space-3);">
                    ${s.sections.map(sec => `
                      <div style="background-color: var(--color-surface-container-low); padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--color-border);">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                          <span style="font-weight: 700; font-size: 13px; color: var(--color-primary);">${sec.sec}: ${sec.title}</span>
                          <span class="badge badge-neutral">STATUTORY</span>
                        </div>
                        <p style="font-size: 12px; color: var(--color-on-surface); line-height: 1.5;">
                          ${sec.summary}
                        </p>
                      </div>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Right: Interactive Schedule II Font Height Calculator -->
          <div style="display: flex; flex-direction: column; gap: var(--space-4);">
            <div class="card">
              <div class="card-header">
                <span class="card-title">Schedule II Font Height Calculator</span>
                <span class="badge badge-compliant">PCR 2011</span>
              </div>

              <p style="font-size: 12px; color: var(--color-on-surface-variant); margin-bottom: var(--space-3);">
                Determine mandatory minimum numeral and letter heights based on Principal Display Panel (PDP) surface area.
              </p>

              <div class="form-group">
                <label class="form-label">PRINCIPAL DISPLAY PANEL AREA (A)</label>
                <select class="form-select" id="calcAreaSelect">
                  <option value="50">A ≤ 50 cm² (Small sachet / candy)</option>
                  <option value="200" selected>50 cm² &lt; A ≤ 200 cm² (Standard 500g pouch / bar)</option>
                  <option value="1000">200 cm² &lt; A ≤ 1000 cm² (Large 1kg box / bottle)</option>
                  <option value="5000">A &gt; 1000 cm² (Bulk container / carton)</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">PACKAGING MANUFACTURE TECHNIQUE</label>
                <select class="form-select" id="calcTypeSelect">
                  <option value="printed" selected>Standard Printed Label / Wrapper</option>
                  <option value="blown">Blown / Formed Glass / Plastic Mould</option>
                  <option value="embossed">Embossed Metal Can / Container</option>
                </select>
              </div>

              <div style="background-color: var(--color-surface-container); padding: 16px; border-radius: var(--radius-sm); border: 1px solid var(--color-border); text-align: center; margin-top: var(--space-2);">
                <div style="font-size: 11px; font-family: var(--font-mono); color: var(--color-on-surface-variant);">MANDATORY MINIMUM HEIGHT:</div>
                <div style="font-size: 32px; font-weight: 800; font-family: var(--font-headline); color: var(--color-brand-accent); margin: 4px 0;" id="calcResultHeight">
                  2.0 mm
                </div>
                <div style="font-size: 11px; color: #555;" id="calcRuleCitation">
                  Schedule II, Table 1 • Minimum height for standard printed numerals.
                </div>
              </div>
            </div>

            <!-- Precedent & Case Law Note -->
            <div class="card">
              <div class="card-header">
                <span class="card-title">Supreme Court Precedent Note</span>
              </div>
              <div style="font-size: 12px; color: var(--color-on-surface); line-height: 1.5;">
                <strong>Civil Appeal No. 2147/2021:</strong> Dual MRP stickers affixed by retailers without manufacturer consent violate Section 18 of the Legal Metrology Act and attract Section 36(1) penal liability against both retailer and distributor.
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  attachEvents(app) {
    const areaSelect = document.querySelector('#calcAreaSelect');
    const typeSelect = document.querySelector('#calcTypeSelect');
    const resHeight = document.querySelector('#calcResultHeight');

    const updateCalc = () => {
      const area = parseInt(areaSelect.value);
      const type = typeSelect.value;
      let minMm = 2.0;

      if (area <= 50) {
        minMm = type === 'printed' ? 1.0 : 2.0;
      } else if (area <= 200) {
        minMm = type === 'printed' ? 2.0 : 4.0;
      } else if (area <= 1000) {
        minMm = type === 'printed' ? 4.0 : 6.0;
      } else {
        minMm = 6.0;
      }

      if (resHeight) resHeight.textContent = `${minMm.toFixed(1)} mm`;
    };

    if (areaSelect) areaSelect.onchange = updateCalc;
    if (typeSelect) typeSelect.onchange = updateCalc;

    const searchInput = document.querySelector('#ruleSearchInput');
    if (searchInput) {
      searchInput.oninput = (e) => {
        const q = e.target.value.toLowerCase();
        document.querySelectorAll('#statutesContainer .card').forEach(card => {
          const text = card.textContent.toLowerCase();
          card.style.display = text.includes(q) ? 'block' : 'none';
        });
      };
    }
  }
};
