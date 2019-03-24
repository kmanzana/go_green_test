class ApiController < ActionController::API
  def albums
    albums = Rails.cache.fetch('albums', expires_in: 1.minute) do
      AlbumRepository.new.all
    end

    render json: albums
  end

  def album
  end

  def user
  end
end
