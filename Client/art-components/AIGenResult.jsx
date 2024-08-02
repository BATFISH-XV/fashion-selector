import React from 'react';
import '../index.css';

function AIGenResult({ imageUrl, onTryAgainClick, onFindMatchingItemsClick }) {
  return (
    <div className="generated-image">
      <img src={imageUrl} alt="Generated" className="generatedImg" height="300px" />
      <br />
      <button onClick={onTryAgainClick}>Generate new image</button>
      <button onClick={onFindMatchingItemsClick}>Find matching items</button>
    </div>
  );
}

export default AIGenResult;
