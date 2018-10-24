include(Currents)

class UsersController < ApplicationController
  def try_register
    @user = User.new
  end

  def register
    user = User.new(user_params)
    @status = 'incorrect_password'
    unless User.find_by(email: user.email).nil?
      @status = 'user_exists'
      redirect_to_error
    end
    if user.save
      @status = 'success'
      set_current_user(user)
    else
      redirect_to_error
    end
  end

  def change_password
    unless current_user
      @status = 'unauthorized_user'
      redirect_to_error
    end
    unless current_user.update_attributes(password: update_params[:password])
      redirect_to_error
    end
  end

  def error

  end

  def profile
    @user = User.new
  end

  def show_user
    @user = User.find_by(id: params[:id])
  end
end

def show_current
  redirect_to controller: 'users', action: 'show_user', id: current_user.id
end

def user_params
  params.require(:user).permit(:email, :name, :password, :password_confirmation)
end

def redirect_to_error
  redirect_to controller: 'users', action: 'error'
end