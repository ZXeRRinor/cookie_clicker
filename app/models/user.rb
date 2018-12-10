include(UserConstants)

class User < ApplicationRecord
  has_secure_password

  has_many :posts
  has_many :messages, dependent: :destroy
  has_many :producers, dependent: :destroy
  has_many :prices, dependent: :destroy

  validates :email, presence: true, uniqueness: true
  validates_format_of :email, with: (EMAIL_REGEXP)
  validates :password, length: {in: PASSWORD_LENGTH}
end
