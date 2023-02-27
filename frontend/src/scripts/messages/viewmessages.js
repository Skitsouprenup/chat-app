

export const viewMessages = (setMessages, user) => {
    const url = 'http://localhost:4000/api/message/getmessages?username='+user;

    const request = new Request(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
          'Content-Type':'application/json',
      },
    });

    fetch(request).
      then((res) => {
        if(res.status === 200) {
          return res.json();
        }

        throw new Error(res.status);
    }).
      then((data) => {
        if(data?.length) {
          setMessages(data);
        }
        else {
          setMessages([]);
        }
    }).
      catch((e) => {
        console.log(e);
        setMessages([]);
    });
  }