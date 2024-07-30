const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const endpoint_openai = process.env.OPENAI_ENDPOINT;
const openai_key = process.env.OPENAI_API_KEY;
const google_cse_api_key = 'AIzaSyA80Qo2-66jZw5z4pdOpI8IPGrh_5GevdA';
const google_cse_cx = 'e3b60d37a9f40454b'; 

const geminiArtPromptTester = {};

const generatePrompt = (details) => {
  return `Create a high-quality piece of art that matches the following criteria:
    Interests: ${details.interests},
    Color Palette: ${details.colorPalette},
    Location: ${details.location},
    Medium: ${details.medium},
    Preferred Topics: ${details.preferredTopics},
    Excluded Topics: ${details.excludedTopics}.`;
};

geminiArtPromptTester.generateArtImage = async (req, res, next) => {
  const { promptDetails } = req.body;

  if (!promptDetails) {
    return res.status(400).json({ error: 'Prompt details are missing.' });
  }

  try {
    const prompt = generatePrompt(promptDetails);

    const response = await axios.post(
      endpoint_openai,
      {
        prompt: prompt,
        n: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${openai_key}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const image_url = response.data.data[0].url;
    res.json({ image_url });
  } catch (error) {
    console.error("Error in Image Generation: ", error);
    res.status(500).json({ error: "An error occurred during image generation." });
  }
};

geminiArtPromptTester.matchArtService = async (req, res, next) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ error: 'Image URL is required' });
    }

    const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
      params: {
        key: google_cse_api_key,
        cx: google_cse_cx,
        q: imageUrl,
        searchType: 'image',
        num: 10,
      },
    });

    const data = response.data.items.map((item) => ({
      link: item.link,
      title: item.title,
      image: item.image.thumbnailLink,
    }));

    res.json(data);
  } catch (error) {
    console.error('Google Custom Search Error:', error);
    res.status(500).json({ error: 'An error occurred during the search.' });
  }
};

module.exports = geminiArtPromptTester;
