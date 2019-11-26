class Serializers::UserTasks::UserTaskProcessSerializer <
  Serializers::SupportSerializer
  attrs :id, :process, :task

  def task
    Serializers::Tasks::TaskSerializer.new(object: object.task).serializer
  end
end
