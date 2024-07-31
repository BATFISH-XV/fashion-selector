import React from 'react';
import axios from 'axios';
import '../styles/ResultStyle.css';

function MatchedResult({ image, currentImageUrl, currentPrompt, userId }) {
  console.log(`Rendering image: ${image.name} with URL: ${image.contentUrl}`);

  const handleAddToFavorites = async () => {
    console.log('Adding to favorites:', { userId, currentPrompt, currentImageUrl, image });

    try {
      await axios.post('/api/favorite', {
        userId,
        prompt: currentPrompt,
        imageUrl: currentImageUrl,
        photoUrl: image.contentUrl,
        url: image.hostPageUrl,
        name: image.name,
        title: image.title,
        source: 'Bing'  
      });
      alert('Added to favorites');
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  return (
    <div className="result-tile">
      <img src={image.contentUrl} alt={image.name} />
      <div className="result-info">
        <h3>{image.name}</h3>
        {image.description && <p>{image.description}</p>}
        <p><strong>Source:</strong> {image.hostPageDomainFriendlyName}</p>
        <p><strong>Price:</strong> {image.price}</p>
        <a href={image.hostPageUrl} target="_blank" rel="noopener noreferrer">View Item</a>
        <div className="star" onClick={handleAddToFavorites} style={{ cursor: 'pointer' }}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="25" 
            height="25" 
            fill="currentColor" 
            className="bi bi-star" 
            viewBox="0 0 16 16">
            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default MatchedResult;
