class Serializers::Groups::GroupSerializer < Serializers::SupportSerializer
  attrs :id, :name, :description, :category, :cover, :is_public,
        :created_at

  def category
    return unless object.category

    Serializers::Categories::CategorySerializer
      .new(object: object.category).serializer
  end

  def created_at
    object.created_at.strftime("%H:%M:%S %d-%m-%Y")
  end
end
