include(Currents, Errors)

class SessionsController < ApplicationController
  def try_login
    @user = User.new
  end

  def login
    if current_user
      redirect_to_error('logged_in')
    end
    user = User.find_by(email: user_params[:email])
    if user.nil?
      redirect_to_error('incorrect_email_or_password')
    end
    if user.authenticate(user_params[:password])
      set_current_user(user)
      redirect_to controller: 'users', action: 'profile'
    else
      redirect_to_error('incorrect_email_or_password')
    end
  end

  def logout
    unless current_user
      redirect_to_error('not_logged_in')
    end
    reset_current_user
    redirect_to '/'
  end
end

def user_params
  params.require(:user).permit(:email, :name, :password, :password_confirmation)
end