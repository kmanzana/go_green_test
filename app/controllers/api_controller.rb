class ApiController < ActionController::API
  def albums
    albums = Rails.cache.fetch('albums', expires_in: 2.minutes) do
      AlbumRepository.new.all
    end

    render json: albums
  end

  def album
    album = Rails.cache.fetch("album-#{params[:id]}", expires_in: 2.minutes) do
      AlbumRepository.new.find(params[:id])
    end

    render json: album
  end

  def user
    user = Rails.cache.fetch("user-#{params[:id]}", expires_in: 2.minutes) do
      UserRepository.new.find(params[:id])
    end

    render json: user
  end
end
