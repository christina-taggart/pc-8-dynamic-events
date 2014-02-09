get '/' do
  redirect '/todos'
end

post '/add_todo' do
  content_type :json
  Todo.create(params).to_json
end

get '/todos' do
  @todos = Todo.all.reverse
  erb :index
end

put '/todos/:id' do
  todo = Todo.find(params[:id])
  todo.completed ? false : true
  params[:id]
end

