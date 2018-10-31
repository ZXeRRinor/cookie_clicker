class Subforum < ApplicationRecord
  belongs_to :subforum
  has_many :subforums, dependent: :destroy
  has_many :posts, dependent: :destroy
end
