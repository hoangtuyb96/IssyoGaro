class User < ApplicationRecord
  acts_as_token_authenticatable

  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.freeze
  ATTRIBUTES_PARAMS = %i[email password password_confirmation name
                         avatar phone address hobby].freeze

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :validatable
  has_many :user_groups
  has_many :groups, through: :user_groups
  has_many :user_goals
  has_many :goals, through: :user_goals
  has_many :user_tasks
  has_many :tasks, through: :user_tasks
  has_many :active_invited, class_name: Invite.name, foreign_key: :sender_id
  has_many :passive_invited, class_name: Invite.name, foreign_key: :receiver_id
  has_many :invited_person, through: :active_invited, source: :receiver
  has_many :inviter_person, through: :passive_invited, source: :sender
  has_many :achievements
  has_many :requests
  has_many :requested_groups, through: :requests, source: :group
  has_many :comments
  has_many :votes
  has_many :notifications
  has_many :sent_notifications, class_name: Notification.name, foreign_key: :sender_id

  validates :email,
    presence: true,
    length: {
      maximum: 255,
      minimum: 6
    },
    format: { with: VALID_EMAIL_REGEX }
  validates :name, presence: true, length: { maximum: 60 }

  mount_base64_uploader :avatar, AvatarUploader

  def generate_new_authentication_token
    token = User.generate_unique_secure_token
    update_attributes authentication_token: token
  end
end
