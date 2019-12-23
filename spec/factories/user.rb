FactoryBot.define do
  factory :user do
    sequence(:email)  { |n| "user#{n}@gmail.com" }
    sequence(:name) { Faker::Name.name }
    phone { "080" + rand(1000000).to_s }
    address { "tokyo minato-ku" }
    hobby { "none hobby" }
    is_active { "true" }
    authentication_token { SecureRandom.hex[0..15] }
    password { "123456" }
    password_confirmation { "123456" }
  end
end
