import { Injectable } from '@angular/core';
import { Model, ModelFactory } from '@angular-extensions/model';
import { Observable } from 'rxjs';

let ID = 2;

const initialData: Todo[] = [
  { id: 0, name: 'Explore example', done: true },
  { id: 1, name: 'Add more todos', done: false },
  { id: 2, name: 'Toggle some todo', done: false }
];
 
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private model: Model<Todo[]>;
 
  todos$: Observable<Todo[]>;
 
  constructor(private modelFactory: ModelFactory<Todo[]>) {
    this.model = this.modelFactory.create(initialData);
    this.todos$ = this.model.data$;
  }
 
  addTodo(name: string) {
    const todos = this.model.get();
 
    const newTodo = { 
      id: ++ID,
      name,
      done: false
    }
    todos.push(newTodo);
 
    this.model.set(todos);
  }

  removeTodo(id: number) {
    const todos = this.model.get();

    todos.splice(todos.findIndex(todo => todo.id === id), 1);

    this.model.set(todos);
  }

  toggleTodo(id: number) {
    const todos = this.model.get();
 
    const todo = todos.find(todo => todo.id === id);
    todo.done = !todo.done;
 
    this.model.set(todos);
  }
}
 
export interface Todo {
  id: number;
  name: string;
  done: boolean;
}