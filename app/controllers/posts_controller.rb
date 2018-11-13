include(Currents, Errors)

class PostsController < ApplicationController
  def new
    unless current_user
      redirect_to_error 'not_logged_in'
    end
    curr_sub = Subforum.find_by(id: params[:id])
    @post = curr_sub.posts.new
  end

  def create
    unless current_user
      redirect_to_error 'not_logged_in'
    end
    curr_sub = Subforum.find_by(id: params[:id])
    post = curr_sub.posts.new(post_params)
    post.user_id = current_user.id
    p post
    if post.save
      redirect_to controller: 'posts', action: 'show', id: post.id
    else
      redirect_to_error 'saving_error'
    end
  end

  def show
    @post = Post.find_by(id: params[:id])
    @new_message = Message.new
    @messages = Message.where(post_id: params[:id])
  end

  def update

  end

  def delete
    unless current_user
      redirect_to_error 'not_logged_in'
    end
    post = Post.find_by(id: params[:id])
    if post.user_id == current_user.id || current_user.permissions >= MODERPERMS
      id = post.subforum_id
      post.delete
      redirect_to controller: 'subforums', action: 'show', id: id
    end
    redirect_to_error 'not_enough_permissions'
  end
end

def post_params
  params.require(:post).permit(:title, :content)
end