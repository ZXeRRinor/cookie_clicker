class AddAuthorityToUser < ActiveRecord::Migration[5.2]
  def change
    change_table :users do |t|
      t.float :authority
    end
  end
end
