class Story < ActiveRecord::Base
  has_many :ratings
  belongs_to :planetary_system
  belongs_to :planet


  def average_rating
    (ratings.size == 0) ? 0 : (ratings.sum(:score) / ratings.size)
  end
end
