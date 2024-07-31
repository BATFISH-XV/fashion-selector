import React, { useEffect } from 'react';
import MatchedResult from './Matched-Result';

function MatchedResults({ bingData, currentImageUrl, currentPrompt, userId }) {
  useEffect(() => {
    console.log('MatchedResults component loaded');
    console.log('Number of results:', bingData.length);
    console.log('bingData:', bingData);
    console.log('currentImageUrl:', currentImageUrl);
    console.log('currentPrompt:', currentPrompt);
    console.log('userId:', userId);
  }, [bingData, currentImageUrl, currentPrompt, userId]);

  return (
    <div className="image-results">
      <h2>Similar Images</h2>
      <div className="results-container">
        {bingData.map((image, index) => (
          <MatchedResult 
            key={index} 
            image={image} 
            currentImageUrl={currentImageUrl} 
            currentPrompt={currentPrompt} 
            userId={userId}
          />
        ))}
      </div>
    </div>
  );
}

export default MatchedResults;
