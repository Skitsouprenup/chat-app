import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import UserRouter from './routes/login/loginrouter.js';
import ContactRouter from './routes/contacts/contactrouter.js';
import MessageRouter from './routes/messages/messagesrouter.js';
import { newMessages } from './routes/messages/sendmessage.js';

dotenv.config();
const app = express();

const port = process.env.PORT || 4000;

app.use(cors({
    credentials: true,
    methods: 'GET,POST,PATCH,DELETE,OPTIONS',
    origin: '*'
}));
app.use(express.json({type: 'application/json'}));
app.use('/api/user', UserRouter);
app.use('/api/contacts', ContactRouter);
app.use('/api/message', MessageRouter);

app.get('/api/notification', (req, res) => {
    try {
        const username = req.query?.username;
        const startTime = new Date().getTime();
        let interval = null;

        if(username) {
            interval = setInterval(() => {
                let foundUser = false;
                for(let x of newMessages) {
                    if(x.username === username &&
                       x.msgAdded) {
                        res.status(200).json({
                            newMsgCount: x.newMsgCount,
                            newNotif: x.msgAdded
                        });
                        x.msgAdded = false;
                        clearInterval(interval);
                        foundUser = true;
                        break;
                    }
                }

                if(!foundUser) {
                    const duration = new Date().getTime();
                    const elapsed = duration - startTime;

                    //Wait 5 seconds before we cancel
                    //user request
                    if(elapsed >= 5000) {
                        res.sendStatus(204);
                        clearInterval(interval);
                    }
                }
            }, 250);
        }
        else res.sendStatus(400);
    }
    catch(e) {
        if(interval !== null) clearInterval(interval);
        console.error(e);
        res.sendStatus(500);
    }
});

app.listen(port, () => {
    console.log('Server started at port ' + port);
});

