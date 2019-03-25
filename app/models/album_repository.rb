class AlbumRepository
  def initialize
    @api = PhotoAlbumApi.new
  end

  attr_reader :api

  def all
    # option to request all users and all photos to reduce number of requests
    api.albums.map do |album|
      thumbnail = api.photos(album['id']).first['thumbnailUrl']

      serialize(album).merge(thumbnail: thumbnail)
    end
  end

  def find(id)
    album = api.album(id)

    serialize(album).merge(photos: api.photos(id))
  end

  private

  def serialize(album)
    user = api.user(album['userId'])

    {
      id: album['id'],
      user_id: album['userId'],
      title: album['title'],
      user_name: user['name']
    }
  end
end
