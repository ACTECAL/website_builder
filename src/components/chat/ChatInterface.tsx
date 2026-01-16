import React, { useRef, useEffect } from 'react';
import { ChatMessage, ChatOption } from '../../pages/types/launchPlan.types';

interface ChatInterfaceProps {
  isOpen: boolean;
  messages: ChatMessage[];
  messageDraft: string;
  selectedOption: ChatOption | null;
  onMessageSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClose: () => void;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  chatMenuRef: React.RefObject<HTMLDivElement>;
  chatButtonRef: React.RefObject<HTMLButtonElement>;
  chatOptions: ChatOption[];
  onChatOptionSelect: (optionId: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  isOpen,
  messages,
  messageDraft,
  selectedOption,
  onMessageSubmit,
  onMessageChange,
  onClose,
  inputRef,
  chatMenuRef,
  chatButtonRef,
  chatOptions,
  onChatOptionSelect,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, inputRef]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col h-[500px] z-50">
      {/* Chat header */}
      <div className="bg-indigo-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <h3 className="font-medium">
          {selectedOption ? selectedOption.label : 'Chat with Actyx'}
        </h3>
        <button
          onClick={onClose}
          className="text-white hover:text-indigo-200 focus:outline-none"
          aria-label="Close chat"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!selectedOption ? (
          <div className="space-y-2">
            <p className="text-sm text-gray-600 mb-4">How can I help you today?</p>
            {chatOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => onChatOptionSelect(option.id)}
                className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
                    <i className={option.icon}></i>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{option.label}</p>
                    <p className="text-xs text-gray-500">{option.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <>
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 my-8">
                <p>How can I help you with {selectedOption.label.toLowerCase()}?</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.author === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${message.author === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    {message.timestamp && (
                      <p className="text-xs mt-1 opacity-70">
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message input */}
      {selectedOption && (
        <form onSubmit={onMessageSubmit} className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <textarea
              ref={inputRef}
              value={messageDraft}
              onChange={onMessageChange}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  onMessageSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
                }
              }}
            />
            <button
              type="submit"
              disabled={!messageDraft.trim()}
              className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ChatInterface;
