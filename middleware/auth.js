import Worker from "../schemas/workers.schema.js";
import {
    JWT
} from "../utils/jwt.js";
export default async function authMiddleware(req, res, next) {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({
            error: 'Token not found'
        });
    }
    try {
        const decodedToken = JWT.VERIFY(token).id;
        console.log('decodedToken :', decodedToken);
        // req.user = decodedToken;
        console.log("Oke bos ishing zo'r");
        next();
    } catch (error) {
        return res.status(401).json({
            error: 'Invalid token'
        });
    }
};