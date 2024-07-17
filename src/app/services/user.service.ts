import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map } from "rxjs";
import { IUser } from "../interfaces/user.interface";
import { LOCAL_STORAGE_KEY } from "../shared/consts/consts";
import { Router } from "@angular/router";

@Injectable({
	providedIn: 'root',
})
export class UserService {

  constructor(
    private _http: HttpClient,
    private _router: Router,
  ) {}

  private _user = new BehaviorSubject<null | IUser>(null);
  public user$ = this._user.asObservable();
  public getUser() {
    return this._user.getValue();
  }
  public setUser(user: IUser | null) {
    this._user.next(user);
    this._setLocalStorageUser(user);
  }

  login(loginData: {email: string, password: string}): Observable<IUser> {
    return this._http.post<IUser>(`/api/auth/token/login/`, JSON.stringify(loginData), {observe: 'response'})
      .pipe(
        map(v1 => {
          return v1['body'] as IUser;
        })
      )
  }

  logout() {
    this.setUser(null);
    this._router.navigate(['auth']);
    this._setLocalStorageUser(null)
  }

  private _setLocalStorageUser(user: IUser | null): void {
		if (user === null) {
			localStorage.setItem(LOCAL_STORAGE_KEY, '');
		} else {
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
		}
  }

  public getUserFromLocaleStorage(): IUser | undefined {
    const localeUser = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (typeof localeUser === 'string' && localeUser !== '') {
      return JSON.parse(localeUser);
    }
    return undefined;
  } 

}