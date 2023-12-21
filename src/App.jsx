import React from 'react';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import './App.css';
import Topbar from './components/topbar/Topbar';
import Home from './pages/home/Home';
import Tutoriel from './pages/tutoriel/Tutoriel'
import Training from './pages/training/Training';
import Premium from './pages/premium/Premium';
import Project from './pages/project/Project';
import SignIn from './pages/signIn/SignIn';
import SignUp from './pages/signUp/SignUp';
import HomeFooter from './components/homeFooter/HomeFooter';
import TutorialShow from './pages/tutorialShow/TutorialShow';
import Account from './pages/account/Account';
import TrainingShow from './pages/trainingShow/TrainingShow';

function App() {
  

  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path='/' exact element={<Home/>} />
        <Route path='/tutoriels'  element={<Tutoriel/>} /> 
        <Route path='/tutoriels/show/:id' element={<TutorialShow />} />
        <Route path='/formations'  element={<Training/>} />
        <Route path='/formations/show/:id' element={<TrainingShow />} />
        <Route path='/premium'  element={<Premium/>} />
        <Route path='/projets'  element={<Project/>} />
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/account' element={<Account/>} />
      </Routes>
      <HomeFooter/>
    </Router>
  );
}

export default App;
