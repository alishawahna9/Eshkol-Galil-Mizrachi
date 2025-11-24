import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    // Verify user authentication
    const user = await base44.auth.me();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { message, session_id } = await req.json();

    if (!message) {
      return Response.json({ error: 'Message is required' }, { status: 400 });
    }

    // Get bot config
    const configs = await base44.asServiceRole.entities.BotConfig.list();
    const config = configs[0];

    if (!config || !config.is_active) {
      return Response.json({ error: 'Bot is not active' }, { status: 503 });
    }

    // Get training data
    const trainingData = await base44.asServiceRole.entities.BotTrainingData.filter({
      is_active: true
    });

    // Find matching training data based on keywords
    const lowerMessage = message.toLowerCase();
    const matchedTraining = trainingData.find(item => {
      const questionMatch = item.question.toLowerCase().includes(lowerMessage) ||
                           lowerMessage.includes(item.question.toLowerCase());
      
      const keywordMatch = item.keywords?.some(keyword => 
        lowerMessage.includes(keyword.toLowerCase())
      );

      return questionMatch || keywordMatch;
    });

    let reply;

    if (matchedTraining) {
      // Return matched answer from training data
      reply = matchedTraining.answer;
    } else {
      // Use OpenAI to generate response
      const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
      
      if (!openaiApiKey) {
        reply = 'מצטער, אני לא יכול לענות על השאלה הזו כרגע. אנא פנה למנהל המערכת.';
      } else {
        // Build context from training data
        const context = trainingData
          .map(item => `שאלה: ${item.question}\nתשובה: ${item.answer}`)
          .join('\n\n');

        const systemPrompt = `אתה עוזר וירטואלי בשם "${config.bot_name}".
אופי שלך: ${config.bot_personality}
השב בעברית בלבד.
השתמש במידע הבא כהקשר לתשובותיך:

${context}

אם השאלה לא קשורה למידע הקיים, תן תשובה כללית ועוזרת.`;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiApiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: message }
            ],
            temperature: 0.7,
            max_tokens: 500
          })
        });

        const data = await response.json();
        
        if (data.error) {
          reply = 'מצטער, נתקלתי בבעיה טכנית. אנא נסה שוב מאוחר יותר.';
        } else {
          reply = data.choices[0].message.content;
        }
      }
    }

    return Response.json({ reply });

  } catch (error) {
    console.error('Error in chatbot:', error);
    return Response.json({ 
      error: 'Internal server error',
      reply: 'מצטער, נתקלתי בשגיאה. אנא נסה שוב.'
    }, { status: 500 });
  }
});