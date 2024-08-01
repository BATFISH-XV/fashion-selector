import React, { useEffect } from 'react';
import MatchedResult from './Matched-Result';

function MatchedResults({ bingData }) {
  useEffect(() => {
    console.log('MatchedResults component loaded');
    console.log('Number of results:', bingData.length);
    console.log('bingData:', bingData);
  }, [bingData]);

  if (bingData[0] === undefined) {
    return (
      <>
      <h2 className='searchResults'>Search results</h2>
      <div className="bingContainer">
        <div className="image-results">
          <p>No matches found - try again with a new image</p>
        </div>
      </div>
    </>
    )
  }

  else return (
    <>
      <h2 className='searchResults'>Search results</h2>
      <div className="bingContainer">
        <div className="image-results">
          {bingData.map((image, index) => (
            <MatchedResult 
              key={index}
              image={image}
               />
          ))}
        </div>
      </div>
    </>
  );
}

export default MatchedResults;
