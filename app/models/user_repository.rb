class UserRepository
  def initialize
    @api = PhotoAlbumApi.new
  end

  attr_reader :api

  def find(id)
    user = api.user(id)
    albums = api.albums(user_id: id)

    user.merge(albums: albums)
  end
end
