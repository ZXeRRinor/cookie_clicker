require 'user_additionals'
include(UserConstants)

class User < ApplicationRecord
  include(UserAdditionals)

  has_secure_password

  has_many :posts
  has_many :messages, dependent: :destroy
  has_many :producers, dependent: :destroy
  has_many :prices, dependent: :destroy

  validates :email, presence: true, uniqueness: true
  validates_format_of :email, with: (EMAIL_REGEXP)
  validates :password, length: {in: PASSWORD_LENGTH}

  def initialize(*params)
    super(*params)
    self.set_default_values
    self.create_producers
    self.create_prices
  end
end
