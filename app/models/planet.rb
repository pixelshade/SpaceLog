class Planet < ActiveRecord::Base
  has_many :stories, dependent: :destroy
  belongs_to :planetary_system
  validates_presence_of  :name, :info, :size, :rotX, :rotY, :rotZ, :posX, :posY, :posZ
  validates_length_of :name, within: 5..50, message: 'must be between 5 to 50 long'
  has_attached_file :texture, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :texture, :content_type =>  ["image/jpeg", "image/gif", "image/png"]
  # validates_attachment_content_type :texture, :content_type => /^image\/(jpg|jpeg|pjpeg|png|x-png|gif)$/, :message => 'file type is not allowed (only jpeg/png/gif images)'
  # validates_attachment_file_name :texture, :matches => [/png\Z/, /jpe?g\Z/, /gif\Z/]
  # validates_attachment :texture, content_type: { content_type: /\Aimage\/.*\Z/ }, :message => 'fshit'

  # do_not_validate_attachment_file_type :texture

  def texture_url
    texture.url
  end
end

