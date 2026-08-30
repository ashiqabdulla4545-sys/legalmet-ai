/* ==========================================================================
   VIEW 3: NEW INSPECTION INTAKE VIEW
   ========================================================================== */

export const IntakeView = {
  render(state) {
    const nextCaseNum = `LM-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    return `
      <div class="page-container">
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: var(--space-6);">
          <div>
            <div style="font-size: 11px; font-family: var(--font-mono); color: var(--color-on-surface-variant); text-transform: uppercase; letter-spacing: 0.05em;">
              INTAKE PROTOCOL • SECTION 18 LEGAL METROLOGY ACT
            </div>
            <h1 style="font-size: 26px; font-weight: 800; margin-top: 4px;">New Inspection Intake</h1>
          </div>
          <div style="display: flex; gap: var(--space-2);">
            <button class="btn btn-secondary btn-sm" id="btnCancelIntake">
              <span>Cancel</span>
            </button>
            <button class="btn btn-primary btn-sm" id="btnSaveDraft">
              <span class="material-symbols-outlined" style="font-size: 16px;">save</span>
              <span>Save Draft</span>
            </button>
          </div>
        </div>

        <!-- Quick Sample Presets -->
        <div style="margin-bottom: var(--space-4);">
          <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 8px; color: var(--color-on-surface-variant);">
            Load Metrology Sample Preset:
          </div>
          <div class="preset-selector-bar">
            <button class="preset-chip active" data-preset="tea">
              🍵 Darjeeling Tea (Dual MRP Anomaly)
            </button>
            <button class="preset-chip" data-preset="oil">
              🌻 Mustard Oil 1L (Dual Vol/Mass Declaration)
            </button>
            <button class="preset-chip" data-preset="protein">
              🍫 Protein Bar (1.2mm Numeral Font Defect)
            </button>
            <button class="preset-chip" data-preset="cosmetics">
              🧴 Radiance Serum (Missing Grievance Phone/Email)
            </button>
          </div>
        </div>

        <!-- Intake Form Layout -->
        <div class="intake-layout-grid">
          <!-- Left: Packaging Artwork / Photo Dropzone -->
          <div class="card" style="display: flex; flex-direction: column; gap: var(--space-4);">
            <div class="card-header">
              <span class="card-title">1. High-Resolution Packaging Evidence</span>
              <span class="badge badge-info">MULTI-ANGLE OCR</span>
            </div>

            <div class="dropzone" id="packagingDropzone">
              <span class="material-symbols-outlined" style="font-size: 48px; color: var(--color-on-surface-variant); margin-bottom: var(--space-2);">
                cloud_upload
              </span>
              <div style="font-weight: 700; font-size: 14px; margin-bottom: 4px;">
                Drag &amp; Drop High-Resolution Label / Packaging Image
              </div>
              <div style="font-size: 12px; color: var(--color-on-surface-variant); margin-bottom: var(--space-4);">
                Supports PNG, JPG, TIFF, Multi-page PDF artwork &amp; 3D packaging mesh
              </div>
              <button class="btn btn-secondary btn-sm" id="btnBrowseFiles" type="button">
                <span class="material-symbols-outlined" style="font-size: 16px;">folder_open</span>
                <span>Browse Files</span>
              </button>
            </div>

            <!-- Upload Preview Box -->
            <div id="uploadPreviewBox" style="display: flex; align-items: center; gap: 12px; padding: 12px; background-color: var(--color-surface-container-low); border: 1px solid var(--color-border); border-radius: var(--radius-sm);">
              <div style="width: 50px; height: 50px; background-color: #222; border-radius: var(--radius-xs); overflow: hidden; display: flex; align-items: center; justify-content: center;">
                <img id="previewImg" src="assets/tea_sample_evidence.svg" alt="Preview" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
              <div style="flex: 1;">
                <div style="font-weight: 700; font-size: 13px;" id="previewFilename">darjeeling_royal_gold_label_scan.svg</div>
                <div style="font-size: 11px; font-family: var(--font-mono); color: var(--color-on-surface-variant);">
                  Vector SVG • 600 DPI Equivalent • Color Space calibrated
                </div>
              </div>
              <span class="badge badge-compliant">VERIFIED</span>
            </div>
          </div>

          <!-- Right: Declarations Metadata Form -->
          <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div class="card-header">
                <span class="card-title">2. Consignment &amp; Declared Metadata</span>
                <span class="badge badge-neutral" id="caseIdTag">${nextCaseNum}</span>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3);">
                <div class="form-group">
                  <label class="form-label">CONSIGNMENT / CASE ID</label>
                  <input type="text" class="form-input mono" id="intakeCaseId" value="${nextCaseNum}" />
                </div>
                <div class="form-group">
                  <label class="form-label">COMMODITY CATEGORY</label>
                  <select class="form-select" id="intakeCommodity">
                    <option value="FMCG_TEA">Packaged Tea &amp; Coffee</option>
                    <option value="EDIBLE_OIL">Edible Oils &amp; Fats</option>
                    <option value="NUTRITION">Health &amp; Dietary Supplements</option>
                    <option value="COSMETICS">Cosmetics &amp; Personal Care</option>
                    <option value="SPICES">Spices &amp; Condiments</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">COMMODITY / PRODUCT TITLE</label>
                <input type="text" class="form-input" id="intakeTitle" value="Darjeeling Royal Gold Tea (500 g)" />
              </div>

              <div class="form-group">
                <label class="form-label">MANUFACTURER / PACKER NAME</label>
                <input type="text" class="form-input" id="intakeManufacturer" value="Himalayan Brews &amp; Tea Estates Ltd." />
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3);">
                <div class="form-group">
                  <label class="form-label">DECLARED NET QUANTITY</label>
                  <input type="text" class="form-input mono" id="intakeNetQty" value="500 g" />
                </div>
                <div class="form-group">
                  <label class="form-label">DECLARED RETAIL MRP (₹)</label>
                  <input type="text" class="form-input mono" id="intakeMrp" value="₹ 420.00" />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">BATCH NUMBER &amp; PACKAGING DATE</label>
                <input type="text" class="form-input mono" id="intakeBatch" value="HB-2026-B09 | PKG: 02/2026" />
              </div>
            </div>

            <!-- Action Buttons -->
            <div style="padding-top: var(--space-4); border-top: 1px solid var(--color-border); display: flex; justify-content: flex-end; gap: var(--space-3);">
              <button class="btn btn-primary btn-lg" id="btnStartPipeline" style="width: 100%;">
                <span class="material-symbols-outlined" style="font-size: 20px;">neurology</span>
                <span>START AI PERCEPTION &amp; RULE AUDIT</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  attachEvents(app) {
    const presets = {
      tea: {
        title: "Darjeeling Royal Gold Tea (500 g)",
        commodity: "FMCG_TEA",
        manufacturer: "Himalayan Brews & Tea Estates Ltd.",
        netQty: "500 g",
        mrp: "₹ 420.00",
        batch: "HB-2026-B09 | PKG: 02/2026",
        img: "assets/tea_sample_evidence.svg",
        filename: "darjeeling_royal_gold_label_scan.svg",
        caseId: "LM-2026-8841"
      },
      oil: {
        title: "Kisan Pure Mustard Oil (1 L)",
        commodity: "EDIBLE_OIL",
        manufacturer: "Bharat Agro Foods Pvt Ltd",
        netQty: "1 L (910 g at 30°C)",
        mrp: "₹ 165.00",
        batch: "BAF-2026-08M | PKG: 08/2026",
        img: "assets/oil_sample_evidence.svg",
        filename: "kisan_mustard_oil_pouch_scan.svg",
        caseId: "LM-2026-8842"
      },
      protein: {
        title: "Apex Hydro Protein Bar (75 g)",
        commodity: "NUTRITION",
        manufacturer: "Apex Health Nutrition India Ltd",
        netQty: "75 g",
        mrp: "₹ 120.00",
        batch: "APX-PRO-774 | PKG: 07/2026",
        img: "assets/tea_sample_evidence.svg",
        filename: "apex_protein_wrapper.svg",
        caseId: "LM-2026-8843"
      },
      cosmetics: {
        title: "GlowEssence Radiance Serum (30 ml)",
        commodity: "COSMETICS",
        manufacturer: "Luxe Botanicals Pvt Ltd",
        netQty: "30 ml",
        mrp: "₹ 899.00",
        batch: "LB-SER-902 | PKG: 06/2026",
        img: "assets/oil_sample_evidence.svg",
        filename: "glow_essence_outer_box.svg",
        caseId: "LM-2026-8844"
      }
    };

    document.querySelectorAll('.preset-chip').forEach(chip => {
      chip.onclick = () => {
        document.querySelectorAll('.preset-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const key = chip.dataset.preset;
        const p = presets[key];
        if (!p) return;

        document.querySelector('#intakeTitle').value = p.title;
        document.querySelector('#intakeCommodity').value = p.commodity;
        document.querySelector('#intakeManufacturer').value = p.manufacturer;
        document.querySelector('#intakeNetQty').value = p.netQty;
        document.querySelector('#intakeMrp').value = p.mrp;
        document.querySelector('#intakeBatch').value = p.batch;
        document.querySelector('#previewImg').src = p.img;
        document.querySelector('#previewFilename').textContent = p.filename;

        app.showToast(`Loaded preset: ${p.title}`, 'info');
      };
    });

    const startBtn = document.querySelector('#btnStartPipeline');
    if (startBtn) {
      startBtn.onclick = () => {
        app.showToast('Initiating Metrology Vision Pipeline...', 'info');
        app.navigate('/ai-status');
      };
    }

    const cancelBtn = document.querySelector('#btnCancelIntake');
    if (cancelBtn) cancelBtn.onclick = () => app.navigate('/command-center');

    const saveDraftBtn = document.querySelector('#btnSaveDraft');
    if (saveDraftBtn) {
      saveDraftBtn.onclick = () => {
        app.showToast('Intake draft saved locally.', 'success');
      };
    }
  }
};
