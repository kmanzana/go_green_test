import React from 'react';
import { Link } from 'react-router-dom';

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
          <div className='row no-gutters'>
            <div className='col-md-5'>
              <Link to={`/albums/${album.id}`}>
                <img src={album.thumbnail} className='card-img' style={{width: 'auto'}} alt='...'/>
              </Link>
            </div>
            <div className='col-md-7'>
              <div className='card-body'>
                <p className='card-text'>
                  <Link to={`/albums/${album.id}`}>{album.title}</Link>
                </p>
                <p className='card-text'>
                  <small><Link to={`/users/${album.user_id}`}>{album.user_name}</Link></small>
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    })

    let content
    if (this.state.albums.length == 0) {
      content = <p>loading...</p>
    } else {
      content = <div className='card-columns'>{cards}</div>
    }

    return (
      <div>
        <nav aria-label='breadcrumb'>
          <ol className='breadcrumb mt-3'>
            <li className='breadcrumb-item'><Link to='/'>Home</Link></li>
            <li className='breadcrumb-item active' aria-current='page'>Albums</li>
          </ol>
        </nav>
        {content}
      </div>
    );
  }
}

export default Albums;
