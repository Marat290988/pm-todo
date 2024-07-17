import { APP_INITIALIZER, NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from "./app-routing.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";
import { DialogModule } from '@angular/cdk/dialog';
import { UserService } from "./services/user.service";
import { AccessHttpInterceptor } from "./shared/utils/http.interceptor";

function initializeAppFactory(userService: UserService) {
  return () => {
    const user = userService.getUserFromLocaleStorage();
    if (user) {
      userService.setUser(user);
    }
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    DialogModule,
  ],
  providers: [
    {
			provide: HTTP_INTERCEPTORS,
			useClass: AccessHttpInterceptor,
			multi: true,
		},
    {
			provide: APP_INITIALIZER,
			useFactory: initializeAppFactory,
			deps: [UserService],
			multi: true,
		},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}