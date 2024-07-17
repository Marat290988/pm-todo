import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UserService } from "../../../services/user.service";

@Component({
  selector: 'app-header',
  template: `
    <header class="header">
      @if((userService.user$ | async)) {
        <p>{{ (userService.user$ | async)?.username }}</p>
        <app-svg-icon iconName="exit" class="header-exit" (click)="userService.logout()" />
      }
    </header>
  `,
  styles: [`
    .header {
      display: flex;
      gap: 10px;
      padding: 10px 10px 15px 5px;
      justify-content: flex-end;
      border-bottom: 1px solid var(--bg-medium);
    }

    .header-exit {
      cursor: pointer;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  constructor(public userService: UserService) {}

}