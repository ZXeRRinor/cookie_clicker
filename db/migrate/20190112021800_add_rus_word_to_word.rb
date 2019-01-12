class AddRusWordToWord < ActiveRecord::Migration[5.2]
  def change
    change_table :words do |t|
      t.string :rus_word
    end
  end
end
