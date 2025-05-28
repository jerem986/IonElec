import { Component, input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ButtonBase } from '../button.base';

@Component({
	selector: 'ie-button',
	imports: [IonicModule],
	templateUrl: './ie-button.component.html',
})
export class ButtonComponent extends ButtonBase {
	public color = input<string>('primary');
	public type = input<'button' | 'submit' | 'reset'>('button');
	public icon = input<string>();
	public suffixIcon = input<string>();
	public expand = input<'block' | 'full'>();
}
