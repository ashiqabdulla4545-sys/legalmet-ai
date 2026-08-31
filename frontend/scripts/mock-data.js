/* ==========================================================================
   LEGALMET AI - COMPREHENSIVE MOCK DATA & REGULATORY REGISTRY
   ========================================================================== */

export const MockData = {
  inspector: {
    id: "INS-8842-DL",
    name: "Rajeshwar Varma",
    title: "Senior Metrology Inspector (Grade-1)",
    jurisdiction: "Delhi NCT Zone 1 - Consumer Affairs & Legal Metrology",
    station: "New Delhi Enforcement Directorate",
    badge: "DL-MET-2026-904",
    avatar: "RV",
    status: "Active Workstation",
    role: "inspector"
  },

  kpis: {
    overallCompliance: 88.4,
    inspectedToday: 142,
    activeQueue: 8,
    violationsPending: 14,
    noticesIssued: 3,
    systemPerceptionHealth: 98.6
  },

  notifications: [
    {
      id: "NOTIF-01",
      type: "VIOLATION",
      title: "Critical Dual MRP Overprint Flagged",
      message: "Case LM-2026-8841 (Darjeeling Tea) detected +10.5% adhesive price sticker violation.",
      time: "2m ago",
      read: false,
      targetPath: "/workspace",
      caseId: "LM-2026-8841"
    },
    {
      id: "NOTIF-02",
      type: "RADAR",
      title: "Hotspot Alert: Azadpur Wholesale Hub",
      message: "Surveillance density crossed 88 violations/sq.km. Squad deployment recommended.",
      time: "18m ago",
      read: false,
      targetPath: "/risk-radar"
    },
    {
      id: "NOTIF-03",
      type: "STATUTE",
      title: "Statutory Rule Matrix Synchronized",
      message: "G.S.R. 202(E) Packaging declarations database updated with latest amendment.",
      time: "1h ago",
      read: false,
      targetPath: "/regulatory-intel"
    },
    {
      id: "NOTIF-04",
      type: "AUDIT",
      title: "Cryptographic Certificate Issued",
      message: "DL-MET-CERT-8842 issued to Bharat Agro Foods with SHA-256 state seal.",
      time: "3h ago",
      read: true,
      targetPath: "/audit-trail"
    }
  ],

  cases: [
    {
      id: "LM-2026-8841",
      title: "Darjeeling Royal Gold Tea (500 g)",
      commodity: "Packaged Black Tea (FMCG)",
      manufacturer: "Himalayan Brews & Tea Estates Ltd.",
      importer: "N/A (Domestic Manufacturer)",
      packerAddress: "Plot 14, Siliguri Tea Processing Hub, West Bengal 734001",
      batchNo: "HB-2026-B09",
      mfgDate: "02/2026",
      expiryDate: "01/2028",
      declaredNetQty: "500 g",
      declaredMrp: "₹ 420.00 (Inclusive of all taxes)",
      unitSalePrice: "₹ 0.84 per g",
      consumerCare: "care@himalayanbrews.com | +91-1800-425-9988",
      status: "VIOLATION",
      riskScore: 94,
      priority: "CRITICAL",
      dateIntake: "2026-08-30 08:45 AM",
      intakeBy: "Officer R. Varma",
      image: "assets/tea_sample_evidence.svg",
      summary: "Dual MRP sticker overprint identified. Stated ₹380.00 original base, obscured by re-stickered ₹420.00 label in violation of PCR Rule 6(1)(e).",
      findings: [
        {
          id: "F-01",
          rule: "Rule 6(1)(e) - Alteration of Retail Sale Price",
          statute: "Legal Metrology (Packaged Commodities) Rules, 2011",
          section: "Sec. 18 & 36(1) LM Act 2009",
          type: "VIOLATION",
          confidence: 4,
          confidencePct: 96,
          title: "Overprinted Dual MRP Sticker Detected",
          description: "Visual analysis revealed secondary sticker overlaying original printed MRP ₹380.00 with higher price ₹420.00 without statutory regulatory authorization.",
          bbox: { x: 52, y: 64, w: 38, h: 18 },
          boundingTag: "DUAL MRP OVERPRINT",
          evidenceNote: "OCR extracted two competing prices: Token '₹380' (underlay) and Token '₹420' (adhesive layer)."
        },
        {
          id: "F-02",
          rule: "Rule 12 - Standard Units of Weight or Measure",
          statute: "Legal Metrology (Packaged Commodities) Rules, 2011",
          section: "Rule 12(1)",
          type: "COMPLIANT",
          confidence: 4,
          confidencePct: 99,
          title: "Standard Net Weight Denomination",
          description: "Net content declared as '500 g' adhering strictly to prescribed standard metric unit schedule.",
          bbox: { x: 12, y: 72, w: 28, h: 12 },
          boundingTag: "NET WT: 500g [OK]",
          evidenceNote: "Metric symbol 'g' in lower case, correct font weight and spacing."
        },
        {
          id: "F-03",
          rule: "Rule 6(1)(n) - Consumer Care Declarations",
          statute: "Legal Metrology (Packaged Commodities) Rules, 2011",
          section: "Rule 6(1)(n)",
          type: "COMPLIANT",
          confidence: 4,
          confidencePct: 95,
          title: "Consumer Helpline Details Verified",
          description: "Both official email address and toll-free telephone number are present and validated.",
          bbox: { x: 12, y: 86, w: 76, h: 10 },
          boundingTag: "CONSUMER CARE [OK]",
          evidenceNote: "Helpline syntax matches standard telecom format."
        },
        {
          id: "F-04",
          rule: "Schedule II - Minimum Height of Numerals",
          statute: "Packaged Commodities Rules, 2011",
          section: "Table 1 (Area 200-1000 sq cm)",
          type: "REVIEW",
          confidence: 2,
          confidencePct: 78,
          title: "Numerals Font Height Marginally Low",
          description: "Batch number and date of manufacture numeral height detected at 2.1mm (Prescribed minimum 2.0mm). Margin of safety is thin.",
          bbox: { x: 54, y: 46, w: 36, h: 12 },
          boundingTag: "FONT HEIGHT 2.1mm [WARN]",
          evidenceNote: "Pixel calibration shows 2.1mm ± 0.15mm."
        }
      ]
    },
    {
      id: "LM-2026-8842",
      title: "Kisan Pure Mustard Oil (1 L)",
      commodity: "Edible Oil & Fats",
      manufacturer: "Bharat Agro Foods Pvt Ltd",
      importer: "N/A",
      packerAddress: "Industrial Estate Phase-II, Alwar, Rajasthan 301001",
      batchNo: "BAF-2026-08M",
      mfgDate: "08/2026",
      expiryDate: "02/2027",
      declaredNetQty: "1 L (910 g at 30°C)",
      declaredMrp: "₹ 165.00 (Incl. of all taxes)",
      unitSalePrice: "₹ 165.00 per L",
      consumerCare: "feedback@bharatagro.in | 1800-11-2244",
      status: "COMPLIANT",
      riskScore: 8,
      priority: "LOW",
      dateIntake: "2026-08-30 09:15 AM",
      intakeBy: "Officer R. Varma",
      image: "assets/oil_sample_evidence.svg",
      summary: "All mandatory declarations present with correct dual net quantity (Volume + Equivalent Mass at 30°C) per Legal Metrology amendment.",
      findings: [
        {
          id: "F-11",
          rule: "Rule 13(1) - Net Quantity in terms of Volume and Mass",
          statute: "Packaged Commodities (Amendment) Rules, 2022",
          section: "Rule 13",
          type: "COMPLIANT",
          confidence: 4,
          confidencePct: 98,
          title: "Dual Volume and Mass Declaration Present",
          description: "Stated as '1 L (910 g at 30°C)' complying with edible oil density standards.",
          bbox: { x: 20, y: 65, w: 60, h: 15 },
          boundingTag: "DUAL DECLARATION [PASS]"
        }
      ]
    },
    {
      id: "LM-2026-8843",
      title: "Apex Hydro Protein Bar (75 g)",
      commodity: "Dietary Food Supplement",
      manufacturer: "Apex Health Nutrition India Ltd",
      importer: "N/A",
      packerAddress: "Okhla Industrial Area Phase-III, New Delhi 110020",
      batchNo: "APX-PRO-774",
      mfgDate: "07/2026",
      expiryDate: "07/2027",
      declaredNetQty: "75 g",
      declaredMrp: "₹ 120.00",
      unitSalePrice: "₹ 1.60 per g",
      consumerCare: "support@apexnutrition.com | 011-45678900",
      status: "VIOLATION",
      riskScore: 86,
      priority: "HIGH",
      dateIntake: "2026-08-30 10:00 AM",
      intakeBy: "Officer R. Varma",
      image: "assets/protein_sample_evidence.svg",
      summary: "Numeral font height for Net Quantity is only 1.2mm, below mandatory 2.0mm minimum specified in Schedule II Table 1.",
      findings: [
        {
          id: "F-21",
          rule: "Schedule II Table 1 - Minimum Font Height",
          statute: "Packaged Commodities Rules, 2011",
          section: "Rule 9 & Schedule II",
          type: "VIOLATION",
          confidence: 4,
          confidencePct: 97,
          title: "Non-Compliant Numeral Height (1.2mm vs 2.0mm)",
          description: "For display area > 50 sq cm and <= 200 sq cm, minimum numeral height is 2.0mm. Measured height is 1.2mm.",
          bbox: { x: 30, y: 70, w: 40, h: 14 },
          boundingTag: "FONT DEFECT 1.2mm"
        }
      ]
    },
    {
      id: "LM-2026-8844",
      title: "GlowEssence Radiance Serum (30 ml)",
      commodity: "Cosmetics & Skincare",
      manufacturer: "Luxe Botanicals Pvt Ltd",
      importer: "N/A",
      packerAddress: "Baddi Industrial Corridor, Solan, Himachal Pradesh 173205",
      batchNo: "LB-SER-902",
      mfgDate: "06/2026",
      expiryDate: "05/2028",
      declaredNetQty: "30 ml",
      declaredMrp: "₹ 899.00",
      unitSalePrice: "₹ 29.96 per ml",
      consumerCare: "None (Website link only)",
      status: "VIOLATION",
      riskScore: 78,
      priority: "HIGH",
      dateIntake: "2026-08-30 11:20 AM",
      intakeBy: "Officer R. Varma",
      image: "assets/cosmetics_sample_evidence.svg",
      summary: "Missing mandatory telephone and email for consumer grievance redressal on outer packaging.",
      findings: [
        {
          id: "F-31",
          rule: "Rule 6(1)(n) - Consumer Care Mandatory Email/Phone",
          statute: "Legal Metrology Rules, 2011",
          section: "Rule 6(1)(n)",
          type: "VIOLATION",
          confidence: 4,
          confidencePct: 99,
          title: "Absence of Direct Phone & Email",
          description: "Package only lists 'Visit our website for support'. Statutory rule requires physical address, telephone number, and email ID.",
          bbox: { x: 25, y: 80, w: 50, h: 12 },
          boundingTag: "MISSING CONSUMER CARE"
        }
      ]
    },
    {
      id: "LM-2026-8845",
      title: "SunSpices Premium Garam Masala (100 g)",
      commodity: "Spices & Condiments",
      manufacturer: "Deccan Spice Mills",
      importer: "N/A",
      packerAddress: "Guntur Spices Park, Andhra Pradesh 522004",
      batchNo: "DSP-GM-44",
      mfgDate: "08/2026",
      expiryDate: "08/2027",
      declaredNetQty: "100 g",
      declaredMrp: "₹ 85.00",
      unitSalePrice: "₹ 0.85 per g",
      consumerCare: "care@deccanspices.com | 1800-444-222",
      status: "REVIEW",
      riskScore: 42,
      priority: "MEDIUM",
      dateIntake: "2026-08-30 12:05 PM",
      intakeBy: "Officer R. Varma",
      image: "assets/spices_sample_evidence.svg",
      summary: "Faded ink timestamp on batch number; requires high-contrast thresholding validation.",
      findings: [
        {
          id: "F-41",
          rule: "Rule 6(1)(d) - Legibility of Date of Packaging",
          statute: "Packaged Commodities Rules, 2011",
          section: "Rule 6(1)(d)",
          type: "REVIEW",
          confidence: 3,
          confidencePct: 74,
          title: "Low Ink Contrast on Manufacture Date",
          description: "Inkjet dot-matrix date code has faint printing on dark background. OCR confidence 74%.",
          bbox: { x: 40, y: 50, w: 35, h: 10 },
          boundingTag: "FADED MFG DATE"
        }
      ]
    }
  ],

  statutes: [
    {
      id: "ACT-2009",
      name: "The Legal Metrology Act, 2009",
      actNo: "Act No. 1 of 2010",
      enacted: "13th January, 2010",
      sections: [
        {
          sec: "Section 18",
          title: "Declarations on pre-packaged commodities",
          summary: "No person shall manufacture, pack, sell, distribute, deliver, offer, expose or possess for sale any pre-packaged commodity unless such package is in such standard quantities or number and bears thereon such declarations and particulars in such manner as may be prescribed."
        },
        {
          sec: "Section 36(1)",
          title: "Penalty for selling, etc., of non-standard packages",
          summary: "Whoever manufactures, packs, imports, sells, distributes, delivers or causes to be manufactured, packed, imported, sold, distributed or delivered, or offers, exposes or possesses for sale, any pre-packaged commodity which does not conform to the declarations on the package shall be punished with fine which may extend to twenty-five thousand rupees, for the second offence to fifty thousand rupees and for the subsequent offence with fine which may extend to one lakh rupees or with imprisonment for a term which may extend to one year or with both."
        },
        {
          sec: "Section 49",
          title: "Offences by companies and nomination of Director",
          summary: "Where an offence under this Act has been committed by a company, every person who at the time the offence was committed was in charge of, and was responsible to, the company for the conduct of the business of the company shall be deemed to be guilty of the offence."
        }
      ]
    },
    {
      id: "PCR-2011",
      name: "Legal Metrology (Packaged Commodities) Rules, 2011",
      actNo: "G.S.R. 202(E)",
      enacted: "7th March, 2011 (Amended 2022)",
      sections: [
        {
          sec: "Rule 6",
          title: "Declarations to be made on every package",
          summary: "Every package shall bear thereon legible, prominent and unambiguous declarations including Name and Address of Manufacturer/Packer/Importer, Common or Generic Name, Net Quantity in standard metric units, Month and Year of Manufacture/Packaging/Import, Maximum Retail Price (MRP) inclusive of all taxes, Unit Sale Price (USP), and Name/Address/Telephone/Email of Consumer Care person."
        },
        {
          sec: "Rule 6(1)(e)",
          title: "Retail Sale Price (MRP) & Prohibition of Alteration",
          summary: "The retail sale price of the package shall clearly indicate that it is the maximum retail price inclusive of all taxes. No individual or retail establishment shall alter, overprint, obscure, or affix supplementary stickers modifying the printed retail price without statutory authorization."
        },
        {
          sec: "Rule 9 & Schedule II",
          title: "Manner in which declaration shall be made & Font Heights",
          summary: "Table 1 prescribes minimum height of numerals: For display area up to 50 cm²: 1.0mm (blown/embossed 2.0mm); 50-200 cm²: 2.0mm (embossed 4.0mm); 200-1000 cm²: 4.0mm (embossed 6.0mm); >1000 cm²: 6.0mm."
        },
        {
          sec: "Rule 12",
          title: "Standard Units of Weight, Measure or Numerals",
          summary: "Declarations of quantity shall be in terms of the standard units of weight, measure or number using the International System of Units (SI) metric symbols (mg, g, kg, ml, l, cm, m)."
        }
      ]
    }
  ],

  auditLog: [
    {
      id: "AUD-9901",
      timestamp: "2026-08-30 14:48:12 IST",
      inspector: "INS-8842-DL (R. Varma)",
      action: "CONFIRM_VIOLATION",
      caseId: "LM-2026-8841",
      commodity: "Darjeeling Royal Gold Tea (500 g)",
      hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      notes: "Confirmed dual MRP overprinting. Notice under Section 36(1) initiated."
    },
    {
      id: "AUD-9900",
      timestamp: "2026-08-30 13:20:05 IST",
      inspector: "INS-8842-DL (R. Varma)",
      action: "CERTIFICATE_ISSUED",
      caseId: "LM-2026-8842",
      commodity: "Kisan Pure Mustard Oil (1 L)",
      hash: "8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4",
      notes: "Compliance Certificate DL-MET-CERT-8842 issued to Bharat Agro Foods."
    },
    {
      id: "AUD-9899",
      timestamp: "2026-08-30 11:42:30 IST",
      inspector: "AI_INFERENCE_ENGINE",
      action: "ANOMALY_FLAGGED",
      caseId: "LM-2026-8843",
      commodity: "Apex Hydro Protein Bar (75 g)",
      hash: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
      notes: "Sub-2.0mm numeral height anomaly detected on primary front display panel."
    },
    {
      id: "AUD-9898",
      timestamp: "2026-08-30 10:15:18 IST",
      inspector: "INS-7721-MH (P. Deshmukh)",
      action: "BATCH_SCAN_COMPLETE",
      caseId: "BATCH-MH-442",
      commodity: "FMCG Packaged Snacks (24 items)",
      hash: "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a",
      notes: "Batch audit executed. 22 compliant, 2 notices issued."
    }
  ],

  batchStats: {
    totalInspected: 14820,
    totalCompliant: 13101,
    totalViolations: 1719,
    categories: [
      { name: "Dual MRP / Overprinting", count: 584, pct: 34, color: "var(--color-status-violation)" },
      { name: "Font Height Defect", count: 481, pct: 28, color: "var(--color-brand-accent)" },
      { name: "Missing Consumer Care", count: 326, pct: 19, color: "var(--color-status-review)" },
      { name: "Net Content Weight Shortfall", count: 206, pct: 12, color: "var(--color-status-info)" },
      { name: "USP / Date Format Error", count: 122, pct: 7, color: "var(--color-secondary)" }
    ],
    manufacturers: [
      { name: "Himalayan Brews Ltd", inspected: 340, compliant: 280, violationRate: "17.6%", risk: "HIGH" },
      { name: "Apex Health Nutrition", inspected: 210, compliant: 172, violationRate: "18.1%", risk: "HIGH" },
      { name: "Bharat Agro Foods", inspected: 680, compliant: 668, violationRate: "1.7%", risk: "LOW" },
      { name: "Luxe Botanicals Pvt Ltd", inspected: 190, compliant: 154, violationRate: "18.9%", risk: "HIGH" },
      { name: "Deccan Spice Mills", inspected: 410, compliant: 395, violationRate: "3.6%", risk: "LOW" },
      { name: "Britannia Industries", inspected: 1250, compliant: 1238, violationRate: "0.9%", risk: "LOW" }
    ]
  },

  riskRadarData: {
    zones: [
      { id: "Z-01", name: "North-West Delhi (Azadpur Mandi / Wholesale)", risk: "CRITICAL", violations: 88, activeRaids: 3 },
      { id: "Z-02", name: "South Delhi (Retail Malls & Premium Marts)", risk: "LOW", violations: 12, activeRaids: 0 },
      { id: "Z-03", name: "Okhla Industrial Area (Packaging Hub)", risk: "HIGH", violations: 64, activeRaids: 2 },
      { id: "Z-04", name: "Narela Industrial Area (Grain & Pulses)", risk: "HIGH", violations: 58, activeRaids: 1 },
      { id: "Z-05", name: "Central Delhi (Connaught Place / Trade)", risk: "MEDIUM", violations: 24, activeRaids: 0 }
    ],
    highRiskCommodities: [
      { name: "Imported Confectionery & Chocolates", riskPct: 82, issue: "Missing Indian Importer Sticker & Non-Metric Weight" },
      { name: "Protein & Health Supplements", riskPct: 76, issue: "Sub-size font height & missing consumer care hotline" },
      { name: "Edible Oils in Pouches", riskPct: 48, issue: "Absence of dual weight/volume declaration at 30°C" },
      { name: "Packaged Dry Fruits & Nuts", riskPct: 44, issue: "Net quantity tare weight discrepancy" }
    ]
  },

  systemHealth: {
    ocrEngineLatency: "138 ms",
    ocrModelVersion: "LegalMet-Vision-OCR-v4.2",
    visionTransformerStatus: "Operational (GPU Cluster A-4)",
    ruleEngineHash: "LM-RULES-2026-REV3",
    syncedStatutes: "24 Enactments, 142 Rules",
    offlineSyncPending: 0,
    storageQuotaUsed: "42.8 GB / 500 GB"
  }
};
