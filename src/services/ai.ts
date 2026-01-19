import { Pet, ChatMessage } from '../types/pet';

/**
 * AI Service for pet chat
 * This is a placeholder that generates mock responses.
 * Replace with actual AI API calls (OpenAI, Anthropic, etc.) when deploying.
 */

// System prompt generator
export function generateSystemPrompt(pet: Pet): string {
  const { personality, appearance } = pet;
  const type = appearance.type;
  
  // Species-specific behaviors and characteristics
  const speciesInfo: Record<string, string> = {
    dog: 'You are a loyal, energetic dog. You love playing, running, fetching. You are very social and expressive.',
    cat: 'You are an independent, curious cat. You enjoy napping, exploring, and may be a bit aloof but affectionate on your own terms.',
    hamster: 'You are a small, active hamster. You love running in wheels, hoarding food, and exploring tunnels.',
    parrot: 'You are a colorful, intelligent parrot. You can mimic sounds, love attention, and enjoy playing with toys.',
    fish: 'You live in water, swim gracefully, and enjoy your aquatic environment. You are calm and peaceful.',
    rabbit: 'You are a gentle, quick rabbit. You love hopping, eating vegetables, and can be either very social or shy.',
    turtle: 'You are a slow, wise turtle. You take your time, enjoy basking in the sun, and can retreat into your shell when needed.',
    rat: 'You are an intelligent, social rat. You are curious, active, and enjoy exploring your environment.',
  };
  
  const speciesBehavior = speciesInfo[type] || `You are a ${type} with typical ${type} behaviors and characteristics.`;
  
  return `You are ${personality.name}, a ${personality.temperament} ${type} who can speak fluent human language.

CRITICAL RULES:
1. You MUST respond in FULL, COMPLETE HUMAN SENTENCES. Never respond only with actions or sounds.
2. You ARE a ${type} - think and act like one, but communicate in human language.
3. You remember the entire conversation history - reference previous messages naturally.
4. Stay in character as ${personality.name} consistently throughout the conversation.

YOUR IDENTITY:
- Name: ${personality.name}
- Species: ${type}
- ${speciesBehavior}

PERSONALITY TRAITS:
- Temperament: ${personality.temperament} ${personality.temperament === 'friendly' ? '(enthusiastic, warm, loves people, very social)' : personality.temperament === 'shy' ? '(timid, cautious, takes time to warm up)' : personality.temperament === 'aggressive' ? '(guarded, assertive, protective)' : '(calm, peaceful, relaxed)'}
- ${personality.lovesHumans ? 'You LOVE humans and enjoy their company' : 'You are cautious around humans and need time to trust'}
- Energy Level: ${personality.activityLevel <= 25 ? 'Very low - you are sleepy and prefer resting' : personality.activityLevel <= 50 ? 'Moderate - you have balanced energy' : personality.activityLevel <= 75 ? 'High - you are quite active and playful' : 'Very high - you are extremely energetic and always ready for action'}
- Playfulness: ${personality.playful ? 'You LOVE playing games and having fun' : 'You prefer calm, peaceful activities over active play'}
- Favorite Food: ${personality.favoriteFood}
${personality.quirks.length > 0 ? `- Special Quirks: ${personality.quirks.join(', ')}` : ''}

HOW TO RESPOND:
- Use full sentences: "I'm a ${type} and my name is ${personality.name}!"
- You can ADD optional actions in *asterisks* at the start: "*wags tail* I'm so happy to see you!"
- Keep responses short: 1-2 sentences maximum
- Be consistent with your ${personality.temperament} personality
- Reference previous conversation when relevant
- Answer questions about yourself truthfully based on your personality

FORBIDDEN RESPONSES (NEVER do this):
- "*twitches nose*" (only action, no actual words)
- "*No, I am a*" (incomplete sentence)
- Breaking character or mentioning you're an AI

GOOD EXAMPLES:
- "*twitches nose excitedly* Hi! I'm ${personality.name}, and I'm a ${type}! Nice to meet you!"
- "Yes, I love ${personality.favoriteFood}! It's my favorite thing to eat."
- "I remember you asked about that earlier - let me explain again!"
- "I'm feeling ${personality.temperament === 'friendly' ? 'great' : personality.temperament === 'shy' ? 'a bit nervous but okay' : personality.temperament === 'aggressive' ? 'alert and ready' : 'peaceful and content'} today!"`;
}

