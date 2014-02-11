$(document).ready(function() {

  // var source   = $("#entry-template").html();
  // var template = Handlebars.compile(source);
  // var context = {todo_item: $('#user_input').val()}
  // console.log(context)
  // console.log("")


  function buildTodo(todoTemplate) {
    var todo = $('#todo_template');
    todo.prepend(todoTemplate)
    return todo;
  }

  function updateTodo(todoNode) {
    $(todoNode).parent().parent().parent().addClass('completed-item');
  }

  function deleteTodo(todoNode) {
    $(todoNode).parent().parent().parent().remove();
  }


  // Our code starts below here
  $('#add_todo').on('submit', function(e) {
    e.preventDefault();
    var todo_creation_req = $.ajax({
      type: 'POST',
      url: '/todos',
      data: $('#user_input').serialize()
    });
    todo_creation_req.done(function(todoERBPartial){
      console.log(todoERBPartial)
      buildTodo(todoERBPartial);
    });
    todo_creation_req.always(function() {
      $('#user_input').val("");
    })
  })

  // bind on delete link
  $('#todo_template').on('click', '.delete', function(e) {
    e.preventDefault();
    var todoNode = this;
    var todo_id = $(todoNode).data('id');
    var todo_deletion_req = $.ajax({
      type: 'DELETE',
      url: '/todos/' + todo_id
    });

    todo_deletion_req.done(function(todo){
      deleteTodo(todoNode);
    });
  });

  // bind on complete link
  $('#todo_template').on('click', '.complete', function(e) {
    e.preventDefault();
    var todoNode = this;
    var todo_id = $(todoNode).data('id');
    var options = {
      type: 'PUT',
      url: '/todos/' + todo_id
    }

    $.ajax(options).done( function(todo){
        updateTodo(todoNode);
    });
  });



  ///////////////////////Draggable////////

  var dragSrcEl = null;

  function handleDragStart(e) {
    this.style.opacity = '0.4';
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault(); // Necessary. Allows us to drop.
    }
    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
    return false;
  }

  function handleDragEnter(e) {
    this.classList.add('over');
  }

  function handleDragLeave(e) {
    this.classList.remove('over');  // this / e.target is previous target element.
  }

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation(); // Stops some browsers from redirecting.
    }
    if (dragSrcEl != this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
    }
    return false;
  }

  function handleDragEnd(e) {
    [].forEach.call(cols, function (col) {
      col.classList.remove('over');
    });
  }

  var cols = $('#todo_template .todo');
  [].forEach.call(cols, function(col) {
    col.addEventListener('dragstart', handleDragStart, false);
    col.addEventListener('dragenter', handleDragEnter, false);
    col.addEventListener('dragover', handleDragOver, false);
    col.addEventListener('dragleave', handleDragLeave, false);
    col.addEventListener('dragdrop', handleDragDrop, false);
    col.addEventListener('dragend', handleDragEnd, false);

  });


}); // end of document.ready
