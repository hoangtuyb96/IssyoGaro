class Serializers::SupportSerializer < Serializers::BaseSerializer
  def object
    @object ||= nil
  end
end
