import {
    Router
} from 'express';
import PostController from '../controllers/posts.contr.js';

const router = Router();
async function checkToken(req, res, next) {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({
            message: "Xatolik: Kirish uchun token kerak yoki sizning xuquqingiz yo'q"
        });
    }
    try {
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Xatolik: Noto'g'ri yoki amalga oshirilmagan token"
        });
    }
}
// Get all posts
router.get('/posts', PostController.getAll);

// Get a single post
router.get('/posts/:id', PostController.getById);

// Create a new post
router.post('/posts', checkToken, PostController.create);

// Update an existing post
router.put('/posts/:id', checkToken, PostController.update);

// Delete a post
router.delete('/posts/:id', checkToken, PostController.delete);

export default router;