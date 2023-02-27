# chat-app
Basic chat application

Requirement: NodeJS

This app won't run if you don't have nodeJS installed in your machine.

First Step: Install dependencies

Open frontend directory and open a terminal there.
Open backend directory and open a terminal there.

If you're using vscode, right click frontend and choose 'open integrated terminal'.
Do the same with backend directory.

Then, type this in both terminals: npm install
Wait for the dependencies to be installed and close the terminals once done.

Second Step: Running the app

We need two terminals for clients and one terminal for the server.
Go to frontend directory and open two terminals there.
Go to backend directory and open one terminal there.

In the first client terminal of your choice, type: npm start
In the second client terminal of your choice, type: npm run start2
In the server terminal, type: npm start

Then, open the browser of your choice and open localhost:3000 and localhost:2000
in separate tabs.

These are user credentials that you can use. You can see this credentials in users.json

username: user1
password: 123456

username: user2
password: 654321

Login each user in each client

Note: Make sure that port 2000, 3000 and 4000 are not currently used by other apps.

Third Step: Testing the app

This is pretty straightforward. Type a username in the 'receiver' textbox.
Must be a username registered in users.json and the username must not be the same with the sender.
It's recommended to type in the username that is logged in to another terminal to see realtime notification.

Type a message in 'message' textbox and click 'send message' button.

Once saved, go to the other tab and see its notification is updated.
Next, you can view the message history by clicking the 'view history' button on the bottom
side of contact list dropdown.

You can modify users.json to play around user data.
