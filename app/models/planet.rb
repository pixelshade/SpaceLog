class Planet < ActiveRecord::Base
  belongs_to :planetary_system
  validates_presence_of  :name, :info, :size, :rotX, :rotY, :rotZ, :posX, :posY, :posZ
  validates_length_of :name, within: 5..50, message: 'must be between 5 to 50 long'
end
