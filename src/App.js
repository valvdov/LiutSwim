import logo from './logo.svg';
import React, {useEffect, useState} from 'react';
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

    useEffect(() => {
        const savedLanguage = localStorage.getItem("selectedLanguage");
        if (savedLanguage) {
            setLanguage(savedLanguage);
        }
    }, []);

    const [selectedService, setSelectedService] = useState('');


    const handleServiceSelect = (service) => {
        setSelectedService(service); // Устанавливаем выбранное значение из Services
    };

    const handleServiceChange = (service) => {
        setSelectedService(service); // Устанавливаем новое значение из Register
    };


    // Сохраняем язык в localStorage при изменении
    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);
        localStorage.setItem("selectedLanguage", newLanguage);
    };

        return (
            <>
                    <Main language={language} setLanguage={handleLanguageChange}/>
                    <About language={language} />
                    <Services language={language} onServiceSelect={handleServiceSelect} />
                    <Metodology language={language} />
                    <Mission language={language} />
                    <Team language={language} />
                    <Advantages language={language} />
                    <Loyalty language={language} />
                    <Reviews language={language} />
                    <Register language={language} selectedService={selectedService} onServiceChange={handleServiceChange}/>
                    <Faq language={language} />
                    <Question language={language} />
                    <Footer language={language} />
            </>
        );
}

export default App;
