class UserGroup < ApplicationRecord
  ATTRIBUTES_PARAMS = %i[user_id group_id].freeze

  belongs_to :user
  belongs_to :group

  lambda_search_role = lambda do |user_id, group_id|
    where user_id: user_id, group_id: group_id
  end

  scope :search_role, lambda_search_role
end
