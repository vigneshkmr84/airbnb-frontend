import './App.css';
// import Header from './components/header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import { ToastContainer } from 'react-toastify';
import { Routes, Route, } from "react-router-dom";
import Example from './components/signup/Example';
import Sidebar from './components/sidebar/Sidebar';
import NotFound from './components/notFound/NotFound';
import Search from './components/search/Search';

import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import Payment from './components/payments/Payment';
import Bookmark from './components/bookmarks/Bookmark';
import background from './background.jpeg'
import Properties from './components/properties/Properties';
import PropertyDetails from './components/properties/propertydetails/PropertyDetails';
function App() {

  return (

    // flex direction is added to display the sidebar and other part side by side
    <div className="App"
      style={{ display: 'flex', flexDirection: 'row', /* backgroundImage: `url(${background})` */ }}>
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
        <Route path='/' index element={<Home />} />
        <Route path='/login' index element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/search' element={<Search />} />
        <Route path='/home' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/bookmarks' element={<Bookmark />} />
        <Route path='/properties' element={<Properties />} />
        <Route path='/properties/:id' element={<PropertyDetails />} />
        <Route path='/properties1' element={<PropertyDetails />} />
        {/* <Route path="*" element={<NotFound/>} /> */}
        {/* <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} /> */}
      </Routes>


    </div>
    // </Router>
  );
}

export default App;
