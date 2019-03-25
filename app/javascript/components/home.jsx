import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Albums from './albums';
import Album from './album';
import User from './user';

class Home extends React.Component {
  render() {
    return (
      <Router>
        <h1>New Millenium Photos</h1>
        <div>
          <Route exact path='/' component={Albums} />
          <Route path='/albums/:id' component={Album} />
          <Route path='/users/:id' component={User} />
        </div>
      </Router>
    );
  }
}

export default Home;
