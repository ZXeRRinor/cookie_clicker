include(Admin, Currents, Permissions, UserUtils)

class AdminController < ApplicationController
  ACCEPTED_TYPES = %w[user subforum post message]

  def set_perms
    check_current_user(ADMINPERMS) do
      user = User.find_by_id(set_perms_id)
      user.permissions = params[:perms]
      if user.save
        redirect_to controller: 'users', action: 'show', id: user.id
      else
        redirect_to_error 'saving_error'
      end
    end
  end

  def create_record
    check_current_user(ADMINPERMS) do
      if ACCEPTED_TYPES.include?(record_type)
        eval("@creature = #{record_type.capitalize}")
        eval("@creature_params = #{record_type}_params")
        @creature.new(@creature_params).save(validate: false)
      else
        redirect_to_error 'unknown_record_type'
      end
    end
  end

  def delete_record
    check_current_user(ADMINPERMS) do
      record_type, id = params[:id].split('_')
      id = id.to_i
      if ACCEPTED_TYPES.include?(record_type)
        eval("@creature = #{record_type.capitalize}")
        @creature.find_by_id(id).delete
      else
        redirect_to_error 'unknown_record_type'
      end
      redirect_to controller: 'admin', action: 'admin_panel'
    end
  end

  def change_record
    check_current_user(ADMINPERMS) do
      record_type, id = params[:type], params[:id].to_i
      if ACCEPTED_TYPES.include?(record_type)
        eval("@creature_params = #{record_type}_params")
        eval("@creature = #{record_type.capitalize}")
        @creature_params.to_enum.each do |attr|
          @creature.find_by_id(id).update_attribute(attr.first, attr.last)
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
      if ACCEPTED_TYPES.include?(record_type)
        eval("@#{record_type} = #{record_type.capitalize}.find_by_id(#{id})")
        render "admin/change_record_forms/#{record_type}"
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