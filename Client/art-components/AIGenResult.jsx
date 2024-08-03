import React from 'react';
import '../index.css';

function AIGenResult({ imageUrl, onTryAgainClick, onFindMatchingItemsClick }) {
  return (
    <div className="art-result-container">
      <img src={imageUrl} alt="Generated Art" className="art-generated-img" />
      <div className="art-result-buttons">
        <button className="art-result-button" onClick={onTryAgainClick}>Generate new image</button>
        <button className="art-result-button" onClick={onFindMatchingItemsClick}>Find matching items</button>
      </div>
    </div>
  );
}

export default AIGenResult;
