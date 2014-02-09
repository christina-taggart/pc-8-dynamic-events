$(document).ready(function() {
  var todoTemplate = $.trim($('#todo_template').html());

  function bindEvents() {
    // Bind functions which add, remove, and complete todos to the appropriate
    // elements
    $('.add').on('click', function(e) {
      e.preventDefault();
      addTodo();
    });
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
      var todoDOMObj = buildTodo(obj.todo.todo_content);
      addTodoToList(todoDOMObj)
    })
    .fail(function() {
      console.log('ajax post to /add_todo failed');
    });
  };


  function buildTodo(todoName) {
    // Creates an jQueryDOMElement from the todoTemplate.
    var $todo = $(todoTemplate);
    // Modifies it's text to use the passed in todoName.
    $todo.find('h2').text(todoName);
    // Returns the jQueryDOMElement to be used elsewhere.
    return $todo;
  }

  function addTodoToList(todoDOMObj) {
    $('.todo_list').prepend(todoDOMObj);
  }

  bindEvents();
});
