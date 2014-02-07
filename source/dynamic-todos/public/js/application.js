function bindEvents() {
  $('.todo_list').on("submit", ".delete", function(event){
    event.preventDefault();
    deleteTodo(this);
  });

  $('.todo_list').on("click", ".complete", function(){
    completeTodo(this);
  })

  $('.add-todo').on("submit", function(event){
    event.preventDefault();
    buildTodo(this);
    renderTodo(this);
  })

  $('.draggable').on('dragstart', handleDragStart)
  $('.draggable').on('dragenter', handleDragEnter)
  $('.draggable').on('dragover', handleDragOver)
  $('.draggable').on('dragleave', handleDragLeave)
  $('.draggable').on('drop', handleDrop)
  $('.draggable').on('dragend', handleDragEnd)
}

$(document).ready(function() {
  var todoTemplate = $.trim($('#todo_template').html());
  bindEvents();
});

function buildTodo(todo) {
  $.ajax({
    type: "POST",
    url: todo.action,
    data: {todo_content: $(todo).find("input[name=todo_content]").val()}
  }).done(function(response){
    var $pending = $('.pending').first();
    $pending.find('input').prop('disabled', false);
    $pending.find('.saving').addClass("saved").removeClass("saving").text("Saved!");
    $pending.find('.complete').attr('value', '/todo/' + response);
    $pending.find('.delete').attr('action', '/todo/' + response);
    $pending.removeClass("pending");
  })
}

function todoTemplate(){
  return $("#template").html();
}

function renderTodo(todo) {
  var itemName = {content: $(todo).find("input[name=todo_content]").val()}
  var template = todoTemplate();
  var toView = Mustache.render(template, itemName);
  $(".todo_list ul").append(toView);
}

function deleteTodo(todo) {
  $.ajax({
    type: "DELETE",
    url: todo.action,
  }).done(function(response){
    $(".todo_list").html(response)
  }).fail(function(){
    console.log("failed")
  })
}

function completeTodo(todo){
  $.ajax({
    type: "PUT",
    url: todo.value,
  }).done(function(){
    console.log("SUCCESS")
  }).fail(function(){
    console.log("FAIL")
  })
}

/////////////////
// DRAG AND DROP
/////////////////

var dragSourceElement = null;

function handleDragStart(e){
  this.style.opacity = '0.4';

  dragSourceElement = this;
  e.originalEvent.dataTransfer.effectAllowed = 'move';
  e.originalEvent.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnter(e){
  this.classList.add('over')
}

function handleDragLeave(e){
  this.classList.remove('over')
}

function handleDragEnd(e){
  this.style.opacity = '1';
}

function handleDragOver(e){
  if (e.stopPropagation){
    e.stopPropagation();
  }

  e.originalEvent.dataTransfer.dropEffect = 'move';
  return false;
}

function handleDrop(e){
  if (e.stopPropagation){
    e.stopPropagation();
  }

  if (dragSourceElement != this){
    dragSourceElement.innerHTML = this.innerHTML;
    this.innerHTML = e.originalEvent.dataTransfer.getData('text/html');
  }
  return false;
}