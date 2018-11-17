module Params
  def user_params
    params.require(:user).permit(:email, :name, :password, :password_confirmation)
  end

  def subforum_params
    params.require(:subforum).permit(:title)
  end

  def msg_params
    params.require(:message).permit(:content)
  end

  def post_params
    params.require(:post).permit(:title, :content)
  end
end