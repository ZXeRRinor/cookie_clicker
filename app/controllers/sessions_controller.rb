include(Currents)

class SessionsController < ApplicationController
  def try_login
    @user = User.new
  end

  def login
    @status = 'Successfully logged in!'
    if current_user
      @status = 'You are logged in now!'
      return
    end
    user = User.find_by(email: user_params[:email])
    if user.nil?
      @status = 'invalid_email'
      redirect_to controller: 'users', action: 'error'
    end
    unless user.authenticate(user_params[:password])
      @status = 'incorrect_password!'
      redirect_to controller: 'users', action: 'error'
    end
  end

  def logout
    @status = 'Successfully logged out!'
    if current_user.nil?
      @status = 'You are not logged in!'
      return
    end
    reset_current_user
  end
end