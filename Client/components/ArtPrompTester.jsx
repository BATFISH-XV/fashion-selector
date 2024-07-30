import React, { useState } from 'react';
import axios from 'axios';
import AIGenResult from './AI-Gen-Result';
import MatchedResults from './Matched-Results';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import '../styles/PromptTester.css';

function ArtPromptTester() {
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [promptDetails, setPromptDetails] = useState({
    interests: '',
    colorPalette: '',
    location: '',
    medium: '',
    preferredTopics: '',
    excludedTopics: '',
  });
  const [loading, setLoading] = useState(false);
  const [loadingBing, setLoadingBing] = useState(false);

  const generatePrompt = (details) => {
    return `Create a high-quality piece of art that matches the following criteria:
      Interests: ${details.interests},
      Color Palette: ${details.colorPalette},
      Location: ${details.location},
      Medium: ${details.medium},
      Preferred Topics: ${details.preferredTopics},
      Excluded Topics: ${details.excludedTopics}.`;
  };

  const handleImageGenerated = (imageUrl, details) => {
    setCurrentImageUrl(imageUrl);
    setPromptDetails(details);
    setLoading(false);
  };

  const handleGenerateImage = async () => {
    setLoading(true);
    try {
      const promptText = generatePrompt(promptDetails);
      const response = await axios.post('/api/generate-art-image', { promptDetails });
      handleImageGenerated(response.data.image_url, promptDetails);
    } catch (error) {
      console.error('Error generating image:', error.response ? error.response.data : error.message);
      setLoading(false);
    }
  };

  const handleFindMatchingItemsClick = async () => {
    setLoadingBing(true);
    try {
      const response = await axios.post('/api/match-art-service', { imageUrl: currentImageUrl });
      setBingData(response.data);
    } catch (error) {
      console.error('Error searching Bing:', error.response ? error.response.data : error.message);
    } finally {
      setLoadingBing(false);
    }
  };

  const handlePromptChange = (e) => {
    const { name, value } = e.target;
    setPromptDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>Discover Your Art - ArtPromptTester</h1>
        <p>Find art for your house based on various parameters.</p>
        <form>
          <div>
            <label>Interests:</label>
            <select name="interests" onChange={handlePromptChange}>
              <option value="">Select Interest</option>
              <option value="nature">Nature</option>
              <option value="abstract">Abstract</option>
              <option value="animals">Animals</option>
              <option value="urban">Urban</option>
              <option value="fantasy">Fantasy</option>
            </select>
          </div>
          <div>
            <label>Favorite Color Palette:</label>
            <select name="colorPalette" onChange={handlePromptChange}>
              <option value="">Select Color Palette</option>
              <option value="warm">Warm</option>
              <option value="cool">Cool</option>
              <option value="monochrome">Monochrome</option>
              <option value="vibrant">Vibrant</option>
              <option value="pastel">Pastel</option>
            </select>
          </div>
          <div>
            <label>Location in House:</label>
            <select name="location" onChange={handlePromptChange}>
              <option value="">Select Location</option>
              <option value="living room">Living Room</option>
              <option value="bedroom">Bedroom</option>
              <option value="office">Office</option>
              <option value="kitchen">Kitchen</option>
              <option value="hallway">Hallway</option>
            </select>
          </div>
          <div>
            <label>Medium:</label>
            <select name="medium" onChange={handlePromptChange}>
              <option value="">Select Medium</option>
              <option value="photo">Photo</option>
              <option value="painting">Painting</option>
              <option value="sketch">Sketch</option>
              <option value="digital">Digital</option>
            </select>
          </div>
          <div>
            <label>Preferred Topics:</label>
            <select name="preferredTopics" onChange={handlePromptChange}>
              <option value="">Select Preferred Topic</option>
              <option value="landscapes">Landscapes</option>
              <option value="portraits">Portraits</option>
              <option value="abstract shapes">Abstract Shapes</option>
              <option value="animals">Animals</option>
              <option value="fantasy">Fantasy</option>
            </select>
          </div>
          <div>
            <label>Excluded Topics:</label>
            <select name="excludedTopics" onChange={handlePromptChange}>
              <option value="">Select Excluded Topic</option>
              <option value="violence">Violence</option>
              <option value="dark themes">Dark Themes</option>
              <option value="politics">Politics</option>
              <option value="religion">Religion</option>
            </select>
          </div>
          <button type="button" onClick={handleGenerateImage}>
            Generate Image
          </button>
        </form>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <CircularProgress />
            <p>Generating Art...</p>
          </div>
        )}
        {currentImageUrl && (
          <AIGenResult
            imageUrl={currentImageUrl}
            onTryAgainClick={handleGenerateImage}
            onFindMatchingItemsClick={handleFindMatchingItemsClick}
          />
        )}
        {loadingBing && (
          <div style={{ textAlign: 'center' }}>
            <LinearProgress />
            <p>Finding Matching Items...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ArtPromptTester;
