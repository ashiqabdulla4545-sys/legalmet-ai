# ==============================================================================
# LEGALMET AI - SQLITE DATABASE LAYER & SEED DATA LOADER
# ==============================================================================

import sqlite3
import json
import os
from typing import List, Dict, Any, Optional

DB_PATH = os.path.join(os.path.dirname(__file__), "legalmet.db")

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    # 1. Inspectors table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS inspectors (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        title TEXT NOT NULL,
        jurisdiction TEXT NOT NULL,
        station TEXT NOT NULL,
        badge TEXT NOT NULL,
        avatar TEXT NOT NULL,
        status TEXT NOT NULL,
        role TEXT NOT NULL,
        pin TEXT NOT NULL
    );
    """)

    # 2. Cases table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS cases (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        commodity TEXT NOT NULL,
        manufacturer TEXT NOT NULL,
        importer TEXT,
        packer_address TEXT NOT NULL,
        batch_no TEXT NOT NULL,
        mfg_date TEXT NOT NULL,
        expiry_date TEXT,
        declared_net_qty TEXT NOT NULL,
        declared_mrp TEXT NOT NULL,
        unit_sale_price TEXT,
        consumer_care TEXT,
        status TEXT NOT NULL,
        risk_score INTEGER NOT NULL,
        priority TEXT NOT NULL,
        date_intake TEXT NOT NULL,
        intake_by TEXT NOT NULL,
        image TEXT NOT NULL,
        summary TEXT NOT NULL
    );
    """)

    # 3. Findings table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS findings (
        id TEXT PRIMARY KEY,
        case_id TEXT NOT NULL,
        rule_name TEXT NOT NULL,
        statute TEXT NOT NULL,
        section TEXT NOT NULL,
        type TEXT NOT NULL,
        confidence INTEGER NOT NULL,
        confidence_pct INTEGER NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        bbox_json TEXT,
        bounding_tag TEXT,
        evidence_note TEXT,
        FOREIGN KEY(case_id) REFERENCES cases(id)
    );
    """)

    # 4. Audit Ledger table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS audit_ledger (
        id TEXT PRIMARY KEY,
        timestamp TEXT NOT NULL,
        inspector TEXT NOT NULL,
        action TEXT NOT NULL,
        case_id TEXT NOT NULL,
        commodity TEXT NOT NULL,
        hash TEXT NOT NULL,
        notes TEXT NOT NULL
    );
    """)

    # 5. Notifications table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS notifications (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        time TEXT NOT NULL,
        read INTEGER NOT NULL DEFAULT 0,
        target_path TEXT,
        case_id TEXT
    );
    """)

    # 6. Statutes table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS statutes (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        act_no TEXT NOT NULL,
        enacted TEXT NOT NULL
    );
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS statute_sections (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        statute_id TEXT NOT NULL,
        sec TEXT NOT NULL,
        title TEXT NOT NULL,
        summary TEXT NOT NULL,
        FOREIGN KEY(statute_id) REFERENCES statutes(id)
    );
    """)

    conn.commit()

    # Seed initial data if database is empty
    seed_if_empty(cursor, conn)
    conn.close()

