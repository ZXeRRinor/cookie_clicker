include(Currents, Errors)

class MessagesController < ApplicationController
  def create
    unless current_user
      redirect_to_error('not_logged_in')
    end
    post = Post.find_by(id: params[:id])
    message = post.messages.new(msg_params)
    message.user_id = current_user.id
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
