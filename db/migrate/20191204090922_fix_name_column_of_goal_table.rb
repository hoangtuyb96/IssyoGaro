class FixNameColumnOfGoalTable < ActiveRecord::Migration[5.2]
  def change
    rename_column :goals, :desciption, :description
  end
end
