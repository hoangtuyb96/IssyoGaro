class Goal < ApplicationRecord
  has_many :user_goals
  has_many :users, through: :user_goals
  has_many :achievements
  has_many :comments, as: :commentable
  has_many :votes, as: :voteable
  has_many :notifications, as: :notificationable
end
