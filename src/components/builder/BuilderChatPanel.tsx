import React, { useRef, useState, useEffect } from 'react';
import { GeminiService } from '../../services/gemini';
import { Sparkles, Send, Key, Mic, MicOff } from 'lucide-react';
import { useBuilder } from './BuilderContext';
import './BuilderChatPanel.css';


export const BuilderChatPanel: React.FC = () => {
    const { addMessage, messages, setThemeColor, setDraftBlock, blocks } = useBuilder();
    const [q, setQ] = useState('');
    const [loading, setLoading] = useState(false);
    const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');
    const [showKeyInput, setShowKeyInput] = useState(false);
    const [isListening, setIsListening] = useState(false);

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
        addMessage('user', userMsg);
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
      - Change Theme Color (Return CSS color hex if they want a color change)
      
      Provide a concise, helpful response. If you identify a clear intent to add a component or change color, confirm it.`;

            const response = await service.generateContent(prompt);
            addMessage('model', response);

            // Basic heuristic to add blocks
            const lowerMsg = userMsg.toLowerCase();
            let type: any = null;
            if (lowerMsg.includes('hero')) type = 'hero';
            else if (lowerMsg.includes('header')) type = 'header';
            else if (lowerMsg.includes('feature')) type = 'features';
            else if (lowerMsg.includes('footer')) type = 'footer';

            if (type) {
                const newDraft = {
                    id: Math.random().toString(36).substr(2, 9),
                    type,
                    content: {}, 
                    styles: {}
                };
                setDraftBlock(newDraft as any);
            }

            // Structural Analysis
            if (lowerMsg.includes('analyze') || lowerMsg.includes('structure') || lowerMsg.includes('group')) {
                const analysis = await service.suggestGroupings(blocks);
                addMessage('model', `Architect's Analysis: ${analysis}`);
            }

            // Aura color logic
            if (lowerMsg.includes('color') || lowerMsg.includes('aura') || lowerMsg.includes('theme')) {
                const hexMatch = response.match(/#[0-9A-Fa-f]{6}/);
                if (hexMatch) {
                    setThemeColor(hexMatch[0]);
                }
            }

        } catch (err: any) {
            addMessage('model', `Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const toggleVoice = () => {
        if (!('webkitSpeechRecognition' in window)) {
            addMessage('model', "Voice recognition is not supported in this browser.");
            return;
        }

        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        if (isListening) {
            recognition.stop();
            setIsListening(false);
            return;
        }

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onerror = () => setIsListening(false);
        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setQ(transcript);
            // Auto-send if it's a clear command
            if (transcript.toLowerCase().includes('add') || transcript.toLowerCase().includes('change')) {
                setTimeout(() => handleSendMessage(), 500);
            }
        };

        recognition.start();
    };

    const handleKeySave = (key: string) => {
        setApiKey(key);
        localStorage.setItem('gemini_api_key', key);
        setShowKeyInput(false);
    };

    const suggestions = ['Add a Hero section', 'Create a Features list', 'Analyze structure', 'Explain how to use this'];

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

                {messages.map((m) => (
                    <div key={m.id} className={`chat-message-row ${m.role}`}>
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
                    <div className="chat-input-area">
                        <button
                            className={`icon-btn mic-btn ${isListening ? 'listening' : ''}`}
                            onClick={toggleVoice}
                            title="Voice Command"
                        >
                            {isListening ? <Mic size={18} /> : <MicOff size={18} />}
                        </button>
                        <input
                            ref={inputRef}
                            type="text"
                            className="chat-input"
                            placeholder="Ask Gemini or use voice..."
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                            disabled={loading}
                        />
                        <button className="send-btn" onClick={handleSendMessage} disabled={loading || !q.trim()} title="Send message">
                            {loading ? <div className="typing-dot-white" /> : <Send size={18} />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
