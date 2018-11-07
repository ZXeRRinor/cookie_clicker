include(Currents)

class ErrorsController < ApplicationController
  def error
    error_type = params[:type]
    if ErrorsController.method_defined?(error_type)
      redirect_to action: error_type
    else
      redirect_to action: 'default_error', type: error_type
    end
  end

  def incorrect_email_or_password

  end

  def user_exists

  end

  def invalid_email

  end

  def invalid_password

  end

  def not_enough_perms

  end

  def logged_in
    if current_user
      @user = current_user
    end
  end

  def not_logged_in

  end

  def default_error
    @error_type = params[:type]
  end
end
