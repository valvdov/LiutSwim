import logo from './logo.svg';
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
  return (
      <>
          <Main/>
          <About/>
          <Services/>
          <Metodology/>
          <Mission/>
          <Team/>
          <Advantages/>
          <Loyalty/>
          <Reviews/>
          <Register/>
          <Faq/>
          <Question />
          <Footer />
      </>
  );
}

export default App;
