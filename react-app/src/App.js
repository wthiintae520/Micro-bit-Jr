import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Info from './components/Info';
import Microbit from './components/Microbit';
import Navbar from './components/Navbar';
import colorThemes from './Themes';

function App() {

    const [colorTheme, setColorTheme] = useState(
        localStorage.getItem('configured-theme') || colorThemes[0].name
    );

    const activeTheme = colorThemes.find((item) => item.name === colorTheme);

    useEffect(() => {
        localStorage.setItem('configured-theme', colorTheme);
        Object.keys(activeTheme.colors).forEach((key) => {
            document.documentElement.style.setProperty(`--${key}`, [activeTheme.colors[key]]);
        });
    }, [colorTheme, activeTheme]);

    return (
        <Router>
            <Navbar
                colorThemes={colorThemes}
                activeTheme={activeTheme}
                setColorTheme={setColorTheme}
            />
            <Routes>
                <Route element={<Microbit />} path="/" />
                <Route element={<Info />} path="/info" />
            </Routes>
        </Router>
        
    );
}

export default App;
