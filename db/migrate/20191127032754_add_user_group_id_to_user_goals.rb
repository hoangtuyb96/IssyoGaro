class AddUserGroupIdToUserGoals < ActiveRecord::Migration[5.2]
  def change
    add_column :user_goals, :user_group_id, :integer
  end
end
