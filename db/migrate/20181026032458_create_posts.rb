class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.belongs_to :subforum, index: true
      t.belongs_to :user, index: true
      t.string :title
      t.text :content
      t.float :rating
      t.integer :perm_level

      t.timestamps
    end
  end
end
