import React, { useEffect, useState } from 'react';
import { clearReadMessages } from './scripts/messages/clearreadmessages';
import { viewMessages } from './scripts/messages/viewmessages'

const DisplayMessageHistory = 
    (
        {
            user, 
            setCloseModal,
            newMsgNotif,
            setNewMsgNotif,
        }
    ) => {
    const[messages, setMessages] = useState([]);

    useEffect(() => {
        viewMessages(setMessages, user);
        if(newMsgNotif.newNotif) {
            clearReadMessages(user, newMsgNotif, setNewMsgNotif);
        }
    },[newMsgNotif.newNotif])

    return (
        <div className='flex flex-col fixed w-screen h-screen'>
            <div 
                onClick={() => setCloseModal(false)}
                className='bg-black opacity-80 z-20 w-screen h-screen fixed top-0 left-0'>
            </div>
            
            <div className='flex justify-center items-center h-screen w-screen'>
                <div className='flex flex-col z-30 w-96 h-96 
                              bg-gray-200 p-4 overflow-y-scroll'>
                    <h2>Message History</h2>
                    {
                        messages.map((item, index) => {
                            return (
                                <div className='flex flex-col' key={item.sender+'-'+index}>
                                    <p><b>Sender: </b>{item.sender}</p>
                                    <p><b>Message</b></p>
                                    <p>{item.message}</p>
                                </div>
                            );
                        })
                    }
                    <button
                    onClick={() => setCloseModal(false)}
                    className='border-2 border-black w-14'>
                    Close
                    </button>
                </div>
            </div>
        </div>)
};

export default DisplayMessageHistory;