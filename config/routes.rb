Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, { format: :json } do 
   resources :search, only: :show
    resources :users
    resources :friend_requests
    resources :friends
    resources :users, only: :show do
      resources :servers 
      resources :messages, only: :index
    end
    resources :server_members
    resources :servers do 
      resources :channels
    end
   resources :server_invitations, only: [:create, :index, :show, :destroy]

    resources :channels, only: :show do
        resources :messages
    end
    resources :messages, only: [:update, :destroy]
    resource :session, only: [ :create, :destroy ]
  end
  
  root to: 'static_pages#root'
  mount ActionCable.server => '/cable'
end
