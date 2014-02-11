$(document).ready(function() {
  var todoTemplate = $.trim($('#todo_template').html());
  $todoView = $('.todo_list')

  function bindEvents() {
    // Bind functions which add, remove, and complete todos to the appropriate
    // elements
    $('form').on('submit', function(event) {
      event.preventDefault()
      addTodo.call(this, $todoView)
    })

    $('.todo_list').on('click', 'a.delete', function() {
      event.preventDefault()
      deleteTodo.call(this, $todoView)
    })

    $('.todo_list').on('click', 'a.complete', function() {
      event.preventDefault()
      completeTodo.call(this, $todoView)
    })
  }

  //Create functions to add, remove and complete todos
  function addTodo($view) {
    var new_params = $(this).serialize()
    $.post('/todos', new_params)
      .done(function(create_response) {
        $new_element = buildTodo(create_response.todo)
        $view.append($new_element)
      })
  }

  function deleteTodo($view) {
    $.ajax({
      url: $(this).attr('href'),
      type: 'DELETE',
      success: function(delete_response) {
        $('div.todoid_'+delete_response).remove()
      }
    })
  }

  function completeTodo($view) {
    var todo_id = $(this).attr('href').substr(7)
    var params = {
      update_user: {
        id: todo_id,
        completed: true
      }
    }
    $.ajax({
      url: $(this).attr('href'),
      type: 'PUT',
      data: params,
      success: function(complete_response) {
        $divTodo = $('div.todoid_'+complete_response.todo.id)
        $divTodo.addClass('completed')
        $divTodo.find('a.complete').parent().remove()
      }
    })
  }

  function buildTodo(todo) {
    // Creates an jQueryDOMElement from the todoTemplate.
    var $todo = $(todoTemplate);
    // Modifies it's text to use the passed in todoName.
    $todo.find('h2').text(todo.todo_content);
    // Returns the jQueryDOMElement to be used elsewhere.
    $todo.addClass('todoid_'+todo.id)
    $todo.find('a.delete').attr('href','/todos/'+todo.id)
    $todo.find('a.complete').attr('href','/todos/'+todo.id)
    return $todo;
  }


  bindEvents();
});
