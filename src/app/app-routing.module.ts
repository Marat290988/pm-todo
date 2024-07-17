import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { authUserRedirector } from "./shared/utils/auth.guard";
// import { authUserRedirector } from "@shared/utils/auth.guard";

const routes: Routes = [
  {path: '', title: 'Todo | Main Page', loadChildren: () => import('./pages/todo/todo.module').then(module => module.TodoModule)},
  {path: 'auth', title: 'Auth Page', loadComponent: () => import('./pages/auth/auth.component').then(component => component.AuthComponent), canActivate: [authUserRedirector]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}