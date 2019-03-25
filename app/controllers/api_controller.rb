class ApiController < ActionController::API
  def albums
    render json: cache('albums') { AlbumRepository.new.all }
  end

  def album
    album = cache("album-#{params[:id]}") do
      AlbumRepository.new.find(params[:id])
    end

    render json: album
  end

  def user
    user = cache("user-#{params[:id]}") do
      UserRepository.new.find(params[:id])
    end

    render json: user
  end

  private

  def cache(key, &block)
    Rails.cache.fetch(key, expires_in: 2.minutes, &block)
  end
end
