import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  Search,
  ExternalLink,
  ShieldCheck,
  CheckCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/common/StatusBadge';

const SHORT_TEMPLATES = [
  "Please review ICU-003.",
  "Can you confirm the bedside assessment?",
  "Please share the latest patient update.",
  "Follow-up required for this bed."
];

export default function Communication() {
  const { 
    conversations, 
    sendMessage, 
    patients, 
    setSelectedPatientId 
  } = useApp();

  const [activeConvId, setActiveConvId] = useState(conversations[0]?.id || '');
  const [inputText, setInputText] = useState('');
  const [convSearch, setConvSearch] = useState('');
  const messagesEndRef = useRef(null);

  const activeConversation = conversations.find(c => c.id === activeConvId) || conversations[0];
  const patientData = patients.find(p => p.id === activeConversation?.patientId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(activeConversation.id, inputText);
    setInputText('');
  };

  const handleQuickTemplate = (tpl) => {
    sendMessage(activeConversation.id, tpl);
  };

  const filteredConversations = conversations.filter(c => {
    if (!convSearch.trim()) return true;
    const q = convSearch.toLowerCase();
    return (
      c.patientName.toLowerCase().includes(q) ||
      c.teamMember.name.toLowerCase().includes(q) ||
      c.bed.toLowerCase().includes(q)
    );
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="max-w-7xl mx-auto h-[calc(100vh-6.5rem)] flex flex-col space-y-3"
    >
      {/* Compact Header */}
      <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-white dark:bg-[#162238] border border-slate-200 dark:border-[#243552] shadow-sm shrink-0">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Tele-Bedside Communication
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Secure coordination between remote ICU nurse and bedside care team.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-900/40">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Local Demonstration Intercom</span>
        </div>
      </div>

      {/* Two-Column Clean Messaging Layout */}
      <div className="flex-1 bg-white dark:bg-[#162238] rounded-2xl border border-slate-200 dark:border-[#243552] shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-0">
        {/* Left: Conversation List */}
        <div className="md:col-span-5 lg:col-span-4 border-r border-slate-200 dark:border-[#243552] flex flex-col h-full bg-slate-50/50 dark:bg-[#121c2e]/60">
          <div className="p-2.5 border-b border-slate-200 dark:border-[#243552]">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search staff or patient..."
                value={convSearch}
                onChange={(e) => setConvSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-[#162238] border border-slate-200 dark:border-[#243552] rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-[#243552]">
            {filteredConversations.map((conv) => {
              const isSelected = conv.id === activeConvId;
              const lastMsg = conv.messages[conv.messages.length - 1];

              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  className={`p-3 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-blue-50/90 dark:bg-blue-950/40 border-l-4 border-blue-600'
                      : 'hover:bg-slate-100/70 dark:hover:bg-[#1a2d48]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-blue-600 dark:text-blue-400 font-mono">
                          {conv.bed}
                        </span>
                        <span className="font-bold text-xs text-slate-900 dark:text-white truncate">
                          {conv.patientName}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {conv.teamMember.name} • {conv.teamMember.role}
                      </p>
                    </div>

                    <span className="text-[10px] text-slate-400 shrink-0">
                      {conv.lastUpdated}
                    </span>
                  </div>

                  {lastMsg && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 truncate">
                      {lastMsg.senderName.split(' ')[0]}: "{lastMsg.text}"
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Chat Window */}
        <div className="md:col-span-7 lg:col-span-8 flex flex-col h-full bg-white dark:bg-[#162238]">
          {activeConversation ? (
            <>
              {/* Patient and Team Member Header */}
              <div className="p-3 border-b border-slate-200 dark:border-[#243552] flex items-center justify-between gap-3 bg-slate-50/60 dark:bg-[#121c2e]/60">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
                    {activeConversation.teamMember.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                        {activeConversation.teamMember.name}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        ({activeConversation.teamMember.role})
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-semibold text-blue-600 dark:text-blue-400 font-mono">
                        {activeConversation.bed}
                      </span>
                      <span>•</span>
                      <span className="truncate">{activeConversation.patientName}</span>
                      {patientData && <StatusBadge status={patientData.status} size="sm" />}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPatientId(activeConversation.patientId)}
                  className="px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/60 text-blue-600 dark:text-blue-300 font-semibold text-xs flex items-center gap-1 shrink-0 transition-colors"
                >
                  <span>Patient Details</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              {/* Message History */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/20 dark:bg-[#121c2e]/20">
                {activeConversation.messages.map((msg) => {
                  const isMine = msg.senderId === 'user-bhavin';

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-0.5">
                        <span className="font-semibold text-slate-600 dark:text-slate-400">{msg.senderName}</span>
                        <span>•</span>
                        <span>{msg.timestamp}</span>
                      </div>

                      <div
                        className={`max-w-md p-3 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                          isMine
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : 'bg-white dark:bg-[#1f3354] text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-[#2b446e] rounded-bl-none'
                        }`}
                      >
                        {msg.text}
                      </div>

                      {isMine && (
                        <div className="flex items-center gap-0.5 text-[10px] text-slate-400 mt-0.5">
                          <CheckCheck className="w-3 h-3 text-blue-500" />
                          <span>Delivered</span>
                        </div>
                      )}
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Template Chips */}
              <div className="px-3.5 py-2 border-t border-slate-100 dark:border-[#243552] bg-slate-50/60 dark:bg-[#121c2e]/40 overflow-x-auto flex items-center gap-1.5">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
                  Templates:
                </span>
                {SHORT_TEMPLATES.map((tpl, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickTemplate(tpl)}
                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#162238] border border-slate-200 dark:border-[#243552] hover:border-blue-400 dark:hover:border-blue-500 text-[11px] text-slate-700 dark:text-slate-300 whitespace-nowrap transition-colors"
                  >
                    "{tpl}"
                  </button>
                ))}
              </div>

              {/* Composer */}
              <form onSubmit={handleSend} className="p-2.5 border-t border-slate-200 dark:border-[#243552] flex items-center gap-2">
                <input
                  type="text"
                  placeholder={`Message ${activeConversation.teamMember.name}...`}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-[#243552] bg-slate-50 dark:bg-[#121c2e] text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl shadow-sm font-semibold text-xs flex items-center gap-1.5 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
              Select a conversation to begin
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
