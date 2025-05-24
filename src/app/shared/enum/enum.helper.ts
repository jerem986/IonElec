export interface IEnum<T> {
	helper: EnumHelper<T>;
}

export class EnumHelper<T> {
	public constructor(
		private _name: string,
		private _members: T[],
		private _otherTranslateKey: string[] = [],
	) {}

	public get name(): string {
		return this._name;
	}

	public get members(): T[] {
		return this._members;
	}

	public membersNotIn(excludedMembers: T[]): T[] {
		return this._members.filter((m) => !excludedMembers.includes(m));
	}

	public parse(value: string): T {
		for (const member of this._members) {
			if ((member as any) === value) return member;
		}
		return null;
	}

	public format(member: T): string {
		return member as any;
	}
}
