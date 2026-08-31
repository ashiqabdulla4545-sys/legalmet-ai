# ==============================================================================
# LEGALMET AI - CERTIFICATE & NOTICE GENERATION SERVICE
# ==============================================================================

import time
import hashlib
from typing import Dict, Any

class CertificateService:
    @staticmethod
    def generate_certificate(case_data: Dict[str, Any], inspector_data: Dict[str, Any]) -> Dict[str, Any]:
        is_compliant = case_data.get("status") == "COMPLIANT"
        case_id = case_data.get("id", "LM-2026-0000")
        cert_number = f"DL-MET-{'CERT' if is_compliant else 'NOTICE'}-{case_id.replace('LM-', '')}"
        
        today = time.strftime('%d %B %Y')
        state_hash = hashlib.sha256(f"{cert_number}|{case_id}|{today}".encode('utf-8')).hexdigest()

        html_content = f"""
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
              <div style="font-size: 14px; font-weight: 800; font-family: var(--font-mono);">{cert_number}</div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 10px; font-family: var(--font-mono); color: #777;">DATE OF ISSUANCE</div>
              <div style="font-size: 13px; font-weight: 600;">{today}</div>
            </div>
          </div>

          <div style="margin-bottom: 24px;">
            <h3 style="font-size: 16px; font-weight: 800; margin-bottom: 12px; text-transform: uppercase; color: {'#107C10' if is_compliant else '#D13438'};">
              {'Certificate of Metrological Verification' if is_compliant else 'Statutory Notice for Metrological Non-Compliance'}
            </h3>
            <p style="font-size: 13px; line-height: 1.6; color: #222;">
              This certifies that the pre-packaged commodity specified below has been subjected to algorithmic vision inspection, declaration verification, and physical metrological validation in accordance with the <strong>Legal Metrology Act, 2009</strong> and the <strong>Legal Metrology (Packaged Commodities) Rules, 2011</strong>.
            </p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 12px;">
            <tbody>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; color: #666; width: 35%;">Inspection Case ID:</td>
                <td style="padding: 8px 0; font-weight: 700; font-family: var(--font-mono);">{case_data.get('id')}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; color: #666;">Commodity / Article:</td>
                <td style="padding: 8px 0; font-weight: 700;">{case_data.get('title')}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; color: #666;">Manufacturer / Packer:</td>
                <td style="padding: 8px 0; font-weight: 600;">{case_data.get('manufacturer')}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; color: #666;">Packer Registered Address:</td>
                <td style="padding: 8px 0; color: #333;">{case_data.get('packer_address')}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; color: #666;">Batch No. &amp; Declared Net Qty:</td>
                <td style="padding: 8px 0; font-family: var(--font-mono);">{case_data.get('batch_no')} | {case_data.get('declared_net_qty')}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; color: #666;">Declared MRP &amp; Unit Sale Price:</td>
                <td style="padding: 8px 0; font-family: var(--font-mono);">{case_data.get('declared_mrp')} ({case_data.get('unit_sale_price')})</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; color: #666;">Regulatory Evaluation Status:</td>
                <td style="padding: 8px 0; font-weight: 800; color: {'#107C10' if is_compliant else '#D13438'};">{case_data.get('status')} (Risk Score: {case_data.get('risk_score')}/100)</td>
              </tr>
            </tbody>
          </table>

          <div style="background-color: #f8f8f6; border: 1px solid #e0e0db; padding: 12px 16px; border-radius: 4px; margin-bottom: 24px;">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 4px; color: #444;">Statutory Finding Summary:</div>
            <div style="font-size: 12px; color: #111;">{case_data.get('summary')}</div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 36px; padding-top: 16px; border-top: 1px dashed #aaa;">
            <div>
              <div style="font-size: 10px; font-family: var(--font-mono); color: #777;">CRYPTOGRAPHIC HASH (SHA-256)</div>
              <div style="font-size: 10px; font-family: var(--font-mono); color: #222; word-break: break-all; max-width: 320px;">
                {state_hash}
              </div>
              <div style="font-size: 9px; color: #888; margin-top: 2px;">Tamper-proof ledger registered with Delhi Legal Metrology Node.</div>
            </div>
            <div style="text-align: center; min-width: 180px;">
              <div style="font-size: 14px; font-family: 'Brush Script MT', cursive, sans-serif; color: #003366; margin-bottom: 2px;">
                {inspector_data.get('name', 'Rajeshwar Varma')}
              </div>
              <div style="font-size: 11px; font-weight: 700; color: #111;">{inspector_data.get('name', 'Rajeshwar Varma')}</div>
              <div style="font-size: 10px; color: #666;">{inspector_data.get('title', 'Senior Metrology Inspector')}</div>
              <div style="font-size: 9px; font-family: var(--font-mono); color: #888;">Badge: {inspector_data.get('badge', 'DL-MET-2026-904')}</div>
            </div>
          </div>

          <div class="seal-watermark {'violation-seal' if not is_compliant else ''}">
            {'VERIFIED' if is_compliant else 'VIOLATION'}
          </div>
        </div>
        """

        return {
            "certificate_id": cert_number,
            "case_id": case_id,
            "date_issued": today,
            "is_compliant": is_compliant,
            "html_rendered": html_content,
            "state_hash": state_hash,
            "inspector_signature": inspector_data.get("name", "Rajeshwar Varma")
        }
