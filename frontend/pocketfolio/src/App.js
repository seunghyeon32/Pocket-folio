import logo from './logo.svg';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import Landing from './components/landing/landing';
import Main from './components/main/main';
import Portfolio from './components/portfolio/portfolio';
import Room from './components/room/room';
import Search from './components/search/search';
import Login from './components/user/login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/main" element={<Main/>}/>
        <Route path="/port" element={<Portfolio/>}/>
        <Route path="/room" element={<Room/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
