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

ActiveRecord::Schema.define(version: 2018_11_07_183058) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "messages", force: :cascade do |t|
    t.text "content"
    t.float "rating"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "post_id"
    t.bigint "user_id"
    t.index ["post_id"], name: "index_messages_on_post_id"
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "posts", force: :cascade do |t|
    t.bigint "subforum_id"
    t.bigint "user_id"
    t.string "title"
    t.text "content"
    t.float "rating"
    t.integer "perm_level"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["subforum_id"], name: "index_posts_on_subforum_id"
    t.index ["user_id"], name: "index_posts_on_user_id"
  end

  create_table "prices", force: :cascade do |t|
    t.integer "Hand"
    t.integer "Auto Clicker"
    t.integer "Auto Oven"
    t.integer "Cookie Farm"
    t.integer "Cookie Factory"
    t.integer "Cookie Reactor"
    t.integer "Cookie Materialiser"
    t.integer "Quantum Cookie Singularity"
    t.integer "Admin Cookie Creator"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_prices_on_user_id"
  end

  create_table "producers", force: :cascade do |t|
    t.integer "Hand"
    t.integer "Auto Clicker"
    t.integer "Auto Oven"
    t.integer "Cookie Farm"
    t.integer "Cookie Factory"
    t.integer "Cookie Reactor"
    t.integer "Cookie Materialiser"
    t.integer "Quantum Cookie Singularity"
    t.integer "Admin Cookie Creator"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_producers_on_user_id"
  end

  create_table "subforums", force: :cascade do |t|
    t.bigint "user_id"
    t.string "title"
    t.integer "perm_level"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "subforum_id"
    t.index ["subforum_id"], name: "index_subforums_on_subforum_id"
    t.index ["user_id"], name: "index_subforums_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "name"
    t.string "password_digest"
    t.integer "permissions"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_cookies"
  end

end
