# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

   User.create!({username: 'testUser', password: 'password', email: 'fakeEmail@email.com'})

   User.create!([
      {username: 'BooSqua', password: 'password', email: Faker::Internet.unique.email},
      {username: 'DrBonz',  password: 'password', email: Faker::Internet.unique.email},
      {username: 'GhostInTheMachine', password: 'password', email: Faker::Internet.unique.email},
      {username: 'Greencar500', password: 'password', email: Faker::Internet.unique.email},
      {username: 'KcDelt', password: 'password', email: Faker::Internet.unique.email},
      {username: 'ScarletSnow', password: 'password', email: Faker::Internet.unique.email},
      {username: 'Aurum', password: 'password', email: Faker::Internet.unique.email},
      {username: 'Hurwitz', password: 'password', email: Faker::Internet.unique.email},
      {username: 'Kiraanne89', password: 'password', email: Faker::Internet.unique.email},
      {username: 'KreeFongHong', password: 'password', email: Faker::Internet.unique.email},
      {username: 'PrincessDie', password: 'password', email: Faker::Internet.unique.email},
      {username: 'DarnYak', password: 'password', email: Faker::Internet.unique.email},
      {username: 'HillaryDuff', password: 'password', email: Faker::Internet.unique.email},
      {username: 'SpacePumpkin', password: 'password', email: Faker::Internet.unique.email},
      {username: 'TNasty', password: 'password', email: Faker::Internet.unique.email}
   ])

   Server.create!([
      {name: "HOME", owner_id: 1},
      {name: "Cats", owner_id: 12},
      {name: "Coding", owner_id: 2},
   ])

   (1..3).each do |id|
      10.times do 
         Message.create!(author_id: 2, channel_id: id, body: Faker::Lorem.sentence)
         Message.create!(author_id: 1, channel_id: id, body: Faker::Lorem.sentence)
      end
   end
   (2..16).each do |user_id|
      ServerMember.create!(user_id: user_id, server_id: 1)
   end
   (1..16).each do |user_id|
      ServerMember.create!(user_id: user_id, server_id: 2) if user_id != 12
   end
   (1..16).each do |user_id|
      ServerMember.create!(user_id: user_id, server_id: 3) if user_id != 2
   end
