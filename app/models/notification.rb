class Notification < ApplicationRecord
  belongs_to :user
  belongs_to :notificationable, polymorphic: true
  belongs_to :notification_maker, class_name: User.name, foreign_key: :sender_id
end
