include Currents, Game, Permissions, UserConstants

module UserUtils
  def check_for_register
    if current_user
      redirect_to_error('logged_in')
      return
    end
    unless User.find_by_email(user_params[:email]).nil?
      redirect_to_error('user_exists')
      return
    end
    if block_given?
      yield
    end
  end

  def check_user_params(params)
    unless EMAIL_REGEXP =~ params[:email]
      redirect_to_error('invalid_email')
      return('email')
    end
    unless PASSWORD_LENGTH.cover?(params[:password].length)
      redirect_to_error('invalid_password')
      return('password')
    end
    nil
  end

  def check_current_user(permissions = false)
    unless current_user
      redirect_to_error 'not_logged_in'
      return
    end
    if permissions && current_user.permissions < permissions
      redirect_to_error 'not_enough_perms'
      return
    end
    if block_given?
      yield
    end
  end
end
