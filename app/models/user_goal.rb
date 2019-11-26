class UserGoal < ApplicationRecord
  ATTRIBUTES_PARAMS = %i[user_id goal_id].freeze

  belongs_to :user
  belongs_to :goal
end
