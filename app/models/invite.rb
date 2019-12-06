class Invite < ApplicationRecord
  validates :sender_id, presence: true
  validates :receiver_id, presence: true
  validates :group_id, presence: :true

  belongs_to :sender, class_name: User.name
  belongs_to :receiver, class_name: User.name

  has_many :notifications, as: :notificationable

  lambda_search_invite = lambda do |sender_id, receiver_id, group_id|
    where sender_id: sender_id, receiver_id: receiver_id, group_id: group_id
  end

  scope :search_invite, lambda_search_invite
end
