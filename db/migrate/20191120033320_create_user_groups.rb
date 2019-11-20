class CreateUserGroups < ActiveRecord::Migration[5.2]
  def change
    create_table :user_groups do |t|
      t.integer :user_id
      t.integer :group_id
      t.integer :role, default: 1

      t.timestamps
    end
  end
end
