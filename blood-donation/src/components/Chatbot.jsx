// src/components/Chatbot.jsx
// import React, { useState, useEffect, useRef } from 'react';
// import './Chatbot.css';
// import axios from 'axios';

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [sessionId, setSessionId] = useState('');
//   const [loading, setLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   // Load session ID from localStorage
//   useEffect(() => {
//     const savedSessionId = localStorage.getItem('chatbotSessionId');
//     if (savedSessionId) {
//       setSessionId(savedSessionId);
//       // Optionally load previous messages
//       fetchConversation(savedSessionId);
//     }
//   }, []);

//   // Scroll to bottom of messages
//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const fetchConversation = async (sid) => {
//     try {
//       const response = await axios.get(`/api/chatbot/conversation/${sid}`);
//       setMessages(response.data.messages);
//     } catch (error) {
//       console.error('Error fetching conversation:', error);
//       // If conversation not found, start with welcome message
//       setMessages([
//         {
//           sender: 'bot',
//           content: "Hello! I'm your Blood Donation Assistant. How can I help you today?",
//           timestamp: new Date()
//         }
//       ]);
//     }
//   };

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!input.trim()) return;
    
//     // Add user message to chat
//     const userMessage = {
//       sender: 'user',
//       content: input,
//       timestamp: new Date()
//     };
    
//     setMessages([...messages, userMessage]);
//     setInput('');
//     setLoading(true);
    
//     try {
//       const response = await axios.post('/api/chatbot/chat', {
//         message: input,
//         sessionId: sessionId
//       });
      
//       // Update session ID if new
//       if (!sessionId) {
//         setSessionId(response.data.sessionId);
//         localStorage.setItem('chatbotSessionId', response.data.sessionId);
//       }
      
//       // Add bot response
//       const botMessage = {
//         sender: 'bot',
//         content: response.data.response,
//         timestamp: new Date()
//       };
      
//       setMessages(prev => [...prev, botMessage]);
//     } catch (error) {
//       console.error('Chatbot error:', error);
      
//       // Add error message
//       const errorMessage = {
//         sender: 'bot',
//         content: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
//         timestamp: new Date()
//       };
      
//       setMessages(prev => [...prev, errorMessage]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleChat = () => {
//     setIsOpen(!isOpen);
    
//     // If opening for first time and no messages, add welcome message
//     if (!isOpen && messages.length === 0) {
//       setMessages([
//         {
//           sender: 'bot',
//           content: "Hello! I'm your Blood Donation Assistant. How can I help you today?",
//           timestamp: new Date()
//         }
//       ]);
//     }
//   };

//   return (
//     <div className="chatbot-container">
//       {/* Chatbot toggle button */}
//       <button 
//         className={`chatbot-toggle ${isOpen ? 'open' : ''}`} 
//         onClick={toggleChat}
//       >
//         {isOpen ? 'X' : <i className="fas fa-comment"></i>}
//       </button>
      
//       {/* Chatbot dialog */}
//       <div className={`chatbot-dialog ${isOpen ? 'open' : ''}`}>
//         <div className="chatbot-header">
//           <h3>Blood Donation Assistant</h3>
//         </div>
        
//         <div className="chatbot-messages">
//           {messages.map((msg, index) => (
//             <div 
//               key={index} 
//               className={`message ${msg.sender === 'bot' ? 'bot' : 'user'}`}
//             >
//               {msg.content}
//             </div>
//           ))}
//           {loading && (
//             <div className="message bot loading">
//               <div className="typing-indicator">
//                 <span></span>
//                 <span></span>
//                 <span></span>
//               </div>
//             </div>
//           )}
//           <div ref={messagesEndRef} />
//         </div>
        
//         <form className="chatbot-input" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Type your question..."
//             disabled={loading}
//           />
//           <button type="submit" disabled={loading || !input.trim()}>
//             <i className="fas fa-paper-plane"></i>
//           </button>
//         </form>
        
