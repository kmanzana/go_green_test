Rails.application.routes.draw do
  root to: 'pages#home'

  get '/api/albums',     to: 'api#albums'
  get '/api/albums/:id', to: 'api#album'
  get '/api/users/:id',  to: 'api#user'
end
