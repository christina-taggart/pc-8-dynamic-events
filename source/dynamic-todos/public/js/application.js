$(document).ready(function() {
  var todoTemplate = $.trim($('#todo_template').html());

  function bindEvents() {
    // Bind functions which add, remove, and complete todos to the appropriate
    // elements
    //create todo div
  $('form').on('submit', function(e) {
    e.preventDefault()
      $.ajax({
        type: "POST",
        url: "/add_todo",
        data: {input: $('input').val()}
      }).done(function () {
    $('.todo_list').append(buildTodo($('input').val()))
    })
  })
    // remove todo div
   $('.todo_list').on('click', '.delete', function(e){
    e.preventDefault()
     $(this).closest('.todo').remove()
    var title = $(this).closest('ul').siblings('h2').text()
     $.ajax({
      type: "DELETE",
      url: "/delete_todo",
      data: {title: title}
      })
    })
       //mark as completed
   $('.todo_list').on('click', '.complete', function(){
         $(this).closest('ul').siblings('h2').css('text-decoration', 'line-through')
         $(this).closest('.todo').appendTo('.todo_list')
      var title = $(this).closest('ul').siblings('h2').text()
      $.ajax({
        type: "POST",
        url: "/mark_complete",
        data: {title: title}
        })
        .done(function () {
      })
   })
  }


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
