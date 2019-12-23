FactoryBot.define do
  factory :achievement do
    context { "おめでとうございます。" }
    user_id {}
    group_id {}
    goal_id {}
    is_public {}
    achievement_type {}
    progress {}
  end
end
