import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';

function ArtPromptForm({ onImageGenerated, setLoading, setCurrentImageUrl, currentPrompt }) {
  const [interests, setInterests] = useState('');
  const [colorPalette, setColorPalette] = useState('');
  const [location, setLocation] = useState('');
  const [medium, setMedium] = useState('');
  const [preferredTopics, setPreferredTopics] = useState('');
  const [excludedTopics, setExcludedTopics] = useState('');

  useEffect(() => {
    if (currentPrompt) {
      setInterests(currentPrompt.interests);
      setColorPalette(currentPrompt.colorPalette);
      setLocation(currentPrompt.location);
      setMedium(currentPrompt.medium);
      setPreferredTopics(currentPrompt.preferredTopics);
      setExcludedTopics(currentPrompt.excludedTopics);
    }
  }, [currentPrompt]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCurrentImageUrl(null);
    setLoading(true);

    try {
      const response = await axios.post('/api/generate-art-image', {
        promptDetails: {
          interests,
          colorPalette,
          location,
          medium,
          preferredTopics,
          excludedTopics,
        },
      });
      onImageGenerated(response.data.image_url, {
        interests,
        colorPalette,
        location,
        medium,
        preferredTopics,
        excludedTopics,
      });
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="art-form-container2">
      <label>
        Interests
        <br />
        <select name="interests" value={interests} onChange={(e) => setInterests(e.target.value)}>
          <option value="">Select Interest</option>
          <option value="nature">Nature</option>
          <option value="abstract">Abstract</option>
          <option value="animals">Animals</option>
          <option value="urban">Urban</option>
          <option value="fantasy">Fantasy</option>
        </select>
      </label>
      <br />

      <label>
        Favorite Color Palette
        <br />
        <select name="colorPalette" value={colorPalette} onChange={(e) => setColorPalette(e.target.value)}>
          <option value="">Select Color Palette</option>
          <option value="warm">Warm</option>
          <option value="cool">Cool</option>
          <option value="monochrome">Monochrome</option>
          <option value="vibrant">Vibrant</option>
          <option value="pastel">Pastel</option>
        </select>
      </label>
      <br />

      <label>
        Location in House
        <br />
        <select name="location" value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">Select Location</option>
          <option value="living room">Living Room</option>
          <option value="bedroom">Bedroom</option>
          <option value="office">Office</option>
          <option value="kitchen">Kitchen</option>
          <option value="hallway">Hallway</option>
        </select>
      </label>
      <br />

      <label>
        Medium
        <br />
        <select name="medium" value={medium} onChange={(e) => setMedium(e.target.value)}>
          <option value="">Select Medium</option>
          <option value="photo">Photo</option>
          <option value="painting">Painting</option>
          <option value="sketch">Sketch</option>
          <option value="digital">Digital</option>
        </select>
      </label>
      <br />

      <label>
        Preferred Topics
        <br />
        <select name="preferredTopics" value={preferredTopics} onChange={(e) => setPreferredTopics(e.target.value)}>
          <option value="">Select Preferred Topic</option>
          <option value="landscapes">Landscapes</option>
          <option value="portraits">Portraits</option>
          <option value="abstract shapes">Abstract Shapes</option>
          <option value="animals">Animals</option>
          <option value="fantasy">Fantasy</option>
        </select>
      </label>
      <br />

      <label>
        Excluded Topics
        <br />
        <select name="excludedTopics" value={excludedTopics} onChange={(e) => setExcludedTopics(e.target.value)}>
          <option value="">Select Excluded Topic</option>
          <option value="violence">Violence</option>
          <option value="dark themes">Dark Themes</option>
          <option value="politics">Politics</option>
          <option value="religion">Religion</option>
        </select>
      </label>
      <br />

      <button className="generateImage" type="submit">Generate Image</button>
    </form>
  );
}

export default ArtPromptForm;
