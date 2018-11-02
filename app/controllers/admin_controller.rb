include(Currents, Errors, Permissions)

class AdminController < ApplicationController
  def set_perms
    check_curr_user
    user = User.find_by(id: set_perms_id)
    user.permissions = params[:perms]
    if user.save
      redirect_to controller: 'users', action: 'show', id: user.id
    else
      redirect_to_error 'saving_error'
    end
  end

  def create_user
    check_curr_user
    user = User.new(create_user_params)
    user.save(validate: false)
    p user
  end

  def admin_panel
    check_curr_user
    @users = User.all.order(id: :asc)
    @subforums = Subforum.all.order(id: :asc)
    @posts = Post.all.order(id: :asc)
    @messages = Message.all.order(id: :asc)
  end
end

def create_user_params
  params.require(:user).permit(:id, :email, :name, :permissions, :created_at, :updated_at, :password)
end

def check_curr_user
  unless current_user
    redirect_to_error 'not_logged_in'
  end
  unless current_user.permissions >= ADMINPERMS
    redirect_to_error 'not_enough_perms'
  end
end