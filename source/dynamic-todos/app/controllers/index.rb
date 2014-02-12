get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/add_todo' do
  content_type :json
  p params
  Todo.create(params)
  @todo = Todo.last
  @todo.to_json
end

delete '/todo/:id' do
  content_type :json
  @todo = Todo.find(params[:id])
  Todo.destroy(params[:id])
  @todo.to_json
end

put '/todo/:id' do
  content_type :json
  @todo = Todo.find(params[:id])
  Todo.update(params[:id], :completed => true)
  @todo.to_json
end