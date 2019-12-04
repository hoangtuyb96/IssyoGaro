class FixNameOfColumns < ActiveRecord::Migration[5.2]
  def change
    rename_column :user_goals, :process, :progress
    rename_column :user_tasks, :process, :progress
  end
end
