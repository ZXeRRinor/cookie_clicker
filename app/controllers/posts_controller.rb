class PostsController < ApplicationController
  def new
    unless current_user
      redirect_to_error 'not_logged_in'
    end
    curr_sub = Subforum.find_by_id(params[:id])
    @post = curr_sub.posts.new
  end

  def create
    unless current_user
      redirect_to_error 'not_logged_in'
    end
    curr_sub = Subforum.find_by_id(params[:id])
    post = Post.new(post_params).belongs_to(current_user, curr_sub)
    if post.save
      redirect_to controller: 'posts', action: 'show', id: post.id
    else
      redirect_to_error 'saving_error'
    end
  end

  def show
    @post = Post.find_by_id(params[:id])
    @user = @post.user
    @new_message = Message.new
    @messages = @post.messages
  end

  def update

  end

  def delete
    unless current_user
      redirect_to_error 'not_logged_in'
    end
    post = Post.find_by_id(params[:id])
    if post.user == current_user || current_user.permissions >= MODERPERMS
      id = post.subforum.id
      post.delete
      redirect_to controller: 'subforums', action: 'show', id: id
    else
      redirect_to_error 'not_enough_permissions'
    end
  end
end

def post_params
  params.require(:post).permit(:title, :content)
end