def seed_if_empty(cursor, conn):
    cursor.execute("SELECT COUNT(*) as count FROM inspectors;")
    if cursor.fetchone()["count"] > 0:
        return # already seeded

    print("Initializing LegalMet AI Database with initial seed data...")

    # Seed Inspector
    cursor.execute("""
    INSERT INTO inspectors (id, name, title, jurisdiction, station, badge, avatar, status, role, pin)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        "INS-8842-DL",
        "Rajeshwar Varma",
        "Senior Metrology Inspector (Grade-1)",
        "Delhi NCT Zone 1 - Consumer Affairs & Legal Metrology",
        "New Delhi Enforcement Directorate",
        "DL-MET-2026-904",
        "RV",
        "Active Workstation",
        "inspector",
        "12345678"
    ))

    # Seed Cases
    cases_seed = [
        {
            "id": "LM-2026-8841",
            "title": "Darjeeling Royal Gold Tea (500 g)",
            "commodity": "Packaged Black Tea (FMCG)",
            "manufacturer": "Himalayan Brews & Tea Estates Ltd.",
            "importer": "N/A (Domestic Manufacturer)",
            "packer_address": "Plot 14, Siliguri Tea Processing Hub, West Bengal 734001",
            "batch_no": "HB-2026-B09",
            "mfg_date": "02/2026",
            "expiry_date": "01/2028",
            "declared_net_qty": "500 g",
            "declared_mrp": "₹ 420.00 (Inclusive of all taxes)",
            "unit_sale_price": "₹ 0.84 per g",
            "consumer_care": "care@himalayanbrews.com | +91-1800-425-9988",
            "status": "VIOLATION",
            "risk_score": 94,
            "priority": "CRITICAL",
            "date_intake": "2026-08-30 08:45 AM",
            "intake_by": "Officer R. Varma",
            "image": "assets/tea_sample_evidence.svg",
            "summary": "Dual MRP sticker overprint identified. Stated ₹380.00 original base, obscured by re-stickered ₹420.00 label in violation of PCR Rule 6(1)(e)."
        },
        {
            "id": "LM-2026-8842",
            "title": "Kisan Pure Mustard Oil (1 L)",
            "commodity": "Edible Oil & Fats",
            "manufacturer": "Bharat Agro Foods Pvt Ltd",
            "importer": "N/A",
            "packer_address": "Industrial Estate Phase-II, Alwar, Rajasthan 301001",
            "batch_no": "BAF-2026-08M",
            "mfg_date": "08/2026",
            "expiry_date": "02/2027",
            "declared_net_qty": "1 L (910 g at 30°C)",
            "declared_mrp": "₹ 165.00 (Incl. of all taxes)",
            "unit_sale_price": "₹ 165.00 per L",
            "consumer_care": "feedback@bharatagro.in | 1800-11-2244",
            "status": "COMPLIANT",
            "risk_score": 8,
            "priority": "LOW",
            "date_intake": "2026-08-30 09:15 AM",
            "intake_by": "Officer R. Varma",
            "image": "assets/oil_sample_evidence.svg",
            "summary": "All mandatory declarations present with correct dual net quantity (Volume + Equivalent Mass at 30°C) per Legal Metrology amendment."
        },
        {
            "id": "LM-2026-8843",
            "title": "Apex Hydro Protein Bar (75 g)",
            "commodity": "Dietary Food Supplement",
            "manufacturer": "Apex Health Nutrition India Ltd",
            "importer": "N/A",
            "packer_address": "Okhla Industrial Area Phase-III, New Delhi 110020",
            "batch_no": "APX-PRO-774",
            "mfg_date": "07/2026",
            "expiry_date": "07/2027",
            "declared_net_qty": "75 g",
            "declared_mrp": "₹ 120.00",
            "unit_sale_price": "₹ 1.60 per g",
            "consumer_care": "support@apexnutrition.com | 011-45678900",
            "status": "VIOLATION",
            "risk_score": 86,
            "priority": "HIGH",
            "date_intake": "2026-08-30 10:00 AM",
            "intake_by": "Officer R. Varma",
            "image": "assets/protein_sample_evidence.svg",
            "summary": "Numeral font height for Net Quantity is only 1.2mm, below mandatory 2.0mm minimum specified in Schedule II Table 1."
        },
        {
            "id": "LM-2026-8844",
            "title": "GlowEssence Radiance Serum (30 ml)",
            "commodity": "Cosmetics & Skincare",
            "manufacturer": "Luxe Botanicals Pvt Ltd",
            "importer": "N/A",
            "packer_address": "Baddi Industrial Corridor, Solan, Himachal Pradesh 173205",
            "batch_no": "LB-SER-902",
            "mfg_date": "06/2026",
            "expiry_date": "05/2028",
            "declared_net_qty": "30 ml",
            "declared_mrp": "₹ 899.00",
            "unit_sale_price": "₹ 29.96 per ml",
            "consumer_care": "None (Website link only)",
            "status": "VIOLATION",
            "risk_score": 78,
            "priority": "HIGH",
            "date_intake": "2026-08-30 11:20 AM",
            "intake_by": "Officer R. Varma",
            "image": "assets/cosmetics_sample_evidence.svg",
            "summary": "Missing mandatory telephone and email for consumer grievance redressal on outer packaging."
        },
        {
            "id": "LM-2026-8845",
            "title": "SunSpices Premium Garam Masala (100 g)",
            "commodity": "Spices & Condiments",
            "manufacturer": "Deccan Spice Mills",
            "importer": "N/A",
            "packer_address": "Guntur Spices Park, Andhra Pradesh 522004",
            "batch_no": "DSP-GM-44",
            "mfg_date": "08/2026",
            "expiry_date": "08/2027",
            "declared_net_qty": "100 g",
            "declared_mrp": "₹ 85.00",
            "unit_sale_price": "₹ 0.85 per g",
            "consumer_care": "care@deccanspices.com | 1800-444-222",
            "status": "REVIEW",
            "risk_score": 42,
            "priority": "MEDIUM",
            "date_intake": "2026-08-30 12:05 PM",
            "intake_by": "Officer R. Varma",
            "image": "assets/spices_sample_evidence.svg",
            "summary": "Faded ink timestamp on batch number; requires high-contrast thresholding validation."
        }
    ]

    for c in cases_seed:
        cursor.execute("""
        INSERT INTO cases (id, title, commodity, manufacturer, importer, packer_address, batch_no, mfg_date, expiry_date, declared_net_qty, declared_mrp, unit_sale_price, consumer_care, status, risk_score, priority, date_intake, intake_by, image, summary)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            c["id"], c["title"], c["commodity"], c["manufacturer"], c["importer"], c["packer_address"],
            c["batch_no"], c["mfg_date"], c["expiry_date"], c["declared_net_qty"], c["declared_mrp"],
            c["unit_sale_price"], c["consumer_care"], c["status"], c["risk_score"], c["priority"],
            c["date_intake"], c["intake_by"], c["image"], c["summary"]
        ))

    # Seed Findings for Case 1
    findings_seed = [
        ("F-01", "LM-2026-8841", "Rule 6(1)(e) - Alteration of Retail Sale Price", "Legal Metrology (Packaged Commodities) Rules, 2011", "Sec. 18 & 36(1) LM Act 2009", "VIOLATION", 4, 96, "Overprinted Dual MRP Sticker Detected", "Visual analysis revealed secondary sticker overlaying original printed MRP ₹380.00 with higher price ₹420.00 without statutory regulatory authorization.", json.dumps({"x": 52, "y": 64, "w": 38, "h": 18}), "DUAL MRP OVERPRINT", "OCR extracted two competing prices: Token '₹380' (underlay) and Token '₹420' (adhesive layer)."),
        ("F-02", "LM-2026-8841", "Rule 12 - Standard Units of Weight or Measure", "Legal Metrology (Packaged Commodities) Rules, 2011", "Rule 12(1)", "COMPLIANT", 4, 99, "Standard Net Weight Denomination", "Net content declared as '500 g' adhering strictly to prescribed standard metric unit schedule.", json.dumps({"x": 12, "y": 72, "w": 28, "h": 12}), "NET WT: 500g [OK]", "Metric symbol 'g' in lower case, correct font weight and spacing."),
        ("F-03", "LM-2026-8841", "Rule 6(1)(n) - Consumer Care Declarations", "Legal Metrology (Packaged Commodities) Rules, 2011", "Rule 6(1)(n)", "COMPLIANT", 4, 95, "Consumer Helpline Details Verified", "Both official email address and toll-free telephone number are present and validated.", json.dumps({"x": 12, "y": 86, "w": 76, "h": 10}), "CONSUMER CARE [OK]", "Helpline syntax matches standard telecom format."),
        ("F-04", "LM-2026-8841", "Schedule II - Minimum Height of Numerals", "Packaged Commodities Rules, 2011", "Table 1 (Area 200-1000 sq cm)", "REVIEW", 2, 78, "Numerals Font Height Marginally Low", "Batch number and date of manufacture numeral height detected at 2.1mm (Prescribed minimum 2.0mm). Margin of safety is thin.", json.dumps({"x": 54, "y": 46, "w": 36, "h": 12}), "FONT HEIGHT 2.1mm [WARN]", "Pixel calibration shows 2.1mm ± 0.15mm."),
        ("F-11", "LM-2026-8842", "Rule 13(1) - Net Quantity in terms of Volume and Mass", "Packaged Commodities (Amendment) Rules, 2022", "Rule 13", "COMPLIANT", 4, 98, "Dual Volume and Mass Declaration Present", "Stated as '1 L (910 g at 30°C)' complying with edible oil density standards.", json.dumps({"x": 20, "y": 65, "w": 60, "h": 15}), "DUAL DECLARATION [PASS]", "Accurate at standard temperature."),
        ("F-21", "LM-2026-8843", "Schedule II Table 1 - Minimum Font Height", "Packaged Commodities Rules, 2011", "Rule 9 & Schedule II", "VIOLATION", 4, 97, "Non-Compliant Numeral Height (1.2mm vs 2.0mm)", "For display area > 50 sq cm and <= 200 sq cm, minimum numeral height is 2.0mm. Measured height is 1.2mm.", json.dumps({"x": 30, "y": 70, "w": 40, "h": 14}), "FONT DEFECT 1.2mm", "Deficit of 0.8mm."),
        ("F-31", "LM-2026-8844", "Rule 6(1)(n) - Consumer Care Mandatory Email/Phone", "Legal Metrology Rules, 2011", "Rule 6(1)(n)", "VIOLATION", 4, 99, "Absence of Direct Phone & Email", "Package only lists 'Visit our website for support'. Statutory rule requires physical address, telephone number, and email ID.", json.dumps({"x": 25, "y": 80, "w": 50, "h": 12}), "MISSING CONSUMER CARE", "No contact phone on outer box."),
        ("F-41", "LM-2026-8845", "Rule 6(1)(d) - Legibility of Date of Packaging", "Packaged Commodities Rules, 2011", "Rule 6(1)(d)", "REVIEW", 3, 74, "Low Ink Contrast on Manufacture Date", "Inkjet dot-matrix date code has faint printing on dark background. OCR confidence 74%.", json.dumps({"x": 40, "y": 50, "w": 35, "h": 10}), "FADED MFG DATE", "Requires contrast adjustment.")
    ]

    for f in findings_seed:
        cursor.execute("""
        INSERT INTO findings (id, case_id, rule_name, statute, section, type, confidence, confidence_pct, title, description, bbox_json, bounding_tag, evidence_note)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, f)

    # Seed Notifications
    notifs_seed = [
        ("NOTIF-01", "VIOLATION", "Critical Dual MRP Overprint Flagged", "Case LM-2026-8841 (Darjeeling Tea) detected +10.5% adhesive price sticker violation.", "2m ago", 0, "/workspace", "LM-2026-8841"),
        ("NOTIF-02", "RADAR", "Hotspot Alert: Azadpur Wholesale Hub", "Surveillance density crossed 88 violations/sq.km. Squad deployment recommended.", "18m ago", 0, "/risk-radar", None),
        ("NOTIF-03", "STATUTE", "Statutory Rule Matrix Synchronized", "G.S.R. 202(E) Packaging declarations database updated with latest amendment.", "1h ago", 0, "/regulatory-intel", None),
        ("NOTIF-04", "AUDIT", "Cryptographic Certificate Issued", "DL-MET-CERT-8842 issued to Bharat Agro Foods with SHA-256 state seal.", "3h ago", 1, "/audit-trail", "LM-2026-8842")
    ]
    for n in notifs_seed:
        cursor.execute("""
        INSERT INTO notifications (id, type, title, message, time, read, target_path, case_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, n)

    # Seed Audit Ledger
    audit_seed = [
        ("AUD-9901", "2026-08-30 14:48:12 IST", "INS-8842-DL (R. Varma)", "CONFIRM_VIOLATION", "LM-2026-8841", "Darjeeling Royal Gold Tea (500 g)", "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", "Confirmed dual MRP overprinting. Notice under Section 36(1) initiated."),
        ("AUD-9900", "2026-08-30 13:20:05 IST", "INS-8842-DL (R. Varma)", "CERTIFICATE_ISSUED", "LM-2026-8842", "Kisan Pure Mustard Oil (1 L)", "8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4", "Compliance Certificate DL-MET-CERT-8842 issued to Bharat Agro Foods."),
        ("AUD-9899", "2026-08-30 11:42:30 IST", "AI_INFERENCE_ENGINE", "ANOMALY_FLAGGED", "LM-2026-8843", "Apex Hydro Protein Bar (75 g)", "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8", "Sub-2.0mm numeral height anomaly detected on primary front display panel."),
        ("AUD-9898", "2026-08-30 10:15:18 IST", "INS-7721-MH (P. Deshmukh)", "BATCH_SCAN_COMPLETE", "BATCH-MH-442", "FMCG Packaged Snacks (24 items)", "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a", "Batch audit executed. 22 compliant, 2 notices issued.")
    ]
    for a in audit_seed:
        cursor.execute("""
        INSERT INTO audit_ledger (id, timestamp, inspector, action, case_id, commodity, hash, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, a)

    # Seed Statutes
    cursor.execute("INSERT INTO statutes (id, name, act_no, enacted) VALUES (?, ?, ?, ?)", ("ACT-2009", "The Legal Metrology Act, 2009", "Act No. 1 of 2010", "13th January, 2010"))
    cursor.execute("INSERT INTO statutes (id, name, act_no, enacted) VALUES (?, ?, ?, ?)", ("PCR-2011", "Legal Metrology (Packaged Commodities) Rules, 2011", "G.S.R. 202(E)", "7th March, 2011 (Amended 2022)"))

    statute_sections_seed = [
        ("ACT-2009", "Section 18", "Declarations on pre-packaged commodities", "No person shall manufacture, pack, sell, distribute, deliver, offer, expose or possess for sale any pre-packaged commodity unless such package is in such standard quantities or number and bears thereon such declarations and particulars in such manner as may be prescribed."),
        ("ACT-2009", "Section 36(1)", "Penalty for selling, etc., of non-standard packages", "Whoever manufactures, packs, imports, sells, distributes, delivers or causes to be manufactured, packed, imported, sold, distributed or delivered, or offers, exposes or possesses for sale, any pre-packaged commodity which does not conform to the declarations on the package shall be punished with fine which may extend to twenty-five thousand rupees, for the second offence to fifty thousand rupees and for the subsequent offence with fine which may extend to one lakh rupees or with imprisonment for a term which may extend to one year or with both."),
        ("ACT-2009", "Section 49", "Offences by companies and nomination of Director", "Where an offence under this Act has been committed by a company, every person who at the time the offence was committed was in charge of, and was responsible to, the company for the conduct of the business of the company shall be deemed to be guilty of the offence."),
        ("PCR-2011", "Rule 6", "Declarations to be made on every package", "Every package shall bear thereon legible, prominent and unambiguous declarations including Name and Address of Manufacturer/Packer/Importer, Common or Generic Name, Net Quantity in standard metric units, Month and Year of Manufacture/Packaging/Import, Maximum Retail Price (MRP) inclusive of all taxes, Unit Sale Price (USP), and Name/Address/Telephone/Email of Consumer Care person."),
        ("PCR-2011", "Rule 6(1)(e)", "Retail Sale Price (MRP) & Prohibition of Alteration", "The retail sale price of the package shall clearly indicate that it is the maximum retail price inclusive of all taxes. No individual or retail establishment shall alter, overprint, obscure, or affix supplementary stickers modifying the printed retail price without statutory authorization."),
        ("PCR-2011", "Rule 9 & Schedule II", "Manner in which declaration shall be made & Font Heights", "Table 1 prescribes minimum height of numerals: For display area up to 50 cm²: 1.0mm (blown/embossed 2.0mm); 50-200 cm²: 2.0mm (embossed 4.0mm); 200-1000 cm²: 4.0mm (embossed 6.0mm); >1000 cm²: 6.0mm."),
        ("PCR-2011", "Rule 12", "Standard Units of Weight, Measure or Numerals", "Declarations of quantity shall be in terms of the standard units of weight, measure or number using the International System of Units (SI) metric symbols (mg, g, kg, ml, l, cm, m).")
    ]

    for s in statute_sections_seed:
        cursor.execute("INSERT INTO statute_sections (statute_id, sec, title, summary) VALUES (?, ?, ?, ?)", s)

    conn.commit()
    print("Database seeding completed successfully.")
