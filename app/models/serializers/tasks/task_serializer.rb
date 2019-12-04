class Serializers::Tasks::TaskSerializer < Serializers::SupportSerializer
  attrs :id, :name, :description, :start_day, :end_day

  def start_day
    ApplicationController.helpers.custom_time(object.start_day)
  end

  def end_day
    ApplicationController.helpers.custom_time(object.end_day)
  end
end
