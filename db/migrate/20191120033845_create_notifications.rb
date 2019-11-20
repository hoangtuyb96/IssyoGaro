class CreateNotifications < ActiveRecord::Migration[5.2]
  def change
    create_table :notifications do |t|
      t.text :context
      t.integer :user_id
      t.string :notificationable_type
      t.integer :notificationable_id
      t.integer :sender_id
      t.boolean :is_read, default: false

      t.timestamps
    end
  end
end
