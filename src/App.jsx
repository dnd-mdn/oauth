import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/oauth/" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;