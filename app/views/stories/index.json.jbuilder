json.array!(@stories) do |story|
  json.extract! story, :id, :name, :content
  json.url story_url(story, format: :json)
end
