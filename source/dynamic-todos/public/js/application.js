$(document).ready(function() {
  var todoTemplate = $.trim($('#todo_template').html());

  function bindEvents() {
    // Bind functions which add, remove, and complete todos to the appropriate
    // elements
  }

  $('form').on('submit', function(e) {
    e.preventDefault()
    $('.todo_list').append(buildTodo($('input').val()))
  })
  
   $('.todo_list').on('click', '.delete', function(e){
    e.preventDefault()
    $(this).closest('.todo').remove()
   })

   $('.todo_list').on('click', '.complete', function(){

    $(this).closest('ul').siblings('h2').css('text-decoration', 'line-through')
    $(this).closest('.todo').insertAfter('.todo_list:last')
   })


  //Create functions to add, remove and complete todos



  function buildTodo(todoName) {
    // Creates an jQueryDOMElement from the todoTemplate.
    var $todo = $(todoTemplate);
    // Modifies it's text to use the passed in todoName.
    $todo.find('h2').text(todoName);
    // Returns the jQueryDOMElement to be used elsewhere.
    return $todo;
  }


  bindEvents();
});
