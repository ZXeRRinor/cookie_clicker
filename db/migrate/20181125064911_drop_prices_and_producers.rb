class DropPricesAndProducers < ActiveRecord::Migration[5.2]
  def change
    drop_table :producers
    drop_table :prices
  end
end
