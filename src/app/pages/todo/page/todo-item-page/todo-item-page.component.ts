import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TodoService } from "../../../../services/todo.service";
import { BehaviorSubject, catchError, of, Subject, takeUntil } from "rxjs";
import { TodoItem } from "../../../../interfaces/todoitem.interface";

@Component({
  selector: 'app-todo-item-page',
  template: `
    <app-header></app-header>
    <app-main-loader></app-main-loader>
    <div class="item-page-content">
        <div class="return" [routerLink]="['/']">Вернуться обратно</div>
        <ng-container *ngIf="todoItem$ | async as item">
          <div class="todo-details">

            <div class="todo-details-row">
              <div class="row-left">
                ID:
              </div>
              <div class="row-right">
                {{ item.id }}
              </div>
            </div>

            <div class="todo-details-row">
              <div class="row-left">
                Создано:
              </div>
              <div class="row-right">
                {{ item.created_at | date: 'dd.MM.YYYY HH:mm' }}
              </div>
            </div>

            <div class="todo-details-row">
              <div class="row-left">
                Обновлено:
              </div>
              <div class="row-right">
                {{ item.updated_at | date: 'dd.MM.YYYY HH:mm' }}
              </div>
            </div>

            <div class="todo-details-row">
              <div class="row-left">
                Пользователь:
              </div>
              <div class="row-right">
                {{ item.user }}
              </div>
            </div>

            <div class="todo-details-row">
              <div class="row-left">
                Наименование:
              </div>
              <div class="row-right">
                {{ item.title }}
              </div>
            </div>

            <div class="todo-details-row">
              <div class="row-left">
                Завершено:
              </div>
              <div class="row-right">
                {{ item.completed ? 'Да' : 'Нет' }}
              </div>
            </div>
          </div>
        </ng-container>
        <ng-container *ngIf="hasError$ | async">
          Некорректные параметры страницы
        </ng-container>
    </div>

  `,
  styles: [`
    .item-page-content {
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .return {
      width: fit-content;
      margin-top: 10px;
      background-color: var(--bg-medium);
      padding: 2px 8px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
    }

    .todo-details {
      display: flex;
      flex-direction: column;
      gap: 5px;

      .todo-details-row {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;

        .row-left {
          min-width: 300px;
        }

        .row-right {
          flex-grow: 1;
          min-width: 300px;
        }
      }

      
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemPageComponent implements OnInit, OnDestroy {

  constructor(
    private _route: ActivatedRoute,
    private _todoService: TodoService
  ) {}

  takeUntilSubject = new Subject();
  todoItem = new BehaviorSubject<TodoItem | null>(null);
  todoItem$ = this.todoItem.asObservable();
  hasError$ = new Subject<boolean>();

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this._todoService.getTodoById(id)
          .pipe(
            takeUntil(this.takeUntilSubject),
            catchError(err => {
              return of(null);
            })
          )
          .subscribe(todo => {
            if (todo) {
              this.todoItem.next(todo);
            } else {
              this.hasError$.next(true);
            }
          })
      }
    });
  }

  ngOnDestroy() {
    this.takeUntilSubject.next(true);
  }

}

