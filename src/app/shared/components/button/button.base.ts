import { Directive, ElementRef, HostBinding, input } from '@angular/core';

@Directive()
export abstract class ButtonBase {
	public label = input<string>('');

	@HostBinding('class.disabled')
	public disabled = input<boolean>(false);

	public constructor(public elementRef: ElementRef) {}
}
