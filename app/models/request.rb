class Request < ApplicationRecord
  belongs_to :user
  belongs_to :group

  has_many :notifications, as: :notificationable

  lambda_search_request = lambda do |user_id, group_id|
    where user_id: user_id, group_id: group_id
  end

  scope :search_request, lambda_search_request
end
