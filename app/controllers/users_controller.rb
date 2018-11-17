include(Game, Currents, UserUtils, UserConstants, Params)

class UsersController < ApplicationController
  def try_register
    @user = User.new
  end

  def register
    check_for_register do
      if check_user_params(user_params)
        return
      end
      user = User.new(user_params)
      if user.save
        set_current_user(user)
      end
      redirect_to '/'
    end
  end

  def change_password
    check_current_user do
      unless current_user.update_attributes(password: user_params[:password])
        redirect_to_error('password_not_changed')
        return
      end
      redirect_to controller: 'sessions', action: 'logout'
    end
  end

  def profile
    unless current_user
      redirect_to_error('not_logged_in')
      return
    end
    @user = User.new
    @current_user = current_user
  end

  def show_user
    @user = User.find_by(id: params[:id])
  end

  def show_current
    redirect_to controller: 'users', action: 'show_user', id: current_user.id
  end

end