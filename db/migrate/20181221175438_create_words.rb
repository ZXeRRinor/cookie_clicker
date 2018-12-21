class CreateWords < ActiveRecord::Migration[5.2]
  def change
    create_table :words do |t|
      t.string :mari_word
      t.string :mari_word_adapted
      t.string :rus
      t.belongs_to :user, index: true

      t.timestamps
    end
  end
end
