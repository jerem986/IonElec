export abstract class ModelBase {
	public type?: string;
	public abstract id: string;
	public _rev?: string;

	public constructor() {
		this.type = (this.constructor as any).name;
	}
}
