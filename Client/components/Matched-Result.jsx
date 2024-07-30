import React from 'react';
import '../styles/ResultStyle.css';

function MatchedResult({ image }) {
  console.log(`Rendering image: ${image.name} with URL: ${image.contentUrl}`);

  return (
    <div className="result-tile">
      <img src={image.contentUrl} alt={image.name} />
      <div className="result-info">
        <h3>{image.name}</h3>
        {image.description && <p>{image.description}</p>}
        <p><strong>Source:</strong> {image.hostPageDomainFriendlyName}</p>
        <p><strong>Price:</strong> {image.price}</p>
        <a href={image.hostPageUrl} target="_blank" rel="noopener noreferrer">View Item</a>
        <button>Add to Closet</button>
      </div>
    </div>
  );
}

export default MatchedResult;
//parent URL