import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import { Navbar } from './components/containers/Navbar';
import { About } from './pages/About';
import { Profile } from './pages/Profile';
import Devices from './pages/Devices';
import DevicesRouter from './pages/DevicesRouter';
import DeviceParameters from './pages/DeviceParameters';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <div className="container pt-4">
        <Switch>
          <Route exact path="/" component={Home}/>          
          <Route exact path="/devices" component={Devices}/>
          <Route exact path="/devices/:devname" component={DevicesRouter}/>
          <Route path="/devices/:devname/:list" component={DeviceParameters}/>
          <Route path="/about" component={About}/>
          <Route path="/profile/:name" component={Profile}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
