class UserGoal < ApplicationRecord
  ATTRIBUTES_PARAMS = %i[user_id goal_id].freeze

  belongs_to :user
  belongs_to :goal
  has_many :user_tasks

  lambda_search_role = lambda do |user_id, goal_id|
    where user_id: user_id, goal_id: goal_id
  end

  scope :search_role, lambda_search_role
end
