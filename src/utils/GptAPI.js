import axios from 'axios';

const apiKey = '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';

const sendMessageToAI = async (message) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      "messages": message,
      max_tokens: 50,
      model: 'gpt-3.5-turbo'
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    const responseText = response.data.choices[0].message.content;
    console.log(responseText)
    return responseText;
  } catch (error) {
    console.error('Error sending message to OpenAI API:', error.response?.status, error.response?.data);
    throw error;
  }
};

export { sendMessageToAI };
