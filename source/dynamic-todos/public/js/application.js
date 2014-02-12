$(document).ready(function() {
  var todoTemplate = $.trim($('#todo_template').html());

  function bindEvents() {
    // add, complete, delete

    //add
    $('form').on('submit', function(e){
      e.preventDefault();
      var input = $('input').val();
      $.ajax({
        type: "POST",
        url: "/add_todo",
        data: {input: input }
      }).done(function () {
        $('.todo_list').append(buildTodo(input))
      })

    })


    //delete
   $('.todo_list').on('click', '.delete', function(e){
    e.preventDefault();
    $(this).closest('.todo').remove()
    var toDo=$(this).closest('ul').siblings('h2').text()
    $.ajax({
      type: "DELETE",
      url: "/delete_todo",
      data: {toDo:toDo}
    })
   })

   //complete

  $('.todo_list').on('click', '.complete', function(){
         $(this).closest('ul').siblings('h2').css('opacity', '0.3')
      var toDo = $(this).closest('ul').siblings('h2').text()
      $.ajax({
        type: "POST",
        url: "/complete_todo",
        data: {toDo: toDo}
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
