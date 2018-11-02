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

  get  'forum/:id/new_sub',     to: 'subforums#new'
  post 'forum/:id/new_sub',     to: 'subforums#create'
  get  'forum/:id/new_post',    to: 'posts#new'
  post 'forum/:id/new_post',    to: 'posts#create'
  post 'forum/posts/:id/new',   to: 'messages#create'
  get  'forum/:id',             to: 'subforums#show'
  get  'forum/init',            to: 'subforums#init'
  get  'forum/post/:id',        to: 'posts#show'

  get 'error/1/:type',  to: 'errors#default_error'
  get 'error/2',        to: 'errors#incorrect_email_or_password'
  get 'error/3',        to: 'errors#invalid_email'
  get 'error/4',        to: 'errors#invalid_password'
  get 'error/5',        to: 'errors#logged_in'
  get 'error/6',        to: 'errors#not_enough_permissions'
  get 'error/7',        to: 'errors#not_logged_in'
  get 'error/8',        to: 'errors#user_exists'
  get 'error/:type',    to: 'errors#error'

  get  'admin/panel', to: 'admin#admin_panel'
  post 'admin/create/:record_type', to: 'admin#create_record'
end
