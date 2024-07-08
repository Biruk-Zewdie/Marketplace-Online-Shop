import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes/AppRoutes';
import NavBar1 from './Components/NavBar/NavBar1';
import NavBar2 from './Components/NavBar/NavBar2';
import Footer from './Components/Footer/Footer';
import { DrawerProvider } from './Context/DrawerContext';
import AllCategoriesDrawer from './Pages/Product/AllCategoriesDrawer';


function App() {
  return (
    <div className="App">
      <DrawerProvider>
        <BrowserRouter>
          <NavBar1 />
          <NavBar2 />
          <AllCategoriesDrawer />
          <div className='container'>
            <AppRoutes />
          </div>
        </BrowserRouter>
        <Footer />
      </DrawerProvider>
    </div>
  );
}

export default App;
