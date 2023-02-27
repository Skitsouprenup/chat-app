

export const getContacts = (setContact, setContactList, user) => {
    const url = 'http://localhost:4000/api/contacts/getcontacts?username='+user;

    const request = new Request(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
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
    setContactList(data);
    setContact(data[0]);
    }).
    catch((e) => {
    console.log(e);
    });
}