import { NgModule } from "@angular/core";
import { TodoComponent } from "./todo.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { authGuard } from "../../shared/utils/auth.guard";
import { MainLoaderComponent } from "../../shared/ui/main-loader/main-loader.component";
import { HeaderComponent } from "./header/header.component";
import { SvgIconComponent } from "../../shared/ui/svg-icon/svg-icon.component";
import { TodoItemComponent } from "./todo-item/todo-item.component";
import { DialogSureComponent } from "../../shared/ui/dialog-sure/dialog-sure.component";
import { TodoItemNewComponent } from "./todo-item-new/todo-item-new.component";
import { TodoItemPageComponent } from "./page/todo-item-page/todo-item-page.component";

@NgModule({
  declarations: [
    TodoComponent,
    HeaderComponent,
    TodoItemComponent,
    TodoItemNewComponent,
    TodoItemPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: TodoComponent, canActivate: [authGuard]},
      {path: 'todo/:id', component: TodoItemPageComponent, canActivate: [authGuard]}
    ]),
    ReactiveFormsModule, 
    FormsModule,
    MainLoaderComponent,
    SvgIconComponent,
    DialogSureComponent,
  ]
})
export class TodoModule {}