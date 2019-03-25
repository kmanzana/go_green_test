import React from 'react';
import { Link } from 'react-router-dom';

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
        <nav aria-label='breadcrumb'>
          <ol className='breadcrumb mt-3'>
            <li className='breadcrumb-item'><Link to='/'>Home</Link></li>
            <li className='breadcrumb-item'>Users</li>
            <li className='breadcrumb-item active' aria-current='page'>{this.state.id}</li>
          </ol>
        </nav>
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
        <h4>Albums</h4>
        <div className='list-group mb-5'>{albums}</div>
      </div>
    );
  }
}

export default User;
