import React, { useState } from 'react';
import axios from 'axios';
import AIGenResult from './AI-Gen-Result';
import MatchedResults from './Matched-Results';
import SurpriseMe from './SurpriseMe';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import '../styles/PromptTester.css'; // Import the CSS file

function PromptTester() {
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [currentPrompt, setCurrentPrompt] = useState({});
  const [promptType, setPromptType] = useState('detailed');
  const [bingData, setBingData] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingBing, setLoadingBing] = useState(false);

  const generatePrompt = (promptType, parameters) => {
    let prompt = '';

    switch (promptType) {
      case 'detailed':
        prompt = `Create a high-quality image of a ${parameters.color} ${parameters.item} in ${parameters.style} style. The ${parameters.item} should feature ${parameters.details}. `;
        if (parameters.additionalItems) {
          prompt += `The ${parameters.item} should be styled with ${parameters.additionalItems}. `;
        }
        prompt += "The image should have a plain white background, with the item centered and facing the front. Ensure the item is fully within the image borders, and the image should be clear and well-lit.";
        break;

      case 'mood':
        prompt = `Imagine a ${parameters.mood} outfit perfect for ${parameters.occasion}. Design a ${parameters.color} ${parameters.item} as the centerpiece of this outfit, incorporating ${parameters.details}. `;
        if (parameters.additionalItems) {
          prompt += `Include ${parameters.additionalItems} to complete the look. `;
        }
        prompt += `Showcase the outfit in a ${parameters.setting} with ${parameters.lighting} to emphasize the overall aesthetic.`;
        break;

      case 'wearer':
        prompt = `Create a high-quality image of a ${parameters.bodyType} model wearing a ${parameters.color} ${parameters.item} in ${parameters.style} style. The ${parameters.item} should feature ${parameters.details}. `;
        if (parameters.additionalItems) {
          prompt += `Style the model with ${parameters.additionalItems} to create a complete look. `;
        }
        prompt += `The image should have a ${parameters.background}.`;
        break;

      case 'trend':
        prompt = `Design a ${parameters.color} ${parameters.item} inspired by the ${parameters.trend}. The ${parameters.item} should incorporate ${parameters.details} that reflect the key elements of this trend. `;
        if (parameters.additionalItems) {
          prompt += `Consider pairing the ${parameters.item} with ${parameters.additionalItems} to enhance the look. `;
        }
        prompt += `Showcase the outfit in a way that highlights its unique features and appeals to ${parameters.targetAudience}.`;
        break;

      default:
        break;
    }

    return prompt;
  };

  const handleImageGenerated = (imageUrl, prompt) => {
    setCurrentImageUrl(imageUrl);
    setCurrentPrompt(prompt);
    setLoading(false);
  };

  const handleGenerateImage = async () => {
    setLoading(true);
    try {
      const promptText = generatePrompt(promptType, currentPrompt);
      const response = await axios.post('/api/generate-image/test', { promptType, parameters: currentPrompt });
      handleImageGenerated(response.data.image_url, currentPrompt);
    } catch (error) {
      console.error('Error generating image:', error.response ? error.response.data : error.message);
      setLoading(false);
    }
  };

  const handleTryAgainClick = async () => {
    setCurrentImageUrl(null);
    setLoading(true);
    try {
      const response = await axios.post('/api/generate-image/test', { promptType, parameters: currentPrompt });
      handleImageGenerated(response.data.image_url, currentPrompt);
    } catch (error) {
      console.error('Error generating new image:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFindMatchingItemsClick = async () => {
    setBingData('');
    setLoadingBing(true);
    try {
      const response = await axios.post('/api/match-service', { imageUrl: currentImageUrl });
      setBingData(response.data);
    } catch (error) {
      console.error('Error searching Bing:', error.response ? error.response.data : error.message);
    } finally {
      setLoadingBing(false);
    }
  };

  const handleSurprise = async (randomPrompt) => {
    setCurrentPrompt(randomPrompt);
    setCurrentImageUrl(null);
    setLoading(true);
    try {
      const promptText = generatePrompt(promptType, randomPrompt);
      const response = await axios.post('/api/generate-image/test', { promptType, parameters: randomPrompt });
      handleImageGenerated(response.data.image_url, randomPrompt);
    } catch (error) {
      console.error('Error generating new image:', error.response ? error.response.data : error.message);
      setLoading(false);
    }
  };

  const handlePromptChange = (e) => {
    const { name, value } = e.target;
    setCurrentPrompt((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderPromptFields = () => {
    switch (promptType) {
      case 'detailed':
        return (
          <>
            <label>Color: <input name="color" onChange={handlePromptChange} /></label>
            <label>Item: <input name="item" onChange={handlePromptChange} /></label>
            <label>Style: <input name="style" onChange={handlePromptChange} /></label>
            <label>Details: <input name="details" onChange={handlePromptChange} /></label>
            <label>Additional Items: <input name="additionalItems" onChange={handlePromptChange} /></label>
          </>
        );
      case 'mood':
        return (
          <>
            <label>Mood: <input name="mood" onChange={handlePromptChange} /></label>
            <label>Occasion: <input name="occasion" onChange={handlePromptChange} /></label>
            <label>Color: <input name="color" onChange={handlePromptChange} /></label>
            <label>Item: <input name="item" onChange={handlePromptChange} /></label>
            <label>Details: <input name="details" onChange={handlePromptChange} /></label>
            <label>Additional Items: <input name="additionalItems" onChange={handlePromptChange} /></label>
            <label>Setting: <input name="setting" onChange={handlePromptChange} /></label>
            <label>Lighting: <input name="lighting" onChange={handlePromptChange} /></label>
          </>
        );
      case 'wearer':
        return (
          <>
            <label>Body Type: <input name="bodyType" onChange={handlePromptChange} /></label>
            <label>Color: <input name="color" onChange={handlePromptChange} /></label>
            <label>Item: <input name="item" onChange={handlePromptChange} /></label>
            <label>Style: <input name="style" onChange={handlePromptChange} /></label>
            <label>Details: <input name="details" onChange={handlePromptChange} /></label>
            <label>Additional Items: <input name="additionalItems" onChange={handlePromptChange} /></label>
            <label>Background: <input name="background" onChange={handlePromptChange} /></label>
          </>
        );
      case 'trend':
        return (
          <>
            <label>Color: <input name="color" onChange={handlePromptChange} /></label>
            <label>Item: <input name="item" onChange={handlePromptChange} /></label>
            <label>Trend: <input name="trend" onChange={handlePromptChange} /></label>
            <label>Details: <input name="details" onChange={handlePromptChange} /></label>
            <label>Additional Items: <input name="additionalItems" onChange={handlePromptChange} /></label>
            <label>Target Audience: <input name="targetAudience" onChange={handlePromptChange} /></label>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>Discover Your Style - TEST PAGE</h1>
        <p>This is a test page for generating style images with various prompts.</p>
        <div>
          <label htmlFor="promptType">Select Prompt Type: </label>
          <select
            id="promptType"
            value={promptType}
            onChange={(e) => setPromptType(e.target.value)}
          >
            <option value="detailed">Detailed</option>
            <option value="mood">Mood</option>
            <option value="wearer">Wearer</option>
            <option value="trend">Trend</option>
          </select>
        </div>
        <form>
          {renderPromptFields()}
          <button type="button" onClick={handleGenerateImage}>
            Generate Image
          </button>
        </form>
        <SurpriseMe onSurprise={handleSurprise} />
        <br />
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <CircularProgress />
            <p>Finding Your Style...</p>
          </div>
        )}
        {currentImageUrl && (
          <AIGenResult
            imageUrl={currentImageUrl}
            onTryAgainClick={handleTryAgainClick}
            onFindMatchingItemsClick={handleFindMatchingItemsClick}
          />
        )}
      </div>
      {bingData ? (
        <MatchedResults bingData={bingData} />
      ) : (
        <div style={{ width: '500px' }}></div>
      )}
      {loadingBing && (
        <div style={{ textAlign: 'center' }}>
          <LinearProgress />
          <p>Finding Matching Items...</p>
        </div>
      )}
      {currentPrompt && (
        <div className="prompt-preview">
          <h2>Prompt Preview:</h2>
          <p dangerouslySetInnerHTML={{ __html: generatePrompt(promptType, currentPrompt) }}></p>
        </div>
      )}
    </div>
  );
}

export default PromptTester;
