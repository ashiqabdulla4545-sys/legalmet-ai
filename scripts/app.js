/* ==========================================================================
   LEGALMET AI - MAIN APPLICATION BOOTSTRAP, ROUTER & STATE STORE
   ========================================================================== */

import { MockData } from './mock-data.js';
import { CertificateGenerator } from './utils/certificate-generator.js';

import { LoginView } from './views/login-view.js';
import { CommandCenterView } from './views/command-center-view.js';
import { IntakeView } from './views/intake-view.js';
import { AiStatusView } from './views/ai-status-view.js';
import { WorkspaceView } from './views/workspace-view.js';
import { EvidenceWhyView } from './views/evidence-why-view.js';
import { BatchReportsView } from './views/batch-reports-view.js';
import { AuditTrailView } from './views/audit-trail-view.js';
import { RegulatoryIntelView } from './views/regulatory-intel-view.js';
import { RiskRadarView } from './views/risk-radar-view.js';
import { GlobalSearchView } from './views/global-search-view.js';
import { SystemHealthView } from './views/system-health-view.js';
import { PrototypeOverviewView } from './views/prototype-overview-view.js';

class LegalMetApp {
  constructor() {
    this.state = {
      currentPath: window.location.hash.slice(1) || '/command-center',
      currentCase: MockData.cases[0],
      data: MockData,
      theme: 'light',
      sidebarOpen: false
    };

    this.routes = {
      '/login': LoginView,
      '/command-center': CommandCenterView,
      '/intake': IntakeView,
      '/ai-status': AiStatusView,
      '/workspace': WorkspaceView,
      '/evidence-why': EvidenceWhyView,
      '/batch-reports': BatchReportsView,
      '/audit-trail': AuditTrailView,
      '/regulatory-intel': RegulatoryIntelView,
      '/risk-radar': RiskRadarView,
      '/global-search': GlobalSearchView,
      '/system-health': SystemHealthView,
      '/overview': PrototypeOverviewView
    };

    this.init();
  }

  init() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1) || '/command-center';
      this.navigate(hash, false);
    });

    // Global keyboard shortcuts (Ctrl+K or / opens Global Search)
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.navigate('/global-search');
      } else if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        this.navigate('/global-search');
      }
    });

    this.attachGlobalShellEvents();
    this.render();
  }

  navigate(path, updateHash = true) {
    if (!this.routes[path]) {
      path = '/command-center';
    }
    this.state.currentPath = path;
    if (updateHash) {
      window.location.hash = path;
    }
    this.state.sidebarOpen = false;
    this.render();
  }

  selectCase(caseId) {
    const found = this.state.data.cases.find(c => c.id === caseId);
    if (found) {
      this.state.currentCase = found;
    }
  }

  showToast(message, type = 'info') {
    let container = document.querySelector('#toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    
    let icon = 'info';
    if (type === 'success') icon = 'check_circle';
    if (type === 'error') icon = 'warning';

    toast.innerHTML = `
      <span class="material-symbols-outlined" style="font-size: 18px; color: ${type === 'success' ? '#107c10' : (type === 'error' ? '#d13438' : '#0078d4')};">${icon}</span>
      <span style="flex: 1;">${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  openCertificateModal(caseData) {
    const modalBackdrop = document.querySelector('#certModalBackdrop');
    const modalContent = document.querySelector('#certModalContent');
    if (!modalBackdrop || !modalContent) return;

    modalContent.innerHTML = CertificateGenerator.generateCertificateHTML(caseData, this.state.data.inspector);
    modalBackdrop.classList.add('active');

    const printBtn = document.querySelector('#btnModalPrintCert');
    if (printBtn) printBtn.onclick = () => window.print();

    const jsonBtn = document.querySelector('#btnModalJsonCert');
    if (jsonBtn) jsonBtn.onclick = () => CertificateGenerator.downloadJSON(caseData);

    const closeBtn = document.querySelector('#btnModalCloseCert');
    if (closeBtn) closeBtn.onclick = () => modalBackdrop.classList.remove('active');
  }

  updateHeaderProfile() {
    const nameEl = document.querySelector('#sidebarInspectorName');
    if (nameEl) nameEl.textContent = this.state.data.inspector.name;
  }

  attachGlobalShellEvents() {
    // Mobile menu drawer
    const menuBtn = document.querySelector('#mobileMenuBtn');
    const sidebar = document.querySelector('#appSidebar');
    const backdrop = document.querySelector('#sidebarBackdrop');

    if (menuBtn && sidebar && backdrop) {
      menuBtn.onclick = () => {
        sidebar.classList.toggle('open');
        backdrop.classList.toggle('open');
      };
      backdrop.onclick = () => {
        sidebar.classList.remove('open');
        backdrop.classList.remove('open');
      };
    }

    // Topbar Omnibar Trigger
    const topbarSearch = document.querySelector('#topbarSearchTrigger');
    if (topbarSearch) {
      topbarSearch.onclick = () => this.navigate('/global-search');
    }

    // Modal Close Backdrop Click
    const modalBackdrop = document.querySelector('#certModalBackdrop');
    if (modalBackdrop) {
      modalBackdrop.onclick = (e) => {
        if (e.target === modalBackdrop) {
          modalBackdrop.classList.remove('active');
        }
      };
    }
  }

  render() {
    const path = this.state.currentPath;
    const view = this.routes[path] || CommandCenterView;
    const mainViewContainer = document.querySelector('#mainViewContainer');
    const appSidebar = document.querySelector('#appSidebar');
    const appTopbar = document.querySelector('#appTopbar');

    // Handle Login view (full screen without sidebar)
    if (path === '/login') {
      if (appSidebar) appSidebar.style.display = 'none';
      if (appTopbar) appTopbar.style.display = 'none';
      if (mainViewContainer) {
        mainViewContainer.innerHTML = view.render(this.state);
        view.attachEvents(this);
      }
      return;
    } else {
      if (appSidebar) appSidebar.style.display = 'flex';
      if (appTopbar) appTopbar.style.display = 'flex';
    }

    // Update active nav button
    document.querySelectorAll('.nav-item-btn').forEach(btn => {
      const btnPath = btn.dataset.path;
      if (btnPath === path) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
      btn.onclick = () => {
        const p = btn.dataset.path;
        if (p) this.navigate(p);
      };
    });

    // Update breadcrumb
    const breadcrumbEl = document.querySelector('#breadcrumbCurrent');
    if (breadcrumbEl) {
      const titleMap = {
        '/command-center': 'Command Center',
        '/intake': 'New Inspection Intake',
        '/ai-status': 'AI Processing Pipeline',
        '/workspace': 'Inspection Workspace',
        '/evidence-why': 'Evidence Traceability (WHY?)',
        '/batch-reports': 'Batch Intelligence & Reports',
        '/audit-trail': 'Audit Trail & Provenance',
        '/regulatory-intel': 'Regulatory Library',
        '/risk-radar': 'Risk Radar Heatmap',
        '/global-search': 'Global Intelligence Search',
        '/system-health': 'System Health & Settings',
        '/overview': 'Prototype Overview'
      };
      breadcrumbEl.textContent = titleMap[path] || 'Workstation';
    }

    // Render current view
    if (mainViewContainer) {
      mainViewContainer.innerHTML = view.render(this.state);
      view.attachEvents(this);
    }
  }
}

// Bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.legalMetApp = new LegalMetApp();
});
