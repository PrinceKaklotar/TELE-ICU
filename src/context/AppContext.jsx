import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { INITIAL_PATIENTS } from '../data/patients';
import { INITIAL_ALERTS } from '../data/alerts';
import { INITIAL_FOLLOWUPS } from '../data/followups';
import { INITIAL_CONVERSATIONS, TEAM_MEMBERS } from '../data/messages';
import { INITIAL_ACTIVITIES } from '../data/activities';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Theme state
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('tele_icu_theme');
      return saved ? JSON.parse(saved) : 'light';
    } catch {
      return 'light';
    }
  });

  // Persist Theme and update HTML element
  useEffect(() => {
    try {
      localStorage.setItem('tele_icu_theme', JSON.stringify(theme));
    } catch (e) {
      console.warn(e);
    }
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Patients state (v3 with Bhavin Shah as Tele-ICU lead)
  const [patients, setPatients] = useState(() => {
    try {
      localStorage.removeItem('tele_icu_patients');
      localStorage.removeItem('tele_icu_v2_patients');
      const saved = localStorage.getItem('tele_icu_v3_patients');
      if (saved) {
        const parsed = JSON.parse(saved);
        const hasStaleNames = parsed.some(p =>
          p.name === 'Arthur Pendelton' ||
          p.name === 'Eleanor Vance' ||
          p.name === 'David Chen' ||
          p.name === 'Marcus Aurelius Vance' ||
          p.notes?.some(n => n.author?.includes('Pooja Patel') || n.author?.includes('Sarah Johnson'))
        );
        if (!hasStaleNames) return parsed;
      }
      return INITIAL_PATIENTS;
    } catch {
      return INITIAL_PATIENTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tele_icu_v3_patients', JSON.stringify(patients));
    } catch (e) {
      console.warn(e);
    }
  }, [patients]);

  // Selected Patient for Detail Drawer
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const selectedPatient = patients.find(p => p.id === selectedPatientId) || null;

  // Alerts state
  const [alerts, setAlerts] = useState(() => {
    try {
      localStorage.removeItem('tele_icu_alerts');
      localStorage.removeItem('tele_icu_v2_alerts');
      const saved = localStorage.getItem('tele_icu_v3_alerts');
      if (saved) {
        const parsed = JSON.parse(saved);
        const hasStaleNames = parsed.some(a =>
          a.patientName === 'Arthur Pendelton' ||
          a.patientName === 'Eleanor Vance' ||
          a.assignedNurse === 'Emily Davis, RN' ||
          a.acknowledgedBy?.includes('Pooja Patel') ||
          a.resolvedBy?.includes('Pooja Patel')
        );
        if (!hasStaleNames) return parsed;
      }
      return INITIAL_ALERTS;
    } catch {
      return INITIAL_ALERTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tele_icu_v3_alerts', JSON.stringify(alerts));
    } catch (e) {
      console.warn(e);
    }
  }, [alerts]);

  // Follow-ups state
  const [followups, setFollowups] = useState(() => {
    try {
      localStorage.removeItem('tele_icu_followups');
      localStorage.removeItem('tele_icu_v2_followups');
      const saved = localStorage.getItem('tele_icu_v3_followups');
      if (saved) {
        const parsed = JSON.parse(saved);
        const hasStaleNames = parsed.some(f =>
          f.patientName === 'Eleanor Vance' ||
          f.assignedTo === 'Emily Davis, RN' ||
          f.assignedTo === 'James Wilson, RN' ||
          f.assignedTo?.includes('Pooja Patel')
        );
        if (!hasStaleNames) return parsed;
      }
      return INITIAL_FOLLOWUPS;
    } catch {
      return INITIAL_FOLLOWUPS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tele_icu_v3_followups', JSON.stringify(followups));
    } catch (e) {
      console.warn(e);
    }
  }, [followups]);

  // Conversations state
  const [conversations, setConversations] = useState(() => {
    try {
      localStorage.removeItem('tele_icu_conversations');
      localStorage.removeItem('tele_icu_v2_conversations');
      const saved = localStorage.getItem('tele_icu_v3_conversations');
      if (saved) {
        const parsed = JSON.parse(saved);
        const hasStale = parsed.some(c =>
          c.messages?.some(m =>
            m.senderName === 'Sarah Johnson' ||
            m.senderName === 'Emily Davis' ||
            m.senderName === 'Pooja Patel' ||
            m.senderId === 'user-pooja'
          )
        );
        if (!hasStale) return parsed;
      }
      return INITIAL_CONVERSATIONS;
    } catch {
      return INITIAL_CONVERSATIONS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tele_icu_v3_conversations', JSON.stringify(conversations));
    } catch (e) {
      console.warn(e);
    }
  }, [conversations]);

  // Activity audit log
  const [activities, setActivities] = useState(() => {
    try {
      localStorage.removeItem('tele_icu_activities');
      localStorage.removeItem('tele_icu_v2_activities');
      const saved = localStorage.getItem('tele_icu_v3_activities');
      if (saved) {
        const parsed = JSON.parse(saved);
        const hasStale = parsed.some(a =>
          a.actor === 'Sarah Johnson, RN' ||
          a.actor === 'Dr. Michael Brown, MD' ||
          a.actor === 'Emily Davis, RN' ||
          a.actor?.includes('Pooja Patel')
        );
        if (!hasStale) return parsed;
      }
      return INITIAL_ACTIVITIES;
    } catch {
      return INITIAL_ACTIVITIES;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tele_icu_v3_activities', JSON.stringify(activities));
    } catch (e) {
      console.warn(e);
    }
  }, [activities]);

  const addActivity = useCallback((activity) => {
    const newAct = {
      id: `act-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toISOString().slice(0, 10),
      ...activity
    };
    setActivities(prev => [newAct, ...prev]);
  }, []);

  // Notifications
  const [notifications, setNotifications] = useState(() => [
    {
      id: 'notif-1',
      title: 'Critical Alert: ICU-003',
      message: 'Ramesh Patel sustained ventricular tachycardia (HR 138).',
      time: '3 mins ago',
      read: false,
      type: 'critical'
    },
    {
      id: 'notif-2',
      title: 'Critical Alert: ICU-005',
      message: 'Bhavesh Joshi desaturation below 90% (SpO2 89%).',
      time: '8 mins ago',
      read: false,
      type: 'critical'
    },
    {
      id: 'notif-3',
      title: 'New Message from Hetal Patel',
      message: 'Norepinephrine titration started for Bed 03-A.',
      time: '15 mins ago',
      read: false,
      type: 'info'
    },
    {
      id: 'notif-4',
      title: 'Pending Follow-up Due',
      message: 'Task TSK-301 requires bedside ABG re-check soon.',
      time: '25 mins ago',
      read: true,
      type: 'warning'
    }
  ]);

  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Toast System
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ title, message, type = 'success', duration = 4000 }) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, title, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Simulation State: 'RUNNING' | 'PAUSED' | 'STOPPED'
  const [simulationState, setSimulationState] = useState('RUNNING');
  const [lastTelemetrySync, setLastTelemetrySync] = useState(new Date());

  // Global search query
  const [searchQuery, setSearchQuery] = useState('');

  // Quick modals state
  const [taskModalContext, setTaskModalContext] = useState(null); // null or { patientId, patientName, prefillDesc }
  const [addNoteModalPatient, setAddNoteModalPatient] = useState(null); // patient obj or null
  const [resolvingAlert, setResolvingAlert] = useState(null); // alert obj or null

  // Alert Actions
  const acknowledgeAlert = useCallback((alertId) => {
    const alert = alerts.find(a => a.id === alertId);
    if (!alert) return;

    const ackTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setAlerts(prev => prev.map(a => {
      if (a.id === alertId) {
        return {
          ...a,
          status: 'ACKNOWLEDGED',
          acknowledgedAt: 'Just now',
          acknowledgedBy: 'Bhavin Shah (Tele-ICU)'
        };
      }
      return a;
    }));

    addActivity({
      type: 'ALERT_ACKNOWLEDGED',
      patientId: alert.patientId,
      patientName: alert.patientName,
      description: `Alert ${alert.id} (${alert.type}) acknowledged. Tele-ICU nurse reviewed event.`,
      actor: 'Bhavin Shah (Tele-ICU)',
      badge: 'badge-purple'
    });

    addToast({
      title: 'Alert Acknowledged',
      message: `Alert ${alert.id} for ${alert.patientName} marked as reviewed.`,
      type: 'info'
    });
  }, [alerts, addActivity, addToast]);

  const resolveAlert = useCallback((alertId, resolutionNote = '') => {
    const alert = alerts.find(a => a.id === alertId);
    if (!alert) return;

    setAlerts(prev => prev.map(a => {
      if (a.id === alertId) {
        return {
          ...a,
          status: 'RESOLVED',
          resolvedAt: 'Just now',
          resolvedBy: 'Bhavin Shah (Tele-ICU)',
          resolutionNote
        };
      }
      return a;
    }));

    addActivity({
      type: 'ALERT_RESOLVED',
      patientId: alert.patientId,
      patientName: alert.patientName,
      description: `Alert ${alert.id} resolved: ${resolutionNote || 'Clinical event documented and resolved.'}`,
      actor: 'Bhavin Shah (Tele-ICU)',
      badge: 'badge-green'
    });

    addToast({
      title: 'Alert Resolved',
      message: `Alert ${alert.id} marked as resolved.`,
      type: 'success'
    });
  }, [alerts, addActivity, addToast]);

  // Follow-up Actions
  const createTask = useCallback((taskData) => {
    const newTask = {
      id: `TSK-${Math.floor(100 + Math.random() * 900)}`,
      status: 'PENDING',
      createdTime: 'Just now',
      timestamp: Date.now(),
      ...taskData
    };

    setFollowups(prev => [newTask, ...prev]);

    addActivity({
      type: 'FOLLOW_UP_CREATED',
      patientId: newTask.patientId,
      patientName: newTask.patientName,
      description: `Follow-up ${newTask.id} assigned to ${newTask.assignedTo}: ${newTask.description.slice(0, 50)}...`,
      actor: 'Bhavin Shah (Tele-ICU)',
      badge: 'badge-amber'
    });

    addToast({
      title: 'Task Created',
      message: `Follow-up task created for ${newTask.patientName}.`,
      type: 'success'
    });
  }, [addActivity, addToast]);

  const updateTaskStatus = useCallback((taskId, newStatus) => {
    setFollowups(prev => prev.map(t => {
      if (t.id === taskId) {
        return { ...t, status: newStatus };
      }
      return t;
    }));

    const task = followups.find(t => t.id === taskId);
    if (task) {
      addActivity({
        type: newStatus === 'COMPLETED' ? 'FOLLOW_UP_COMPLETED' : 'FOLLOW_UP_UPDATED',
        patientId: task.patientId,
        patientName: task.patientName,
        description: `Task ${task.id} updated to status "${newStatus}".`,
        actor: 'Bhavin Shah (Tele-ICU)',
        badge: newStatus === 'COMPLETED' ? 'badge-green' : 'badge-blue'
      });
    }

    addToast({
      title: 'Task Updated',
      message: `Status changed to ${newStatus.replace('_', ' ')}.`,
      type: 'info'
    });
  }, [followups, addActivity, addToast]);

  const deleteTask = useCallback((taskId) => {
    setFollowups(prev => prev.filter(t => t.id !== taskId));
    addToast({
      title: 'Task Removed',
      message: `Task ${taskId} has been deleted.`,
      type: 'info'
    });
  }, [addToast]);

  // Messaging Actions
  const sendMessage = useCallback((conversationId, text) => {
    if (!text.trim()) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = {
      id: `m-${Date.now()}`,
      senderId: 'user-bhavin',
      senderName: 'Bhavin Shah',
      senderRole: 'Tele-ICU Nurse',
      text: text.trim(),
      timestamp: timeStr,
      status: 'delivered'
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          lastUpdated: 'Just now',
          messages: [...conv.messages, newMsg]
        };
      }
      return conv;
    }));

    const targetConv = conversations.find(c => c.id === conversationId);
    if (targetConv) {
      addActivity({
        type: 'COMMUNICATION',
        patientId: targetConv.patientId,
        patientName: targetConv.patientName,
        description: `Sent message to ${targetConv.teamMember.name}: "${text.slice(0, 40)}..."`,
        actor: 'Bhavin Shah (Tele-ICU)',
        badge: 'badge-blue'
      });
    }
  }, [conversations, addActivity]);

  // Patient notes
  const addPatientNote = useCallback((patientId, content) => {
    const timeStr = `${new Date().toISOString().slice(0, 10)} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const newNote = {
      id: `note-${Date.now()}`,
      author: 'Bhavin Shah (Tele-ICU)',
      timestamp: timeStr,
      content
    };

    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        return {
          ...p,
          notes: [newNote, ...(p.notes || [])]
        };
      }
      return p;
    }));

    const patient = patients.find(p => p.id === patientId);
    addActivity({
      type: 'NOTE_ADDED',
      patientId,
      patientName: patient?.name || patientId,
      description: `Clinical tele-observation note added: "${content.slice(0, 45)}..."`,
      actor: 'Bhavin Shah (Tele-ICU)',
      badge: 'badge-teal'
    });

    addToast({
      title: 'Note Recorded',
      message: 'Clinical note added to patient record.',
      type: 'success'
    });
  }, [patients, addActivity, addToast]);

  // Controlled Simulation Engine
  useEffect(() => {
    if (simulationState !== 'RUNNING') return;

    const interval = setInterval(() => {
      setLastTelemetrySync(new Date());

      setPatients(prev => prev.map(patient => {
        if (patient.status === 'OFFLINE') {
          return { ...patient, lastUpdated: '12 mins ago' };
        }

        // Controlled subtle physiological drift for active patients
        const hrDrift = (Math.random() - 0.5) * 2;
        const spo2Drift = (Math.random() - 0.48) * 0.8;
        const bpDrift = (Math.random() - 0.5) * 2;

        const currentHR = typeof patient.vitals.heartRate === 'number' ? patient.vitals.heartRate : 75;
        const currentSpO2 = typeof patient.vitals.spo2 === 'number' ? patient.vitals.spo2 : 96;
        const currentSys = typeof patient.vitals.bpSystolic === 'number' ? patient.vitals.bpSystolic : 120;
        const currentDia = typeof patient.vitals.bpDiastolic === 'number' ? patient.vitals.bpDiastolic : 80;

        let newHR = Math.round(currentHR + hrDrift);
        // keep within plausible boundaries according to patient baseline
        if (patient.status === 'CRITICAL' && patient.id === 'ICU-003') {
          newHR = Math.max(130, Math.min(145, newHR));
        } else if (patient.status === 'STABLE') {
          newHR = Math.max(60, Math.min(82, newHR));
        }

        let newSpO2 = Math.round(currentSpO2 + spo2Drift);
        if (patient.status === 'CRITICAL' && patient.id === 'ICU-005') {
          newSpO2 = Math.max(87, Math.min(91, newSpO2));
        } else if (patient.status === 'STABLE') {
          newSpO2 = Math.max(97, Math.min(100, newSpO2));
        }

        let newSys = Math.round(currentSys + bpDrift);
        let newDia = Math.round(currentDia + bpDrift * 0.5);

        return {
          ...patient,
          lastUpdated: 'Just now',
          lastUpdatedTimestamp: Date.now(),
          vitals: {
            ...patient.vitals,
            prevHeartRate: currentHR,
            heartRate: newHR,
            prevSpo2: currentSpO2,
            spo2: newSpO2,
            prevBp: `${currentSys}/${currentDia}`,
            bpSystolic: newSys,
            bpDiastolic: newDia
          }
        };
      }));
    }, 6000); // 6s tick

    return () => clearInterval(interval);
  }, [simulationState]);

  // Reset Demo Data
  const resetDemoData = useCallback(() => {
    setPatients(INITIAL_PATIENTS);
    setAlerts(INITIAL_ALERTS);
    setFollowups(INITIAL_FOLLOWUPS);
    setConversations(INITIAL_CONVERSATIONS);
    setActivities(INITIAL_ACTIVITIES);
    localStorage.removeItem('tele_icu_patients');
    localStorage.removeItem('tele_icu_alerts');
    localStorage.removeItem('tele_icu_followups');
    localStorage.removeItem('tele_icu_conversations');
    localStorage.removeItem('tele_icu_activities');
    addToast({
      title: 'Demo Environment Reset',
      message: 'All patients, alerts, tasks, and communications restored to default.',
      type: 'info'
    });
  }, [addToast]);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        patients,
        setPatients,
        selectedPatientId,
        setSelectedPatientId,
        selectedPatient,
        alerts,
        setAlerts,
        acknowledgeAlert,
        resolveAlert,
        followups,
        setFollowups,
        createTask,
        updateTaskStatus,
        deleteTask,
        conversations,
        sendMessage,
        activities,
        addActivity,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        clearNotifications,
        toasts,
        addToast,
        removeToast,
        simulationState,
        setSimulationState,
        lastTelemetrySync,
        searchQuery,
        setSearchQuery,
        taskModalContext,
        setTaskModalContext,
        addNoteModalPatient,
        setAddNoteModalPatient,
        resolvingAlert,
        setResolvingAlert,
        addPatientNote,
        resetDemoData,
        teamMembers: TEAM_MEMBERS
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
