class CreateGoals < ActiveRecord::Migration[5.2]
  def change
    create_table :goals do |t|
      t.integer :group_id
      t.string :name
      t.datetime :start_day
      t.datetime :end_day
      t.text :desciption
      t.boolean :is_started, default: false

      t.timestamps
    end
  end
end
