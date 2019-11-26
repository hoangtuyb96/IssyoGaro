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
      resources :groups, only: %i[show create update] do
        get "group_members", to: "group_members#index"
        resources :goals, only: %i[create update] do
          resources :user_goals, only: %i[create destroy]
        end
      end
      resources :user_groups, only: %i[create update destroy]
      resources :invites, only: :create
      resources :goals, only: :show
      resources :user_tasks, only: :update
      get "home", to: "home_pages#index"
    end
end
