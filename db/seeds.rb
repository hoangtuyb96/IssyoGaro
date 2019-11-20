# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create!(email: "admin@gmail.com", password: 123456, name: "admin")
10.times do |i|
  User.create!(
    email: "user" + i.to_s +  "@gmail.com",
    password: 123456,
    name: Faker::Name.unique.name,
  )
end

10.times do
  Category.create!(
    name: Faker::Coffee.unique.blend_name
  )
end

10.times do
  Group.create!(
    name: Faker::Esport.unique.team,
    category_id: rand(10) + 1,
  )
end

Goal.create!(name: "Goal1", group_id: 1, start_day: "2019-11-20 15:00:01 +0900", end_day: "2019-11-30 15:00:01 +0900")
Task.create!(name: "Task1", goal_id: 1, start_day: "2019-11-20 15:00:01 +0900", end_day: "2019-11-25 15:00:01 +0900")
Task.create!(name: "Task2", goal_id: 1, start_day: "2019-11-25 15:00:01 +0900", end_day: "2019-11-30 15:00:01 +0900")
UserGroup.create!(user_id: 1, group_id: 1, role: 3)
UserGroup.create!(user_id: 2, group_id: 1, role: 2)
UserGroup.create!(user_id: 3, group_id: 1, role: 1)
UserGoal.create!(user_id: 1, goal_id: 1, process: 0.8)
UserGoal.create!(user_id: 2, goal_id: 1, process: 1)
UserTask.create!(user_id: 1, task_id: 1, process: 1, evaluate_user_id: 2)
UserTask.create!(user_id: 1, task_id: 2, process: 0.9, evaluate_user_id: 2)
UserTask.create!(user_id: 2, task_id: 1, process: 1, evaluate_user_id: 1)
UserTask.create!(user_id: 2, task_id: 2, process: 1, evaluate_user_id: 1)
Comment.create!(user_id: 1, context: "test comment 1", commentable_type: "Group", commentable_id: 1)
Comment.create!(user_id: 1, context: "test comment 2", commentable_type: "Goal", commentable_id: 1)
Vote.create!(user_id: 2, voteable_type: "Comment", voteable_id: "1", status: 1)
Vote.create!(user_id: 3, voteable_type: "Comment", voteable_id: "1", status: 2)
Vote.create!(user_id: 1, voteable_type: "Goal", voteable_id: 1, status: 1)
Achievement.create!(user_id: 2, group_id: 1, goal_id: 1, context: "Omedetou gold", achievement_type: 1)
Invite.create!(sender_id: 1, receiver_id: 2, group_id: 2)
Notification.create!(context: "Invited from user1", user_id: 2, notificationable_type: "Invite", notificationable_id: 1, sender_id: 1)
Notification.create!(context: "Group1'day begin was changed", user_id: 2, notificationable_type: "Group", notificationable_id: 1)
Request.create!(user_id: 4, group_id: 1)
