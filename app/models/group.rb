class Group < ApplicationRecord
  belongs_to :category

  has_many :user_groups
  has_many :users, through: :user_groups
  has_many :achievements
  has_many :requests
  has_many :requested_users, through: :requests, source: :user
  has_many :comments, as: :commentable
  has_many :notifications, as: :notificationable
end
