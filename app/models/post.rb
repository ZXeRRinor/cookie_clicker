class Post < ApplicationRecord
  belongs_to :user
  belongs_to :subforum
  has_many :messages, dependent: :destroy

  def belongs_to(user, subforum)
    self.user = user
    self.subforum = subforum
  end
end
