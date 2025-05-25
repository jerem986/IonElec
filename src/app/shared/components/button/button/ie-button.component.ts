import { Component, HostBinding, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ButtonBase } from '../button.base';

@Component({
	selector: 'ie-button',
	imports: [MatButtonModule, MatIconModule],
	templateUrl: './ie-button.component.html',
})
export class ButtonComponent extends ButtonBase {
	public color = input<string>('primary');
	public type = input<'button' | 'submit' | 'reset'>('button');
	public icon = input<string | undefined>(undefined);
	public suffixIcon = input<string | undefined>(undefined);
}
