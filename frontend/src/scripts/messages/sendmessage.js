
export const sendMessage = 
    (
        receiver,
        message,
        setReceiver,
        setMessage,
        user
    ) => {
    if(!receiver && !message) {
       alert("Please fill-up the necessary fields.");
       return;
    }

    if(receiver === user) {
      alert("You can't send message to yourself.");
      return;
    }

    const url = 'http://localhost:4000/api/message/sendmessage';

    const request = new Request(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
          'Content-Type':'application/json',
          'To':receiver,
          'From':user
      },
      body: JSON.stringify({
        message
      }),
    });

    fetch(request).
      then((res) => {
        if(res.status === 200) {
          return res.json();
        }

        throw new Error(res.status);
    }).
      then((data) => {
        if(data?.isSent) {
          alert("Message Sent!");
        } else {
          alert("Oops! Something's wrong!");
        }
        setReceiver('');
        setMessage('');
    }).
      catch((e) => {
        console.log(e);
        setReceiver('');
        setMessage('');
    });

  };