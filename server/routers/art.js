const { Router } = require('express');
const multer = require('multer');
const artController = require('../controllers/art');
const authenticator = require('../middleware/authenticator');

const artRouter = Router();
const upload = multer(); // Initialize Multer

artRouter.get('/', artController.index);
artRouter.get('/:id', artController.show);
artRouter.get('/:id/comments', artController.comments);
artRouter.get('/like/:art_id/:user_id', artController.likes)
artRouter.post('/like/:art_id/:user_id', artController.postLike)
artRouter.delete('/like/:art_id/:user_id', artController.destroyLike)
artRouter.post('/', upload.single('file'), artController.create); // Use Multer middleware for file upload
artRouter.patch('/:id', artController.update);
artRouter.delete('/:id', artController.destroy);
artRouter.get('/tags/:id', artController.showTags) //gets tags for specific artwork

module.exports = artRouter;