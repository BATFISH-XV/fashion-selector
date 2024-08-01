import React, { useState } from 'react';
import axios from 'axios';
import AIGenForm from './AI-Gen-Form';
import AIGenResult from './AI-Gen-Result';
import MatchedResults from './Matched-Results';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';

function StyleImageSearchPage({ userId }) {
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [bingData, setBingData] = useState('');
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
      setBingData(response.data);
    } catch (error) {
      console.error('Error searching Bing:', error);
    } finally {
      setLoadingBing(false);
    }
  };

  return (
  <>
      <div className="spacer"></div>
      <div className="containerOuter">
        <div className="container">
          <div className="form-container">
            <p className="discover">Discover your style</ p>
            <h3 className="fashion">Fashion, Art, Furniture</h3>
        <hr></hr>
        <AIGenForm
          onImageGenerated={handleImageGenerated}
          setLoading={setLoading}
          setCurrentImageUrl={setCurrentImageUrl}
          currentPrompt={currentPrompt}
        />
        <br />
        </div>
        <div className="rightContainer">
        {loading && (
          <div className="dallEProgress" style={{ textAlign: 'center' }}>
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
      {bingData ? (
        <MatchedResults 
          bingData={bingData} 
          currentImageUrl={currentImageUrl} 
          currentPrompt={currentPrompt} 
          userId={userId}
        />
      ) : (
      <div></div>
      )}
      {loadingBing && (
        <div style={{ textAlign: 'center' }}>
          <LinearProgress />
          <p>Finding Matching Items...</p>
        </div>
      )}
    </div>
    </div>
    </div>
    <div className ="sapcerBottom"></div>
    </>
  );
}

export default StyleImageSearchPage;
