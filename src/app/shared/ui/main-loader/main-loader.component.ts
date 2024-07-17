import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MainLoaderService } from "../../../services/main-loader.service";

@Component({
  selector: 'app-main-loader',
  template: `
    <div class="main-loader" *ngIf="mainLoaderService.getIsLoading() | async">
      <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fill-rule="evenodd">
            <g transform="translate(2 1), scale(1.5)" stroke="var(--color)" stroke-width="1.5">
                <circle cx="42.601" cy="11.462" r="5" fill-opacity="1" fill="var(--color)">
                    <animate attributeName="fill-opacity"
                        begin="0s" dur="1.3s"
                        values="1;0;0;0;0;0;0;0" calcMode="linear"
                        repeatCount="indefinite" />
                </circle>
                <circle cx="49.063" cy="27.063" r="5" fill-opacity="0" fill="var(--color)">
                    <animate attributeName="fill-opacity"
                        begin="0s" dur="1.3s"
                        values="0;1;0;0;0;0;0;0" calcMode="linear"
                        repeatCount="indefinite" />
                </circle>
                <circle cx="42.601" cy="42.663" r="5" fill-opacity="0" fill="var(--color)">
                    <animate attributeName="fill-opacity"
                        begin="0s" dur="1.3s"
                        values="0;0;1;0;0;0;0;0" calcMode="linear"
                        repeatCount="indefinite" />
                </circle>
                <circle cx="27" cy="49.125" r="5" fill-opacity="0" fill="var(--color)">
                    <animate attributeName="fill-opacity"
                        begin="0s" dur="1.3s"
                        values="0;0;0;1;0;0;0;0" calcMode="linear"
                        repeatCount="indefinite" />
                </circle>
                <circle cx="11.399" cy="42.663" r="5" fill-opacity="0" fill="var(--color)">
                    <animate attributeName="fill-opacity"
                        begin="0s" dur="1.3s"
                        values="0;0;0;0;1;0;0;0" calcMode="linear"
                        repeatCount="indefinite" />
                </circle>
                <circle cx="4.938" cy="27.063" r="5" fill-opacity="0" fill="var(--color)">
                    <animate attributeName="fill-opacity"
                        begin="0s" dur="1.3s"
                        values="0;0;0;0;0;1;0;0" calcMode="linear"
                        repeatCount="indefinite" />
                </circle>
                <circle cx="11.399" cy="11.462" r="5" fill-opacity="0" fill="var(--color)">
                    <animate attributeName="fill-opacity"
                        begin="0s" dur="1.3s"
                        values="0;0;0;0;0;0;1;0" calcMode="linear"
                        repeatCount="indefinite" />
                </circle>
                <circle cx="27" cy="5" r="5" fill-opacity="0" fill="var(--color)">
                    <animate attributeName="fill-opacity"
                        begin="0s" dur="1.3s"
                        values="0;0;0;0;0;0;0;1" calcMode="linear"
                        repeatCount="indefinite" />
                </circle>
            </g>
        </g>
      </svg>
    </div>
  `,
  styles: [`
    .main-loader {
      position: fixed;
      z-index: 100;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      background-color: rgb(255 255 255 / 0%);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class MainLoaderComponent {
  public mainLoaderService = inject(MainLoaderService);

}