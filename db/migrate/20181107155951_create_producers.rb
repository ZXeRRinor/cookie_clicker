class CreateProducers < ActiveRecord::Migration[5.2]
  def change
    create_table :producers do |t|
      t.integer 'Hand'
      t.integer 'Auto Clicker'
      t.integer 'Auto Oven'
      t.integer 'Cookie Farm'
      t.integer 'Cookie Factory'
      t.integer 'Cookie Reactor'
      t.integer 'Cookie Materialiser'
      t.integer 'Quantum Cookie Singularity'
      t.integer 'Admin Cookie Creator'

      t.belongs_to :user, index: true
      t.timestamps
    end
  end
end
