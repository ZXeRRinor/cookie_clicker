class AddVotesToWordVersions < ActiveRecord::Migration[5.2]
  def change
    change_table :word_versions do |t|
      t.float :positive_votes
      t.float :votes
    end
  end
end
