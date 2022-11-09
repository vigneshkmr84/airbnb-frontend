import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import { ToastContainer } from 'react-toastify';
import { Routes, Route, } from "react-router-dom";



import Profile from './components/profile/Profile';
import Payment from './components/payments/Payment';
import Bookmark from './components/bookmarks/Bookmark';
import Properties from './components/properties/Properties';
import PropertyDetails from './components/properties/propertydetails/PropertyDetails';
import Bookings from './components/bookings/Bookings';

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
        <Route path='/' index element={<Properties />} />
        <Route path='/login' index element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route path='/home' element={<Properties />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/bookmarks' element={<Bookmark />} />
        <Route path='/bookings' element={<Bookings />} />

        <Route path='/properties/:id' element={<PropertyDetails />} />

        {/* <Route path='/properties' element={<Properties />} /> */}
        {/* <Route path="*" element={<NotFound/>} /> */}
        {/* <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} /> */}
      </Routes>


    </div>
    // </Router>
  );
}

export default App;
