require "api_constraints"

namespace :api, defaults: {format: "json"} do
  devise_scope :user do
    post "sign_up", to: "registrations#create"
    post "sign_in", to: "sessions#create"
    delete "sign_out", to: "sessions#destroy"
  end

  scope module: :v1,
    constraints: ApiConstraints.new(version:1, default: true) do
      resources :users, only: :show
      resources :groups, only: %i[create update]
      resources :user_groups, only: %i[create destroy]
    end
end
