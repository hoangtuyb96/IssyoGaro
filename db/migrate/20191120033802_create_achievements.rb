class CreateAchievements < ActiveRecord::Migration[5.2]
  def change
    create_table :achievements do |t|
      t.text :context
      t.integer :user_id
      t.integer :group_id
      t.integer :goal_id
      t.boolean :is_public
      t.integer :achievement_type

      t.timestamps
    end
  end
end
