import fs from 'fs';

export const loginUser = (req, res) => {

    try {
        const username = req.body?.username;
        const password = req.body?.password;

        if(username && password) {
            fs.readFile('./src/users.json', 'utf-8', (error, data) => {
                if(error) {
                    throw error;
                }

                const users = JSON.parse(data);
                for(let x of users) {
                    if(x.username === username && x.password === password) {
                        res.status(200).json({ isRegistered: true });
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
}