FactoryBot.define do
  factory :task do
    factory :finished_task_1 do
      name { "finished_task_1" }
      description { "none" }
      start_day { Time.now - 10.day }
      end_day { Time.now - 5.day }
    end

    factory :finished_task_2 do
      name { "finished_task_2" }
      description { "none" }
      start_day { Time.now - 5.day }
      end_day { Time.now - 1.day }
    end

    factory :unfinished_task_1 do
      name { "unfinished_task_1" }
      description { "none" }
      start_day { Time.now }
      end_day { Time.now + 5.day }
    end

    factory :unfinished_task_2 do
      name { "unfinished_task_2" }
      description { "none" }
      start_day { Time.now + 5.day }
      end_day { Time.now + 10.day }
    end
  end
end
