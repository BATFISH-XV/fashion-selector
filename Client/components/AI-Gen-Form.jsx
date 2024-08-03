import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SpeechRecognition from '../components/SpeechRecognition';

<<<<<<< HEAD
function AIGenForm({ onImageGenerated, setLoading, setCurrentImageUrl, setBingData, currentPrompt }) {

=======
function AIGenForm({ onImageGenerated, setLoading, setCurrentImageUrl, currentPrompt }) {
>>>>>>> 7626bbaaa6a91da2a557d1015aaa65ec560aa5c6
  const [item, setItem] = useState('');
  const [color, setColor] = useState('');
  const [style, setStyle] = useState('');
  const [features, setFeatures] = useState('');
  const [additional, setAdditional] = useState('');

  useEffect(() => {
    if (currentPrompt) {
      setItem(currentPrompt.item);
      setColor(currentPrompt.color);
      setStyle(currentPrompt.style);
      setFeatures(currentPrompt.features);
      setAdditional(currentPrompt.additional);
    }
  }, [currentPrompt]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCurrentImageUrl(null);
    setLoading(true);

    try {
      const response = await axios.post('/api/generate-image', {
        item, color, style, features, additional
      });
      onImageGenerated(response.data.image_url, {
        item, color, style, features, additional
      });
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <form
      onSubmit={handleSubmit}
      className="form-container2">

      <label>
        Item
        <br></br>
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <SpeechRecognition key="item" formId="item" setter={setItem} />
      </label>
      <br></br>


      <label>
        Color
        <br></br>
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <SpeechRecognition key="color" formId="color" setter={setColor} />
      </label>
      <br></br>


      <label>
        Style
        <br></br>
        <input
          type="text"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        />
        <SpeechRecognition key="style" formId="style" setter={setStyle} />
      </label>
      <br></br>


      <label>
        Features
        <br></br>
        <input
          type="text"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
        />
        <SpeechRecognition key="features" formId="features" setter={setFeatures} />
      </label>
      <br></br>


      <label>
        Additional info
        <br></br>
        <input
          type="text"
          value={additional}
          onChange={(e) => setAdditional(e.target.value)}
        />
        <SpeechRecognition key="additional" formId="additional" setter={setAdditional} />
      </label>
      <br></br>

=======
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label>
          Item
          <input type="text" value={item} onChange={(e) => setItem(e.target.value)} />
          <SpeechRecognition key="item" formId="item" setter={setItem} />
        </label>
      </div>

      <div className="form-group">
        <label>
          Color
          <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
          <SpeechRecognition key="color" formId="color" setter={setColor} />
        </label>
      </div>

      <div className="form-group">
        <label>
          Style
          <input type="text" value={style} onChange={(e) => setStyle(e.target.value)} />
          <SpeechRecognition key="style" formId="style" setter={setStyle} />
        </label>
      </div>

      <div className="form-group">
        <label>
          Features
          <input type="text" value={features} onChange={(e) => setFeatures(e.target.value)} />
          <SpeechRecognition key="features" formId="features" setter={setFeatures} />
        </label>
      </div>

      <div className="form-group">
        <label>
          Additional info
          <input type="text" value={additional} onChange={(e) => setAdditional(e.target.value)} />
          <SpeechRecognition key="additional" formId="additional" setter={setAdditional} />
        </label>
      </div>
>>>>>>> 7626bbaaa6a91da2a557d1015aaa65ec560aa5c6

      <button className="generateImage" type="submit">Generate Image</button>
    </form>
  );
}

export default AIGenForm;
