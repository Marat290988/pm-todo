import { DialogRef } from "@angular/cdk/dialog";
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, ElementRef } from "@angular/core";

@Component({
  selector: 'app-dialog-sure',
  template: `
    <div class="sure-content">
      <p>Вы уверены?</p>
      <div class="sure-buttons">
        <div (click)="dialogRef.close(true)">ДА</div>
        <div (click)="dialogRef.close(false)">НЕТ</div>
      </div>
    </div>
  `,
  styles: [`

    :host {
      display: none;
    }

    .sure-content {
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;

      p {
        text-align: center;
      }

      .sure-buttons {
        width: 100%;
        display: flex;
        justify-content: space-evenly;

        div {
          padding: 10px;
          border: 1px solid var(--color);
          border-radius: 15px;
          cursor: pointer;
        }
      }
    }
  `],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class DialogSureComponent {

  constructor(
    public dialogRef: DialogRef,
    private _elementRef: ElementRef<HTMLElement>,
  ) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this._elementRef.nativeElement.style.display = 'block';
    }, 50);
  }

}