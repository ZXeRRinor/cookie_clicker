Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'game#game'
  get 'register', to: 'users#try_register'
  post 'register', to: 'users#register'
  get 'login', to: 'sessions#try_login'
  post 'login', to: 'sessions#login'
  get 'logout', to: 'sessions#logout'
  get 'my_profile', to: 'users#show_current'
end
