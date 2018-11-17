include(Currents, Permissions)

class AdminController < ApplicationController
  def set_perms
    check_curr_user
    user = User.find_by_id(set_perms_id)
    user.permissions = params[:perms]
    if user.save
      redirect_to controller: 'users', action: 'show', id: user.id
    else
      redirect_to_error 'saving_error'
    end
  end

  def create_record
    check_current_user(ADMINPERMS) do
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
  end

  def delete_record
    check_current_user(ADMINPERMS) do
      record_type, id = params[:id].split('_')
      id = id.to_i
      case record_type
      when 'user'
        User.find_by_id(id).delete
      when 'subforum'
        Subforum.find_by_id(id).delete
      when 'post'
        Post.find_by_id(id).delete
      when 'message'
        Message.find_by_id(id).delete
      else
        redirect_to_error 'unknown record type'
      end
      redirect_to controller: 'admin', action: 'admin_panel'
    end
  end

  def change_record
    check_current_user(ADMINPERMS) do
      record_type, id = params[:type], params[:id].to_i
      accepted_types = %w[user subforum post message]
      if accepted_types.include?(record_type)
        eval("creature_params = #{record_type}_params")
        eval("creature = #{record_type.capitalize}")
        creature_params.to_enum.each do |attr|
          creature.find_by_id(id).update_attribute(attr.first, attr.last)
        end
      else
        redirect_to_error 'unknown record type'
        return
      end
      redirect_to controller: 'admin', action: 'admin_panel'
    end
  end

  def change_record_form
    check_current_user(ADMINPERMS) do
      record_type, id = params[:id].split('_')
      id = id.to_i
      case record_type
      when 'user'
        @user = User.find_by_id(id)
        eval("creature = #{record_type.capitalize}.new")
        render "admin/change_record_forms/#{record_type}"
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
  end

  def admin_panel
    check_current_user(ADMINPERMS) do
      @users = User.all.order(id: :asc)
      @subforums = Subforum.all.order(id: :asc)
      @posts = Post.all.order(id: :asc)
      @messages = Message.all.order(id: :asc)
    end
  end
end

def user_params
  params.require(:user).permit(:id, :email, :name, :permissions, :user_cookies, :created_at, :updated_at, :password)
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