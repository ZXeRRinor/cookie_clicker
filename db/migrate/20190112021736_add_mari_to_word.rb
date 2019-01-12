class AddMariToWord < ActiveRecord::Migration[5.2]
  def change
    change_table :words do |t|
      t.string :mari
    end
  end
end
