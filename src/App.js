import './App.css';
import Header from './components/header/Header';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import { ToastContainer } from 'react-toastify';
import { Routes, Route, } from "react-router-dom";

// import {Example} from './components/signup/Example';
import Example from './components/signup/Example';
import Sidebar from './components/sidebar/Sidebar';
import Search from './components/search/Search';
import NotFound from './components/notFound/NotFound';
import Home from './components/home/Home';
import Profile from './components/profile/Profile';

function App() {

  const showSideBar = false;

  return (

      // flex direction is added to display the sidebar and other part side by side
      <div className="App" style={{ display: 'flex', flexDirection: 'row'}}>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <Header id="main-header"/> */}
        {/* <Login/> */}
        {/* <Signup /> */}
        {/* <Example/> */}
        
        <ToastContainer
          position="top-right"
          autoClose={3500}
          hideProgressBar
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/* <Link to='/login'> Login</Link>
        <Link to='/signup'> Signup</Link> */}

        <Routes>
          <Route path='/login'  index element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/search' element={<Search />} />
          <Route path='/home' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          {/* <Route path="*" element={<NotFound/>} /> */}
          {/* <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} /> */}
        </Routes>


      </div>
    // </Router>
  );
}

export default App;
