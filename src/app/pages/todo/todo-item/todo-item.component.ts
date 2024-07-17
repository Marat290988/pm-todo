import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TodoItem } from "../../../interfaces/todoitem.interface";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../../services/user.service";

interface ITodoItemForm {
  title: FormControl<string | null>,
  completed: FormControl<boolean | null>,
  user: FormControl<number | null>,
}

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent implements OnInit {

  constructor(
    private _userService: UserService
  ) {}

  @Input({required: true}) item!: TodoItem;
  @Output() saveData = new EventEmitter<TodoItem>();
  @Output() remove = new EventEmitter<string>();
  public todoForm!: FormGroup<ITodoItemForm>;

  ngOnInit(): void {
    this.todoForm = new FormGroup<ITodoItemForm>({
      title: new FormControl(this.item.title, [Validators.required]),
      user: new FormControl(this._userService.getUser()!.user_id, [Validators.required]),
      completed: new FormControl(this.item.completed, [Validators.required]),
    });
    this.todoForm.disable();
  }

  save() {
    if (this.todoForm.status !== 'VALID') {
      return;
    }
    const newItem = {...this.item};
    newItem.title = this.todoForm.get('title')!.value as string;
    newItem.completed = this.todoForm.get('completed')!.value as boolean;
    this.saveData.emit(newItem);
    this.todoForm.disable();
  }

}