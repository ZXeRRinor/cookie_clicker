module Admin
  def user_params
    params.require(:user).permit(:id, :email, :name, :permissions, :user_cookies, :created_at, :updated_at, :password)
  end

  def subforum_params
    params.require(:subforum).permit(:id, :title, :user_id, :subforum_id, :created_at, :updated_at, :password)
  end

  def post_params
    params.require(:post).permit(:id, :title, :content, :user_id, :subforum_id, :created_at, :updated_at, :password)
  end

  def message_params
    params.require(:message).permit(:id, :content, :user_id, :post_id, :created_at, :updated_at, :password)
  end
end