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

    albums.map do |album|
      user = fetch_user(album['userId'])
      user_name = user.parsed_response['name']

      photos = self.class.get("/photos?albumId=#{album['id']}")
      thumbnail = photos.parsed_response.first['thumbnailUrl']

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
  end

  def find_user(id)
  end

  def fetch_user(id)
    @users[id] ||= self.class.get("/users/#{id}")
  end
end
