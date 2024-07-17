import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../../services/user.service";

@Injectable()
export class AccessHttpInterceptor implements HttpInterceptor {

  constructor(
    private _userService: UserService,
    private _toastrService: ToastrService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._userService.getUser()) {
      req = req.clone({
        setHeaders: {
          Authorization: `Token ${this._userService.getUser()!.token}`
        }
      });
    }
    return next.handle(req)
      .pipe(
        catchError((_error: HttpErrorResponse) => {
          if (_error.status === 401) {
            this._userService.logout();
            this._toastrService.error("Ошибка доступа.");
          } else if (_error.error.detail) {
            this._toastrService.error(_error.error.detail);
          }
          return throwError(() => {
            return _error;
          });
        })
      )
  }

  

}