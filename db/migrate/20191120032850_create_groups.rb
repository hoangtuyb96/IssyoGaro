class CreateGroups < ActiveRecord::Migration[5.2]
  def change
    create_table :groups do |t|
      t.string :name
      t.text :description
      t.string :cover
      t.integer :category_id
      t.boolean :is_public, default: true

      t.timestamps
    end
  end
end
