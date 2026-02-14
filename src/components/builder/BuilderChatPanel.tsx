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
            const systemPrompt = `You are a pro-grade AI Web Builder Assistant. 
Your goal is to help the user build a website by generating component data in JSON format.

When asked to add a component, ALWAYS respond with a JSON block followed by a brief confirmation.

JSON Schema for block:
{
  "action": "addBlock",
  "type": "hero" | "features" | "text" | "button" | "header" | "footer",
  "content": { ... matching the type's content schema ... }
}

Types & Content Schemas:
- hero: { "title": "string", "subtitle": "string", "cta": "string" }
- features: { "items": [{ "title": "string", "desc": "string" }] }
- text: { "text": "string" }
- header: { "title": "string", "nav": ["string"] }
- footer: { "text": "string" }

Example for "Add a hero":
{ "action": "addBlock", "type": "hero", "content": { "title": "Future of ERP", "subtitle": "Intelligent site generation.", "cta": "Get Started" } }

User request: "${userMsg}"

Respond ONLY with the JSON block if an action is required, or a helpful response if just chatting. If adding a block, put the JSON first then your text.`;

            const response = await service.generateContent(systemPrompt);

            // Extract JSON if present
            let cleanResponse = response;
            const jsonMatch = response.match(/\{[\s\S]*\}/);

            if (jsonMatch) {
                try {
                    const blockData = JSON.parse(jsonMatch[0]);
                    if (blockData.action === 'addBlock' && blockData.type) {
                        addBlock(blockData.type, blockData.content);
                        cleanResponse = response.replace(jsonMatch[0], '').trim();
                        if (!cleanResponse) cleanResponse = `Added a ${blockData.type} section for you!`;
                    }
                } catch (e) {
                    console.error("Failed to parse AI JSON", e);
                }
            }

            setMessages(prev => [...prev, { role: 'model', text: cleanResponse }]);

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

    const suggestions = [
        'Add a high-conversion hero section',
        'Create a features list with icons',
        'Insert a modern newsletter footer',
        'Optimize typography for mobile devices'
    ];

    return (
        <div className="builder-chat-panel">

            {/* Header */}
            <div className={`chat-header ${loading ? 'model-generating' : ''}`}>
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
                        <h3 className="chat-empty-title">What can I build for you?</h3>
                        <p className="chat-empty-desc">Describe a section, a page, or a full workflow.</p>
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
                        {loading ? <div className="dot" style={{ background: 'white' }} /> : <Send size={16} />}
                    </button>
                </div>
            </div>
        </div>
    );
};
