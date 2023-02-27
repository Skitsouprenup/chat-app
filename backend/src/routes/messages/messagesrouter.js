import express from 'express';
import { clearReadMessages } from './clearreadmessages.js';
import { getMessages } from './getmessages.js';
import { sendMessage } from './sendmessage.js';

const MessageRouter = express.Router();

MessageRouter.post('/sendmessage', sendMessage);
MessageRouter.get('/getmessages', getMessages);
MessageRouter.get('/clearreadmessages', clearReadMessages);

export default MessageRouter;