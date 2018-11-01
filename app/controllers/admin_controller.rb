include(Currents, Errors, Permissions)

class AdminController < ApplicationController
  def set_perms
    check_user
    user = User.find_by(id: set_perms_id)
    user.permissions = params[:perms]
    if user.save
      redirect_to controller: 'users', action: 'show', id: user.id
    else
      redirect_to_error 'saving_error'
    end
  end

  def admin_panel
    check_user
    @users = User.all.order(id: :asc)
    @subforums = Subforum.all.order(id: :asc)
    @posts = Post.all.order(id: :asc)
    @messages = Message.all.order(id: :asc)
  end
end

def check_user
  unless current_user
    redirect_to_error 'not_logged_in'
  end
  unless current_user.permissions >= ADMINPERMS
    redirect_to_error 'not_enough_perms'
  end
end