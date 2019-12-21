Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static#home'

  get '/page', to: 'pages#show'

  scope '/api' do
    scope '/youtube' do
      get '/videos' => 'pages#videos'
    end
  end
end
