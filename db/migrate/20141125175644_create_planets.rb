class CreatePlanets < ActiveRecord::Migration
  def change
    create_table :planets do |t|
      t.string :name
      t.text :info
      t.float :size
      t.integer :rotX
      t.integer :rotY
      t.integer :rotZ
      t.integer :posX
      t.integer :posY
      t.integer :posZ
      t.belongs_to :planetary_system, index: true
      t.timestamps
    end
  end
end
