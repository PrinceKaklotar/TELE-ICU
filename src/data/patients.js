// Fictional Simulated Patient Dataset for Tele-ICU Command Center PoC
// All vitals and clinical scenarios are strictly simulated for academic HCI demonstration.

export const INITIAL_PATIENTS = [
  {
    id: "ICU-001",
    name: "Hansaben Patel",
    age: 64,
    gender: "Female",
    bed: "Bed 01-A",
    status: "STABLE", // STABLE | WARNING | CRITICAL | OFFLINE
    vitals: {
      heartRate: 74,
      heartRateUnit: "bpm",
      prevHeartRate: 76,
      spo2: 98,
      spo2Unit: "%",
      prevSpo2: 97,
      bpSystolic: 122,
      bpDiastolic: 78,
      bpUnit: "mmHg",
      prevBp: "120/76",
      respiratoryRate: 16,
      respiratoryRateUnit: "br/min",
      prevRespiratoryRate: 16,
      temperature: 36.8,
      temperatureUnit: "°C",
      prevTemperature: 36.9
    },
    assignedNurse: "Hetal Patel, RN",
    remoteDoctor: "Dr. Rajesh Shah, MD",
    admissionReason: "Post-op coronary bypass observation (Day 3)",
    lastUpdated: "Just now",
    lastUpdatedTimestamp: Date.now() - 35000,
    connectionStatus: "Connected",
    notes: [
      {
        id: "note-1",
        author: "Bhavin Shah (Tele-ICU)",
        timestamp: "2026-11-20 20:30",
        content: "Extubation confirmed stable. Continuous rhythm monitoring nominal. Urine output within normal limits."
      }
    ]
  },
  {
    id: "ICU-002",
    name: "Raj Dobariya",
    age: 58,
    gender: "Male",
    bed: "Bed 02-B",
    status: "WARNING",
    vitals: {
      heartRate: 104,
      heartRateUnit: "bpm",
      prevHeartRate: 92,
      spo2: 92,
      spo2Unit: "%",
      prevSpo2: 94,
      bpSystolic: 142,
      bpDiastolic: 92,
      bpUnit: "mmHg",
      prevBp: "134/86",
      respiratoryRate: 24,
      respiratoryRateUnit: "br/min",
      prevRespiratoryRate: 20,
      temperature: 38.2,
      temperatureUnit: "°C",
      prevTemperature: 37.8
    },
    assignedNurse: "Chirag Shah, RN",
    remoteDoctor: "Dr. Rajesh Shah, MD",
    admissionReason: "Severe Community-Acquired Pneumonia with low FiO2 response",
    lastUpdated: "1 min ago",
    lastUpdatedTimestamp: Date.now() - 65000,
    connectionStatus: "Connected",
    notes: [
      {
        id: "note-2",
        author: "Dr. Rajesh Shah",
        timestamp: "2026-11-20 21:15",
        content: "Elevated temp and tachypnea noted. High-flow nasal cannula adjusted to 40L, FiO2 0.50. Re-eval ABG in 1 hour."
      }
    ]
  },
  {
    id: "ICU-003",
    name: "Ramesh Patel",
    age: 71,
    gender: "Male",
    bed: "Bed 03-A",
    status: "CRITICAL",
    vitals: {
      heartRate: 138,
      heartRateUnit: "bpm",
      prevHeartRate: 112,
      spo2: 88,
      spo2Unit: "%",
      prevSpo2: 91,
      bpSystolic: 84,
      bpDiastolic: 52,
      bpUnit: "mmHg",
      prevBp: "95/60",
      respiratoryRate: 31,
      respiratoryRateUnit: "br/min",
      prevRespiratoryRate: 26,
      temperature: 39.1,
      temperatureUnit: "°C",
      prevTemperature: 38.6
    },
    assignedNurse: "Hetal Patel, RN",
    remoteDoctor: "Dr. Rajesh Shah, MD",
    admissionReason: "Septic Shock secondary to perforated diverticulum with hypotension",
    lastUpdated: "Just now",
    lastUpdatedTimestamp: Date.now() - 15000,
    connectionStatus: "Connected",
    notes: [
      {
        id: "note-3",
        author: "Bhavin Shah (Tele-ICU)",
        timestamp: "2026-11-20 22:45",
        content: "Urgent: Tachycardia worsening, MAP < 65. Norepinephrine titrated up. Bedside RN notified immediately via secure comms."
      }
    ]
  },
  {
    id: "ICU-004",
    name: "Priya Desai",
    age: 49,
    gender: "Female",
    bed: "Bed 04-A",
    status: "STABLE",
    vitals: {
      heartRate: 68,
      heartRateUnit: "bpm",
      prevHeartRate: 70,
      spo2: 99,
      spo2Unit: "%",
      prevSpo2: 99,
      bpSystolic: 118,
      bpDiastolic: 74,
      bpUnit: "mmHg",
      prevBp: "122/76",
      respiratoryRate: 15,
      respiratoryRateUnit: "br/min",
      prevRespiratoryRate: 15,
      temperature: 36.6,
      temperatureUnit: "°C",
      prevTemperature: 36.7
    },
    assignedNurse: "Chirag Shah, RN",
    remoteDoctor: "Dr. Rajesh Shah, MD",
    admissionReason: "Acute subarachnoid hemorrhage post-coiling (Neurological monitoring)",
    lastUpdated: "3 mins ago",
    lastUpdatedTimestamp: Date.now() - 180000,
    connectionStatus: "Connected",
    notes: [
      {
        id: "note-4",
        author: "Chirag Shah, RN",
        timestamp: "2026-11-20 21:00",
        content: "GCS 15. Pupils equal and reactive. Strict SBP target < 130 maintained."
      }
    ]
  },
  {
    id: "ICU-005",
    name: "Bhavesh Joshi",
    age: 62,
    gender: "Male",
    bed: "Bed 05-B",
    status: "CRITICAL",
    vitals: {
      heartRate: 126,
      heartRateUnit: "bpm",
      prevHeartRate: 110,
      spo2: 89,
      spo2Unit: "%",
      prevSpo2: 93,
      bpSystolic: 168,
      bpDiastolic: 104,
      bpUnit: "mmHg",
      prevBp: "155/98",
      respiratoryRate: 28,
      respiratoryRateUnit: "br/min",
      prevRespiratoryRate: 22,
      temperature: 37.3,
      temperatureUnit: "°C",
      prevTemperature: 37.1
    },
    assignedNurse: "Hetal Patel, RN",
    remoteDoctor: "Dr. Rajesh Shah, MD",
    admissionReason: "Acute Decompensated Heart Failure with Flash Pulmonary Edema",
    lastUpdated: "Just now",
    lastUpdatedTimestamp: Date.now() - 25000,
    connectionStatus: "Connected",
    notes: [
      {
        id: "note-5",
        author: "Dr. Rajesh Shah",
        timestamp: "2026-11-20 22:50",
        content: "BIPAP initiation recommended. IV Furosemide 80mg push ordered. Monitor continuous desat alarm."
      }
    ]
  },
  {
    id: "ICU-006",
    name: "Dipti Mehta",
    age: 38,
    gender: "Female",
    bed: "Bed 06-A",
    status: "WARNING",
    vitals: {
      heartRate: 98,
      heartRateUnit: "bpm",
      prevHeartRate: 85,
      spo2: 93,
      spo2Unit: "%",
      prevSpo2: 95,
      bpSystolic: 135,
      bpDiastolic: 88,
      bpUnit: "mmHg",
      prevBp: "128/82",
      respiratoryRate: 22,
      respiratoryRateUnit: "br/min",
      prevRespiratoryRate: 18,
      temperature: 38.6,
      temperatureUnit: "°C",
      prevTemperature: 38.0
    },
    assignedNurse: "Chirag Shah, RN",
    remoteDoctor: "Dr. Rajesh Shah, MD",
    admissionReason: "Severe pyelonephritis with impending urosepsis",
    lastUpdated: "2 mins ago",
    lastUpdatedTimestamp: Date.now() - 120000,
    connectionStatus: "Connected",
    notes: [
      {
        id: "note-6",
        author: "Chirag Shah, RN",
        timestamp: "2026-11-20 22:10",
        content: "Blood cultures drawn from 2 sites. IV Meropenem started. Temperature spiking."
      }
    ]
  },
  {
    id: "ICU-007",
    name: "Mansukhbhai Prajapati",
    age: 75,
    gender: "Male",
    bed: "Bed 07-A",
    status: "STABLE",
    vitals: {
      heartRate: 64,
      heartRateUnit: "bpm",
      prevHeartRate: 66,
      spo2: 97,
      spo2Unit: "%",
      prevSpo2: 96,
      bpSystolic: 126,
      bpDiastolic: 76,
      bpUnit: "mmHg",
      prevBp: "124/78",
      respiratoryRate: 14,
      respiratoryRateUnit: "br/min",
      prevRespiratoryRate: 14,
      temperature: 36.7,
      temperatureUnit: "°C",
      prevTemperature: 36.8
    },
    assignedNurse: "Hetal Patel, RN",
    remoteDoctor: "Dr. Rajesh Shah, MD",
    admissionReason: "Post carotid endarterectomy observation",
    lastUpdated: "4 mins ago",
    lastUpdatedTimestamp: Date.now() - 240000,
    connectionStatus: "Connected",
    notes: [
      {
        id: "note-7",
        author: "Hetal Patel, RN",
        timestamp: "2026-11-20 20:00",
        content: "Puncture site intact, no hematoma. Cranial nerve assessment intact."
      }
    ]
  },
  {
    id: "ICU-008",
    name: "Geeta Dobariya",
    age: 53,
    gender: "Female",
    bed: "Bed 08-B",
    status: "OFFLINE",
    vitals: {
      heartRate: "--",
      heartRateUnit: "bpm",
      prevHeartRate: 72,
      spo2: "--",
      spo2Unit: "%",
      prevSpo2: 98,
      bpSystolic: "--",
      bpDiastolic: "--",
      bpUnit: "mmHg",
      prevBp: "118/72",
      respiratoryRate: "--",
      respiratoryRateUnit: "br/min",
      prevRespiratoryRate: 16,
      temperature: "--",
      temperatureUnit: "°C",
      prevTemperature: 36.7
    },
    assignedNurse: "Chirag Shah, RN",
    remoteDoctor: "Dr. Rajesh Shah, MD",
    admissionReason: "Transferred to MRI Suite for emergent cranial neuro-imaging",
    lastUpdated: "12 mins ago",
    lastUpdatedTimestamp: Date.now() - 720000,
    connectionStatus: "Telemetry Disconnected (In Transit)",
    notes: [
      {
        id: "note-8",
        author: "Chirag Shah, RN",
        timestamp: "2026-11-20 23:05",
        content: "Patient escorted to MRI suite by transport RN. Telemetry temporarily unhooked with physician order."
      }
    ]
  }
];

