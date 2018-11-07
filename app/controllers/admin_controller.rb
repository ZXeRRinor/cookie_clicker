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

  def create_record
    check_curr_user
    case params[:record_type]
    when 'user'
      User.new(user_params).save(validate: false)
    when 'subforum'
      Subforum.new(subforum_params).save(validate: false)
    when 'post'
      Post.new(post_params).save(validate: false)
    when 'message'
      Message.new(message_params).save(validate: false)
    else
      redirect_to_error 'unknown record type'
    end
  end

  def delete_record
    check_curr_user
    record_type, id = params[:id].split('_')
    id = id.to_i
    case record_type
    when 'user'
      User.find_by(id: id).delete
    when 'subforum'
      Subforum.find_by(id: id).delete
    when 'post'
      Post.find_by(id: id).delete
    when 'message'
      Message.find_by(id: id).delete
    else
      redirect_to_error 'unknown record type'
    end
    redirect_to controller: 'admin', action: 'admin_panel'
  end

  def change_record
    check_curr_user
    record_type, id = params[:type], params[:id].to_i
    case record_type
    when 'user'
      user_params.to_enum.each do |attr|
          User.find_by(id: id).update_attribute(attr.first, attr.last)
      end
    when 'subforum'
      subforum_params.to_enum.each do |attr|
        Subforum.find_by(id: id).update_attribute(attr.first, attr.last)
      end
    when 'post'
      post_params.to_enum.each do |attr|
        Post.find_by(id: id).update_attribute(attr.first, attr.last)
      end
    when 'message'
      message_params.to_enum.each do |attr|
        Message.find_by(id: id).update_attribute(attr.first, attr.last)
      end
    else
      redirect_to_error 'unknown record type'
    end
    redirect_to controller: 'admin', action: 'admin_panel'
  end

  def change_record_form
    check_curr_user
    record_type, id = params[:id].split('_')
    id = id.to_i
    case record_type
    when 'user'
      @user = User.find_by(id: id)
      render 'admin/change_record_forms/user'
    when 'subforum'
      @subforum = Subforum.find_by(id: id)
      render 'admin/change_record_forms/subforum'
    when 'post'
      @post = Post.find_by(id: id)
      render 'admin/change_record_forms/post'
    when 'message'
      @message = Message.find_by(id: id)
      render 'admin/change_record_forms/message'
    else
      redirect_to_error 'unknown record type'
    end
  end

  def admin_panel
    check_curr_user
    @users = User.all.order(id: :asc)
    @subforums = Subforum.all.order(id: :asc)
    @posts = Post.all.order(id: :asc)
    @messages = Message.all.order(id: :asc)
  end
end

def user_params
  params.require(:user).permit(:id, :email, :name, :permissions, :created_at, :updated_at, :password)
end

def subforum_params
  params.require(:subforum).permit(:id, :title, :user_id, :subforum_id, :created_at, :updated_at, :password)
end

def post_params
  params.require(:post).permit(:id, :title, :content, :user_id, :subforum_id, :created_at, :updated_at, :password)
end

def message_params
  params.require(:message).permit(:id, :content, :user_id, :post_id, :created_at, :updated_at, :password)
end

def check_curr_user
  unless current_user
    redirect_to_error 'not_logged_in'
    return
  end
  unless current_user.permissions >= ADMINPERMS
    redirect_to_error 'not_enough_perms'
  end
end