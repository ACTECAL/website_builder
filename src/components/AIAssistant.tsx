import React, { useEffect, useMemo, useRef, useState } from 'react';
import { searchSite } from '../data/siteIndex';
import { Link } from 'react-router-dom';
import { GeminiService } from '../services/gemini';
import { MessageSquare, Search, Send, Key } from 'lucide-react';
import './AIAssistant.css';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export const AIAssistant: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'search' | 'chat'>('chat');
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ReturnType<typeof searchSite>>([]);

  // Chat State
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showKeyInput, setShowKeyInput] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Hotkey: Ctrl+K or /
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select' || (e as any).isComposing) return;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(true);
        setTimeout(() => inputRef.current?.focus(), 0);
      } else if (e.key === '/') {
        e.preventDefault();
        setOpen(true);
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Search Logic
  useEffect(() => {
    if (!open || mode !== 'search') return;
    setLoading(true);
    const t = setTimeout(() => {
      setResults(searchSite(q));
      setLoading(false);
    }, 150);
    return () => clearTimeout(t);
  }, [q, open, mode]);

  // Scroll to bottom of chat
  useEffect(() => {
    if (mode === 'chat') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, mode, open]);

  const handleSendMessage = async () => {
    if (!q.trim()) return;
    if (!apiKey) {
      setShowKeyInput(true);
      return;
    }

    const userMsg = q;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setQ('');
    setLoading(true);

    try {
      const service = new GeminiService(apiKey);
      // Prepend a system-like instruction for code generation
      const prompt = `You are an expert React/Web developer assistant. 
      If asked for code, provide clean, modern React/CSS snippets. 
      User request: ${userMsg}`;

      const response = await service.generateContent(prompt);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'model', text: `Error: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeySave = (key: string) => {
    setApiKey(key);
    localStorage.setItem('gemini_api_key', key);
    setShowKeyInput(false);
  };

  return (
    <>
      <button className="ai-fab" aria-label="Open AI Assistant" onClick={() => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 0); }}>
        <MessageSquare size={24} />
      </button>
      {open && (
        <div className="ai-overlay" onClick={() => setOpen(false)}>
          <div className="ai-panel" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            {/* Header / Tabs */}
            <div className="ai-header-tabs">
              <button
                className={`tab ${mode === 'chat' ? 'active' : ''}`}
                onClick={() => { setMode('chat'); setTimeout(() => inputRef.current?.focus(), 0); }}
              >
                <MessageSquare size={16} /> Chat
              </button>
              <button
                className={`tab ${mode === 'search' ? 'active' : ''}`}
                onClick={() => { setMode('search'); setTimeout(() => inputRef.current?.focus(), 0); }}
              >
                <Search size={16} /> Search
              </button>
              <button className="ai-close-btn" onClick={() => setOpen(false)}>×</button>
            </div>

            {/* Content Area */}
            <div className="ai-content">
              {mode === 'search' ? (
                <div className="ai-search-container">
                  <input
                    ref={inputRef}
                    type="search"
                    className="ai-input"
                    placeholder="Search the site..."
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                  />
                  <div className="ai-results-list">
                    {loading ? <div className="ai-loading">Searching...</div> : (
                      <ul>
                        {results.map((r, i) => (
                          <li key={i} className="ai-result-item">
                            <Link to={r.doc.path} reloadDocument onClick={() => setOpen(false)}>
                              <div className="title">{r.doc.title}</div>
                              <div className="meta">{r.doc.category}</div>
                            </Link>
                          </li>
                        ))}
                        {results.length === 0 && q && <div className="empty">No results found.</div>}
                      </ul>
                    )}
                  </div>
                </div>
              ) : (
                <div className="ai-chat-container">
                  {/* API Key Modal / Input */}
                  {(!apiKey || showKeyInput) && (
                    <div className="api-key-config">
                      <h4>Configure Gemini API</h4>
                      <p>Enter your Google Gemini API Key to enable chat.</p>
                      <input
                        type="password"
                        placeholder="Paste API Key here"
                        onKeyDown={(e) => { if (e.key === 'Enter') handleKeySave(e.currentTarget.value) }}
                      />
                      <small>Key is saved locally in your browser.</small>
                    </div>
                  )}

                  {/* Messages */}
                  <div className="chat-history">
                    {messages.length === 0 && (
                      <div className="chat-welcome">
                        <div className="icon"><MessageSquare size={32} /></div>
                        <h3>How can I help you build?</h3>
                        <p>Ask me to generate code, write copy, or explain concepts.</p>
                      </div>
                    )}
                    {messages.map((m, i) => (
                      <div key={i} className={`message ${m.role}`}>
                        <div className="bubble">
                          {m.text.split('\n').map((line, j) => <div key={j}>{line}</div>)}
                        </div>
                      </div>
                    ))}
                    {loading && <div className="message model"><div className="bubble typing">...</div></div>}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Input Box */}
                  <div className="chat-input-area">
                    <button className="icon-btn" onClick={() => setShowKeyInput(true)} title="API Key">
                      <Key size={18} />
                    </button>
                    <input
                      ref={inputRef}
                      type="text"
                      className="chat-input"
                      placeholder="Ask Gemini..."
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                    />
                    <button className="send-btn" onClick={handleSendMessage} disabled={loading || !q.trim()}>
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;

