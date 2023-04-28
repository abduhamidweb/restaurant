import express from "express";
import "../utils/mongo.js";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
dotenv.config();
import cors from "cors";
import bossRoutes from '../routes/boss.routes.js';
import resturantRoutes from '../routes/restaurant.routes.js';
import resoursceRoutes from '../routes/resource.routes.js';
// import postRoutes from '../routes/posts.routes.js';
// import commentRoutes from '../routes/comments.routes.js';

const PORT = process.env.PORT || 3000;
const app = express();

// app.use(fileUpload({
//     limits: {
//         fileSize: 50 * 1024 * 1024
//     }
// }));

app.use(express.json());
app.use(cors("*"));
app.use(express.static("./public"));
// app.engine("html", ejs.renderFile);
// app.set("view engine", "html");
// app.set(".html", path.join(process.cwd(), "views"));
// app.use(bodyParser.json());
app.use(express.json());
// User routes
app.use('/api', bossRoutes);
app.use('/api', resturantRoutes);
app.use('/api', resoursceRoutes);

// Post routes
// app.use('/api', postRoutes);

// Comment routes
// app.use('/api', commentRoutes);

app.listen(PORT, () => {
    console.log("Service listening on port " + PORT);
});