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
    <div className="search-page">
      <div className="form-container">
        <h1>Discover Your Art</h1>
        <p>Find art for your house based on various parameters.</p>
        <ArtPromptForm
          onImageGenerated={handleImageGenerated}
          setLoading={setLoading}
          setCurrentImageUrl={setCurrentImageUrl}
          currentPrompt={promptDetails}
        />
        <br />
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <CircularProgress />
            <p>Generating Art...</p>
          </div>
        )}
        {currentImageUrl && (
          <>
            <AIGenResult
              imageUrl={currentImageUrl}
              onTryAgainClick={handleGenerateImage}
              onFindMatchingItemsClick={handleFindMatchingItemsClick}
            />
            <button className="generateImage" type="button" onClick={handleFavorite}>
              Favorite This Image
            </button>
          </>
        )}
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
      <div className="favorites-container">
        <h2>Favorites</h2>
        <ul>
          {favorites.map((favorite, index) => (
            <li key={index}>
              <img src={favorite.imageUrl} alt={`Favorite ${index}`} />
              <p>{generatePrompt(favorite.details)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

ArtPromptTester.propTypes = {
  userID: PropTypes.string.isRequired,
};

export default ArtPromptTester;
