include(Currents, Errors, Permissions)

class UsersController < ApplicationController
  def try_register
    @user = User.new
  end

  def register
    user = User.new(user_params)
    unless User.find_by(email: user_params[:email]).nil?
      redirect_to_error('user_exists')
      return
    end
    user.permissions = User.all.empty? ? ADMINPERMS : USERPERMS
    if user.save
      set_current_user(user)
      if user.permissions >= ADMINPERMS
        redirect_to controller: 'admin', action: 'admin_panel'
      end
    else
      if /[\w]+@[\w]+\.[A-Za-z]/ =~ user_params[:email]
        redirect_to_error('invalid_email')
        return
      end
      if (6..50).cover?(user_params[:email].length)
        redirect_to_error('invalid_password')
        return
      end
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