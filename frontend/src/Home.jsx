import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const navigate = useNavigate();

    const loginUser = () => {
        const url = 'http://localhost:4000/api/user/login';

        const request = new Request(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-store',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        fetch(request).
        then(
            (res) => {
                if(res.status === 200) {
                    return res.json();
                }
                else {
                    alert(res.status);
                }
            }
        ).
        then(
            (data) => {
                if(data.isRegistered) navigate('/mainpanel/' + username);
                else alert("invalid credentials!");
            }
        ).
        catch((e) => {
            console.error(e);
        });
    };

    return (
        <div className="flex bg-gray-50 flex-col w-full">
            <h2 className='p-4'>Login Page</h2>
            <div className='flex w-full gap-x-2 p-4'>
                <input type="text" 
                        placeholder='Username'
                        className='border-2 border-black'
                        onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" 
                        placeholder='Password'
                        className='border-2 border-black'
                        onChange={(e) => setPassword(e.target.value)}/>
                <button
                    onClick={loginUser}
                    className='border-2 border-black'>
                    Login
                    </button>
            </div>
        </div>
    );
};

export default Home;