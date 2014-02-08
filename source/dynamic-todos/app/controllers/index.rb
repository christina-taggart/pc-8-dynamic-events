get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/add_todo' do
  content_type :json

  @todo = Todo.create(params)
  @todo.to_json
end

