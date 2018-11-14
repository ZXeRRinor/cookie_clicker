class Message < ApplicationRecord
  belongs_to :user
  belongs_to :post

  def belongs_to(user, post)
    self.user = user
    self.post = post
    self
  end
end
