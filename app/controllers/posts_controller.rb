include(Currents, Errors)

class PostsController < ApplicationController
  def show
    @post = Post.find_by(id: params[:id])
    @new_message = Message.new
    @messages = Message.where(post_id: params[:id])
  end

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
end

def post_params
  params.require(:post).permit(:title, :content)
end