// import logo from './logo.svg';

import './App.css';
import Header from './components/Header';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import { ToastContainer} from 'react-toastify';
// import {Example} from './components/signup/Example';
import Example from './components/signup/Example';

function App() {

  return (
    
    <div className="App">
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <Header/>
      {/* <Login/> */}
      <Signup/>
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
    </div>
  );
}

export default App;
