require "api_constraints"

namespace :api, defaults: {format: "json"} do
  devise_scope :user do
    post "sign_up", to: "registrations#create"
    post "sign_in", to: "sessions#create"
    delete "sign_out", to: "sessions#destroy"
  end

  scope module: :v1,
    constraints: ApiConstraints.new(version:1, default: true) do
      resources :users, only: :show do
        resources :goals do
          get "goal_progress", to: "user_goals#goal_progress"
        end
        resources :groups, only: [] do
          resources :chats, only: %i[index create]
        end
      end
      resources :groups, only: %i[show create update destroy] do
        get "group_members", to: "group_members#index"
        resources :goals, only: %i[create update] do
          resources :user_goals, only: %i[create destroy]
        end
      end
      resources :user_groups, only: %i[create update destroy]
      resources :invites, only: %i[create update destroy]
      resources :goals, only: :show do
        get "summary", to: "summaries#create"
      end
      resources :user_tasks, only: :update
      resources :categories, only: :index
      resources :notifications, only: :index
      get "home", to: "home_pages#index"
    end
end
