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

  def current_subforum
    @current_subforum ||= Subforum.find_by(id: session[:sub_id])
  end

  def set_current_subforum(sub)
    session[:sub_id] = sub.id
    @current_subforum = sub
  end

  def reset_current_subforum
    session[:sub_id] = nil
  end

  def current_post
    @current_post ||= Post.find_by(id: session[:post_id])
  end

  def set_current_post(post)
    session[:post_id] = post.id
    @current_post = post
  end

  def reset_current_post
    session[:post_id] = nil
  end
end