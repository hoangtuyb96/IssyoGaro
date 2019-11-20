class Achievement < ApplicationRecord
  belongs_to :user
  belongs_to :group
  belongs_to :goal
end
