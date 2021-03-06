class User < ActiveRecord::Base
  has_many :ratings
  has_many :stories

  def self.omniauth(auth)
    # auth.permit(:provider, :uid)
    where(auth.slice(:provider, :uid).permit(:provider, :uid)).first_or_initialize.tap do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.name = auth.info.name
      user.image = auth.info.image
      user.token = auth.credentials.token
      user.expires_at = Time.at(auth.credentials.expires_at)
      user.save!
    end
  end
end
