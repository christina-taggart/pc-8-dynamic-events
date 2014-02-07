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
  }).done(function(){

  })
}

function todoTemplate(){
  return "<div class='draggable'><input class='complete' type='checkbox' name='completed'/><li>{{content}}</li><form class='delete' action='/todo/'><input type='submit' value='Delete'></form></div>"
}

function renderTodo(todo) {
  var view = {content: $(todo).find("input[name=todo_content]").val()}
  var template = todoTemplate();
  var toView = Mustache.render(template, view);
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

// Drag and drop code below
var dragSourceElement = null;

function handleDragStart(e){
  this.style.opacity = '0.4';

  dragSourceElement = this;
    // debugger
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