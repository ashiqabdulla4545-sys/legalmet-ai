/* ==========================================================================
   VIEW 11: GLOBAL INTELLIGENCE SEARCH VIEW
   ========================================================================== */

export const GlobalSearchView = {
  render(state) {
    const cases = state.data.cases;

    return `
      <div class="page-container">
        <!-- Header -->
        <div class="search-hero-box">
          <div style="font-size: 11px; font-family: var(--font-mono); color: var(--color-on-surface-variant); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">
            UNIVERSAL METROLOGY INTELLIGENCE OMNIBAR
          </div>
          <h1 style="font-size: 26px; font-weight: 800; margin-bottom: var(--space-4);">Global Metrology Search</h1>

          <div style="position: relative;">
            <input type="text" class="search-input-large" id="globalOmnibarInput" placeholder="Search case ID, commodity, 'Dual MRP', manufacturer, barcode (EAN-13), or statute clause..." autofocus />
            <div style="position: absolute; right: 16px; top: 50%; transform: translateY(-50%); display: flex; align-items: center; gap: 8px;">
              <span class="kbd-shortcut">ESC TO CLEAR</span>
            </div>
          </div>
        </div>

        <!-- Filter Tags -->
        <div style="display: flex; gap: var(--space-2); margin-bottom: var(--space-6); flex-wrap: wrap;">
          <button class="preset-chip active" data-filter="all">All Entities</button>
          <button class="preset-chip" data-filter="violations">Violations Only</button>
          <button class="preset-chip" data-filter="fmcg">FMCG / Tea &amp; Spices</button>
          <button class="preset-chip" data-filter="oils">Edible Oils</button>
          <button class="preset-chip" data-filter="pharma">Health &amp; Cosmetics</button>
        </div>

        <!-- Search Results Stream -->
        <div style="display: flex; flex-direction: column; gap: var(--space-4);" id="searchResultsContainer">
          ${cases.map(c => `
            <div class="card search-result-item" data-case-id="${c.id}" data-category="${c.commodity}" data-status="${c.status}">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span class="material-symbols-outlined" style="font-size: 20px; color: var(--color-on-surface-variant);">inventory_2</span>
                  <div>
                    <h3 style="font-size: 15px; font-weight: 800;">${c.title}</h3>
                    <div style="font-size: 11px; font-family: var(--font-mono); color: var(--color-on-surface-variant);">
                      Case Ref: <strong>${c.id}</strong> • Packer: ${c.manufacturer} • Batch: ${c.batchNo}
                    </div>
                  </div>
                </div>

                <div style="display: flex; align-items: center; gap: var(--space-3);">
                  <span class="badge ${c.status === 'VIOLATION' ? 'badge-violation' : (c.status === 'COMPLIANT' ? 'badge-compliant' : 'badge-review')}">
                    ${c.status}
                  </span>
                  <button class="btn btn-primary btn-sm btn-open-search-case" data-case-id="${c.id}">
                    <span>Open Workstation</span>
                    <span class="material-symbols-outlined" style="font-size: 14px;">arrow_forward</span>
                  </button>
                </div>
              </div>

              <div style="font-size: 13px; color: var(--color-on-surface); line-height: 1.5; background-color: var(--color-surface-container-low); padding: 10px 12px; border-radius: var(--radius-sm); margin-bottom: 8px;">
                ${c.summary}
              </div>

              <div style="display: flex; gap: var(--space-4); font-size: 11px; font-family: var(--font-mono); color: var(--color-on-surface-variant);">
                <span>Declared Qty: <strong>${c.declaredNetQty}</strong></span>
                <span>MRP: <strong>${c.declaredMrp}</strong></span>
                <span>Unit Sale Price: <strong>${c.unitSalePrice}</strong></span>
                <span>Intake: <strong>${c.dateIntake}</strong></span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  attachEvents(app) {
    const input = document.querySelector('#globalOmnibarInput');
    if (input) {
      input.oninput = (e) => {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll('.search-result-item').forEach(item => {
          const text = item.textContent.toLowerCase();
          item.style.display = text.includes(query) ? 'block' : 'none';
        });
      };

      input.onkeydown = (e) => {
        if (e.key === 'Escape') {
          input.value = '';
          input.dispatchEvent(new Event('input'));
        }
      };
    }

    document.querySelectorAll('.btn-open-search-case').forEach(btn => {
      btn.onclick = () => {
        const caseId = btn.dataset.caseId;
        app.selectCase(caseId);
        app.navigate('/workspace');
      };
    });

    document.querySelectorAll('.preset-chip').forEach(chip => {
      chip.onclick = () => {
        document.querySelectorAll('.preset-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const filter = chip.dataset.filter;
        document.querySelectorAll('.search-result-item').forEach(item => {
          if (filter === 'all') {
            item.style.display = 'block';
          } else if (filter === 'violations') {
            item.style.display = item.dataset.status === 'VIOLATION' ? 'block' : 'none';
          } else {
            item.style.display = 'block';
          }
        });
      };
    });
  }
};
