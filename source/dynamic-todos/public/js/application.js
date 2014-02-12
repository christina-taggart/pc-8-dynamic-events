$(document).ready(function() {
  var todoTemplate = $.trim($('#todo_template').html());

  function bindEvents() {
    // Bind functions which add, remove, and complete todos to the appropriate
    // elements
  }

  //Create functions to add, remove and complete todos
  $('form').on('submit', function(event){
    event.preventDefault();
    $.ajax({
      method: 'post',
      url: '/todo_list',
      data: $(this).serialize()
    }).done( function(response){
      // $('.todo_list').append(response.todo_content);
      var $todo = buildTodo(response);
      $('.todo_list').append($todo);
    })
  })

  $('.delete').on('click', function(event){
    $this = $(this)
    var id = $this.data('id')
    event.preventDefault();
    $.ajax({
      method: 'delete',
      url: '/todo_list/' + id
    }).done( function(){
      $this.closest('.todo').remove();
    })
  })

  $('.complete').on('click', function(event){
    debugger;
    $this = $(this)
    var id = $this.data('id')
    event.preventDefault();
    $.ajax({
      method: 'patch',
      url: '/todo_list/' + id
    }).done( function(){
      $this.closest('.todo').addClass('complete')
    })
  })

  function buildTodo(todo) {
    // Creates an jQueryDOMElement from the todoTemplate.
    var $todo = $(todoTemplate);
    // Modifies it's text to use the passed in todoName.
    $todo.find('#content').text(todo.todo_content);
    // Returns the jQueryDOMElement to be used elsewhere.
    $todo.find('a.delete').data('id', todo.id);
    return $todo;
  }

  bindEvents();
});
