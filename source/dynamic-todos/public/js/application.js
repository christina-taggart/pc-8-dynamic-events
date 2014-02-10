$(document).ready(function() {
  
  var todoTemplate = $.trim($('#todo_template').html()); 
  var draggedTodo = null;

  //-----EVENT HANDLERS-----

  function bindEvents() {
    
    // Add Todo event handler
    $('.toolbox form').on('submit', function(event) {
      event.preventDefault();
      toDoContent = $(this).serialize();
      addTodo(toDoContent);
    })

    // Delete todo event handler
    $('.todo_list').on('click', '.delete', function(event) {
      event.preventDefault();
      todoId = getTodoId($(this));
      deleteTodo(todoId);
    })

    // Complete todo event handler
    $('.todo_list').on('click', '.complete', function(event) {
      event.preventDefault();
      todoId = getTodoId($(this));
      completeTodo(todoId);
    })


    //-----drag and drop-----

    $('.todo_list').on('dragstart', '.todo', function(event) {
      $(this).addClass('dragging');
      draggedTodo = this;
      // the dataTranfer object holds the data sent in a drag action:
      event.originalEvent.dataTransfer.effectAllowed = 'move';
      event.originalEvent.dataTransfer.setData('text/html', this.innerHTML);
    })

    $('.todo_list').on('dragend', '.todo', function() {
      $(this).removeClass('dragging');
    })

    $('.todo_list').on('dragleave', '.todo', function() {
      $(this).removeClass('over');
    })

    $('.todo_list').on('dragover', '.todo', function(event) {
      if (event.stopPropagation){
        event.stopPropagation();
      }
      $(this).addClass('over');
      event.originalEvent.dataTransfer.dropEffect = 'move';
      return false;
    })

    $('.todo_list').on('drop', '.todo', function(event) {
      $(this).removeClass('over');
      if (event.stopPropagation){
        event.stopPropagation();
      }
      if (draggedTodo != this) {
        //Swap the HTML of the dragged todo and the todo it is dropped on:
        draggedTodo.innerHTML = this.innerHTML;
        this.innerHTML = event.originalEvent.dataTransfer.getData('text/html');
      }
      return false;
    })
  }


  //-----AJAX REQUEST/RESPONSES-----

  // Add Todo
  var addTodo = function(todoContentSerialized) {
    $.ajax({
      method: 'post',
      url: '/todos',
      data: todoContentSerialized
    }).done(function(serverResponse) {
      appendTodoDiv(serverResponse.content, serverResponse.id);
    }).fail(function() {
      console.log("Request failed")
    })
  }

  // Delete todo
  var deleteTodo = function(todoId) {
    $.ajax({
      method: 'delete',
      url: '/todos',
      data: {"id": todoId}
    }).done(function(serverResponse) {
      removeTodoDiv(serverResponse.id.toString())
    }).fail(function() {
      console.log("Request failed");
    })
  }

  // Complete todo
  var completeTodo = function(todoId) {
    $.ajax({
      method: 'patch',
      url: '/todos',
      data: {"id": todoId}
    }).done(function(serverResponse) {
      completeTodoDiv(serverResponse.id.toString());
    }).fail(function() {
      console.log("Request failed");
    })
  }


  //-----DOM/HTML MANIPULATION-----

  var appendTodoDiv = function(todoContent, todoId) {
    $('.todo_list').append(buildTodo(todoContent, todoId));
    renderTodoCounter();
  }


  var removeTodoDiv = function(todoId) {
    todoDiv = $(".todo[data-id='" + todoId + "']")
    todoDiv.remove();
    renderTodoCounter();
  }

  var completeTodoDiv = function(todoContent) {
    todoHeader = $(".todo[data-id='" + todoId + "']").find('h2');
    todoHeader.css('text-decoration', 'line-through');
  }

  // Build Todo HTML with given content & id
  var buildTodo = function(todoContent, todoId) {
    var $todo = $(todoTemplate);
    $todo.find('h2').text(todoContent);
    $todo.find('h2').attr('style', 'text-decoration: none');
    $todo.attr('data-id', todoId.toString());
    return $todo;
  }

  // Helper that takes a '.delete' or '.complete' DOMElement and returns
  // the todo data-id found in the same div.
  var getTodoId = function(todoButtonElement) {
    return parseInt(todoButtonElement.parents().eq(2).attr('data-id'));
  }


  //-----MUSTACHE EXPERIMENTS-----

  var counterView = {
    todo_count: function() {
      return $('.todo').length
    }
  }


  var renderTodoCounter = function() {
    var counterOutput = Mustache.render("You have {{todo_count}} todos.", counterView);
    $('.todo-counter').html(counterOutput);
  }


  //-----GET THE PARTY STARTED-----

  bindEvents();
  renderTodoCounter();
});


