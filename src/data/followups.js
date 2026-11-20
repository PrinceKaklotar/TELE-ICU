// Fictional Simulated Follow-up Tasks for Tele-ICU Command Center PoC

export const INITIAL_FOLLOWUPS = [
  {
    id: "TSK-301",
    patientId: "ICU-003",
    patientName: "Ramesh Patel",
    description: "Verify norepinephrine central line infusion rate and titrate for MAP >= 65. Repeat blood gas in 30 mins.",
    assignedTo: "Hetal Patel, RN",
    priority: "HIGH", // HIGH | MEDIUM | LOW
    status: "PENDING", // PENDING | IN_PROGRESS | COMPLETED
    createdTime: "12 mins ago",
    timestamp: Date.now() - 720000,
    dueTime: "Within 15 mins",
    notes: "Bedside nurse has been alerted via audio intercom; awaiting confirmation."
  },
  {
    id: "TSK-302",
    patientId: "ICU-005",
    patientName: "Bhavesh Joshi",
    description: "Initiate non-invasive positive pressure ventilation (BIPAP 12/6 cmH2O) and administer IV Furosemide 80mg push.",
    assignedTo: "Hetal Patel, RN",
    priority: "HIGH",
    status: "PENDING",
    createdTime: "20 mins ago",
    timestamp: Date.now() - 1200000,
    dueTime: "Immediate",
    notes: "Flash pulmonary edema precaution. Telemetry alarm limits set tight."
  },
  {
    id: "TSK-303",
    patientId: "ICU-002",
    patientName: "Raj Dobariya",
    description: "Perform serial neurological assessment & repeat arterial blood gas following high-flow cannula increase.",
    assignedTo: "Chirag Shah, RN",
    priority: "MEDIUM",
    status: "IN_PROGRESS",
    createdTime: "40 mins ago",
    timestamp: Date.now() - 2400000,
    dueTime: "In 30 mins",
    notes: "ABG lab kit in room. Transporting sample to blood gas analyzer."
  },
  {
    id: "TSK-304",
    patientId: "ICU-006",
    patientName: "Dipti Mehta",
    description: "Check second peripheral blood culture results and review nephrotoxic medication clearances with clinical pharmacist.",
    assignedTo: "Dr. Rajesh Shah, MD",
    priority: "MEDIUM",
    status: "IN_PROGRESS",
    createdTime: "1 hour ago",
    timestamp: Date.now() - 3600000,
    dueTime: "In 1 hour",
    notes: "Urine output is 45 mL/hr over last 2 hours. Meropenem dose adjusted."
  },
  {
    id: "TSK-305",
    patientId: "ICU-001",
    patientName: "Hansaben Patel",
    description: "Post-extubation swallow evaluation and step-down discharge readiness checklist review.",
    assignedTo: "Hetal Patel, RN",
    priority: "LOW",
    status: "COMPLETED",
    createdTime: "2.5 hours ago",
    timestamp: Date.now() - 9000000,
    dueTime: "Done",
    notes: "Swallow screen passed without cough. Diet advanced to clear liquids."
  },
  {
    id: "TSK-306",
    patientId: "ICU-007",
    patientName: "Mansukhbhai Prajapati",
    description: "Inspect right femoral puncture dressing for hematoma or thrill; record bilateral pedal pulses.",
    assignedTo: "Chirag Shah, RN",
    priority: "LOW",
    status: "COMPLETED",
    createdTime: "3 hours ago",
    timestamp: Date.now() - 10800000,
    dueTime: "Done",
    notes: "Distal pulses palpable 2+ bilaterally. Dressing dry and occlusive."
  }
];
