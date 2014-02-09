get '/' do
  redirect '/todos'
end

post '/add_todo' do
  content_type :json
  Todo.create(params).to_json
end

get '/todos' do
  @todos = Todo.all.sort_by{ |todo| todo.id }.reverse
  erb :index
end

put '/todos/:id' do
  content_type :json
  todo = Todo.find(params[:id])
  if todo.completed
    todo.update_attributes(completed: false)
  else
    todo.update_attributes(completed: true)
  end
  todo.to_json
end

delete '/todos/:id' do
  Todo.find(params[:id]).destroy
  params[:id]
end

