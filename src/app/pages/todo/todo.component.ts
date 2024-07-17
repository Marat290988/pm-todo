import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { TodoService } from "../../services/todo.service";
import { BehaviorSubject, Subject, takeUntil } from "rxjs";
import { TodoItem } from "../../interfaces/todoitem.interface";
import { ToastrService } from "ngx-toastr";
import { Dialog } from "@angular/cdk/dialog";
import { DialogSureComponent } from "../../shared/ui/dialog-sure/dialog-sure.component";
import { DIALOG_SURE_SETTING } from "../../shared/ui/dialog-sure/constants";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-todo',
  template: `
    <div class="todo-content">
      <app-main-loader></app-main-loader>
      <app-header></app-header>
      <div class="todo-content-items">
        @for(item of todoItems$ | async; track item.id) {
          <app-todo-item
            [item]="item"
            (saveData)="editData($event)"
            (remove)="removeData($event)"
          >
          </app-todo-item>
        }
        <app-todo-item-new
          (save)="onSaveNewTodo($event)"
        >
        </app-todo-item-new>
      </div>
    </div>
  `,
  styles: [`
    .todo-content {
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .todo-content-items {
      overflow: auto;
      height: 100%;
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent implements OnInit, OnDestroy {

  constructor(
    private _todoService: TodoService,
    private _toastrService: ToastrService,
    private _dialog: Dialog,
    private _userService: UserService,
  ) {}

  takeUntilSubject = new Subject();
  _todoItems = new BehaviorSubject<TodoItem[]>([]);
  todoItems$ = this._todoItems.asObservable();

  ngOnInit(): void {
    this._todoService.getAll()
      .pipe(takeUntil(this.takeUntilSubject))
      .subscribe(todos => {
        this._todoItems.next(todos);
      });
  }

  ngOnDestroy(): void {
    this.takeUntilSubject.next(true);
  }

  editData(todoItem: TodoItem) {
    this._todoService.editData(todoItem)
      .pipe(takeUntil(this.takeUntilSubject))
      .subscribe(item => {
        if (item) {
          this._toastrService.success('Данные сохранены');
          const items = this._todoItems.getValue();
          const findIndex = items.findIndex(fItem => fItem.id === item.id);
          if (findIndex > -1) {
            items.splice(findIndex, 1, item);
            this._todoItems.next(items);
          }
        }
      });
  }

  removeData(id: string) {
    this._dialog.open(
      DialogSureComponent, 
      {...DIALOG_SURE_SETTING,
      }
    ).closed
      .pipe(takeUntil(this.takeUntilSubject))
      .subscribe(data => {
        if (data) {
          this._todoService.removeData(id)
            .pipe(takeUntil(this.takeUntilSubject))
            .subscribe(() => {
              this._toastrService.success('Данные удалены');
              const items = this._todoItems.getValue();
                const findIndex = items.findIndex(fItem => fItem.id === id);
                if (findIndex > -1) {
                  items.splice(findIndex, 1);
                  this._todoItems.next(items);
                }
            });
        }
      });
    
  }

  onSaveNewTodo(title: string) {
    const newTodo: TodoItem = {
      completed: false,
      title: title,
      user: this._userService.getUser()!.user_id
    };
    this._todoService.addNewData(newTodo)
      .pipe(takeUntil(this.takeUntilSubject))
      .subscribe(todo => {
        const items = this._todoItems.getValue();
        items.push(todo);
        this._todoItems.next(items);
      })
  }


}