include(Currents, Errors, Permissions, Paths)

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
    curr_sub = Subforum.find_by_id(params[:id])
    sub = Subforum.new(subforum_params).belongs_to(current_user, curr_sub)
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
    sub = Subforum.find_by_id(params[:id])
    if sub
      @subs = sub.subforums
      @posts = sub.posts
      @path = get_subforum_path(sub)
    else
      redirect_to_error 'error'
    end
  end

  def delete
    unless current_user
      redirect_to_error 'not_logged_in'
    end
    sub = Subforum.find_by_id(params[:id])
    if sub.user == current_user || current_user.permissions >= MODERPERMS
      id = sub.subforum.id
      sub.delete
      redirect_to controller: 'subforums', action: 'show', id: id
    else
      redirect_to_error 'not_enough_permissions'
    end
  end

  def update

  end
end

def subforum_params
  params.require(:subforum).permit(:title)
end