import { Component } from '@angular/core';
import { TodoService } from './todo.service';
 
@Component({
  selector: 'my-todo',
  template: `
    <!-- template subscription to todos using async pipe -->
    <ng-container *ngIf="todoService.todos$ | async as todos">
      <h1>Todo List | {{todos.length}}</h1>
      <ul>
        <li class="todo" *ngFor="let todo of todos">
          <span [ngClass]="{ done: todo.done }"
                (click)="toggleTodo(todo.id)">
            {{todo.name}} <button (click)="removeTodo(todo.id)">x</button>
          </span>
        </li>
      </ul>
      <div>
        <input type="text" #newTodoName>
        <button (click)="addTodo(newTodoName.value);newTodoName.value=''">
          Add todo
        </button>
      </div>
      <p>Click on todo to toggle its state</p> 
    </ng-container>
  `,
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  constructor(public todoService: TodoService) {}
 
  addTodo(name: string) {
    if (name.length) {
      this.todoService.addTodo(name);
    }
  }

  removeTodo(id: number) {
    this.todoService.removeTodo(id);
  }

  toggleTodo(id: number) {
    this.todoService.toggleTodo(id);
  }
}