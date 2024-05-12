require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/db.js');
const errorMiddleware = require('./middlewares/errorMiddleware.js');
const bodyParser = require('body-parser');

const authRouter = require('./router/authRouter.js');
const contactRouter = require('./router/contactRouter.js');
const blogRouter = require('./router/blogRouter.js');
const favouriteRouter = require('./router/favouriteRouter.js');

const app = express();

app.use(express.json());
app.use(cors())
app.use(errorMiddleware);
app.use(bodyParser.urlencoded({ extended: true }));
app.options('*', cors());

app.use('/api/auth', authRouter);
app.use('/contact', contactRouter);
app.use('/blog', blogRouter);
app.use('/favourite', favouriteRouter);


connectDB().then(() => {
    app.listen('5000', () => {
        console.log('Hello');
    })
})