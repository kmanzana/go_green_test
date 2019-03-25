class PhotoAlbumApi
  include HTTParty
  base_uri 'jsonplaceholder.typicode.com'

  def initialize
    @users = []
  end

  def albums(user_id: nil)
    url = '/albums'
    url += "?userId=#{user_id}" if user_id

    get(url)
  end

  def album(id)
    get("/albums/#{id}")
  end

  def photos(id)
    get("/photos?albumId=#{id}")
  end

  def user(id)
    # lazy loading/caching of users since index makes several calls for same user
    @users[id.to_i] ||= get("/users/#{id}")
  end

  private

  def get(url)
    self.class.get(url).parsed_response
  end
end