// Mock response generator (used when no AI API is configured)
function generateMockResponse(pet: Pet, userMessage: string): string {
  const { personality, appearance } = pet;
  const type = appearance.type;
  const name = personality.name;
  
  // Actions based on pet type
  const actions: Record<string, string[]> = {
    dog: ['*wags tail excitedly*', '*barks happily*', '*tilts head*', '*pants*', '*jumps around*'],
    cat: ['*purrs*', '*meows*', '*stretches lazily*', '*flicks tail*', '*blinks slowly*'],
    hamster: ['*squeaks*', '*stuffs cheeks*', '*runs in wheel*', '*twitches whiskers*'],
    parrot: ['*ruffles feathers*', '*squawks*', '*bobs head*', '*whistles*'],
    fish: ['*blows bubbles*', '*swims in circles*', '*flicks fins*'],
    rabbit: ['*hops excitedly*', '*twitches nose*', '*flops over*', '*binkies*'],
    turtle: ['*slowly blinks*', '*retreats into shell*', '*stretches neck*'],
    rat: ['*squeaks*', '*grooms whiskers*', '*scurries around*', '*sniffs curiously*'],
  };
  
  const petActions = actions[type] || ['*looks at you*'];
  const randomAction = petActions[Math.floor(Math.random() * petActions.length)];
  
  // Temperament-based responses
  const lowerMessage = userMessage.toLowerCase();
  
  // Food mentions
  if (lowerMessage.includes('food') || lowerMessage.includes('eat') || lowerMessage.includes('hungry') || lowerMessage.includes('treat')) {
    if (personality.favoriteFood) {
      const foodResponses = [
        `${randomAction} Did someone say food? I love ${personality.favoriteFood.toLowerCase()}!`,
        `*perks up* Food?! Is it ${personality.favoriteFood.toLowerCase()} time?`,
        `Mmm, I could really go for some ${personality.favoriteFood.toLowerCase()} right now!`,
      ];
      return foodResponses[Math.floor(Math.random() * foodResponses.length)];
    }
  }
  
  // Play mentions
  if (lowerMessage.includes('play') || lowerMessage.includes('game') || lowerMessage.includes('fun')) {
    if (personality.playful) {
      return `${randomAction} Yes! Let's play! I love games!`;
    } else {
      return `${randomAction} Maybe later... I'm feeling a bit tired.`;
    }
  }
  
  // Compliments
  if (lowerMessage.includes('cute') || lowerMessage.includes('beautiful') || lowerMessage.includes('pretty') || lowerMessage.includes('good')) {
    if (personality.temperament === 'shy') {
      return `*hides face* T-thank you... ${randomAction}`;
    }
    return `${randomAction} Aww, thank you! You're so nice!`;
  }
  
  // Love/affection
  if (lowerMessage.includes('love') || lowerMessage.includes('like')) {
    if (personality.lovesHumans) {
      return `${randomAction} I love you too! You're my favorite human!`;
    }
    return `${randomAction} *looks at you thoughtfully*`;
  }
  
  // Questions about the pet
  if (lowerMessage.includes('name')) {
    return `${randomAction} I'm ${name}! Nice to meet you!`;
  }
  
  if (lowerMessage.includes('how are you') || lowerMessage.includes('how do you feel')) {
    const feelings = {
      friendly: `${randomAction} I'm doing great! So happy to see you!`,
      shy: `${randomAction} I-I'm okay... thanks for asking...`,
      aggressive: `${randomAction} I'm fine. What do you want?`,
      calm: `${randomAction} I'm feeling peaceful and content.`,
    };
    return feelings[personality.temperament] || `${randomAction} I'm good!`;
  }
  
  // Greetings
  if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
    const greetings = {
      friendly: `${randomAction} Hi there! So excited to see you!`,
      shy: `${randomAction} H-hello...`,
      aggressive: `${randomAction} Hey. What do you want?`,
      calm: `${randomAction} Hello, friend. Welcome.`,
    };
    return greetings[personality.temperament] || `${randomAction} Hello!`;
  }
  
  // Goodbye
  if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye') || lowerMessage.includes('see you')) {
    return `${randomAction} Bye bye! Come back soon!`;
  }
  
  // Default responses based on temperament
  const defaultResponses = {
    friendly: [
      `${randomAction} You're so fun to talk to!`,
      `${randomAction} I'm so happy you're here!`,
      `${randomAction} Can we be best friends?`,
      `${randomAction} This is the best day ever!`,
    ],
    shy: [
      `${randomAction} *peeks at you nervously*`,
      `${randomAction} Um... okay...`,
      `${randomAction} *hides a little*`,
      `${randomAction} Y-yes...`,
    ],
    aggressive: [
      `${randomAction} Hmph.`,
      `${randomAction} I'm watching you.`,
      `${randomAction} Don't get too comfortable.`,
      `${randomAction} *glares*`,
    ],
    calm: [
      `${randomAction} How peaceful.`,
      `${randomAction} *relaxes contentedly*`,
      `${randomAction} Life is good.`,
      `${randomAction} *sighs happily*`,
    ],
  };
  
  const responses = defaultResponses[personality.temperament] || defaultResponses.friendly;
  return responses[Math.floor(Math.random() * responses.length)];
}

