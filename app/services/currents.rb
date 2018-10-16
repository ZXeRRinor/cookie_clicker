module Currents
  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  def set_current_user(user)
    session[:user_id] = user.id
    @current_user = user
  end

  def reset_current_user
    session[:user_id] = nil
  end
end