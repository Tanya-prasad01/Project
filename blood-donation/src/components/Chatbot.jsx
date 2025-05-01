// src/components/Chatbot.jsx
import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';
import axios from 'axios';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Load session ID from localStorage
  useEffect(() => {
    const savedSessionId = localStorage.getItem('chatbotSessionId');
    if (savedSessionId) {
      setSessionId(savedSessionId);
      // Optionally load previous messages
      fetchConversation(savedSessionId);
    }
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchConversation = async (sid) => {
    try {
      const response = await axios.get(`/api/chatbot/conversation/${sid}`);
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Error fetching conversation:', error);
      // If conversation not found, start with welcome message
      setMessages([
        {
          sender: 'bot',
          content: "Hello! I'm your Blood Donation Assistant. How can I help you today?",
          timestamp: new Date()
        }
      ]);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage = {
      sender: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);
    
    try {
      const response = await axios.post('/api/chatbot/chat', {
        message: input,
        sessionId: sessionId
      });
      
      // Update session ID if new
      if (!sessionId) {
        setSessionId(response.data.sessionId);
        localStorage.setItem('chatbotSessionId', response.data.sessionId);
      }
      
      // Add bot response
      const botMessage = {
        sender: 'bot',
        content: response.data.response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      
      // Add error message
      const errorMessage = {
        sender: 'bot',
        content: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    
    // If opening for first time and no messages, add welcome message
    if (!isOpen && messages.length === 0) {
      setMessages([
        {
          sender: 'bot',
          content: "Hello! I'm your Blood Donation Assistant. How can I help you today?",
          timestamp: new Date()
        }
      ]);
    }
  };

  return (
    <div className="chatbot-container">
      {/* Chatbot toggle button */}
      <button 
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`} 
        onClick={toggleChat}
      >
        {isOpen ? 'X' : <i className="fas fa-comment"></i>}
      </button>
      
      {/* Chatbot dialog */}
      <div className={`chatbot-dialog ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <h3>Blood Donation Assistant</h3>
        </div>
        
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`message ${msg.sender === 'bot' ? 'bot' : 'user'}`}
            >
              {msg.content}
            </div>
          ))}
          {loading && (
            <div className="message bot loading">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <form className="chatbot-input" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            disabled={loading}
          />
          <button type="submit" disabled={loading || !input.trim()}>
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
        
        <div className="chatbot-footer">
          <p>Ask me about blood donation, eligibility, or how to use the app!</p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;