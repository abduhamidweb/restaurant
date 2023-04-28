import {
    Router
} from 'express';
import CommentController from '../controllers/comments.contr.js';

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
// Get all comments for a post
router.get('/comments', CommentController.getComment);

// Get a single comment
router.get('/comments/:id', CommentController.getCommentsForPost);

// Create a new comment for a post
router.post('/comments',checkToken, CommentController.createComment);

// Update an existing comment
router.put('/comments/:id',checkToken, CommentController.updateComment);

// Delete a comment
router.delete('/comments/:id', checkToken, CommentController.deleteComment);

export default router;