import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Albums extends React.Component {
  constructor(props) {
    super(props);
    this.state = {albums: []};
  }


  componentDidMount() {
    fetch('/api/albums')
      .then(res => res.json())
      .then(
        (result) => this.setState({albums: result}),
        (error) => console.log(error)
      )
  }

  render() {
    const cards = this.state.albums.map((album) => {
      return (
        <div className="card" key={album['id']}>
          <img src={album['thumbnail']} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{album['user_name']}</h5>
            <p className="card-text">{album['title']}</p>
          </div>
        </div>
      )
    })

    return (
      <div>
        <h2>Albums</h2>
        <div className="card-columns">{cards}</div>
      </div>
    );
  }
}

function Album() {
  return <h2>Album</h2>;
}

function User() {
  return <h2>User</h2>;
}

class Home extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Albums</Link>
              </li>
              <li>
                <Link to="/album/">Album</Link>
              </li>
              <li>
                <Link to="/user/">User</Link>
              </li>
            </ul>
          </nav>

          <Route path="/" exact component={Albums} />
          <Route path="/album/" component={Album} />
          <Route path="/user/" component={User} />
        </div>
      </Router>
    );
  }
}

export default Albums;
