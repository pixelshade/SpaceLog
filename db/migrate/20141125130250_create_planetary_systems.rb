class CreatePlanetarySystems < ActiveRecord::Migration
  def change
    create_table :planetary_systems do |t|
      t.string :name
      t.text :info
      t.float :size
      t.integer :posX
      t.integer :posY
      t.integer :posZ
      t.integer :rotX
      t.integer :rotY
      t.integer :rotZ
      t.references :galaxy, index: true

      t.timestamps
    end
  end
end
