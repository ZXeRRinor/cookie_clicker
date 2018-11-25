class DeleteUserCookiesFromUser < ActiveRecord::Migration[5.2]
  def change
    change_table :users do |t|
      t.remove :user_cookies
    end
  end
end
