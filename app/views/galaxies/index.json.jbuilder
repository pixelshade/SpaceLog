json.array!(@galaxies) do |galaxy|
  json.extract! galaxy, :id, :name, :info, :size, :rotX, :rotY, :rotZ, :posX, :posY, :posZ
  json.url galaxy_url(galaxy, format: :json)
end
