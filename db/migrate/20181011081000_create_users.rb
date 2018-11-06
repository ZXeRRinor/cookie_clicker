class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :email
      t.string :name
      t.string :password_digest
      t.integer :permissions

      t.timestamps
    end

    create_table :subforums do |t|
      t.belongs_to :user, index: true
      t.string :title
      t.integer :perm_level

      t.timestamps
    end

    create_table :posts do |t|
      t.belongs_to :subforum, index: true
      t.belongs_to :user, index: true
      t.string :title
      t.text :content
      t.float :rating
      t.integer :perm_level

      t.timestamps
    end

    change_table :subforums do |t|
      t.belongs_to :subforum, index: true
    end

    create_table :messages do |t|
      t.text :content
      t.float :rating

      t.timestamps
    end

    change_table :messages do |t|
      t.belongs_to :post, index: true
      t.belongs_to :user, index: true
    end
  end
end
