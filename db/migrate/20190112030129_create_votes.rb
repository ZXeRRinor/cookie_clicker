class CreateVotes < ActiveRecord::Migration[5.2]
  def change
    create_table :votes do |t|
      t.float :positive_votes
      t.float :votes
      t.belongs_to :subforum, index: true
      t.timestamps
    end
  end
end
