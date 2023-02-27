import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './Home';
import MainPanel from './MainPanel';

const App = () => {

    return (
    <Routes>
        <Route index element={<Home />} />
        <Route path='/mainpanel/:user' element={<MainPanel />} />
    </Routes>);
}

export default App;