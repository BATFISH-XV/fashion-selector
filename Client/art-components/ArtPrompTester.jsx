import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ArtPromptForm from './ArtPromptForm';
import AIGenResult from './AIGenResult';
import MatchedArtResults from './MatchedArtResults';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import '../index.css';

function ArtPromptTester({ userID }) {
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
  const [favorites, setFavorites] = useState([]);
  const [bingData, setBingData] = useState('');

  const handleImageGenerated = (imageUrl, details) => {
    setCurrentImageUrl(imageUrl);
    setPromptDetails(details);
    setLoading(false);
  };

  const handleGenerateImage = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/generate-art-image', { promptDetails, userID });
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

  const handleFavorite = async () => {
    try {
      await axios.post('/api/favorite-art-image', { imageUrl: currentImageUrl, promptDetails, userID });
      setFavorites((prevFavorites) => [
        ...prevFavorites,
        { imageUrl: currentImageUrl, details: promptDetails },
      ]);
    } catch (error) {
      console.error('Error saving favorite:', error.response ? error.response.data : error.message);
    }
  };
  return (
    <>
      <div className="spacer"></div>
      <div className="containerOuter">
        <div className="container">
          <div className="form-container">
            <p className="discover">Discover your style</p>
            <h3 className="fashion">Art</h3>
            <hr />
            <ArtPromptForm
              onImageGenerated={handleImageGenerated}
              setLoading={setLoading}
              setCurrentImageUrl={setCurrentImageUrl}
              currentPrompt={promptDetails}
            />
            <br />
          </div>
          <div className="rightContainer">
            {loading && (
              <div className="dallEProgress" style={{ textAlign: 'center' }}>
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
            {/* {currentImageUrl && (
              <button className="generateImage" type="button" onClick={handleFavorite}>
                Favorite This Image
              </button>
            )} */}
            {loadingBing && (
              <div style={{ textAlign: 'center' }}>
                <LinearProgress />
                <p>Finding Matching Items...</p>
              </div>
            )}
          </div>
          {bingData && (
            <MatchedArtResults
              bingData={bingData}
              currentImageUrl={currentImageUrl}
              currentPrompt={promptDetails}
              userID={userID}
            />
          )}
        </div>
      </div>
      <div className="spacerBottom"></div>
    </>
  );
}

ArtPromptTester.propTypes = {
  userID: PropTypes.string.isRequired,
};

export default ArtPromptTester;