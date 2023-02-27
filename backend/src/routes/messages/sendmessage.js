import fs from 'fs';

export const newMessages = [];

export const sendMessage = (req, res) => {

    try {
        const message = req.body?.message;
        const username = req.header('From');
        const receiver = req.header('To');

        if(username && message && receiver) {
            fs.readFile('./src/users.json', 'utf-8', (error, data) => {
                if(error) {
                    throw error;
                }

                const record = JSON.parse(data);

                let receiverFound = false;
                for(let x of record) {
                    if(x.username === receiver) {
                        receiverFound = true;

                        //Register message to the receiver
                        x.messages.push({
                            sender: username,
                            message
                        });

                        //Add notification
                        let foundUser = false;
                        for(let y of newMessages) {
                            if(y.username === receiver) {
                                foundUser = true;
                                y.newMsgCount = y.newMsgCount + 1;
                                y.msgAdded = true;
                                break;
                            }
                        }
                        if(!foundUser) {
                            newMessages.push({
                                username: receiver,
                                newMsgCount: 1,
                                msgAdded: true,
                            });
                        }

                        fs.writeFile("./src/users.json", JSON.stringify(record),
                        {
                            encoding: "utf8",
                            flag: "w",
                            mode: 0o666
                        },
                        (err) => {
                            if (err) throw err;
                            res.status(200).json({isSent: true});
                        });
                        break;
                    }
                }
                
                if(!receiverFound) {
                    res.sendStatus(404);
                }
            });
        }
        else {
            res.sendStatus(400);
        }
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
};