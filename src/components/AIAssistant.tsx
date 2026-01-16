import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { GeminiService } from '../services/gemini';
import { MessageSquare, Search, Command } from 'lucide-react';
import { searchSite } from '../data/siteIndex';
import '../styles/odoo-theme.css';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export const AIAssistant: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'command' | 'chat'>('command');
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ReturnType<typeof searchSite>>([]);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showKeyInput, setShowKeyInput] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(true);
        setMode('command');
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      if (open && e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  const handleSearch = (query: string) => {
    setQ(query);
    if (mode === 'command') {
      const res = searchSite(query);
      setResults(res);
    }
  };

  const handleSendMessage = async () => {
    if (!q.trim()) return;

    if (mode === 'command' && q.includes('?')) {
      setMode('chat');
    }

    if (mode === 'chat') {
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
        const response = await service.generateContent(userMsg);
        setMessages(prev => [...prev, { role: 'model', text: response }]);
      } catch (err: any) {
        setMessages(prev => [...prev, { role: 'model', text: `Error: ${err.message}` }]);
      } finally {
        setLoading(false);
      }
    }
  };

  if (!open) return null;

  return (
    <>
      <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
        style={{ zIndex: 1050, backdropFilter: 'blur(4px)' }}
        onClick={() => setOpen(false)}></div>

      <div className="position-fixed start-50 translate-middle-x bg-white rounded-3 shadow-lg overflow-hidden d-flex flex-column"
        style={{
          top: '15%',
          width: '100%',
          maxWidth: '640px',
          zIndex: 1060,
          maxHeight: '600px',
          animation: 'slideInDown 0.2s ease-out'
        }}
        onClick={e => e.stopPropagation()}>

        {/* Header / Input */}
        <div className="d-flex align-items-center p-3 border-bottom">
          <Search className="text-muted me-3" size={20} />
          <input
            ref={inputRef}
            type="text"
            className="form-control border-0 shadow-none fs-5 p-0 text-dark"
            placeholder={mode === 'chat' ? "Ask AI..." : "Search commands or files... (Ctrl+K)"}
            value={q}
            onChange={e => handleSearch(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            style={{ outline: 'none' }}
          />
          <div className="d-flex align-items-center gap-2 ms-3">
            <button
              className={`btn btn-sm p-1 rounded ${mode === 'chat' ? 'text-primary bg-primary-subtle' : 'text-muted hover-bg-light'}`}
              onClick={() => setMode('chat')}
              title="Switch to Chat"
            >
              <MessageSquare size={18} />
            </button>
            <div className="vr text-muted opacity-25" style={{ height: '16px' }}></div>
            <button className="btn btn-sm text-muted p-0" onClick={() => setOpen(false)}>
              <small className="border rounded px-1 text-muted fw-bold" style={{ fontSize: '0.7rem' }}>ESC</small>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-auto bg-light" style={{ minHeight: '300px', maxHeight: '500px' }}>
          {mode === 'command' && (
            <div className="p-2">
              {results.length > 0 ? (
                <div className="d-flex flex-column gap-1">
                  <div className="small fw-bold text-muted text-uppercase px-3 py-2" style={{ fontSize: '0.75rem' }}>Best Matches</div>
                  {results.map((r, i) => (
                    <Link
                      key={i}
                      to={r.doc.path}
                      onClick={() => setOpen(false)}
                      className="d-flex align-items-center justify-content-between px-3 py-2 rounded text-decoration-none text-dark hover-bg-primary-subtle transition-colors group"
                    >
                      <div className="d-flex align-items-center gap-3">
                        <Command size={16} className="text-muted group-hover-text-primary" />
                        <span className="fw-medium">{r.doc.title}</span>
                      </div>
                      <span className="badge bg-white text-muted border fw-normal">{r.doc.category}</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-5 text-muted">
                  <p className="mb-0">{q ? 'No results found.' : 'Type to search...'}</p>
                </div>
              )}
            </div>
          )}

          {mode === 'chat' && (
            <div className="d-flex flex-column h-100 p-3">
              <div className="d-flex flex-column gap-3 flex-grow-1">
                {!apiKey && (
                  <div className="alert alert-warning p-3 mb-0 small">
                    Please configure your Gemini API Key.
                    <input
                      type="password"
                      className="form-control form-control-sm mt-2"
                      placeholder="Paste Key & Enter"
                      onKeyDown={e => { if (e.key === 'Enter') { setApiKey(e.currentTarget.value); localStorage.setItem('gemini_api_key', e.currentTarget.value); } }}
                    />
                  </div>
                )}
                {messages.map((m, i) => (
                  <div key={i} className={`d-flex ${m.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                    <div className={`p-3 rounded-3 shadow-sm text-sm ${m.role === 'user' ? 'bg-primary text-white' : 'bg-white border text-dark'}`} style={{ maxWidth: '85%' }}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="d-flex justify-content-start">
                    <div className="bg-white border rounded-3 px-3 py-2 text-muted fst-italic small">
                      Thinking...
                    </div>
                  </div>
                )}
                <div ref={chatEndRef}></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .hover-bg-light:hover { background-color: #f8f9fa; }
        .hover-bg-primary-subtle:hover { background-color: rgba(113, 75, 103, 0.1); color: var(--o-color-primary) !important; }
        .group-hover-text-primary:hover, .group:hover .group-hover-text-primary { color: var(--o-color-primary) !important; }
        @keyframes slideInDown {
          from { opacity: 0; transform: translate(-50%, -20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </>
  );
};

export default AIAssistant;
