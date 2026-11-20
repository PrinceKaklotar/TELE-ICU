// Initial Audit Trail / Activity Log for Tele-ICU Command Center

export const INITIAL_ACTIVITIES = [
  {
    id: "act-101",
    timestamp: "23:25",
    date: "2026-11-20",
    type: "COMMUNICATION",
    patientId: "ICU-003",
    patientName: "Ramesh Patel",
    description: "Bedside nurse Hetal Patel acknowledged norepinephrine titration target (MAP >= 65).",
    actor: "Hetal Patel, RN",
    badge: "badge-blue"
  },
  {
    id: "act-102",
    timestamp: "23:22",
    date: "2026-11-20",
    type: "ALERT_GENERATED",
    patientId: "ICU-003",
    patientName: "Ramesh Patel",
    description: "CRITICAL Alert ALT-8092 generated: Sustained Tachycardia (HR 138) & Hypotension.",
    actor: "Simulated Telemetry Engine",
    badge: "badge-red"
  },
  {
    id: "act-103",
    timestamp: "23:15",
    date: "2026-11-20",
    type: "FOLLOW_UP_CREATED",
    patientId: "ICU-005",
    patientName: "Bhavesh Joshi",
    description: "Follow-up TSK-302 created: Initiate BIPAP and IV Furosemide 80mg push.",
    actor: "Pooja Patel (Tele-ICU)",
    badge: "badge-amber"
  },
  {
    id: "act-104",
    timestamp: "23:08",
    date: "2026-11-20",
    type: "ALERT_GENERATED",
    patientId: "ICU-005",
    patientName: "Bhavesh Joshi",
    description: "CRITICAL Alert ALT-8091 generated: Desaturation SpO2 89% with RR 28.",
    actor: "Simulated Telemetry Engine",
    badge: "badge-red"
  },
  {
    id: "act-105",
    timestamp: "22:50",
    date: "2026-11-20",
    type: "NOTE_ADDED",
    patientId: "ICU-002",
    patientName: "Raj Dobariya",
    description: "Clinical note entered regarding high-flow cannula titration and pending ABG.",
    actor: "Dr. Rajesh Shah, MD",
    badge: "badge-teal"
  },
  {
    id: "act-106",
    timestamp: "22:35",
    date: "2026-11-20",
    type: "ALERT_ACKNOWLEDGED",
    patientId: "ICU-006",
    patientName: "Dipti Mehta",
    description: "WARNING Alert ALT-8085 acknowledged by Tele-ICU station: Borderline hypoxemia.",
    actor: "Pooja Patel (Tele-ICU)",
    badge: "badge-purple"
  },
  {
    id: "act-107",
    timestamp: "22:10",
    date: "2026-11-20",
    type: "STATUS_UPDATE",
    patientId: "ICU-008",
    patientName: "Geeta Dobariya",
    description: "Patient status set to OFFLINE: Transported to MRI suite with transport monitor.",
    actor: "Chirag Shah, RN",
    badge: "badge-gray"
  },
  {
    id: "act-108",
    timestamp: "21:40",
    date: "2026-11-20",
    type: "FOLLOW_UP_COMPLETED",
    patientId: "ICU-001",
    patientName: "Hansaben Patel",
    description: "Follow-up TSK-305 marked COMPLETED: Post-extubation swallow screen passed.",
    actor: "Hetal Patel, RN",
    badge: "badge-green"
  },
  {
    id: "act-109",
    timestamp: "20:00",
    date: "2026-11-20",
    type: "SYSTEM",
    patientId: "ALL",
    patientName: "Tele-ICU System",
    description: "Shift monitoring session initialized. 8 beds synchronized with bedside telemetry feeds.",
    actor: "System Engine",
    badge: "badge-blue"
  }
];
