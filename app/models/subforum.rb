class Subforum < ApplicationRecord
  belongs_to :subforum
  belongs_to :user
  belongs_to :word_version
  has_many :subforums, dependent: :destroy
  has_many :posts, dependent: :destroy
  has_one :vote, dependent: :destroy

  def belongs_to_sub(user, subforum)
    self.user = user
    self.subforum = subforum
    self
  end

  def belongs_to_version(user, version)
    self.user = user
    self.word_version = version
    self
  end
end
