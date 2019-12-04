class UserTask < ApplicationRecord
  before_save :default_progress

  belongs_to :user
  belongs_to :task
  belongs_to :user_goal

  def default_progress
    self.progress ||= 0
  end
end
