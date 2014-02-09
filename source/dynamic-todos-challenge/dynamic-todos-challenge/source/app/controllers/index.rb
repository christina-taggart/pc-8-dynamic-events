require_relative '../../config/environment'

before do
	@tasks = Task.all
end

get '/' do
  erb :index
end

post '/created' do
	Task.create(params)
	@task = Task.last
	@task.to_json
	# erb :created_task, :layout => false
end

delete '/:task_id/deleted' do
	Task.find(params[:task_id]).destroy
	@tasks = Task.all
	params[:task_id]
end

put '/:task_id/edited' do
	p params
	@task = Task.find(params[:task_id])
	@task.update_attributes(title: params[:title], content: params[:content])
	p @task
	erb :edited_task
end

get '/:task_id/edit' do
	@task = Task.find(params[:task_id])
	erb :edit_form, :layout => false
end

get '/:task_id/complete' do
	Task.find(params[:task_id]).update_attributes(completed: 1)
	redirect '/'
end