/* ==============================================================================
   LEGALMET AI - ASYNC API CLIENT FOR FASTAPI BACKEND
   Communicates with http://127.0.0.1:8000 with offline resilient fallback.
   ============================================================================== */

export class ApiClient {
  constructor(baseUrl = "http://127.0.0.1:8000") {
    this.baseUrl = baseUrl;
    this.isBackendOnline = false;
    this.checkHealth();
  }

  async checkHealth() {
    try {
      const res = await fetch(`${this.baseUrl}/health`, { method: 'GET', mode: 'cors' });
      this.isBackendOnline = res.ok;
    } catch {
      this.isBackendOnline = false;
    }
    return this.isBackendOnline;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    try {
      const res = await fetch(url, {
        ...options,
        headers: { ...defaultHeaders, ...(options.headers || {}) }
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`API Error ${res.status}: ${errorText}`);
      }

      this.isBackendOnline = true;
      return await res.json();
    } catch (err) {
      this.isBackendOnline = false;
      throw err;
    }
  }

  // 1. Auth APIs
  async login(badge, pin) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ badge, pin })
    });
  }

  async loginBiometric(badge = "INS-8842-DL") {
    return this.request('/api/auth/biometric', {
      method: 'POST',
      body: JSON.stringify({ badge, biometric_token: "UIDAI-HMAC-MATCH" })
    });
  }

  // 2. Dashboard APIs
  async getDashboardKPIs() {
    return this.request('/api/dashboard/kpis');
  }

  async getReviewQueue() {
    return this.request('/api/dashboard/queue');
  }

  // 3. Intake APIs
  async createIntake(payload) {
    return this.request('/api/intake/create', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  async getPresets() {
    return this.request('/api/intake/presets');
  }

  // 4. Pipeline APIs
  async analyzeCase(caseId) {
    return this.request('/api/pipeline/analyze', {
      method: 'POST',
      body: JSON.stringify({ case_id: caseId })
    });
  }

  async getPipelineLogs(caseId) {
    return this.request(`/api/pipeline/logs/${caseId}`);
  }

  // 5. Cases Workstation APIs
  async listCases(status = null) {
    const query = status ? `?status=${encodeURIComponent(status)}` : '';
    return this.request(`/api/cases${query}`);
  }

  async getCaseDetail(caseId) {
    return this.request(`/api/cases/${caseId}`);
  }

  async overrideCase(caseId, justification, newStatus = "COMPLIANT") {
    return this.request(`/api/cases/${caseId}/override`, {
      method: 'POST',
      body: JSON.stringify({ justification, new_status: newStatus })
    });
  }

  async submitDecision(caseId, decision, notes = "") {
    return this.request(`/api/cases/${caseId}/decision`, {
      method: 'POST',
      body: JSON.stringify({ decision, notes })
    });
  }

  // 6. XAI APIs
  async getProvenance(caseId) {
    return this.request(`/api/xai/provenance/${caseId}`);
  }

  // 7. Reports & Certificates
  async getBatchAnalytics() {
    return this.request('/api/reports/batch-analytics');
  }

  async getCertificate(caseId) {
    return this.request(`/api/reports/certificates/${caseId}`);
  }

  // 8. Audit Ledger
  async getAuditLedger() {
    return this.request('/api/audit/ledger');
  }

  async verifyAuditLedger() {
    return this.request('/api/audit/verify', { method: 'POST' });
  }

  // 9. Statutes & Calculator
  async getStatutes(query = "") {
    const qParam = query ? `?q=${encodeURIComponent(query)}` : '';
    return this.request(`/api/statutes${qParam}`);
  }

  async calculateFontHeight(areaSqCm, packagingType = "printed") {
    return this.request('/api/calculator/font-height', {
      method: 'POST',
      body: JSON.stringify({ area_sq_cm: areaSqCm, packaging_type: packagingType })
    });
  }

  // 10. Risk Radar
  async getRadarHotspots() {
    return this.request('/api/radar/hotspots');
  }

  async deploySquad(zoneId, squadName) {
    return this.request('/api/radar/deploy', {
      method: 'POST',
      body: JSON.stringify({ zone_id: zoneId, squad_name: squadName })
    });
  }

  // 11. Search
  async searchGlobal(q = "", filterType = "all") {
    return this.request(`/api/search?q=${encodeURIComponent(q)}&filter_type=${encodeURIComponent(filterType)}`);
  }

  // 12. Notifications
  async getNotifications() {
    return this.request('/api/notifications');
  }

  async markNotificationsRead(notificationId = null, markAll = false) {
    return this.request('/api/notifications/mark-read', {
      method: 'POST',
      body: JSON.stringify({ notification_id: notificationId, mark_all: markAll })
    });
  }

  // 13. System Health
  async getSystemHealth() {
    return this.request('/api/system/health');
  }

  async runDiagnostics() {
    return this.request('/api/system/diagnostics', { method: 'POST' });
  }
}

export const api = new ApiClient();
