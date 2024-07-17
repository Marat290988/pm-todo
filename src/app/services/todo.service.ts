import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, finalize, map } from 'rxjs';
import { TodoItem } from "../interfaces/todoitem.interface";
import { MainLoaderService } from "./main-loader.service";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(
    private _http: HttpClient,
    private _loader: MainLoaderService,
  ){}

  getAll(): Observable<TodoItem[]> {
    this._loader.setIsLoading(true);
    return this._http.get(`/api/todo/`)
      .pipe(
        map((res: any) => {
          if (res?.results) {
            return res?.results
          };
          return [];
        }),
        finalize(() => this._loader.setIsLoading(false))
      );
  }

  getTodoById(id: string): Observable<TodoItem> {
    this._loader.setIsLoading(true);
    return this._http.get<TodoItem>(`/api/todo/${id}`)
      .pipe(
        finalize(() => this._loader.setIsLoading(false))
      );
  }

  editData(item: TodoItem): Observable<TodoItem> {
    this._loader.setIsLoading(true);
    return this._http.put<TodoItem>(`/api/todo/${item.id}/`, item)
      .pipe(finalize(() => this._loader.setIsLoading(false)));
  }

  removeData(id: string) {
    this._loader.setIsLoading(true);
    return this._http.delete(`/api/todo/${id}/`)
      .pipe(finalize(() => this._loader.setIsLoading(false)));
  }

  addNewData(item: TodoItem): Observable<TodoItem> {
    this._loader.setIsLoading(true);
    return this._http.post<TodoItem>(`/api/todo/`, item)
      .pipe(finalize(() => this._loader.setIsLoading(false)));
  }
}
