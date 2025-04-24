export abstract class ModelBase {
	public type?: string;
	public abstract id: string | null;

	public constructor() {
		this.type = (this.constructor as any).name;
	}
}
