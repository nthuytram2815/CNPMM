require('dotenv').config();

const express = require('express');
const configViewEngine = require('./config/viewEngine');
const apiRoutes = require('./routes/api');
const connection = require('./config/database');
const { getHomepage } = require('./controllers/homeController');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8085;
//config app
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
configViewEngine(app);
const webAPI = express.Router();
webAPI.get("/", getHomepage);
app.use("/", webAPI);
app.use('/v1/api', apiRoutes);
(async () => {
    try {
        await connection();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        })
    } catch (error) {
        console.error("Database connection failed:", error);
    }
})()