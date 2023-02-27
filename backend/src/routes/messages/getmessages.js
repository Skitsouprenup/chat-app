import fs from 'fs';

export const getMessages = (req, res) => {

    try {
        const username = req.query?.username;

        if(username) {
            fs.readFile('./src/users.json', 'utf-8', (error, data) => {
                if(error) {
                    throw error;
                }
    
                const record = JSON.parse(data);
                
                let userFound = false;
                for(let x of record) {
                    if(x.username === username) {
                        userFound = true;
                        res.status(200).json(x.messages);
                        break;
                    }
                }

                if(!userFound) res.sendStatus(404);
            });
        }
        else {
            res.sendStatus(400);
        }
    }
    catch(e) {
        console.error(e);
        res.sendStatus(500);
    }
};