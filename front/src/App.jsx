////IMPORTS HANDLE
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

/////PAGES
import Home from "./pages/Home/Home";
import RegistrarUser from './pages/Registro/RegistrarUser';
import EditUser from './pages/EditUser/EditUser';

////COMPONENTS
import Navbar from './components/Navbar';


function App() {
  return (

    <BrowserRouter>
    <Navbar/>

      <Routes>

        <Route path='/' element={<Home/>}/>
        <Route path='/registrar' element={<RegistrarUser/>}/>
        <Route path="/edituser/:id" element={<EditUser/>}/>

      </Routes>

    </BrowserRouter>
  
)
  
}

export default App
