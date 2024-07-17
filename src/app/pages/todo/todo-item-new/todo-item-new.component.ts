import { ChangeDetectionStrategy, Component, EventEmitter, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-todo-item-new',
  templateUrl: './todo-item-new.component.html',
  styleUrls: ['./todo-item-new.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemNewComponent {
  @Output() save = new EventEmitter<string>();

  formNewTodo = new FormGroup({
    title: new FormControl(null, [Validators.required])
  })

  saveTodo() {
    const title = this.formNewTodo.get('title')?.value;
    if (title !== null) {
      this.save.emit(title);
      this.formNewTodo.reset();
    }
  }
}