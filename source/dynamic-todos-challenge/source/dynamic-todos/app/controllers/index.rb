get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/add_todo' do
  p "Inside /add_todo route!"
end

