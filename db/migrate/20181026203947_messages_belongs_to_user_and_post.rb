class MessagesBelongsToUserAndPost < ActiveRecord::Migration[5.2]
  def change
    change_table :messages do |t|
      t.belongs_to :post, index: true
      t.belongs_to :user, index: true
    end
  end
end
