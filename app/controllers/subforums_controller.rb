include(Paths, UserUtils, Params)

class SubforumsController < ApplicationController

  def init
    Subforum.new(id: 0, title: 'root', subforum_id: 0).save
  end

  def new
    check_current_user do
      @subforum = Subforum.new
    end
  end

  def create
    check_current_user do
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
    end
  end

  def show
    sub = Subforum.find_by_id(params[:id])
    if sub
      json = {
          subs: sub.subforums,
          posts: sub.posts,
          path: get_subforum_path(sub)
      }.to_json.to_s
      render json: json, content_type: 'application/json'
    else
      redirect_to_error 'not_found'
    end
  end

  def delete
    check_current_user do
      sub = Subforum.find_by_id(params[:id])
      if sub.user == current_user || current_user.permissions >= MODERPERMS
        id = sub.subforum.id
        sub.delete
        redirect_to controller: 'subforums', action: 'show', id: id
      else
        redirect_to_error 'not_enough_permissions'
      end
    end
  end

  def update

  end
end