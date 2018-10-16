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
      return
    end
    if user.save
      @status = 'success'
      set_current_user(user)
    end
  end

  def show_current
    redirect_to url: {controller: 'users', action: 'show_user', id: current_user.id}
  end

  def show_user
    @user = User.find_by(id: params[:id])
  end
end

def user_params
  params.require(:user).permit(:email, :name, :password, :password_confirmation)
end