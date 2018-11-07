class CreateSubforums < ActiveRecord::Migration[5.2]
  def change
    create_table :subforums do |t|
      t.belongs_to :user, index: true
      t.string :title
      t.integer :perm_level

      t.timestamps
    end
  end
end
