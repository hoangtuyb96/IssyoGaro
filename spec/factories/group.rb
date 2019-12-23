FactoryBot.define do
  factory :group do
    sequence(:name) { |n| "group#{n}" }
    description { "none description" }
    category_id { "1" }
  end
end
