# go_green_test
Test application using a Rails API with React to display photo albums

### Notes
- 2 minute caching of all API endpoints
- important files:
  - [app/controllers/api_controller.rb](app/controllers/api_controller.rb)
  - [app/models/album_repository.rb](app/models/album_repository.rb)
  - [app/models/user_repository.rb](app/models/user_repository.rb)
  - [app/models/photo_album_api.rb](app/models/photo_album_api.rb)
  - [app/javascript/components/home.jsx](app/javascript/components/home.jsx)
  - [app/javascript/components/albums.jsx](app/javascript/components/albums.jsx)
  - [app/javascript/components/album.jsx](app/javascript/components/album.jsx)
  - [app/javascript/components/user.jsx](app/javascript/components/user.jsx)


### Testing the app
#### Heroku 
[go-green-test.herokuapp.com](https://go-green-test.herokuapp.com)

#### Locally
1. `git clone https://github.com/kmanzana/go_green_test.git`
2. `cd go_green_test`
3. `bundle install` (make sure to have ruby, rails, bundler installed)
4. `bundle exec rails s`
5. open http://localhost:3000
6. carouse the app

### TODOS:
- pagination
- google maps to show location of user
- load all users/photos to reduce external api calls
