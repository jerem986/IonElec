export abstract class ModelBase {
	public type?: string;
	public abstract _id: string;
	public _rev?: string;

	public constructor() {
		this.type = (this.constructor as any).name;
	}
}
