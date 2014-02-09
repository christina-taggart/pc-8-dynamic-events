$(document).ready(function() {
  var todoTemplate = $.trim($('#todo_template').html());

  function bindEvents() {
    // Bind functions which add, remove, and complete todos to the appropriate
    // elements
    $('.add').on('click', function(e) {
      e.preventDefault();
      addTodo();
    });

    $('div.todo_list').on('click', '.complete', function(e) {
      e.preventDefault();
      var todoID = $(e.target).parents('div.todo').attr('data-id')
      completeTodo(todoID)
    })
  }

  //Create functions to add, remove and complete todos
  function addTodo() {
    $.ajax({
      type: "POST",
      url: '/add_todo',
      data: {'todo_content': $('input.todo').val()}
    })
    .done(function(obj) {
      $('input.todo').val('');
      var todoDOMObj = buildTodo(obj.todo.todo_content, obj.todo.id);
      addTodoToList(todoDOMObj)
    })
    .fail(function() {
      console.log('ajax post to /add_todo failed');
    });
  };

  function completeTodo(todoID) {
    $.ajax({
      type: "PUT",
      url: "/todos/" + todoID,
      data: { "id" : todoID }
    })
    .done(function(id) {
      $("[data-id=" + id + "] > h2").css('color', 'green')
    })
    .fail(function() {
      console.log('put request to /todos/id failed')
    });
  }


  function buildTodo(todoName, todoID) {
    // Creates an jQueryDOMElement from the todoTemplate.
    var $todo = $(todoTemplate);
    // Modifies it's text to use the passed in todoName.
    $todo.find('h2').text(todoName);
    // Add data-id field to indicate todo id
    $todo.attr('data-id', todoID)
    // Returns the jQueryDOMElement to be used elsewhere.
    return $todo;
  }

  function addTodoToList(todoDOMObj) {
    $('.todo_list').prepend(todoDOMObj);
  }

  bindEvents();
});
