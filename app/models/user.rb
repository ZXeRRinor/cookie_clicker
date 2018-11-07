class User < ApplicationRecord
  has_many :posts
  has_many :messages, dependent: :destroy
  has_many :producers, dependent: :destroy
  has_many :prices, dependent: :destroy
  has_secure_password
  validates :email, presence: true, uniqueness: true
  validates_format_of :email, with: (/[\w]+@[\w]+\.[A-Za-z]/)
  validates :password, length: { in: 6..50 }
end
