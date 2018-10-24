Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'game#game'
  get 'register', to: 'users#try_register'
  post 'register', to: 'users#register'
  get 'login', to: 'sessions#try_login'
  post 'login', to: 'sessions#login'
  get 'logout', to: 'sessions#logout'
  get 'my_profile', to: 'users#profile'
  patch 'change_password', to: 'users#change_password'
  get 'error', to: 'users#error'
end
