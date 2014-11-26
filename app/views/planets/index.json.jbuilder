json.array!(@planets) do |planet|
  json.extract! planet, :id, :name, :info, :scale, :rotX, :rotY, :rotZ, :posX, :posY, :posZ, :planetarySystem, :references
  json.url planet_url(planet, format: :json)
end
