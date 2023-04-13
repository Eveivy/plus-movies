import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Movies from './Components/Movies';


function App() {

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/movies" component={Movies} /> 
      </Switch>
    </Router>
  )
}

export default App
