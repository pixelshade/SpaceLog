class CreateGalaxies < ActiveRecord::Migration
  def change
    create_table :galaxies do |t|
      t.string :name
      t.text :info
      t.integer :size
      t.integer :rotX
      t.integer :rotY
      t.integer :rotZ
      t.integer :posX
      t.integer :posY
      t.integer :posZ

      t.timestamps
    end
  end
end
