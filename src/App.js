import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Login/Signup';
import Login from './Login/Login';
import Mainweb from './commonComponents/Mainweb';
import Test12 from './commonComponents/Test12';
import Todo from './Todo/Todo';


function App() {
  return (
    <Router>
      {/* <ThreeScene /> */}
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mainweb" element={<Mainweb />} />
        <Route path="/play" element={<Test12 />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </Router>
  );
}

export default App;
