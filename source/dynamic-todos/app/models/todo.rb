class Todo < ActiveRecord::Base
  # Remember to create a migration!
  validates :todo_content,  uniqueness: true
end
