class PlanetarySystem < ActiveRecord::Base
  belongs_to :galaxy
  has_many :planets, dependent: :destroy
  validates_presence_of :name,:info,:size,:posX,:posY,:posZ,:rotX,:rotY,:rotZ
  validates_length_of :name, within: 5..50, message: 'must be between 5 to 50 long'
end
