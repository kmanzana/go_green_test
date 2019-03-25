class AlbumRepository
  # GET albums https://jsonplaceholder.typicode.com/albums
  # GET album https://jsonplaceholder.typicode.com/albums/1
  # GET photos https://jsonplaceholder.typicode.com/photos?albumId=1
  # GET user https://jsonplaceholder.typicode.com/users/1

  include HTTParty
  base_uri 'jsonplaceholder.typicode.com'

  def initialize
    @users = []
  end

  def all
    albums = self.class.get('/albums').parsed_response

    # option to request all users and all photos to reduce number of requests

    albums.map do |album|
      user = fetch_user(album['userId']).parsed_response
      user_name = user['name']

      photos = self.class.get("/photos?albumId=#{album['id']}").parsed_response
      thumbnail = photos.first['thumbnailUrl']

      {
        id: album['id'],
        title: album['title'],
        user_id: album['userId'],
        user_name: user_name,
        thumbnail: thumbnail
      }
    end
  end

  def find(id)
    photos = self.class.get("/photos?albumId=#{id}").parsed_response
    album = self.class.get("/albums/#{id}").parsed_response
    user = self.class.get("/users/#{album['userId']}").parsed_response

    {
      id: id.to_i,
      user_id: user['id'],
      title: album['title'],
      user_name: user['name'],
      photos: photos
    }
  end

  def find_user(id)
    user = self.class.get("/users/#{id}").parsed_response
    albums = self.class.get("/albums?userId=#{id}").parsed_response

    user.merge(albums: albums)
  end

  def fetch_user(id)
    @users[id] ||= self.class.get("/users/#{id}")
  end
end
