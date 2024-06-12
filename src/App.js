import './App.css';
import APIData from './APIData'
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes/AppRoutes';
import NavBar1 from './Components/NavBar/NavBar1';
import NavBar2 from './Components/NavBar/NavBar2';
import Footer from './Components/Footer/Footer';
// import CreateAccount from './Pages/CreateAccount/CreateAccount';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <NavBar1 />
        <NavBar2 />
        <div className='container'>
          <AppRoutes />
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
