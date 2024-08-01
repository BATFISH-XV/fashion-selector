const supabase = require('../supabase');

const favoritesController = {};

favoritesController.favoriteMatch = async (req, res) => {
  const { userId, prompt, imageUrl, photoUrl, url, name, title, source } = req.body;
  console.log('favoriteMatch request body:', req.body);

  console.log('Length of imageUrl:', imageUrl.length);
  console.log('Length of photoUrl:', photoUrl.length);
  console.log('Length of url:', url.length);
  console.log('Length of name:', name.length);
  console.log('Length of title:', title ? title.length : 0); // title may be undefined
  console.log('Length of source:', source.length);
  console.log('userId:', userId);

  try {
    // Check if image exists
    let { data: existingImage, error: imageError } = await supabase
      .from('ai_images')
      .select('image_id')
      .eq('image_url', imageUrl)
      .single();

    if (imageError && imageError.code !== 'PGRST116') {  // PGRST116 means no rows found
      throw imageError;
    }

    let imageId;
    if (!existingImage) {
      console.log('Inserting new image');
      // Insert new image
      const { data: newImage, error: insertImageError } = await supabase
        .from('ai_images')
        .insert([{ prompt, image_url: imageUrl, is_generated: true }])
        .select('image_id')
        .single();

      if (insertImageError) {
        throw insertImageError;
      }

      imageId = newImage.image_id;
    } else {
      imageId = existingImage.image_id;
    }

    console.log('Image ID:', imageId);

    // Insert match
    const { data: newMatch, error: insertMatchError } = await supabase
      .from('matches')
      .insert([{ image_id: imageId, photo_url: photoUrl, url, name, title, source }])
      .select('match_id')
      .single();

    if (insertMatchError) {
      throw insertMatchError;
    }

    const matchId = newMatch.match_id;

    console.log('Match ID:', matchId);

    // Insert favorite
    const { error: insertFavoriteError } = await supabase
      .from('favorites')
      .insert([{ user_id: userId, match_id: matchId }]);

    if (insertFavoriteError) {
      throw insertFavoriteError;
    }

    res.status(200).send('Favorite saved successfully');
  } catch (error) {
    console.error('Error in favoriteMatch:', error);
    res.status(500).send('Server error');
  }
};
favoritesController.getUserFavorites = async (req, res) => {
  const { userId } = req.body;

  try {
    const { data: favorites, error } = await supabase
      .from('favorites')
      .select(`
        match_id,
        matches (
          photo_url,
          url,
          name,
          title,
          source,
          ai_images (
            image_url,
            prompt
          )
        )
      `)
      .eq('user_id', userId);

    if (error) {
      throw error;
    }

    const formattedFavorites = favorites.map(favorite => ({
      userId: favorite.user_id,
      prompt: favorite.matches.ai_images.prompt,
      imageUrl: favorite.matches.ai_images.image_url,
      photoUrl: favorite.matches.photo_url,
      url: favorite.matches.url,
      name: favorite.matches.name,
      title: favorite.matches.title,
      source: favorite.matches.source,
      matchId: favorite.match_id
    }));

    res.status(200).json(formattedFavorites);
  } catch (error) {
    console.error('Error in getUserFavorites:', error);
    res.status(500).send('Server error');
  }
};

module.exports = favoritesController;