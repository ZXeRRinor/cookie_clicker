class SubforumBelongsToWordVersion < ActiveRecord::Migration[5.2]
  def change
    change_table :subforums do |t|
      t.belongs_to :word_version
    end
  end
end
