import { useState, useRef, useEffect } from 'react';
import { Pet, ChatMessage } from '../types/pet';
import { generatePetResponse } from '../services/ai';
import { fetchChatMessages, saveChatMessages } from '../services/supabase';
import './PetChat.css';

interface PetChatProps {
  pet: Pet;
}

export default function PetChat({ pet }: PetChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  // Check if user is near bottom of chat
  const checkIfNearBottom = () => {
    if (!messagesContainerRef.current) return true;
    const container = messagesContainerRef.current;
    const threshold = 100; // pixels from bottom
    return container.scrollHeight - container.scrollTop - container.clientHeight < threshold;
  };

  const scrollToBottom = () => {
    if (shouldAutoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle scroll - disable auto-scroll if user scrolls up
  const handleScroll = () => {
    setShouldAutoScroll(checkIfNearBottom());
  };

  // Auto-scroll only when new messages arrive and user is at bottom
  useEffect(() => {
    if (shouldAutoScroll) {
      scrollToBottom();
    }
  }, [messages, shouldAutoScroll]);

  // Re-enable auto-scroll when user sends a message
  useEffect(() => {
    if (input.trim() && !isTyping) {
      setShouldAutoScroll(true);
    }
  }, [input, isTyping]);

  // Load chat messages from Supabase (personal chat)
  useEffect(() => {
    loadChat();
  }, [pet.id]);

  const loadChat = async () => {
    try {
      const savedMessages = await fetchChatMessages(pet.id);
      if (savedMessages.length > 0) {
        setMessages(savedMessages);
      } else {
        // Initial greeting if no saved messages
        const greeting = getGreeting();
        const greetingMessage: ChatMessage = {
          id: 'greeting',
          role: 'pet',
          content: greeting,
          timestamp: Date.now(),
        };
        setMessages([greetingMessage]);
        await saveChatMessages(pet.id, [greetingMessage]);
      }
    } catch (error) {
      console.error('Failed to load chat:', error);
      // Fallback to greeting
      const greeting = getGreeting();
      setMessages([{
        id: 'greeting',
        role: 'pet',
        content: greeting,
        timestamp: Date.now(),
      }]);
    }
  };

  const getGreeting = () => {
    const greetings = [
      `Hi there! I'm ${pet.personality.name}, a ${pet.personality.temperament} ${pet.appearance.type}!`,
      `*wags tail* Hello! My name is ${pet.personality.name}. Nice to meet you!`,
      `Oh, a visitor! I'm ${pet.personality.name}. Let's be friends!`,
    ];
    
    if (pet.personality.temperament === 'shy') {
      return `*peeks out nervously* H-hi... I'm ${pet.personality.name}...`;
    }
    if (pet.personality.temperament === 'aggressive') {
      return `*stares intensely* Who are you? I'm ${pet.personality.name}. Don't try anything funny.`;
    }
    
    return greetings[Math.floor(Math.random() * greetings.length)];
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };

    const newUserMessage = [...messages, userMessage];
    setMessages(newUserMessage);
    // Save user message immediately
    saveChatMessages(pet.id, newUserMessage).catch(err => 
      console.error('Failed to save chat:', err)
    );
    setInput('');
    setIsTyping(true);

    try {
      // Generate AI response (or use mock response)
      const response = await generatePetResponse(pet, input.trim(), messages);
      
      const petMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'pet',
        content: response,
        timestamp: Date.now(),
      };

      setMessages(prev => {
        const newMessages = [...prev, petMessage];
        // Save to Supabase (personal chat)
        saveChatMessages(pet.id, newMessages).catch(err => 
          console.error('Failed to save chat:', err)
        );
        return newMessages;
      });
    } catch (error) {
      console.error('Failed to generate response:', error);
      
      // Fallback response
      const fallbackMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'pet',
        content: getFallbackResponse(),
        timestamp: Date.now(),
      };

      setMessages(prev => {
        const newMessages = [...prev, fallbackMessage];
        // Save to Supabase
        saveChatMessages(pet.id, newMessages).catch(err => 
          console.error('Failed to save chat:', err)
        );
        return newMessages;
      });
    } finally {
      setIsTyping(false);
    }
  };

  const getFallbackResponse = () => {
    const responses = [
      `*${pet.appearance.type === 'dog' ? 'wags tail' : 'looks at you curiously'}*`,
      `*${pet.personality.temperament === 'friendly' ? 'nuzzles your hand' : 'watches carefully'}*`,
      'I love spending time with you!',
      `Did you know ${pet.personality.favoriteFood.toLowerCase()} is my favorite?`,
      pet.personality.playful ? 'Want to play?' : '*yawns sleepily*',
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="pet-chat">
      <div className="chat-messages" ref={messagesContainerRef} onScroll={handleScroll}>
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`message ${message.role === 'pet' ? 'message-pet' : 'message-user'}`}
          >
            {message.role === 'pet' && (
              <div className={`message-avatar ${isTyping ? 'avatar-thinking' : ''}`}>
                <img src={pet.imageData} alt={pet.personality.name} />
              </div>
            )}
            <div className="message-bubble">
              {message.role === 'pet' && (
                <span className="message-sender">{pet.personality.name}</span>
              )}
              <span className="message-text">{message.content}</span>
              <div className="message-meta">
                <span className="message-time">{formatTime(message.timestamp)}</span>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message message-pet">
            <div className="message-avatar avatar-thinking">
              <img src={pet.imageData} alt={pet.personality.name} />
            </div>
            <div className="message-bubble">
              <span className="message-sender">{pet.personality.name}</span>
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <button className="input-action" title="Attach">
          📎
        </button>
        <input
          type="text"
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={isTyping}
        />
        <button 
          className="chat-send-btn"
          onClick={handleSend}
          disabled={!input.trim() || isTyping}
          title="Send"
        >
          ➤
        </button>
      </div>
    </div>
  );
}
