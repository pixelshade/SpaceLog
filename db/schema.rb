# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150201104213) do

  create_table "galaxies", force: true do |t|
    t.string   "name"
    t.text     "info"
    t.float    "size"
    t.integer  "rotX"
    t.integer  "rotY"
    t.integer  "rotZ"
    t.integer  "posX"
    t.integer  "posY"
    t.integer  "posZ"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "planetary_systems", force: true do |t|
    t.string   "name"
    t.text     "info"
    t.float    "size"
    t.integer  "posX"
    t.integer  "posY"
    t.integer  "posZ"
    t.integer  "rotX"
    t.integer  "rotY"
    t.integer  "rotZ"
    t.integer  "galaxy_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "planetary_systems", ["galaxy_id"], name: "index_planetary_systems_on_galaxy_id"

  create_table "planets", force: true do |t|
    t.string   "name"
    t.text     "info"
    t.float    "size"
    t.integer  "rotX"
    t.integer  "rotY"
    t.integer  "rotZ"
    t.integer  "posX"
    t.integer  "posY"
    t.integer  "posZ"
    t.integer  "planetary_system_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "planets", ["planetary_system_id"], name: "index_planets_on_planetary_system_id"

  create_table "ratings", force: true do |t|
    t.integer  "story_id"
    t.integer  "user_id"
    t.integer  "score",      default: 0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "ratings", ["story_id"], name: "index_ratings_on_story_id"
  add_index "ratings", ["user_id"], name: "index_ratings_on_user_id"

  create_table "stories", force: true do |t|
    t.string   "name"
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "provider"
    t.string   "uid"
    t.string   "name"
    t.string   "image"
    t.string   "token"
    t.datetime "expires_at"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
