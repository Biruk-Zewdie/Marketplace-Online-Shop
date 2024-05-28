import './App.css';
import APIData from './APIData'
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes/AppRoutes';
import NavBar1 from './Components/NavBar/NavBar1';
import NavBar2 from './Components/NavBar/NavBar2';
// import CreateAccount from './Pages/CreateAccount/CreateAccount';

function App() {
  return (
    <div className="App">
      {/* <APIData /> */}
      {/* <CreateAccount/> */}
      <BrowserRouter>
        <NavBar1 />
        <NavBar2 />
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
