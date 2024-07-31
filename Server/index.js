
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

const artPromptTesterController = require('./Controllers/artPromptTesterController.js');
const favoriteMatch = require('./Controllers/favoriteMatch.js'); // Import matchController

dotenv.config();

console.log('Supabase URL:', process.env.SUPABASE_URL); 
console.log('Supabase Key:', process.env.SUPABASE_KEY);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });


//ACCOUNT MANAGEMENT
/**
 * upload.single is part of mutter middleware library and
 * is a method is w/ with the name of the file input field in the
 * HTML form it came from as an arg. Then, it processes 
 * the incoming file upload and make the file avail
 * in the req.file object (like express but for binary data with 
 * the content-typoe 'multipart/form-data'
 */
app.post('/api/signup', authController.signup);
app.post('/api/login', authController.login);

// IMAGE CREATION AND DISCOVERY
app.post('/api/generate-image', openaiImageController.ImgGenService);
app.post('/api/match-service', bingSearchController.matchService);

// app.post('/api/generate-image/test', promptTesterController.generateImageTest);
// app.post('/api/match-service', promptTesterController.matchService);

// ACCOUNT MANAGEMENT
app.post('/api/upload-avatar', upload.single('avatar'), profileController.uploadAvatar);
app.get('/api/user-profile/:userId', profileController.getUserProfile);
app.post('/api/update-profile', profileController.updateProfile);

// app.post('/api/prompt-tester/generate-image', promptTesterController.generateImage); // Add the new route
/**
 * ADDING IN FAVORITE
 */
app.post('/api/favorite', favoriteMatch.favoriteMatch);

// Route to generate an art image based on prompts
app.post('/api/generate-art-image', artPromptTesterController.generateArtImage);

// Route to find similar images using Bing's visual search
app.post('/api/match-art-service', artPromptTesterController.matchArtService);

// Route to add an image to favorites
app.post('/api/favorite-art-image', favoriteMatch.favoriteMatch);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
