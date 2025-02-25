import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';

// TODO add token refresh route

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/oauth/" element={<Home />} />
                <Route path="/oauth/login" element={<Login />} />
                <Route path="/oauth/logout" element={<Logout />} />
            </Routes>
        </Router>
    );
}

export default App;