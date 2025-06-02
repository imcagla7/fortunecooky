import axios from 'axios';

interface AIResponse {
  fortune: string;
  success: boolean;
  error?: string;
}

class AIFortuneService {
  private readonly timeout = 10000; // 10 seconds timeout

  // OpenAI API (requires API key)
  async getFortuneFromOpenAI(apiKey?: string): Promise<AIResponse> {
    if (!apiKey) {
      return {fortune: '', success: false, error: 'OpenAI API key required'};
    }

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content:
                'You are a wise fortune teller. Generate a short, positive, inspirational fortune message in Turkish. Keep it under 80 characters. Be motivational and uplifting.',
            },
            {
              role: 'user',
              content: 'Give me a fortune for today.',
            },
          ],
          max_tokens: 50,
          temperature: 0.8,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: this.timeout,
        },
      );

      const fortune = response.data.choices[0]?.message?.content?.trim() || '';
      return {fortune, success: true};
    } catch (error: any) {
      return {
        fortune: '',
        success: false,
        error: `OpenAI API error: ${error.message}`,
      };
    }
  }

  // Free AI API alternative (Hugging Face Inference API)
  async getFortuneFromHuggingFace(): Promise<AIResponse> {
    try {
      const prompts = [
        'Güzel bir gün için motivasyon:',
        'Pozitif enerji mesajı:',
        'İlham verici söz:',
        'Bugün için şanslı mesaj:',
        'Mutluluk getiren kelimeler:',
      ];

      const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];

      const response = await axios.post(
        'https://api-inference.huggingface.co/models/gpt2',
        {
          inputs: randomPrompt + ' Bugün',
          parameters: {
            max_new_tokens: 50,
            temperature: 0.8,
            return_full_text: false,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: this.timeout,
        },
      );

      let fortune = response.data[0]?.generated_text?.trim() || '';

      // Clean up the response
      if (fortune) {
        fortune = fortune.replace(randomPrompt, '').trim();
        fortune = fortune.split('.')[0] + '.'; // Take first sentence
        fortune = fortune.charAt(0).toUpperCase() + fortune.slice(1); // Capitalize
      }

      return {fortune, success: true};
    } catch (error: any) {
      return {
        fortune: '',
        success: false,
        error: `Hugging Face API error: ${error.message}`,
      };
    }
  }

  // Simple mock AI service for testing (when APIs are not available)
  async getMockAIFortune(): Promise<AIResponse> {
    const wisdomTemplates = [
      'Bugün {action} için mükemmel bir gün.',
      'Hayatında {quality} güçlü bir şekilde parlamaya başlayacak.',
      'Önündeki {obstacle} aslında gizli bir fırsat.',
      'Kalbin sana {guidance} konusunda doğru yolu gösterecek.',
      'Bu hafta {outcome} ile ilgili güzel haberler alacaksın.',
    ];

    const actions = [
      'yeni başlangıçlar',
      'cesur adımlar',
      'pozitif değişimler',
      'önemli kararlar',
    ];
    const qualities = ['yaratıcılığın', 'özgüvenin', 'sevgin', 'bilgeliğin'];
    const obstacles = ['zorluk', 'engel', 'problem', 'duraklamaz'];
    const guidance = ['aşk', 'kariyer', 'dostluk', 'sağlık'];
    const outcomes = ['başarı', 'mutluluk', 'huzur', 'bolluk'];

    const template =
      wisdomTemplates[Math.floor(Math.random() * wisdomTemplates.length)];

    let fortune = template
      .replace('{action}', actions[Math.floor(Math.random() * actions.length)])
      .replace(
        '{quality}',
        qualities[Math.floor(Math.random() * qualities.length)],
      )
      .replace(
        '{obstacle}',
        obstacles[Math.floor(Math.random() * obstacles.length)],
      )
      .replace(
        '{guidance}',
        guidance[Math.floor(Math.random() * guidance.length)],
      )
      .replace(
        '{outcome}',
        outcomes[Math.floor(Math.random() * outcomes.length)],
      );

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {fortune, success: true};
  }

  // Google Gemini AI (Free alternative)
  async getFortuneFromGemini(): Promise<AIResponse> {
    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyB01Og32nSPy0BtThdbNl6qwgJU2hkQHkE', // Replace with your Gemini API key
        {
          contents: [
            {
              parts: [
                {
                  text: 'Kısa, pozitif ve ilham verici bir Türkçe fal mesajı yaz. Maksimum 11 kelime. Örnek: "Bugün yeni fırsatlar seni bekliyor."',
                },
              ],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: this.timeout,
        },
      );
      console.log('gemini response', response);
      const fortune =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
      return {fortune, success: true};
    } catch (error: any) {
      return {
        fortune: '',
        success: false,
        error: `Gemini API error: ${error.message}`,
      };
    }
  }

  // Main method with fallback strategy
  async getFortune(options?: {
    openaiApiKey?: string;
    preferredProvider?: 'openai' | 'huggingface' | 'mock' | 'gemini';
  }): Promise<AIResponse> {
    const {openaiApiKey, preferredProvider = 'mock'} = options || {};

    // Try preferred provider first
    if (preferredProvider === 'openai' && openaiApiKey) {
      const result = await this.getFortuneFromOpenAI(openaiApiKey);
      if (result.success) {
        return result;
      }
    }

    if (preferredProvider === 'huggingface') {
      const result = await this.getFortuneFromHuggingFace();
      if (result.success) {
        return result;
      }
    }

    if (preferredProvider === 'gemini') {
      const result = await this.getFortuneFromGemini();
      if (result.success) {
        return result;
      }
    }

    // Fallback to mock AI
    return await this.getMockAIFortune();
  }
}

export const aiFortuneService = new AIFortuneService();
export default aiFortuneService;
