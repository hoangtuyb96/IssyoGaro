class Group < ApplicationRecord
  ATTRIBUTES_PARAMS = %i[name description cover category_id is_public].freeze

  belongs_to :category, optional: true

  has_many :user_groups, dependent: :destroy
  has_many :users, through: :user_groups
  has_many :achievements
  has_many :requests
  has_many :requested_users, through: :requests, source: :user
  has_many :comments, as: :commentable
  has_many :notifications, as: :notificationable
  has_many :goals
  has_many :chats

  validates :name, presence: true, uniqueness: true

  mount_base64_uploader :cover, CoverUploader
end
