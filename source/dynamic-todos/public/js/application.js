$(document).ready(function() {
  var todoTemplate = $.trim($('#todo_template').html());

  function bindEvents() {
    
    // Add Todo event handler
    $('.toolbox form').on('submit', function(event) {
      event.preventDefault();
      toDoContent = $(this).serialize();
      addTodo(toDoContent);
    })


  }

  // Add Todo
  var addTodo = function(toDoContent) {
    $.ajax({
      method: 'post',
      url: '/todos',
      data: toDoContent
    }).done(function(serverResponse) {
      $('.todo_list').append(buildTodo(serverResponse));
    }).fail(function() {
      console.log("Request failed")
    })
  }

  // Delete todo
  

  // Build Todo HTML with given content
  var buildTodo = function(todoContent) {
    // Creates an jQueryDOMElement from the todoTemplate.
    var $todo = $(todoTemplate);
    // Modifies it's text to use the passed in todoName.
    $todo.find('h2').text(todoContent);
    // Returns the jQueryDOMElement to be used elsewhere.
    return $todo;
  }

  bindEvents();
});


