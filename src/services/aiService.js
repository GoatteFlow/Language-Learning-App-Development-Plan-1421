import axios from 'axios';

class AIService {
  constructor() {
    this.apiKey = 'demo-key'; // In production, use environment variables
    this.baseURL = 'https://api.openai.com/v1';
  }

  // Mock AI responses for demo purposes
  async generateResponse(userInput, context = 'spanish-learning') {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const responses = {
      'hola': {
        text: "¡Hola! Great pronunciation! 'Hola' means 'Hello' in Spanish. Try saying 'Hola, ¿cómo estás?' which means 'Hello, how are you?'",
        feedback: "Excellent! Your pronunciation was very clear.",
        pronunciation: 8.5,
        grammar: 9.0
      },
      'como estas': {
        text: "¡Muy bien! You said 'How are you?' perfectly. You can respond with 'Estoy bien, gracias' which means 'I'm fine, thank you'.",
        feedback: "Perfect grammar and pronunciation!",
        pronunciation: 9.0,
        grammar: 9.5
      },
      'buenos dias': {
        text: "¡Excelente! 'Buenos días' means 'Good morning'. You can also say 'Buenas tardes' for 'Good afternoon' or 'Buenas noches' for 'Good evening'.",
        feedback: "Great job with the pronunciation!",
        pronunciation: 8.0,
        grammar: 9.0
      },
      'default': {
        text: "I heard you say something in Spanish! That's great practice. Try speaking a bit slower and clearer. Some common phrases to practice: 'Hola', 'Buenos días', '¿Cómo estás?'",
        feedback: "Keep practicing! Your Spanish is improving.",
        pronunciation: 7.0,
        grammar: 7.5
      }
    };

    const key = userInput.toLowerCase().replace(/[¿?¡!]/g, '').trim();
    const response = responses[key] || responses['default'];

    return {
      message: response.text,
      feedback: response.feedback,
      scores: {
        pronunciation: response.pronunciation,
        grammar: response.grammar,
        fluency: (response.pronunciation + response.grammar) / 2
      },
      suggestions: [
        "Try speaking more slowly for better pronunciation",
        "Practice rolling your R's",
        "Focus on vowel sounds - they're clearer in Spanish"
      ]
    };
  }

  async translateText(text, fromLang = 'es', toLang = 'en') {
    // Mock translation service
    const translations = {
      'hola': 'hello',
      'adiós': 'goodbye',
      'gracias': 'thank you',
      'por favor': 'please',
      'buenos días': 'good morning',
      'buenas tardes': 'good afternoon',
      'buenas noches': 'good evening',
      '¿cómo estás?': 'how are you?',
      'estoy bien': 'I am fine',
      'me llamo': 'my name is',
      'mucho gusto': 'nice to meet you'
    };

    const key = text.toLowerCase().trim();
    return translations[key] || 'Translation not found';
  }

  async analyzePronunciation(audioBlob) {
    // Mock pronunciation analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      score: Math.random() * 3 + 7, // Score between 7-10
      feedback: "Good pronunciation! Try to emphasize the vowels more.",
      wordScores: [
        { word: "hola", score: 8.5 },
        { word: "como", score: 7.8 },
        { word: "estas", score: 8.2 }
      ]
    };
  }
}

export default new AIService();