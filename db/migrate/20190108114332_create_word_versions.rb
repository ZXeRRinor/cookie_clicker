class CreateWordVersions < ActiveRecord::Migration[5.2]
  def change
    create_table :word_versions do |t|
      t.string :mari_word
      t.string :mari_word_adapted
      t.string :rus
      t.serial :version
      t.belongs_to :word, index: true
      t.belongs_to :user

      t.timestamps
    end
  end
end
