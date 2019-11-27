class AddUserGoalIdToUserTasks < ActiveRecord::Migration[5.2]
  def change
    add_column :user_tasks, :user_goal_id, :integer
  end
end
