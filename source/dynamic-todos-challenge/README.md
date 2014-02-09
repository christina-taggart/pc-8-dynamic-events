# Dynamic Elements and Events

## Learning Competencies

* Use jQuery to implement Event Delegation with the `on` function
* Separate my view concerns from my data verification concerns
* Use AJAX to retrieve partials from the server and replace or append them to a website
* Use AJAX to retrieve JSON from the server and then modify the page based on the JSON
* Use MustacheJS or Underscore template libraries to convert JSON to HTML

## Summary

Understanding how to bind and handle events is a core part of being a web developer. This challenge tasks you to take a reasonably well factored JavaScript application and extend it to include event bindings. Some of the good practices you'll see in the provided code are:

1. Using templates from the HTML to add elements.
1. Using functions to scope variables (i.e. todoTemplate is accessible within buildTodo, but not in the global scope. [Why?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FFunctions_and_function_scope))
1. Using functions to do only one thing (i.e. building the Todo DOM Element vs building the element and adding it to the list)

This should provide you with a solid foundation to complete the remaining features.

## Releases

This challenge requires you to manipulate objects that have been added dynamically. You may want to brush up on [Event Delegation][event-delegation].

### Release 0 : Up and Running
Verify that the existing application runs before modifying.  Then add the following features:

1. A todo may be added to the page.
1. A todo may be marked as complete.
1. A todo may be removed from the page.

(Hint: Create named functions and bind them to the appropriate buttons)

### Release 1 : Drag and Drop

When creating lists, you often want to reorder them. Use [HTML5 Drag and Drop](http://www.html5rocks.com/en/tutorials/dnd/basics/) events to allow manual sorting of the todo list.

### Release 2 : Using Template Code
* Redo this challenge using a template language like Mustache.js

## Resources
* [Event Delegation][event-delegation]

[event-delegation]: http://davidwalsh.name/event-delegate
