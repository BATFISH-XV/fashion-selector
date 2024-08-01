import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Page container
const PageContainer = styled.div`
  max-width: 1025px;
  padding: 50px;
  margin-top: 50px;
`;

// Container for each favorites row
const FavoritesRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: space-around;
  width: 100%;
  padding: 10px;
  margin: 70px 0;
`;

// AI Image container
const ImageContainer = styled.div`
  height: 200px;
  width: 400px;
  border-style: solid;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// AI image placeholder
const Placeholder = styled.img`
  width: 90%;
  height: 90%;
  background: #f0f0f0;
`;

// Cards container
const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 600px;
`;

// Single card container
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

// Card image
const Image = styled.img`
  height: 100px;
  width: 100px;
  position: relative;
`;

// Label div container
const Label = styled.div`
  margin-top: 15px;
  text-align: center;
`;

// Actual label styling
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
                onError={(e) => e.target.src = 'https://via.placeholder.com/400x200'}
              />
            </ImageContainer>
            <CardContainer>
              <Card>
                <Image
                  src={favorite.photoUrl || 'https://via.placeholder.com/30'}
                  alt="placeholder"
                  onError={(e) => e.target.src = 'https://via.placeholder.com/30'}
                />
                <RetailerLabel>{favorite.name}</RetailerLabel>
                <Label>{favorite.title}</Label>
              </Card>
            </CardContainer>
          </FavoritesRow>
        ))
      )}
    </PageContainer>
  );
};

export default Favorites;
