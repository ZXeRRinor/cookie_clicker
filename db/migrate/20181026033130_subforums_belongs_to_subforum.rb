class SubforumsBelongsToSubforum < ActiveRecord::Migration[5.2]
  def change
    change_table :subforums do |t|
      t.belongs_to :subforum, index: true
    end
  end
end
