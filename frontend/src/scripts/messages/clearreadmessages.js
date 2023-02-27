

export const clearReadMessages = (user, newMsgNotif, setNewMsgNotif) => {
    const url = 'http://localhost:4000/api/message/clearreadmessages?username='+user;

    const request = new Request(url, {
        method: 'GET',
        mode: 'cors',
    });

    fetch(request).
    then((res) => {
        setNewMsgNotif({
            newMsgCount: newMsgNotif.newMsgCount,
            newNotif: false,
        });

        if(res.status !== 200) {
            throw new Error(res.status);
        }
    }).
    catch((e) => {
        console.log(e);
    });
}