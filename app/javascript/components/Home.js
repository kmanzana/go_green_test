import React from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';

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
        <div className='card' key={album.id}>
          <Link to={`/albums/${album.id}`}>
            <img src={album.thumbnail} className='card-img-top' alt='...'/>
          </Link>
          <div className='card-body'>
            <h5 className='card-title'>{album.user_name}</h5>
            <p className='card-text'>{album.title}</p>
          </div>
        </div>
      )
    })

    return (
      <div>
        <h2>Albums</h2>
        <div className='card-columns'>{cards}</div>
      </div>
    );
  }
}

class Album extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params.id,
      album: {photos: []}
    };
  }

  componentDidMount() {
    fetch(`/api/albums/${this.state.id}`)
      .then(res => res.json())
      .then(
        (result) => this.setState({album: result}),
        (error) => console.log(error)
      )
  }

  render() {
    const cards = this.state.album.photos.map((photo) => {
      return (
        <div className='card' key={photo.id}>
          <img src={photo.url} className='card-img' alt='...'/>
          <div className='card-img-overlay'>
            <h5 className='card-title'>{photo.title}</h5>
          </div>
        </div>
      )
    })

    return (
      <div>
        <h2>Album: {this.state.album.title}</h2>
        <Link to={`/users/${this.state.album.user_id}`}>
          <h3>{this.state.album.user_name}</h3>
        </Link>
        <div className='card-columns'>{cards}</div>
      </div>
    );
  }
}

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params.id,
      user: {albums: [], address: {geo: {}}, company: {}}
    };
  }

  componentDidMount() {
    fetch(`/api/users/${this.state.id}`)
      .then(res => res.json())
      .then(
        (result) => this.setState({user: result}),
        (error) => console.log(error)
      )
  }

  render() {
    const albums = this.state.user.albums.map((album) => {
      return (
        <Link to={`/albums/${album.id}`} key={album.id} className='list-group-item list-group-item-action'>{album.title}</Link>
      )
    })

    return (
      <div>
        <h2>User Page</h2>
        <dl className='row'>
          <dt className='col-sm-2'>Name</dt>
          <dd className='col-sm-10'>{this.state.user.name}</dd>
          <dt className='col-sm-2'>Username</dt>
          <dd className='col-sm-10'>{this.state.user.username}</dd>
          <dt className='col-sm-2'>Email</dt>
          <dd className='col-sm-10'>
            <a href={`mailto:${this.state.user.email}`}>{this.state.user.email}</a>
          </dd>
          <dt className='col-sm-3'>Address</dt>
          <dd className='col-sm-9'>
            <dl className='row'>
              <dt className='col-sm-3'>Street</dt>
              <dd className='col-sm-9'>{this.state.user.address.street}</dd>
              <dt className='col-sm-3'>Suite</dt>
              <dd className='col-sm-9'>{this.state.user.address.suite}</dd>
              <dt className='col-sm-3'>City</dt>
              <dd className='col-sm-9'>{this.state.user.address.city}</dd>
              <dt className='col-sm-3'>Zipcode</dt>
              <dd className='col-sm-9'>{this.state.user.address.zipcode}</dd>
              <dt className='col-sm-3'>Geolocation</dt>
              <dd className='col-sm-9'>{this.state.user.address.geo.lat}, {this.state.user.address.geo.lng}</dd>
            </dl>
          </dd>
          <dt className='col-sm-2'>Phone</dt>
          <dd className='col-sm-10'>
            <a href={`tel:${this.state.user.phone}`}>{this.state.user.phone}</a>
          </dd>
          <dt className='col-sm-2'>Website</dt>
          <dd className='col-sm-10'>
            <a href={`//${this.state.user.website}`}>{this.state.user.website}</a>
          </dd>
          <dt className='col-sm-3'>Company</dt>
          <dd className='col-sm-9'>
            <dl className='row'>
              <dt className='col-sm-3'>Name</dt>
              <dd className='col-sm-9'>{this.state.user.company.name}</dd>
              <dt className='col-sm-3'>Catch phrase</dt>
              <dd className='col-sm-9'>{this.state.user.company.catchPhrase}</dd>
              <dt className='col-sm-3'>BS</dt>
              <dd className='col-sm-9'>{this.state.user.company.bs}</dd>
            </dl>
          </dd>
        </dl>
        <h3>Albums</h3>
        <div className='list-group'>{albums}</div>
      </div>
    );
  }
}

class Home extends React.Component {
  render() {
    return (
      <Router>
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
