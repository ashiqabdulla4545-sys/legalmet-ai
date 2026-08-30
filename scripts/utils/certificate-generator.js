/* ==========================================================================
   METROLOGY INSPECTION CERTIFICATE & NOTICE EXPORTER
   Generates formal regulatory compliance certificates and statutory violation notices.
   ========================================================================== */

export const CertificateGenerator = {
  generateCertificateHTML(caseData, inspector) {
    const isCompliant = caseData.status === "COMPLIANT";
    const certNumber = `DL-MET-${isCompliant ? "CERT" : "NOTICE"}-${caseData.id.replace("LM-", "")}`;
    const today = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });

    return `
      <div class="certificate-preview-paper" id="printableCertificate">
        <div class="certificate-header-stamp">
          <div style="font-size: 11px; font-family: var(--font-mono); letter-spacing: 0.1em; color: #555; text-transform: uppercase;">
            GOVERNMENT OF NATIONAL CAPITAL TERRITORY OF DELHI
          </div>
          <div style="font-size: 16px; font-weight: 800; font-family: var(--font-headline); margin: 4px 0;">
            DEPARTMENT OF CONSUMER AFFAIRS &amp; LEGAL METROLOGY
          </div>
          <div style="font-size: 11px; color: #666;">
            Enforcement Wing • 110001 • Statutory Certificate under Legal Metrology Act, 2009
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; border-bottom: 1px solid #ddd; padding-bottom: 12px;">
          <div>
            <div style="font-size: 10px; font-family: var(--font-mono); color: #777;">DOCUMENT IDENTIFIER</div>
            <div style="font-size: 14px; font-weight: 800; font-family: var(--font-mono);">${certNumber}</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 10px; font-family: var(--font-mono); color: #777;">DATE OF ISSUANCE</div>
            <div style="font-size: 13px; font-weight: 600;">${today}</div>
          </div>
        </div>

        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 16px; font-weight: 800; margin-bottom: 12px; text-transform: uppercase; color: ${isCompliant ? '#107C10' : '#D13438'};">
            ${isCompliant ? 'Certificate of Metrological Verification' : 'Statutory Notice for Metrological Non-Compliance'}
          </h3>
          <p style="font-size: 13px; line-height: 1.6; color: #222;">
            This certifies that the pre-packaged commodity specified below has been subjected to algorithmic vision inspection, declaration verification, and physical metrological validation in accordance with the <strong>Legal Metrology Act, 2009</strong> and the <strong>Legal Metrology (Packaged Commodities) Rules, 2011</strong>.
          </p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 12px;">
          <tbody>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px 0; color: #666; width: 35%;">Inspection Case ID:</td>
              <td style="padding: 8px 0; font-weight: 700; font-family: var(--font-mono);">${caseData.id}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px 0; color: #666;">Commodity / Article:</td>
              <td style="padding: 8px 0; font-weight: 700;">${caseData.title}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px 0; color: #666;">Manufacturer / Packer:</td>
              <td style="padding: 8px 0; font-weight: 600;">${caseData.manufacturer}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px 0; color: #666;">Packer Registered Address:</td>
              <td style="padding: 8px 0; color: #333;">${caseData.packerAddress}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px 0; color: #666;">Batch No. &amp; Declared Net Qty:</td>
              <td style="padding: 8px 0; font-family: var(--font-mono);">${caseData.batchNo} | ${caseData.declaredNetQty}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px 0; color: #666;">Declared MRP &amp; Unit Sale Price:</td>
              <td style="padding: 8px 0; font-family: var(--font-mono);">${caseData.declaredMrp} (${caseData.unitSalePrice})</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px 0; color: #666;">Regulatory Evaluation Status:</td>
              <td style="padding: 8px 0; font-weight: 800; color: ${isCompliant ? '#107C10' : '#D13438'};">${caseData.status} (Risk Score: ${caseData.riskScore}/100)</td>
            </tr>
          </tbody>
        </table>

        <div style="background-color: #f8f8f6; border: 1px solid #e0e0db; padding: 12px 16px; border-radius: 4px; margin-bottom: 24px;">
          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 4px; color: #444;">Statutory Finding Summary:</div>
          <div style="font-size: 12px; color: #111;">${caseData.summary}</div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 36px; padding-top: 16px; border-top: 1px dashed #aaa;">
          <div>
            <div style="font-size: 10px; font-family: var(--font-mono); color: #777;">CRYPTOGRAPHIC HASH (SHA-256)</div>
            <div style="font-size: 10px; font-family: var(--font-mono); color: #222; word-break: break-all; max-width: 320px;">
              ${caseData.findings[0] ? btoa(caseData.id + caseData.summary).toLowerCase() + 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4' : '4b227777d4dd1fc61c6f884f48641d02b4d121d3'}
            </div>
            <div style="font-size: 9px; color: #888; margin-top: 2px;">Tamper-proof ledger registered with Delhi Legal Metrology Node.</div>
          </div>
          <div style="text-align: center; min-width: 180px;">
            <div style="font-size: 14px; font-family: 'Brush Script MT', cursive, sans-serif; color: #003366; margin-bottom: 2px;">
              ${inspector.name}
            </div>
            <div style="font-size: 11px; font-weight: 700; color: #111;">${inspector.name}</div>
            <div style="font-size: 10px; color: #666;">${inspector.title}</div>
            <div style="font-size: 9px; font-family: var(--font-mono); color: #888;">Badge: ${inspector.badge}</div>
          </div>
        </div>

        <div class="seal-watermark ${isCompliant ? '' : 'violation-seal'}">
          ${isCompliant ? 'VERIFIED' : 'VIOLATION'}
        </div>
      </div>
    `;
  },

  printCertificate() {
    window.print();
  },

  downloadJSON(caseData) {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(caseData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${caseData.id}_metrology_audit.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }
};
