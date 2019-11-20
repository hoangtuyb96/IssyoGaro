class CreateUserGoals < ActiveRecord::Migration[5.2]
  def change
    create_table :user_goals do |t|
      t.integer :user_id
      t.integer :goal_id
      t.float :process, default: 0

      t.timestamps
    end
  end
end
