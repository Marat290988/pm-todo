import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ControlContainer, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { ICustomInputStyle, defaultInputStyle } from "./style-constants";
import { SvgIconComponent } from "../svg-icon/svg-icon.component";

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SvgIconComponent,
  ]
})
export class CustomInputComponent {

  constructor(private _container: ControlContainer) {}

  @Input({required: true}) formName!: string | undefined;
  @Input() name!: string | undefined;
  @Input() autoComplete = 'off';
  @Input() label!: string | undefined;
  @Input() type: 'text' | 'password' | 'email' = 'text';
  @Input() inputStyle: ICustomInputStyle = defaultInputStyle;
  @Input() placeholder = '';
  @Input() iconName: string | undefined;
  @Input() checkIcon: boolean = false;
  @Input() errorMessage: string | undefined;
  @Input() showError: boolean = false;
  @Input() showErrorClearBtn: boolean = false;

  showPasswordIcon = false;

  inputMode: 'formInput' | 'basicInput' = 'basicInput';

  ngOnInit() {
    this.inputMode = this.formName ? 'formInput' : 'basicInput';
    this.showPasswordIcon = this.type === 'password';
  }

  public get control() {
		return this._container.control?.get(this.formName!) as FormControl;
	}

	private get _isRequired() {
		return this.control?.hasValidator(Validators.required);
	}

	public get labelText() {
		return this.label /*+ (this._isRequired ? '*' : '')*/;
	}

  public clearControl() {
    this.control.setValue('');
  }

  togglePassword() {
    this.type = this.type === 'text' ? 'password' : 'text';
  }

}