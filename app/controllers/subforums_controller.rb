include(Currents, Errors, Permissions)

class SubforumsController < ApplicationController

  def init
    Subforum.new(id: 0, title: 'root', subforum_id: 0).save
  end

  def new
    unless current_user
      redirect_to_error 'not_logged_in'
      return
    end
    @subforum = Subforum.new
  end

  def create
    unless current_user
      redirect_to_error 'not_logged_in'
      return
    end
    curr_sub = Subforum.find_by(id: params[:id])
    sub = curr_sub.subforums.new(subforum_params)
    sub.user_id = current_user.id
    if sub.title.nil?
      redirect_to_error 'empty_title'
      return
    end
    if sub.save
      redirect_to controller: 'subforums', action: 'show', id: sub.id
    else
      redirect_to_error 'saving_error'
    end
    redirect_to '/'
  end

  def show
    if Subforum.find_by(id: params[:id])
      @subs = Subforum.where(subforum_id: params[:id])
      @posts = Post.where(subforum_id: params[:id])
    else
      redirect_to_error 'error'
    end
  end

  def delete
    unless current_user
      redirect_to_error 'not_logged_in'
    end
    sub = Subforum.find_by(id: params[:id])
    if sub.user_id == current_user.id || current_user.permissions >= MODERPERMS
      id = sub.subforum_id
      sub.delete
      redirect_to controller: 'subforums', action: 'show', id: id
    end
    redirect_to_error 'not_enough_permissions'
  end

  def update

  end
end

def subforum_params
  params.require(:subforum).permit(:title)
end