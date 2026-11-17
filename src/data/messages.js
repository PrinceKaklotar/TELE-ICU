// Fictional Simulated Communications for Tele-ICU Command Center PoC

export const TEAM_MEMBERS = [
  {
    id: "user-sarah",
    name: "Sarah Johnson",
    role: "Tele-ICU Nurse",
    avatar: "SJ",
    status: "online",
    badgeColor: "bg-emerald-500"
  },
  {
    id: "user-michael",
    name: "Dr. Michael Brown",
    role: "Remote ICU Doctor",
    avatar: "MB",
    status: "online",
    badgeColor: "bg-blue-500"
  },
  {
    id: "user-emily",
    name: "Emily Davis",
    role: "Bedside ICU Nurse",
    avatar: "ED",
    status: "busy",
    badgeColor: "bg-amber-500"
  },
  {
    id: "user-james",
    name: "James Wilson",
    role: "Bedside ICU Nurse",
    avatar: "JW",
    status: "online",
    badgeColor: "bg-emerald-500"
  }
];

export const QUICK_TEMPLATES = [
  "Please review the patient update.",
  "Can you confirm the bedside assessment?",
  "Follow-up required for this patient.",
  "Please provide the latest status.",
  "Titrating infusion per protocol. Awaiting bedside confirmation.",
  "ABG results noted; physician review in progress."
];

export const INITIAL_CONVERSATIONS = [
  {
    id: "conv-1",
    patientId: "ICU-003",
    patientName: "Arthur Pendelton",
    bed: "Bed 03-A",
    teamMember: {
      id: "user-emily",
      name: "Emily Davis",
      role: "Bedside ICU Nurse"
    },
    unreadCount: 1,
    lastUpdated: "3 mins ago",
    messages: [
      {
        id: "m-101",
        senderId: "user-sarah",
        senderName: "Sarah Johnson",
        senderRole: "Tele-ICU Nurse",
        text: "Emily, ICU-003 Arthur's heart rate has climbed to 138 bpm with BP 84/52. MAP is 62. Telemetry shows sustained sinus tachycardia.",
        timestamp: "23:18",
        status: "read"
      },
      {
        id: "m-102",
        senderId: "user-emily",
        senderName: "Emily Davis",
        senderRole: "Bedside ICU Nurse",
        text: "Copy that Sarah. I am at the bedside right now. Checking peripheral perfusion and flushing IV lines. Norepinephrine titration started.",
        timestamp: "23:20",
        status: "read"
      },
      {
        id: "m-103",
        senderId: "user-michael",
        senderName: "Dr. Michael Brown",
        senderRole: "Remote ICU Doctor",
        text: "I am reviewing his arterial line waveform from remote station. Let's aim for MAP >= 65 and draw repeat lactate.",
        timestamp: "23:22",
        status: "read"
      },
      {
        id: "m-104",
        senderId: "user-emily",
        senderName: "Emily Davis",
        senderRole: "Bedside ICU Nurse",
        text: "Understood Dr. Brown. Norepinephrine increased to 0.10 mcg/kg/min. Drawing blood now.",
        timestamp: "23:25",
        status: "delivered"
      }
    ]
  },
  {
    id: "conv-2",
    patientId: "ICU-005",
    patientName: "David Chen",
    bed: "Bed 05-B",
    teamMember: {
      id: "user-emily",
      name: "Emily Davis",
      role: "Bedside ICU Nurse"
    },
    unreadCount: 0,
    lastUpdated: "12 mins ago",
    messages: [
      {
        id: "m-201",
        senderId: "user-sarah",
        senderName: "Sarah Johnson",
        senderRole: "Tele-ICU Nurse",
        text: "Desaturation alert triggered for David Chen. SpO2 dropped to 89% with RR 28. Dr. Brown recommended BIPAP initiation.",
        timestamp: "23:08",
        status: "read"
      },
      {
        id: "m-202",
        senderId: "user-emily",
        senderName: "Emily Davis",
        senderRole: "Bedside ICU Nurse",
        text: "Respiratory therapy is in the room setting up BIPAP mask. Administered Lasix 80mg IV push.",
        timestamp: "23:14",
        status: "read"
      }
    ]
  },
  {
    id: "conv-3",
    patientId: "ICU-002",
    patientName: "Marcus Aurelius Vance",
    bed: "Bed 02-B",
    teamMember: {
      id: "user-james",
      name: "James Wilson",
      role: "Bedside ICU Nurse"
    },
    unreadCount: 0,
    lastUpdated: "28 mins ago",
    messages: [
      {
        id: "m-301",
        senderId: "user-sarah",
        senderName: "Sarah Johnson",
        senderRole: "Tele-ICU Nurse",
        text: "James, temp spiked to 38.2°C for Marcus Vance. High-flow nasal cannula flow was increased.",
        timestamp: "22:52",
        status: "read"
      },
      {
        id: "m-302",
        senderId: "user-james",
        senderName: "James Wilson",
        senderRole: "Bedside ICU Nurse",
        text: "Patient received acetaminophen 1000mg IV. Sputum culture collected. ABG sample dispatched to lab.",
        timestamp: "22:56",
        status: "read"
      }
    ]
  },
  {
    id: "conv-4",
    patientId: "ICU-001",
    patientName: "Eleanor Vance",
    bed: "Bed 01-A",
    teamMember: {
      id: "user-michael",
      name: "Dr. Michael Brown",
      role: "Remote ICU Doctor"
    },
    unreadCount: 0,
    lastUpdated: "1 hour ago",
    messages: [
      {
        id: "m-401",
        senderId: "user-sarah",
        senderName: "Sarah Johnson",
        senderRole: "Tele-ICU Nurse",
        text: "Dr. Brown, Eleanor Vance is 6 hours post-extubation, hemodynamically very stable. Step-down bed request placed.",
        timestamp: "22:15",
        status: "read"
      },
      {
        id: "m-402",
        senderId: "user-michael",
        senderName: "Dr. Michael Brown",
        senderRole: "Remote ICU Doctor",
        text: "Agreed. I will sign the step-down transfer orders once evening rounds conclude.",
        timestamp: "22:20",
        status: "read"
      }
    ]
  }
];
