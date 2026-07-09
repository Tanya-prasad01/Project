// src/components/ChatbotPortal.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Chatbot from './Chatbot';

const ChatbotPortal = () => {
  return ReactDOM.createPortal(
    <Chatbot />,
    document.body
  );
};

export default ChatbotPortal;