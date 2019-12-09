class Serializers::Users::UserSerializer < Serializers::SupportSerializer
  attrs :id, :email, :name, :avatar, :phone, :address, :hobby,
    :achievement

  def achievement
    Serializers::Achievements::AchievementSerializer
      .new(object: object.achievements).serializer
  end

  def avatar
    object.avatar.file.filename
  end
end
