import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import AIGenForm from './AI-Gen-Form';
import AIGenResult from './AI-Gen-Result';
import MatchedResults from './Matched-Results';
import SurpriseMe from './SurpriseMe';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import '../styles/ResultStyle.css'; 

function StyleImageSearchPage() {
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [bingData, setBingData] = useState('');
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [loadingBing, setLoadingBing] = useState(false);

  const handleImageGenerated = (imageUrl, prompt) => {
    setCurrentImageUrl(imageUrl);
    setCurrentPrompt(prompt);
    setLoading(false);
  };

  const handleTryAgainClick = async () => {
    setCurrentImageUrl(null);
    setLoading(true);
    try {
      const response = await axios.post('/api/generate-image', {
        item: currentPrompt.item,
        color: currentPrompt.color,
        style: currentPrompt.style,
        features: currentPrompt.features,
      });
      handleImageGenerated(response.data.image_url, currentPrompt);
    } catch (error) {
      console.error('Error generating new image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFindMatchingItemsClick = async () => {
    setBingData('');
    setLoadingBing(true);
    try {
      const response = await axios.post('/api/match-service', {
        imageUrl: currentImageUrl,
      });
      console.log(response.data);
      setBingData(response.data);
    } catch (error) {
      console.error('Error searching Bing:', error);
    } finally {
      setLoadingBing(false);
    }
  };

  const handleSurprise = async (randomPrompt) => {
    setCurrentPrompt(randomPrompt);
    setCurrentImageUrl(null);
    setLoading(true);
    try {
      const response = await axios.post('/api/generate-image', randomPrompt);
      handleImageGenerated(response.data.image_url, randomPrompt);
    } catch (error) {
      console.error('Error generating new image:', error);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>Discover Your Style</h1>
        <AIGenForm
          onImageGenerated={handleImageGenerated}
          setLoading={setLoading}
          setCurrentImageUrl={setCurrentImageUrl}
          currentPrompt={currentPrompt}
        />
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
    </div>
  );
}

export default StyleImageSearchPage;
