class AddUserCookiesToUser < ActiveRecord::Migration[5.2]
  def change
    change_table :users do |t|
      t.bigint :user_cookies
    end
  end
end
