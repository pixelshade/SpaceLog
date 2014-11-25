json.array!(@planetary_systems) do |planetary_system|
  json.extract! planetary_system, :id, :name, :info, :size, :posX, :posY, :posZ, :rotX, :rotY, :rotZ, :galaxy_id
  json.url planetary_system_url(planetary_system, format: :json)
end
