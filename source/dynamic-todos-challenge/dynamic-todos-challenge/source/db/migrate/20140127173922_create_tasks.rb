class CreateTasks < ActiveRecord::Migration
  def change
    create_table(:tasks) do |t|
      t.string :title, :content
      t.integer :completed, default: 0
    end
  end
end
