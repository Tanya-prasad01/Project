// controllers/chatbotController.js
const ChatbotConversation = require('../models/ChatbotConversation');
const { v4: uuidv4 } = require('uuid');

// Chatbot knowledge base
const knowledgeBase = {
  greeting: [
    "Hello! I'm your Blood Donation Assistant. How can I help you today?",
    "Hi there! I can help you with blood donation questions. What would you like to know?"
  ],
  
  eligibility: [
    "To donate blood, you generally need to be at least 18 years old, weigh at least 110 pounds, and be in good health. There are some medical conditions and medications that may affect eligibility."
  ],
  
  process: [
    "The blood donation process is simple: 1) Register and complete a health screening, 2) The actual donation takes about 10-15 minutes, 3) Afterward, you'll rest and enjoy refreshments for 15 minutes before leaving."
  ],
  
  bloodTypes: [
    "There are 8 different blood types: A+, A-, B+, B-, AB+, AB-, O+, and O-. Type O- is the universal donor, while AB+ is the universal recipient."
  ],
  
  frequency: [
    "Most people can donate whole blood every 56 days (8 weeks). Platelets can be donated every 7 days up to 24 times per year."
  ],
  
  preparation: [
    "Before donating: 1) Drink plenty of water, 2) Eat a healthy meal, 3) Avoid fatty foods, 4) Get a good night's sleep, 5) Bring a valid ID."
  ],
  
  benefits: [
    "Donating blood helps save lives, provides a free health screening, burns calories, reduces the risk of heart disease, and gives a sense of contribution to your community."
  ],
  
  timeRequired: [
    "The entire process takes about 1 hour, though the actual blood donation only takes about 10-15 minutes."
  ],
  
  finding: [
    "You can find donors by using our 'Search' feature. You can search by blood type, location, and availability."
  ],
  
  emergency: [
    "For emergency blood needs, you can create an urgent request through our system, which will alert compatible donors in your area."
  ],
  
  requestingBlood: [
    "To request blood, go to the 'Request Blood' page, fill out the form with details about the patient and blood requirements, and submit your request."
  ],
  
  donationAppointment: [
    "To schedule a donation, go to the 'Donate' page and fill out the appointment form. You'll receive a confirmation and reminders."
  ],
  
  fallback: [
    "I'm sorry, I don't have information on that topic. Would you like to ask about eligibility, the donation process, blood types, or how to request blood?",
    "I don't understand that question. Try asking about blood donation eligibility, the donation process, or how to use our platform."
  ]
};

// Intent matching patterns
const patterns = {
  greeting: /\b(hi|hello|hey|greetings|howdy|good (morning|afternoon|evening))\b/i,
  eligibility: /\b(eligib|requirements|who can donate|can i donate|qualif|criteria)\b/i,
  process: /\b(process|how (to|does) donat|procedure|steps|what happens)\b/i,
  bloodTypes: /\b(blood type|types of blood|different blood|compatible|o\-|a\+|b\-)\b/i,
  frequency: /\b(how (often|frequently)|how many times|frequency|wait between)\b/i,
  preparation: /\b(prepare|ready|before donat|preparation|what should i do)\b/i,
  benefits: /\b(benefit|advantage|good|positive|help|impact)\b/i,
  timeRequired: /\b(how long|time|duration|how much time|minutes|hours)\b/i,
  finding: /\b(find|search|locate|available|donors near|where)\b/i,
  emergency: /\b(emergency|urgent|critical|immediate|quickly)\b/i,
  requestingBlood: /\b(request|need blood|get blood|receive|recipient)\b/i,
  donationAppointment: /\b(schedule|appointment|book|when can i|sign up)\b/i
};

// Match user input to intent
const matchIntent = (input) => {
  for (const [intent, pattern] of Object.entries(patterns)) {
    if (pattern.test(input)) {
      return intent;
    }
  }
  return 'fallback';
};

// Generate bot response
const generateResponse = (intent) => {
  const responses = knowledgeBase[intent] || knowledgeBase.fallback;
  return responses[Math.floor(Math.random() * responses.length)];
};

// Chat with the bot
exports.chat = async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    let conversation;
    
    // Get or create conversation
    if (sessionId) {
      conversation = await ChatbotConversation.findOne({ sessionId });
    }
    
    if (!conversation) {
      // Create new conversation
      conversation = new ChatbotConversation({
        user: req.user ? req.user._id : null,
        sessionId: sessionId || uuidv4(),
        messages: []
      });
    }
    
    // Add user message
    conversation.messages.push({
      sender: 'user',
      content: message
    });
    
    // Generate bot response
    const intent = matchIntent(message);
    const botResponse = generateResponse(intent);
    
    // Add bot response
    conversation.messages.push({
      sender: 'bot',
      content: botResponse
    });
    
    // Update last activity
    conversation.lastActivity = Date.now();
    
    // Save conversation
    await conversation.save();
    
    res.json({
      sessionId: conversation.sessionId,
      response: botResponse,
      messages: conversation.messages
    });
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get conversation history
exports.getConversation = async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const conversation = await ChatbotConversation.findOne({ sessionId });
    
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }
    
    res.json({
      sessionId: conversation.sessionId,
      messages: conversation.messages
    });
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({ message: error.message });
  }
};