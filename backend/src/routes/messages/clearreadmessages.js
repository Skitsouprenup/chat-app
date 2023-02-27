import { newMessages } from "./sendmessage.js";


export const clearReadMessages = (req, res) => {
    try {
        const username = req.query?.username;

        if(username) {
            let foundUser = false;
            for(let x of newMessages) {
                if(x.username === username) {
                    foundUser = true;
                    x.newMsgCount = 0;
                    res.sendStatus(200);
                    break;
                }
            }

            if(!foundUser) res.sendStatus(404);
        }
        else res.sendStatus(400);
    }
    catch(e) {
        console.error(e);
        res.sendStatus(500);
    }
}