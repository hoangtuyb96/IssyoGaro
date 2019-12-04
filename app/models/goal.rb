class Goal < ApplicationRecord
  ATTRIBUTES_PARAMS = %i[name desciption].freeze
  has_many :user_goals
  has_many :users, through: :user_goals
  has_many :achievements
  has_many :comments, as: :commentable
  has_many :votes, as: :voteable
  has_many :notifications, as: :notificationable
  has_many :tasks

  belongs_to :group

  accepts_nested_attributes_for :tasks, allow_destroy: true
end