//         <div className="chatbot-footer">
//           <p>Ask me about blood donation, eligibility, or how to use the app!</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;




// import React, { useState, useEffect, useRef } from 'react';
// import './Chatbot.css';

// // Predefined responses for common questions
// const botResponses = {
//   'hello': 'Hello! How can I help you with blood donation today?',
//   'hi': 'Hi there! How can I assist you with blood donation?',
//   'donate': 'To donate blood, you need to be at least 18 years old, weigh at least 50kg, and be in good health. Would you like to know more?',
//   'donation': 'Blood donation is a simple process that takes about 45-60 minutes. You can donate whole blood every 3 months. Would you like more details?',
//   'eligibility': 'Eligibility factors include age (18-65), weight (50kg+), good health, and no recent tattoos or certain medications. Would you like me to check specific eligibility criteria?',
//   'eligible': 'Basic eligibility criteria include being at least 18 years old, weighing 50kg or more, and being in good health. Certain medications, recent travel, or medical conditions may affect eligibility.',
//   'blood type': 'There are 8 main blood types: A+, A-, B+, B-, AB+, AB-, O+, and O-. O- is a universal donor, and AB+ is a universal recipient.',
//   'blood group': 'The main blood groups are A, B, AB, and O, each with Rh positive or negative. Everyone has one of these 8 blood types.',
//   'time': 'The donation process takes about 45-60 minutes, with the actual blood draw only taking about 8-10 minutes.',
//   'how long': 'From registration to refreshment, the entire blood donation process takes about 45-60 minutes. The actual blood collection only takes 8-10 minutes.',
//   'thank': 'You\'re welcome! Thank you for your interest in blood donation. It saves lives!',
//   'thanks': 'You\'re welcome! Thank you for your interest in blood donation. It saves lives!',
//   'benefits': 'Donating blood helps save lives, gives you a free mini health check-up, and reduces your risk of heart disease and cancer. It also gives you a sense of fulfillment knowing you\'ve helped others.',
//   'appointment': 'To schedule an appointment, you can register on our platform as a donor and select "Donate" from the main menu. You can then choose a nearby donation center and available time slot.',
//   'who': 'Anyone in good health, aged 18-65, and weighing over 50kg can donate blood. Some medical conditions or recent travel may temporarily defer donation.',
//   'where': 'You can donate blood at any of our registered blood banks and donation centers. Use the "Search" feature on our platform to find locations near you.'
// };

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     { text: 'Hello! I can answer your questions about blood donation. How can I help you today?', sender: 'bot' }
//   ]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   const toggleChatbot = () => {
//     setIsOpen(!isOpen);
//   };

//   // Function to get bot response based on user input
//   const getBotResponse = (userInput) => {
//     const lowerInput = userInput.toLowerCase();
    
//     // Check for matches in our predefined responses
//     for (const [key, response] of Object.entries(botResponses)) {
//       if (lowerInput.includes(key)) {
//         return response;
//       }
//     }
    
//     // Default response if no match is found
//     return "I'm sorry, I don't have information on that topic yet. Would you like to know about blood donation eligibility, process, or benefits?";
//   };

//   const sendMessage = (e) => {
//     e.preventDefault();
//     if (input.trim() === '') return;

//     // Add user message to chat
//     const userMessage = { text: input, sender: 'user' };
//     setMessages([...messages, userMessage]);
//     setInput('');
//     setIsLoading(true);

//     // Simulate API delay for better UX
//     setTimeout(() => {
//       const botResponse = getBotResponse(input);
//       setMessages(prevMessages => [
//         ...prevMessages,
//         { text: botResponse, sender: 'bot' }
//       ]);
//       setIsLoading(false);
//     }, 1000);
//   };

