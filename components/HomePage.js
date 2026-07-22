import Main from "./Main";
import About from "./About";
import Services from "./Services";
import Metodology from "./Metodology";
import Mission from "./Mission";
import Team from "./Team";
import Advantages from "./Advantages";
import Loyalty from "./Loyalty";
import Reviews from "./Reviews";
import Register from "./Register";
import Faq from "./Faq";
import Question from "./Question";
import Footer from "./Footer";
import JsonLd from "./JsonLd";
import {ServiceProvider} from "./ServiceProvider";

export default function HomePage({lang, content}) {
    return (
        <ServiceProvider>
            <JsonLd lang={lang} content={content}/>
            <Main language={lang} contacts={content.contacts}/>
            <About language={lang}/>
            <Services language={lang} services={content.services}/>
            <Metodology language={lang}/>
            <Mission language={lang}/>
            <Team language={lang} team={content.team}/>
            <Advantages language={lang}/>
            <Loyalty language={lang}/>
            <Reviews language={lang} reviews={content.reviews}/>
            <Register language={lang} services={content.services} locations={content.locations}/>
            <Faq language={lang} faqs={content.faqs}/>
            <Question language={lang}/>
            <Footer language={lang} locations={content.locations} contacts={content.contacts}/>
        </ServiceProvider>
    );
}
