class Serializers::Goals::GoalSimpleSerializer < Serializers::SupportSerializer
  attrs :id, :name, :group_id, :description, :start_day, :end_day

  def start_day
    ApplicationController.helpers.custom_time(object.start_day)
  end

  def end_day
    ApplicationController.helpers.custom_time(object.end_day)
  end
end
