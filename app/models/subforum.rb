class Subforum < ApplicationRecord
  belongs_to :subforum
  belongs_to :user
  has_many :subforums, dependent: :destroy
  has_many :posts, dependent: :destroy

  def belongs_to(user, subforum)
    self.user = user
    self.subforum = subforum
    self
  end
end
