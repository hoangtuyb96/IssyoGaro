class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.integer :goal_id
      t.string :name
      t.text :description
      t.datetime :start_day
      t.datetime :end_day

      t.timestamps
    end
  end
end
