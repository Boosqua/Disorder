Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, { format: :json } do 

    resources :users
    resources :users, only: :show do
      resources :servers 
      resources :messages, only: :index
    end
    
    resources :servers do 
      resources :channels
    end

    resources :channels, only: :show do
        resources :messages
    end
    resource :session, only: [ :create, :destroy ]
  end
  
  root to: 'static_pages#root'
  mount ActionCable.server => '/cable'
end
