import { ChangeDetectionStrategy, Component, OnDestroy } from "@angular/core";
import { UserService } from "../../services/user.service";
import { BehaviorSubject, finalize, Subject, takeUntil } from "rxjs";
import { CustomInputComponent } from "../../shared/ui/custom-input/custom-input.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ILogin } from "../../interfaces/login.interface";
import { ButtonComponent } from "../../shared/ui/button/button.component";
import { CommonModule } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CustomInputComponent,
    ReactiveFormsModule, 
    FormsModule,
    ButtonComponent,
    CommonModule,
  ],
  standalone: true,
})
export class AuthComponent implements OnDestroy {

  constructor(
    private _userService: UserService,
    private _toastrService: ToastrService,
    private _router: Router,
  ) {}

  public loginForm = new FormGroup<ILogin>({
		email: new FormControl(null, [Validators.required, Validators.email]),
		password: new FormControl(null, [Validators.required]),
	});

  takeUntilSubject = new Subject();
  isSendingForm = new BehaviorSubject(false);
  isSendingForm$ = this.isSendingForm.asObservable();

  ngOnDestroy(): void {
    this.takeUntilSubject.next(true);
  }

  onSubmit() {
    this.isSendingForm.next(true);
    const loginData = {
      ...this.loginForm.value
    } as {email: string; password: string};
    this._userService.login(loginData)
      .pipe(
        takeUntil(this.takeUntilSubject),
        finalize(() => this.isSendingForm.next(false))
      )
      .subscribe({
        next: user => {
          this._userService.setUser(user);
          setTimeout(() => {
            this._router.navigate(['']);
          }, 500)
          
        },
        error: err => {
          this._toastrService.error(err.error.message);
        }
      });
  }

}