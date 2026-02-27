import React, { useState, useRef, useEffect } from 'react';

interface Block {
  id: string;
  type: string;
  content: any;
  styles?: any;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
  time: string;
}

interface ChatState {
  messages: ChatMessage[];
  inputValue: string;
  isLoading: boolean;
}

type BlockType = 'hero' | 'header' | 'features' | 'footer' | 'text' | 'image' | 'button' | 'form';

const AIWebsiteBuilder: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [chatState, setChatState] = useState<ChatState>({
    messages: [
      { role: 'assistant', text: 'Hello! I\'m your AI assistant. I can help you build a website by adding components, styling, and functionality. What would you like to create?', time: '10:00 AM' }
    ],
    inputValue: '',
    isLoading: false
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages]);

  const BLOCK_TYPES: Record<BlockType, { name: string; icon: string; description: string }> = {
    hero: { name: 'Hero Section', icon: '🎯', description: 'Eye-catching hero with title and CTA' },
    header: { name: 'Header', icon: '📋', description: 'Navigation header with logo and menu' },
    features: { name: 'Features', icon: '⭐', description: 'Showcase product features' },
    footer: { name: 'Footer', icon: '📄', description: 'Site footer with links and info' },
    text: { name: 'Text Block', icon: '📝', description: 'Rich text content block' },
    image: { name: 'Image', icon: '🖼️', description: 'Image with caption' },
    button: { name: 'Button', icon: '🔘', description: 'Interactive button element' },
    form: { name: 'Form', icon: '📋', description: 'Contact or signup form' }
  };

  const addBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: Date.now().toString(),
      type,
      content: BLOCK_TYPES[type].name
    };
    setBlocks([...blocks, newBlock]);
  };


  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatState.inputValue.trim()) return;

    const userMessage = {
      role: 'user' as const,
      text: chatState.inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      inputValue: '',
      isLoading: true
    }));

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        role: 'assistant' as const,
        text: 'I\'ll help you with that! Let me add the appropriate components to your website.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, aiResponse],
        isLoading: false
      }));

      // Auto-add a block based on the message
      if (chatState.inputValue.toLowerCase().includes('hero')) {
        addBlock('hero');
      } else if (chatState.inputValue.toLowerCase().includes('header')) {
        addBlock('header');
      } else if (chatState.inputValue.toLowerCase().includes('feature')) {
        addBlock('features');
      }
    }, 1000);
  };

  const renderBlock = (block: Block) => {
    switch (block.type) {
      case 'hero':
        return (
          <div style={{
            padding: '80px 20px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: '12px',
            margin: '20px 0'
          }}>
            <h1>Welcome to Your Website</h1>
            <p>Build something amazing with AI</p>
            <button style={{
              padding: '12px 24px',
              background: 'white',
              color: '#667eea',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}>Get Started</button>
          </div>
        );
      case 'header':
        return (
          <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px',
            background: '#f8f9fa',
            borderBottom: '1px solid #dee2e6',
            borderRadius: '8px',
            margin: '10px 0'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Logo</div>
            <nav style={{ display: 'flex', gap: '20px' }}>
              <span>Home</span>
              <span>About</span>
              <span>Contact</span>
            </nav>
          </header>
        );
      case 'features':
        return (
          <div style={{
            padding: '40px 20px',
            background: '#f8f9fa',
            borderRadius: '12px',
            margin: '20px 0'
          }}>
            <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Features</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div style={{ padding: '20px', background: 'white', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>🚀</div>
                <h3>Fast</h3>
                <p>Lightning quick performance</p>
              </div>
              <div style={{ padding: '20px', background: 'white', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>🎨</div>
                <h3>Beautiful</h3>
                <p>Modern, clean design</p>
              </div>
              <div style={{ padding: '20px', background: 'white', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>📱</div>
                <h3>Responsive</h3>
                <p>Works on all devices</p>
              </div>
            </div>
          </div>
        );
      default:
        return <div key={block.id}>Unknown block type: {block.type}</div>;
    }
  };

  // const selectedBlock = blocks.find((b: Block) => b.id === selectedId) || null;

  return (
    <>
      <style>{`
        :root {
          --bg: #0a0a0a;
          --muted: #71717a;
          --accent: #8b5cf6;
          --accent-dark: #7c3aed;
          --accent-light: #a78bfa;
          --card: #18181b;
          --card-hover: #27272a;
          --border: #27272a;
          --border-light: #3f3f46;
          --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
          --shadow: 0 4px 24px rgba(0, 0, 0, 0.4), 0 2px 12px rgba(0, 0, 0, 0.3);
          --shadow-lg: 0 20px 40px rgba(0, 0, 0, 0.5), 0 8px 16px rgba(0, 0, 0, 0.3);
          --shadow-xl: 0 32px 64px rgba(0, 0, 0, 0.6), 0 16px 32px rgba(0, 0, 0, 0.4);
          --gradient-primary: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
          --gradient-accent: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
          --gradient-soft: linear-gradient(135deg, #0a0a0a 0%, #18181b 100%);
          --gradient-glass: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
          --text-primary: #fafafa;
          --text-secondary: #a1a1aa;
          --text-muted: #71717a;
        }
        
        * { box-sizing: border-box; }
        body { 
          margin: 0; 
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
          background: var(--gradient-soft); 
          color: var(--text-primary);
          line-height: 1.6;
          font-feature-settings: cv02, cv03, cv04, cv11;
          font-weight: 400;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Lovable Main Container */
        .lovable-main {
          background: linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 100%);
          min-height: 100vh;
          position: relative;
        }

        .lovable-main::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .lovable-content {
          position: relative;
          z-index: 1;
          display: flex;
          height: 100vh;
        }

        .lovable-left-panel {
          width: 320px;
          background: rgba(17, 24, 39, 0.95);
          -webkit-backdrop-filter: blur(20px);
          backdrop-filter: blur(20px);
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
        }

        .lovable-center {
          flex: 1;
          background: rgba(15, 15, 30, 0.8);
          -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
          display: flex;
          flex-direction: column;
        }

        .lovable-right-panel {
          width: 380px;
          background: rgba(17, 24, 39, 0.95);
          -webkit-backdrop-filter: blur(20px);
          backdrop-filter: blur(20px);
          border-left: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
        }

        .lovable-header {
          background: rgba(17, 24, 39, 0.95);
          -webkit-backdrop-filter: blur(20px);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .lovable-title {
          color: white;
          font-size: 18px;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .lovable-subtitle {
          color: rgba(255, 255, 255, 0.7);
          font-size: 12px;
          margin-top: 4px;
        }

        .lovable-toolbar {
          background: rgba(17, 24, 39, 0.95);
          -webkit-backdrop-filter: blur(20px);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 12px 20px;
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .lovable-toolbar-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          border-radius: 8px;
          padding: 8px 16px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .lovable-toolbar-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
        }

        .lovable-canvas {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
          background: rgba(15, 15, 30, 0.5);
        }

        .lovable-block-list {
          padding: 20px;
          overflow-y: auto;
        }

        .lovable-chat-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 20px;
        }

        .lovable-messages {
          flex: 1;
          overflow-y: auto;
          margin-bottom: 20px;
        }

        .lovable-input-container {
          display: flex;
          gap: 12px;
          padding: 16px;
          background: rgba(17, 24, 39, 0.95);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .lovable-send-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 8px;
          width: 40px;
          height: 40px;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .lovable-send-btn:hover {
          transform: scale(1.05);
        }

        .lovable-logo {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 16px;
        }

        .lovable-block-item {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 16px;
          margin-bottom: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: white;
        }
        
        .lovable-block-item:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }
        
        .lovable-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 18px;
          font-weight: 600;
        }

        .lovable-message {
          background: rgba(255, 255, 255, 0.1);
          -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          padding: 16px 20px;
          margin-bottom: 12px;
          color: white;
        }
        
        .lovable-message.user {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
        }
        
        .lovable-message.assistant {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .lovable-input {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
          color: white;
          border-radius: 12px;
          padding: 14px 18px;
          font-size: 14px;
          transition: all 0.3s ease;
        }
        
        .lovable-input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }
        
        .lovable-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          background: rgba(255, 255, 255, 0.15);
        }

        .lovable-quick-action {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 8px 16px;
          color: white;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .lovable-quick-action:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
        }

        .ai-block-category { margin-bottom: 32px; }
        .ai-category-title { 
          font-size: 11px; 
          font-weight: 700; 
          text-transform: uppercase; 
          letter-spacing: 1.2px;
          color: var(--text-muted);
          margin-bottom: 20px; 
          line-height: 1.4;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ai-block-info { flex: 1; position: relative; z-index: 1; }
        .ai-block-title { 
          font-weight: 600; 
          font-size: 14px; 
          color: var(--text-primary);
          margin-bottom: 4px; 
          line-height: 1.3;
          letter-spacing: -0.01em;
        }
        .ai-block-desc { 
          font-size: 12px; 
          color: var(--text-muted);
          line-height: 1.4;
        }
        .ai-block-action { 
          font-size: 11px; 
          font-weight: 600;
          color: var(--accent);
          opacity: 0;
          transform: translateX(10px);
          transition: all 0.3s ease;
        }
        .lovable-block-item:hover .ai-block-action {
          opacity: 1;
          transform: translateX(0);
        }
        .ai-empty-state { 
          text-align: center; 
          padding: 80px 20px; 
          color: var(--text-muted); 
          border-radius: 20px;
          background: var(--gradient-glass);
          border: 1px dashed var(--border);
          transition: all 0.3s ease;
        }
        .ai-empty-state:hover {
          border-color: var(--accent-light);
          background: var(--card-hover);
        }
        .ai-empty-state-icon { 
          font-size: 64px; 
          margin-bottom: 24px; 
          opacity: 0.6;
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .ai-empty-state-title { 
          font-size: 20px; 
          font-weight: 700; 
          margin-bottom: 12px; 
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }
        .ai-empty-state-desc { 
          font-size: 16px; 
          margin-bottom: 32px; 
          line-height: 1.6;
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
          color: var(--text-secondary);
        }
        .ai-quick-actions {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }
        .ai-message-content {
          display: flex;
          gap: 12px;
        }
        .ai-message-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .ai-message-bubble {
          flex: 1;
        }
        .ai-message-text {
          margin-bottom: 4px;
          line-height: 1.5;
        }
        .ai-message-time {
          font-size: 11px;
          opacity: 0.7;
        }
        .lovable-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          padding: 12px 24px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .lovable-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }
      `}</style>

      <div className="lovable-main">
        <div className="lovable-content">
          {/* Left Panel - Block Library */}
          <div className="lovable-left-panel">
            <div className="lovable-header">
              <div className="lovable-logo">L</div>
              <div>
                <div className="lovable-title">Components</div>
                <div className="lovable-subtitle">Drag to add</div>
              </div>
            </div>
            <div className="lovable-block-list">
              {Object.entries(BLOCK_TYPES).map(([type, info]) => (
                <div key={type} className="ai-block-category">
                  <div className="ai-category-title">Components</div>
                  <div key={type} className="lovable-block-item">
                    <div className="left">
                      <div className="lovable-icon">{info.icon}</div>
                      <div className="ai-block-info">
                        <div className="ai-block-title">{info.name}</div>
                        <div className="ai-block-desc">{info.description}</div>
                      </div>
                    </div>
                    <div className="ai-block-action">+</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center - Canvas */}
          <div className="lovable-center">
            <div className="lovable-toolbar">
              <button className="lovable-toolbar-btn">Preview</button>
              <button className="lovable-toolbar-btn">Code</button>
              <button className="lovable-toolbar-btn">Deploy</button>
              <button className="lovable-toolbar-btn">Share</button>
            </div>
            <div className="lovable-canvas">
              {blocks.length === 0 ? (
                <div className="ai-empty-state">
                  <div className="ai-empty-state-icon">🚀</div>
                  <div className="ai-empty-state-title">Start Building</div>
                  <div className="ai-empty-state-desc">Add components from the left panel or ask the AI assistant to help you build your website.</div>
                  <button className="lovable-button">Get Started</button>
                </div>
              ) : (
                blocks.map((block: Block) => renderBlock(block))
              )}
            </div>
          </div>

          {/* Right Panel - AI Chat */}
          <div className="lovable-right-panel">
            <div className="lovable-header">
              <div>
                <div className="lovable-title">AI Assistant</div>
                <div className="lovable-subtitle">Ask me anything</div>
              </div>
              <div className="lovable-icon">🤖</div>
            </div>
            <div className="lovable-chat-container">
              <div className="lovable-messages">
                {chatState.messages.map((message: any, index: number) => (
                  <div key={index} className={`lovable-message ${message.role === "user" ? "user" : "assistant"}`}>
                    <div className="ai-message-content">
                      <div className="ai-message-avatar">
                        {message.role === "user" ? "👤" : "🤖"}
                      </div>
                      <div className="ai-message-bubble">
                        <div className="ai-message-text">
                          {message.text.includes('**') ? (
                            message.text.split('**').map((part: string, index: number) =>
                              index % 2 === 1 ? <strong key={index}>{part}</strong> : <span key={index}>{part}</span>
                            )
                          ) : (
                            message.text
                          )}
                        </div>
                        <div className="ai-message-time">{message.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <div className="lovable-input-container">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="lovable-input"
                  id="ai-chat-input"
                  value={chatState.inputValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setChatState(prev => ({ ...prev, inputValue: e.target.value }))
                  }
                  onKeyPress={(e: React.KeyboardEvent) =>
                    e.key === 'Enter' && handleSendMessage(e)
                  }
                />
                <button
                  className="lovable-send-btn"
                  onClick={(e) => handleSendMessage(e as unknown as React.FormEvent)}
                >
                  ➤
                </button>
              </div>
              <div className="ai-quick-actions">
                <button className="lovable-quick-action">🎯 Hero</button>
                <button className="lovable-quick-action">⭐ Features</button>
                <button className="lovable-quick-action">🚀 Website</button>
                <button className="lovable-quick-action">💡 Help</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIWebsiteBuilder;
