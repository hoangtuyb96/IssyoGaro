class AddProgressToAchievements < ActiveRecord::Migration[5.2]
  def change
    add_column :achievements, :progress, :float
  end
end
