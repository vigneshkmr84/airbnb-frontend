// import logo from './logo.svg';

import './App.css';
import Header from './components/Header';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import { ToastContainer} from 'react-toastify';

function App() {

  return (
    // <div className="App">
    //   <header className="App-header">
    //     {/* <img src={logo} className="App-logo" alt="logo" /> */}
    //     <p>
    //       Airbnb Project
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //     </a>
    //   </header>
    // </div>
    <div className="App">
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <Header/>
      <Login/>
      {/* <Test></Test> */}
      {/* <Signup/> */}
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
