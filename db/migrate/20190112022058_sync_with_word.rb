class SyncWithWord < ActiveRecord::Migration[5.2]
  def change
    change_table :word_versions do |t|
      t.string :mari
      t.string :rus_word
    end
  end
end
