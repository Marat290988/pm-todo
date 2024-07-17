import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICONS } from '../../utils/icons';

@Component({
	selector: 'app-svg-icon',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './svg-icon.component.html',
	styleUrls: ['./svg-icon.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgIconComponent {
	@Input({ required: true }) iconName!: string;
	@Input() maxWidth = '';

	public get icon() {
		return ICONS.find((icon) => icon.name === this.iconName);
	}
}
