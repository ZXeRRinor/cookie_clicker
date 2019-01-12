class Word < ApplicationRecord
  belongs_to :user
  has_many :word_versions
end
