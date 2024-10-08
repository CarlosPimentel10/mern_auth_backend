import express from 'express';
import devBundle from './devBundle';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());
app.use('/', userRoutes);
app.use('/auth', authRoutes);
app.use((err, req, res, next) => {
    if(err.name === 'UnauthorizedError'){
        res.status(401).json({"error": err.name + ": " + err.message});
    }
})


devBundle.compile(app);

export default app;