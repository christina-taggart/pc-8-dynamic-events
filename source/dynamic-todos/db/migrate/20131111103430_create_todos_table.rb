class CreateTodosTable < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.string :todo_content

      t.timestamp
    end
  end
end
