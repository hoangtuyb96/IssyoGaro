class Invite < ApplicationRecord
  validates :sender_id, presence: true
  validates :receiver_id, presence: true
  validates :group_id, presence: :true

  belongs_to :sender, class_name: User.name
  belongs_to :receiver, class_name: User.name

  has_many :notifications, as: :notificationable
end
