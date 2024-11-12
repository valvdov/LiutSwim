import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import Main from "./components/Main";
import About from "./components/About";
import Services from "./components/Services";
import Metodology from "./components/Metodology";
import Mission from "./components/Mission";
import Team from "./components/Team";
import Advantages from "./components/Advantages";
import Loyalty from "./components/Loyalty";
import Reviews from "./components/Reviews";
import Register from "./components/Register";
import Faq from "./components/Faq";
import Question from "./components/Question";
import Footer from "./components/Footer";

function App() {
        const [language, setLanguage] = useState("ru");

        return (
            <>
                    <Main language={language} setLanguage={setLanguage}/>
                    <About language={language} />
                    <Services language={language} />
                    <Metodology language={language} />
                    <Mission language={language} />
                    <Team language={language} />
                    <Advantages language={language} />
                    <Loyalty language={language} />
                    <Reviews language={language} />
                    <Register language={language} />
                    <Faq language={language} />
                    <Question language={language} />
                    <Footer language={language} />
            </>
        );
}

export default App;
