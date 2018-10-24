include(Currents)

class UsersController < ApplicationController
  def try_register
    @user = User.new
  end

  def register
    user = User.new(user_params)
    @status = 'Incorrect email or password!'
    unless User.find_by(email: user.email).nil?
      @status = 'This email is using!'
      redirect_to url: {controller: 'users', action: 'error'}
      return
    end
    if user.save
      @status = 'success'
      set_current_user(user)
    else
      redirect_to url: {controller: 'users', action: 'error'}
    end
  end

  def error

  end

  def change_password

  end

  def profile
    @user = User.new
  end

  def show_user
    @user = User.find_by(id: params[:id])
  end

  def show_current
    redirect_to url: {controller: 'users', action: 'show_user', id: current_user.id}
  end
end

def user_params
  params.require(:user).permit(:email, :name, :password, :password_confirmation)
end