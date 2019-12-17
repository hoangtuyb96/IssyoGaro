class AddTargetIdToNotifications < ActiveRecord::Migration[5.2]
  def change
    add_column :notifications, :target_id, :integer
  end
end
