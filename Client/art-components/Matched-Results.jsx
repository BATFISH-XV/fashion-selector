import React, { useEffect } from 'react';
import MatchedResult from './Matched-Result';
import '../index.css'; // Import your global CSS

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
    <>
      <h2 className='searchResults'>Search results</h2>
      <div className="bingContainer">
        <div className="image-results">
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
    </>
  );
}

export default MatchedResults;