//   // Auto-scroll to bottom of messages
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   return (
//     <div className="chatbot-container">
//       {/* Chatbot button */}
//       <button 
//         className="chatbot-toggle" 
//         onClick={toggleChatbot}
//       >
//         {isOpen ? 'Close Chat' : 'Blood Donation Assistant'}
//       </button>

//       {/* Chatbot window */}
//       {isOpen && (
//         <div className="chatbot-window">
//           <div className="chatbot-header">
//             <h3>Blood Donation Assistant</h3>
//           </div>

//           <div className="chatbot-messages">
//             {messages.map((msg, index) => (
//               <div key={index} className={`message ${msg.sender}`}>
//                 {msg.text}
//               </div>
//             ))}
//             {isLoading && (
//               <div className="message bot loading">
//                 <div className="typing-indicator">
//                   <span></span>
//                   <span></span>
//                   <span></span>
//                 </div>
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           <form className="chatbot-input" onSubmit={sendMessage}>
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Type your question..."
//               disabled={isLoading}
//             />
//             <button type="submit" disabled={isLoading}>
//               Send
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatbot;




import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

// Predefined responses for common questions
const botResponses = {
  'hello': 'Hello! How can I help you with blood donation today?',
  'hi': 'Hi there! How can I assist you with blood donation?',
  'donate': 'To donate blood, you need to be at least 18 years old, weigh at least 50kg, and be in good health. Would you like to know more?',
  'donation': 'Blood donation is a simple process that takes about 45-60 minutes. You can donate whole blood every 3 months. Would you like more details?',
  'eligibility': 'Eligibility factors include age (18-65), weight (50kg+), good health, and no recent tattoos or certain medications. Would you like me to check specific eligibility criteria?',
  'eligible': 'Basic eligibility criteria include being at least 18 years old, weighing 50kg or more, and being in good health. Certain medications, recent travel, or medical conditions may affect eligibility.',
  'blood type': 'There are 8 main blood types: A+, A-, B+, B-, AB+, AB-, O+, and O-. O- is a universal donor, and AB+ is a universal recipient.',
  'blood group': 'The main blood groups are A, B, AB, and O, each with Rh positive or negative. Everyone has one of these 8 blood types.',
  'time': 'The donation process takes about 45-60 minutes, with the actual blood draw only taking about 8-10 minutes.',
  'how long': 'From registration to refreshment, the entire blood donation process takes about 45-60 minutes. The actual blood collection only takes 8-10 minutes.',
  'thank': 'You\'re welcome! Thank you for your interest in blood donation. It saves lives!',
  'thanks': 'You\'re welcome! Thank you for your interest in blood donation. It saves lives!',
  'benefits': 'Donating blood helps save lives, gives you a free mini health check-up, and reduces your risk of heart disease and cancer. It also gives you a sense of fulfillment knowing you\'ve helped others.',
  'appointment': 'To schedule an appointment, you can register on our platform as a donor and select "Donate" from the main menu. You can then choose a nearby donation center and available time slot.',
  'who': 'Anyone in good health, aged 18-65, and weighing over 50kg can donate blood. Some medical conditions or recent travel may temporarily defer donation.',
  'where': 'You can donate blood at any of our registered blood banks and donation centers. Use the "Search" feature on our platform to find locations near you.'
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hello! I can answer your questions about blood donation. How can I help you today?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  // Function to get bot response based on user input
  const getBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    
    // Check for matches in our predefined responses
    for (const [key, response] of Object.entries(botResponses)) {
      if (lowerInput.includes(key)) {
        return response;
      }
    }
    
    // Default response if no match is found
    return "I'm sorry, I don't have information on that topic yet. Would you like to know about blood donation eligibility, process, or benefits?";
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // Add user message to chat
    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate API delay for better UX
    setTimeout(() => {
      const botResponse = getBotResponse(input);
      setMessages(prevMessages => [
        ...prevMessages,
        { text: botResponse, sender: 'bot' }
      ]);
      setIsLoading(false);
    }, 1000);
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chatbot-container">
      {/* Chatbot button - now a circular button with chat icon */}
      <button 
        className="chatbot-toggle" 
        onClick={toggleChatbot}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {/* Chatbot window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Blood Donation Assistant</h3>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
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

          <form className="chatbot-input" onSubmit={sendMessage}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;