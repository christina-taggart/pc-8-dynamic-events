get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/add_todo' do
  Todo.create(params)
end

