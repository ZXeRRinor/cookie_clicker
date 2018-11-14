class MessagesController < ApplicationController
  def create
    unless current_user
      redirect_to_error('not_logged_in')
      return
    end
    post = Post.find_by_id(params[:id])
    message = Message.new(msg_params).belongs_to(current_user, post)
    if message.save
      redirect_to controller: 'posts', action: 'show', id: post.id
    else
      redirect_to_error('saving_error')
    end
  end
end

def msg_params
  params.require(:message).permit(:content)
end
