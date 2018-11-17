include(Game, Currents, UserUtils, UserConstants)

class UsersController < ApplicationController
  def try_register
    @user = User.new
  end

  def register
    check_for_register do
      user = User.new(user_params)
      if check_user_params(user_params)
        return
      end
      user.set_default_values
      if user.save
        set_current_user(user)
      end
      redirect_to '/'
    end
  end

  def change_password
    unless current_user
      redirect_to_error('not_logged_in')
      return
    end
    unless current_user.update_attributes(password: user_params[:password])
      redirect_to_error('password_not_changed')
      return
    end
    redirect_to controller: 'sessions', action: 'logout'
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

def user_params
  params.require(:user).permit(:email, :name, :password, :password_confirmation)
end