// Helper to generate realistic trend data for charts
export const generateVitalsHistory = (patientId, range = "1h") => {
  const points = range === "15m" ? 15 : range === "1h" ? 20 : 24;
  const patient = INITIAL_PATIENTS.find(p => p.id === patientId) || INITIAL_PATIENTS[0];
  
  if (patient.status === "OFFLINE") {
    return Array.from({ length: points }, (_, i) => ({
      time: `${i * 3}m`,
      heartRate: null,
      spo2: null,
      bpSystolic: null,
      bpDiastolic: null,
      respiratoryRate: null
    }));
  }

  const baseHR = typeof patient.vitals.heartRate === 'number' ? patient.vitals.heartRate : 75;
  const baseSpO2 = typeof patient.vitals.spo2 === 'number' ? patient.vitals.spo2 : 96;
  const baseSys = typeof patient.vitals.bpSystolic === 'number' ? patient.vitals.bpSystolic : 120;
  const baseDia = typeof patient.vitals.bpDiastolic === 'number' ? patient.vitals.bpDiastolic : 80;
  const baseRR = typeof patient.vitals.respiratoryRate === 'number' ? patient.vitals.respiratoryRate : 16;

  const data = [];
  const now = new Date();
  
  for (let i = points - 1; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - (i * (range === "15m" ? 60000 : range === "1h" ? 180000 : 900000)));
    const timeStr = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Controlled subtle variance leading up to current value
    const varianceRatio = (points - 1 - i) / points;
    const hrNoise = Math.sin(i * 0.8) * 4;
    const spo2Noise = Math.cos(i * 0.5) * 1.5;
    const bpNoise = Math.sin(i * 0.4) * 5;

    data.push({
      time: timeStr,
      heartRate: Math.round(baseHR - (5 * (1 - varianceRatio)) + hrNoise),
      spo2: Math.min(100, Math.max(82, Math.round(baseSpO2 - (2 * (1 - varianceRatio)) + spo2Noise))),
      bpSystolic: Math.round(baseSys - (6 * (1 - varianceRatio)) + bpNoise),
      bpDiastolic: Math.round(baseDia - (3 * (1 - varianceRatio)) + bpNoise * 0.6),
      respiratoryRate: Math.round(baseRR - (2 * (1 - varianceRatio)) + Math.sin(i) * 1.5)
    });
  }

  // Ensure last point is exactly the current reading
  data[data.length - 1] = {
    time: "Now",
    heartRate: baseHR,
    spo2: baseSpO2,
    bpSystolic: baseSys,
    bpDiastolic: baseDia,
    respiratoryRate: baseRR
  };

  return data;
};
