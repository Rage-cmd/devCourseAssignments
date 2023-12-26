/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {

  constructor() {
    this.todo = [];
  }

  add(task) {
    this.todo.push(task);
  }

  remove(indexOfTodo) {
    if(indexOfTodo >= this.todo.length) {
      return;
    }
    for( let i=indexOfTodo; i<this.todo.length - 1; ++i) {
      this.todo[i] = this.todo[i+1];
    }
  }

  update(index, updatedTodo) {
    this.todo[index] = updatedTodo;
  }

  getAll() {
    return this.todo;
  }

  get(indexOfTodo) {
    return this.todo[indexOfTodo];
  }

  clear() {
    this.todo = [];
  }

}

module.exports = Todo;
