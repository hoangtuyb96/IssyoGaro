class CreateUserTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :user_tasks do |t|
      t.integer :user_id
      t.integer :task_id
      t.float :process
      t.integer :evaluate_user_id

      t.timestamps
    end
  end
end
