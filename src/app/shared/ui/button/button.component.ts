import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { SvgIconComponent } from "../svg-icon/svg-icon.component";
import { CommonModule } from "@angular/common";

export type BtnSizeType = 'size-44';
export type BtnColorType = 'primary' | 'secondary';

@Component({
  selector: 'app-button',
  template: `
    <button
      [ngClass]="[
        typeWidth === '100%' ? 'width-100' : 'width-content',
        colorBg,
        btnSize
      ]"
      [disabled]="disabled"
    >
      @if (!isLoading) {
        <ng-content />
      } @else {
        <app-svg-icon iconName="spinner-white" class="icon-spinner" />
      }
    </button>
  `,
  styleUrls: ['./button.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SvgIconComponent]
})
export class ButtonComponent {
  @Input() btnSize: BtnSizeType = 'size-44';
  @Input() colorBg: BtnColorType = 'primary';
  @Input() typeWidth: '100%' | 'fit-content' = '100%';
  @Input() disabled: boolean | null = false;
  @Input() isLoading: boolean | null = false;
}