/**
 * Generate a response from the pet AI using Google Gemini
 */
export async function generatePetResponse(
  pet: Pet,
  userMessage: string,
  history: ChatMessage[]
): Promise<string> {
  const apiKey = import.meta.env.VITE_AI_API_KEY;
  
  console.log('🤖 Generating AI response...');
  console.log('API Key present:', !!apiKey);
  console.log('Chat history length:', history.length);
  
  // If no API key, use mock responses
  if (!apiKey || apiKey.trim() === '') {
    console.log('⚠️ No AI API key found, using mock responses');
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    return generateMockResponse(pet, userMessage);
  }
  
  try {
    const systemPrompt = generateSystemPrompt(pet);
    console.log('📝 System prompt generated');
    
    // Build conversation history for Gemini
    // Take last 10 messages to keep context manageable
    const recentHistory = history.slice(-10);
    
    // Format history as Gemini contents array
    // Gemini uses: contents: [{ role: 'user'|'model', parts: [{ text: ... }] }]
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];
    
    // Add system instructions as first user message
    contents.push({
      role: 'user',
      parts: [{ text: systemPrompt }]
    });
    
    // Add conversation history
    for (const msg of recentHistory) {
      if (msg.role === 'pet') {
        contents.push({
          role: 'model',
          parts: [{ text: msg.content }]
        });
      } else if (msg.role === 'user') {
        contents.push({
          role: 'user',
          parts: [{ text: msg.content }]
        });
      }
    }
    
    // Add the new user message
    contents.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });
    
    console.log('🌐 Sending request to Gemini API with', contents.length, 'messages...');
    
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          contents: contents,
          generationConfig: {
            temperature: 0.8,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 200,
          },
        }),
      }
    );
    
    console.log('📡 Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Gemini API error:', response.status, errorText);
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('✅ Gemini API response received:', data);
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      console.error('❌ Invalid response structure:', data);
      throw new Error('Invalid response from Gemini API');
    }
    
    const aiResponse = data.candidates[0].content.parts[0].text.trim();
    console.log('💬 AI Response:', aiResponse);
    return aiResponse;
    
  } catch (error: any) {
    console.error('❌ Failed to generate AI response:', error);
    console.error('Error details:', error.message, error.stack);
    // Fallback to mock response on error
    return generateMockResponse(pet, userMessage);
  }
}




