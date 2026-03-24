import { Component, input } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';

import { ButtonBase } from '../button.base';

@Component({
	selector: 'ie-button',
	imports: [IonButton, IonIcon],
	templateUrl: './ie-button.component.html',
})
export class ButtonComponent extends ButtonBase {
	public color = input<string>('primary');
	public type = input<'button' | 'submit' | 'reset'>('button');
	public icon = input<string>();
	public suffixIcon = input<string>();
	public expand = input<'block' | 'full'>();
}
