

export const receiveNotif = (setNewMsgNotif, user, signal) => {
    const url = 'http://localhost:4000/api/notification?username='+user;

    fetch(url, {signal}).
    then((res) => {
      //502 status code is connection timeout error.
      //We need to reconnect everytime our connection with the server
      //has timed out
      if(res.status === 502) {
        receiveNotif(setNewMsgNotif, user, signal);
      }
      else if(res.status === 200) {
        return res.json();
      }
      else if(res.status === 204) {
        //console.log('here');
        receiveNotif(setNewMsgNotif, user, signal);
        return undefined;
      }
      else{
        throw new Error(res.status);
      }
    }).
    then((data) => {
      if(data) {
        setNewMsgNotif({
          newMsgCount: data?.newMsgCount,
          newNotif: data?.newNotif,
        });
        receiveNotif(setNewMsgNotif, user, signal);
      }
    }).
    catch((e) => {
      if(!signal.aborted) {
        console.error("An error occured: " + e);
      }
    });

  };