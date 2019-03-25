import React from 'react';
import { Link } from 'react-router-dom';

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
        <nav aria-label='breadcrumb'>
          <ol className='breadcrumb mt-3'>
            <li className='breadcrumb-item'><Link to='/'>Home</Link></li>
            <li className='breadcrumb-item'><Link to='/'>Albums</Link></li>
            <li className='breadcrumb-item active' aria-current='page'>{this.state.id}</li>
          </ol>
        </nav>
        <dl className='row'>
          <dt className='col-sm-2'>Name</dt>
          <dd className='col-sm-10'>{this.state.album.title}</dd>
          <dt className='col-sm-2'>By</dt>
          <dd className='col-sm-10'>
            <Link to={`/users/${this.state.album.user_id}`}>
              {this.state.album.user_name}
            </Link>
          </dd>
        </dl>
        <div className='card-columns'>{cards}</div>
      </div>
    );
  }
}

export default Album;
