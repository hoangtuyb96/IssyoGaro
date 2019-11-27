class UserTask < ApplicationRecord
  before_save :default_process

  belongs_to :user
  belongs_to :task
  belongs_to :user_goal

  def default_process
    self.process ||= 0
  end
end
