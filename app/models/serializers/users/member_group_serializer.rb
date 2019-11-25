class Serializers::Users::MemberGroupSerializer < Serializers::SupportSerializer
  attrs :id, :email, :name, :avatar

  def achievement
    Serializers::Achievements::AchievementSerializer
      .new(object: object.achievements).serializer
  end
end
