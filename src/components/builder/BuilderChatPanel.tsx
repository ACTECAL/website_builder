import React, { useRef, useState, useEffect } from 'react';
import { GeminiService } from '../../services/gemini';
import { Sparkles, Send, Key } from 'lucide-react';
import { useBuilder } from './BuilderContext';
import './BuilderChatPanel.css';

interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

export const BuilderChatPanel: React.FC = () => {
    const { addBlock } = useBuilder();
    const [q, setQ] = useState('');
    const [loading, setLoading] = useState(false);

    // Chat State
    const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [showKeyInput, setShowKeyInput] = useState(false);

    const chatEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Scroll to bottom of chat
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

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
            const prompt = `You are an AI Web Builder Assistant. 
      The user wants to: ${userMsg}
      
      Available Tools:
      - Create Hero Section
      - Add Features
      - Insert Text
      
      Provide a concise, helpful response. If you identify a clear intent to add a component, confirm it.`;

            const response = await service.generateContent(prompt);
            setMessages(prev => [...prev, { role: 'model', text: response }]);

            // Basic heuristic to add blocks
            const lowerMsg = userMsg.toLowerCase();
            if (lowerMsg.includes('hero')) addBlock('hero');
            else if (lowerMsg.includes('header')) addBlock('header');
            else if (lowerMsg.includes('feature')) addBlock('features');
            else if (lowerMsg.includes('footer')) addBlock('footer');

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

    const suggestions = ['Add a Hero section', 'Create a Features list', 'Add a Footer', 'Explain how to use this'];

    return (
        <div className="builder-chat-panel">

            {/* Header */}
            <div className="chat-header">
                <div className="chat-logo-icon">
                    <Sparkles size={18} />
                </div>
                <div className="chat-title">AI Builder</div>
            </div>

            {/* Chat Area */}
            <div className="chat-messages-area">
                {(!apiKey || showKeyInput) && (
                    <div className="api-config-card">
                        <h4>Setup Gemini API</h4>
                        <p>Required to generate content. Your key is stored locally.</p>
                        <input
                            className="api-input"
                            type="password"
                            placeholder="Paste API Key (starts with AIza...)"
                            onKeyDown={(e) => { if (e.key === 'Enter') handleKeySave(e.currentTarget.value) }}
                        />
                    </div>
                )}

                {messages.length === 0 && !showKeyInput && (
                    <div className="chat-empty-state">
                        <h3 className="chat-empty-title">What are we building?</h3>
                        <p className="chat-empty-desc">Describe your vision or pick a suggestion.</p>
                        <div className="suggestion-chips">
                            {suggestions.map(s => (
                                <button key={s} className="suggestion-chip" onClick={() => setQ(s)}>
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {messages.map((m, i) => (
                    <div key={i} className={`chat-message-row ${m.role}`}>
                        <div className={`chat-avatar avatar-${m.role}`}>
                            {m.role === 'user' ? 'You' : <Sparkles size={14} />}
                        </div>
                        <div className="message-bubble">
                            {m.text.split('\n').map((line, j) => <div key={j}>{line}</div>)}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="chat-message-row model">
                        <div className="chat-avatar avatar-ai"><Sparkles size={14} /></div>
                        <div className="message-bubble">
                            <div className="typing-dots">
                                <div className="dot"></div><div className="dot"></div><div className="dot"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="chat-input-wrapper">
                <div className="chat-input-container">
                    <button className="action-btn" onClick={() => setShowKeyInput(true)} title="API Key">
                        <Key size={16} />
                    </button>
                    <input
                        ref={inputRef}
                        type="text"
                        className="chat-input-field"
                        placeholder="Ask AI to build..."
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                        disabled={loading}
                    />
                    <button className="action-btn send-btn" onClick={handleSendMessage} disabled={loading || !q.trim()}>
                        {loading ? <div className="typing-dot-white" /> : <Send size={16} />}
                    </button>
                </div>
            </div>
        </div>
    );
};
