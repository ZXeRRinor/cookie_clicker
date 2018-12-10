include(Currents, UserUtils, UserConstants, Params)

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
      else
        redirect_to_error 'saving_error'
      end
      redirect_to '/'
    end
  end

  def change_password
    check_current_user do
      unless current_user.update_attributes(password: user_params[:password])
        redirect_to_error('password_not_changed')
      end
    end
  end

  def profile
    check_current_user do
      @user = User.new
      @current_user = current_user
    end
  end

  def show_user
    @user = User.find_by(id: params[:id])
  end

  def show_current
    redirect_to controller: 'users', action: 'show_user', id: current_user.id
  end
end