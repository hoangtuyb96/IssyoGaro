class Serializers::Goals::GoalSerializer < Serializers::SupportSerializer
  attrs :id, :name, :description, :start_day, :end_day, :tasks

  def tasks
    Serializers::Tasks::TaskSerializer.new(object: object.tasks).serializer
  end
end
