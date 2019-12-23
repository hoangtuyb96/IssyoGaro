FactoryBot.define do
  factory :goal do
    factory :finished_goal do
      sequence(:name) { |n| "finished_goal_#{n}" }
      description { "none" }
      start_day { Time.now - 10.day }
      end_day {Time.now - 1. day }
    end

    factory :unfinished_goal do
      sequence(:name) { |n| "unfinished_goal_#{n}" }
      description { "none" }
      start_day { Time.now }
      end_day { Time.now + 10.day }
    end
  end
end
