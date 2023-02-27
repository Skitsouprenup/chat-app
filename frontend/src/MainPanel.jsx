import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DisplayMessageHistory from './DisplayMessageHistory';
import { getContacts } from './scripts/contacts/getcontacts';
import { sendMessage } from './scripts/messages/sendmessage';
import { receiveNotif } from './scripts/notification/receivenotif';

const MainPanel = () => {
    const[historyModal, setHistoryModal] = useState(false);
    const[contact, setContact] = useState('');
    const[contactList, setContactList] = useState([]);
    const[newMsgNotif, setNewMsgNotif] = useState({
      newMsgCount: 0,
      newNotif: false,
    });

    const[receiver, setReceiver] = useState('');
    const[message, setMessage] = useState('');
    const user = useParams().user;

    useEffect(() => {
      const controller = new AbortController();
      const signal = controller.signal;

      receiveNotif(setNewMsgNotif, user, signal);
      
      return () => controller.abort();
    },[]);

    useEffect(() => {
      getContacts(setContact, setContactList, user);
    }, [user]);

    return (
      <div className='flex gap-2 w-full h-full flex-col p-4'>
        {
          historyModal ? <DisplayMessageHistory 
          user={user}
          setCloseModal={setHistoryModal}
          newMsgNotif={newMsgNotif}
          setNewMsgNotif={setNewMsgNotif}/> :
          null
        }
        <h2>Welcome {user}</h2>
        <div className='flex gap-x-2'>
          <h2>
            Notification: {
              newMsgNotif.newNotif ? 
              ('new ' + newMsgNotif.newMsgCount + ' messages') :
               'no updates yet.'
            }
          </h2>
        </div>
        <div className='flex'>
          <div className='flex gap-1 flex-col'>
            <h2>Contact List</h2>
              <select 
                value={contact}
                onChange={(e) => setContact(e.target.value)}>
                  {
                    contactList.map((item) => {
                      return <option value={item} key={item}>{item}</option> 
                    })
                  }
              </select>
              {
                contactList?.length ? (
                  <>
                    <button 
                      className='border-2 border-black'
                      onClick={() => setHistoryModal(true)}>
                        View History
                    </button>
                  </>
                ) : null
              }
          </div>

          <div className='flex gap-1 flex-col p-4'>
            <h2>Create message</h2>
            
            <input type="text" 
                  placeholder='receiver' 
                  className='border-2 border-black'
                  value={receiver}
                  onChange={(e) => {setReceiver(e.target.value)}}/>
            <input type="textarea" 
                  placeholder='message' 
                  className='border-2 border-black'
                  value={message}
                  onChange={(e) => {setMessage(e.target.value)}}/>
            <button 
              className='border-2 border-black'
              onClick={
                () => {
                  sendMessage(receiver, message,
                              setReceiver, setMessage,
                              user);
                }
              }>Send Message</button>
          </div>
        </div>

      </div>
    );
};

export default MainPanel;