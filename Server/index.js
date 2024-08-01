
/**
 * Imports
 * @express routing middleware framework for server-side Node.js
 * @cors middleware to allow app to access the resources not hosted on our server -- however
 * we are using webpack proxy for all requests made to /api to this server and all outbound client
 * requests are proceeded by /api
 * 
 */
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
/**
 * @v4 importing v4 function from uuid library under nickname x
 * uuidd. The v4 methods generaters a random uuid which we then
 * use to generate unique file names so that we can avoid 
 * file name collisions during DB insertions. 
 */
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3003;
const authController = require('./Controllers/authController');
const openaiImageController = require('./Controllers/openaiImageController');
const bingSearchController = require('./Controllers/bingSearchController');
const profileController = require('./Controllers/profileController');
const promptTesterController = require('./Controllers/promptTesterController.js');
const artPromptTesterController = require('./Controllers/artPromptTesterController.js');
const favoritesController = require('./Controllers/favoritesController.js');
const feedController = require('./Controllers/feedController.js');

dotenv.config();

console.log('Supabase URL:', process.env.SUPABASE_URL); 
console.log('Supabase Key:', process.env.SUPABASE_KEY);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });


//ACCOUNT MANGEMENT
app.post('/api/signup', authController.signup);
app.post('/api/login', authController.login);

//AI-IMAGE GENERATION
app.post('/api/generate-image', openaiImageController.ImgGenService);

//IMAGE SEARCH ENGINE
app.post('/api/match-service', bingSearchController.matchService);

app.post('/api/generate-image/test', promptTesterController.generateImageTest);
app.post('/api/match-service/test', promptTesterController.matchService);

// ACCOUNT MANAGEMENT
app.post('/api/upload-avatar', upload.single('avatar'), profileController.uploadAvatar);
app.get('/api/user-profile/:userId', profileController.getUserProfile);
app.post('/api/update-profile', profileController.updateProfile);


app.post('/api/favorite', favoritesController.favoriteMatch);
app.post('/api/favorites/', favoritesController.getUserFavorites);


app.get('/api/matches', feedController.getAllMatches);


app.post('/api/generate-art-image', artPromptTesterController.generateArtImage);
// Route to find similar images using Bing's visual search
app.post('/api/match-art-service', artPromptTesterController.matchArtService);
// Route to add an image to favorites
app.post('/api/favorite-art-image', favoritesController.favoriteMatch);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
