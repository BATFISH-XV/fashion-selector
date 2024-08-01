import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const PageContainer = styled.div`
  max-width: 1025px;
  padding: 50px;
  margin-top: 50px;
`;

const FavoritesRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: space-around;
  width: 100%;
  padding: 10px;
  margin: 70px 0;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  width: 400px;
  border-style: solid;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const Placeholder = styled.img`
  width: 90%;
  height: 90%;
  background: #f0f0f0;
`;

const PromptText = styled.div`
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
  color: #555;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 600px;
`;

const Card = styled.div`
  height: 165px;
  width: 165px;
  background-color: #f0f0f0;
  margin: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-style: solid;
  border-radius: 2rem;
`;

const Image = styled.img`
  height: 100px;
  width: 100px;
  position: relative;
`;

const Label = styled.div`
  margin-top: 15px;
  text-align: center;
`;

const RetailerLabel = styled(Label)`
  color: #333;
  font-weight: bold;
`;

const Favorites = ({ userId }) => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      console.log('Fetching favorites for userId:', userId);
      try {
        const response = await axios.post('/api/favorites', { userId });
        console.log('Fetched favorites:', response.data);
        setFavorites(response.data);
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setError(err);
      }
    };

    if (userId) {
      fetchFavorites();
    }
  }, [userId]);

  if (error) {
    return <div>Error fetching favorites: {error.message}</div>;
  }

  return (
    <PageContainer>
      {favorites.length === 0 ? (
        <div>No favorites found</div>
      ) : (
        favorites.map((favorite, index) => (
          <FavoritesRow key={index}>
            <ImageContainer>
              <Placeholder
                src={favorite.imageUrl || 'https://via.placeholder.com/400x200'}
                onError={(e) => (e.target.src = 'https://via.placeholder.com/400x200')}
              />
              <PromptText>{favorite.prompt}</PromptText>
            </ImageContainer>
            <CardContainer>
              {favorite.matchedImages && favorite.matchedImages.length > 0 ? (
                favorite.matchedImages.map((image, idx) => (
                  <Card key={idx}>
                    <Image
                      src={image.photoUrl || 'https://via.placeholder.com/100'}
                      alt="placeholder"
                      onError={(e) => (e.target.src = 'https://via.placeholder.com/100')}
                    />
                    <RetailerLabel>{image.name}</RetailerLabel>
                    <Label>{image.title}</Label>
                  </Card>
                ))
              ) : (
                <div>No matched images found</div>
              )}
            </CardContainer>
          </FavoritesRow>
        ))
      )}
    </PageContainer>
  );
};

export default Favorites;
