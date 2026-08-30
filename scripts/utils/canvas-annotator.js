/* ==========================================================================
   CANVAS & PACKAGING EVIDENCE ANNOTATOR
   Provides interactive zoom, pan, bounding-box overlays and token inspectors.
   ========================================================================== */

export class CanvasAnnotator {
  constructor(containerEl, options = {}) {
    this.container = containerEl;
    this.options = Object.assign({
      onSelectFinding: null,
      initialZoom: 1
    }, options);

    this.zoom = this.options.initialZoom;
    this.panX = 0;
    this.panY = 0;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.findings = [];
    this.activeFindingId = null;

    this.render();
  }

  setData(imageSrc, findings) {
    this.imageSrc = imageSrc;
    this.findings = findings || [];
    this.render();
  }

  setZoom(newZoom) {
    this.zoom = Math.max(0.6, Math.min(3.0, newZoom));
    this.updateTransform();
  }

  zoomIn() {
    this.setZoom(this.zoom + 0.25);
  }

  zoomOut() {
    this.setZoom(this.zoom - 0.25);
  }

  resetView() {
    this.zoom = 1;
    this.panX = 0;
    this.panY = 0;
    this.updateTransform();
  }

  setActiveFinding(id) {
    this.activeFindingId = id;
    const stage = this.container.querySelector('.evidence-image-stage');
    if (!stage) return;

    stage.querySelectorAll('.bounding-box-overlay').forEach(el => {
      if (el.dataset.id === id) {
        el.style.boxShadow = '0 0 0 3px #ff5c35, 0 0 12px rgba(255, 92, 53, 0.6)';
      } else {
        el.style.boxShadow = 'none';
      }
    });
  }

  updateTransform() {
    const stage = this.container.querySelector('.evidence-image-stage');
    if (stage) {
      stage.style.transform = `translate(${this.panX}px, ${this.panY}px) scale(${this.zoom})`;
    }
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="canvas-toolbar">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 11px; font-family: var(--font-mono); font-weight: 700; color: var(--color-on-surface-variant);">
            VISUAL EVIDENCE WORKBENCH
          </span>
          <span class="badge badge-info">OCR LAYER ACTIVE</span>
        </div>
        <div style="display: flex; align-items: center; gap: 4px;">
          <button class="btn btn-outline btn-sm btn-icon-only" id="btnZoomOut" title="Zoom Out">
            <span class="material-symbols-outlined" style="font-size: 16px;">zoom_out</span>
          </button>
          <button class="btn btn-outline btn-sm btn-icon-only" id="btnResetZoom" title="Reset Fit">
            <span class="material-symbols-outlined" style="font-size: 16px;">fit_screen</span>
          </button>
          <button class="btn btn-outline btn-sm btn-icon-only" id="btnZoomIn" title="Zoom In">
            <span class="material-symbols-outlined" style="font-size: 16px;">zoom_in</span>
          </button>
        </div>
      </div>

      <div class="canvas-viewport" id="canvasViewport">
        <div class="evidence-image-stage" style="transform: translate(${this.panX}px, ${this.panY}px) scale(${this.zoom});">
          <img src="${this.imageSrc || 'assets/tea_sample_evidence.svg'}" alt="Packaging Label Evidence" style="display: block; width: 680px; height: auto; user-select: none;" draggable="false" />
          
          <!-- Bounding Boxes Layer -->
          <div class="bounding-boxes-layer" style="position: absolute; inset: 0;">
            ${this.findings.map(f => {
              const bbox = f.bbox || { x: 10, y: 10, w: 20, h: 10 };
              const isViol = f.type === 'VIOLATION';
              const isComp = f.type === 'COMPLIANT';
              const cls = isViol ? 'bounding-box-overlay' : (isComp ? 'bounding-box-overlay compliant' : 'bounding-box-overlay evidence');
              return `
                <div class="${cls}" data-id="${f.id}" style="left: ${bbox.x}%; top: ${bbox.y}%; width: ${bbox.w}%; height: ${bbox.h}%;">
                  <div class="bounding-tag">${f.boundingTag || f.id}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    const vp = this.container.querySelector('#canvasViewport');
    const zoomIn = this.container.querySelector('#btnZoomIn');
    const zoomOut = this.container.querySelector('#btnZoomOut');
    const resetZoom = this.container.querySelector('#btnResetZoom');

    if (zoomIn) zoomIn.onclick = () => this.zoomIn();
    if (zoomOut) zoomOut.onclick = () => this.zoomOut();
    if (resetZoom) resetZoom.onclick = () => this.resetView();

    // Mouse drag pan
    if (vp) {
      vp.onmousedown = (e) => {
        if (e.target.closest('.bounding-box-overlay')) return;
        this.isDragging = true;
        this.startX = e.clientX - this.panX;
        this.startY = e.clientY - this.panY;
      };

      window.addEventListener('mousemove', (e) => {
        if (!this.isDragging) return;
        this.panX = e.clientX - this.startX;
        this.panY = e.clientY - this.startY;
        this.updateTransform();
      });

      window.addEventListener('mouseup', () => {
        this.isDragging = false;
      });

      vp.onwheel = (e) => {
        e.preventDefault();
        if (e.deltaY < 0) this.zoomIn();
        else this.zoomOut();
      };
    }

    // Click on bounding box
    this.container.querySelectorAll('.bounding-box-overlay').forEach(el => {
      el.onclick = (e) => {
        e.stopPropagation();
        const id = el.dataset.id;
        this.setActiveFinding(id);
        if (this.options.onSelectFinding) {
          this.options.onSelectFinding(id);
        }
      };
    });
  }
}
