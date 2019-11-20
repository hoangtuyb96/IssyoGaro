class CreateVotes < ActiveRecord::Migration[5.2]
  def change
    create_table :votes do |t|
      t.string :voteable_type
      t.integer :voteable_id
      t.integer :status
      t.integer :user_id

      t.timestamps
    end
  end
end
