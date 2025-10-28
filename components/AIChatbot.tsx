'use client';

import { useState, useEffect, useRef } from 'react';
import { elizaAssistant, AIResponse } from '@/lib/aiAssistant';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string; suggestions?: string[] }>>([
    { role: 'assistant', content: 'Olá! Sou o assistente da TokenCasa. Como posso ajudá-lo?', suggestions: ['Como investir?', 'Ver marketplace', 'Sobre a plataforma'] }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    
    // Adiciona mensagem do usuário
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Processa mensagem com elizaAssistant
      const response: AIResponse = await elizaAssistant.processMessage(userMessage);
      
      // Adiciona resposta do assistente
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.message,
        suggestions: response.suggestions
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Desculpe, ocorreu um erro ao processar sua mensagem.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
    handleSend();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Botão flutuante */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-primary-600 hover:bg-primary-700 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-50"
          aria-label="Abrir chat"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-xl shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="bg-primary-600 text-white p-4 rounded-t-xl flex items-center justify-between">
            <div>
              <h3 className="font-semibold">TokenCasa Assistant</h3>
              <p className="text-xs text-primary-100">Pergunte sobre investimentos</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  {message.suggestions && message.role === 'assistant' && (
                    <div className="mt-2 space-y-2">
                      {message.suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestion(suggestion)}
                          className="block text-xs text-primary-600 hover:text-primary-700 border border-primary-300 rounded px-2 py-1"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua pergunta..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Powered by elizaOS AI
            </p>
          </div>
        </div>
      )}
    </>
  );
}

