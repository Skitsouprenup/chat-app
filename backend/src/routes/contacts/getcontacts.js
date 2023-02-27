import fs from 'fs';

export const getContacts = (req, res) => {

    try {
        const username = req.query?.username;
    
        if(username) {
            fs.readFile('./src/users.json', 'utf-8', (error, data) => {
                if(error) {
                    throw error;
                }

                const users = JSON.parse(data);
                for(let x of users) {
                    if(x.username === username) {
                        res.status(200).json(x.contactlist);
                    }
                }
                
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