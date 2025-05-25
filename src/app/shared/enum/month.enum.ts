import { SelectOption } from '@shared/components/form/select/ie-select.component';
import { EnumHelper } from './enum.helper';

export enum Month {
	January = 0,
	February = 1,
	March = 2,
	April = 3,
	May = 4,
	June = 5,
	July = 6,
	August = 7,
	September = 8,
	October = 9,
	November = 10,
	December = 11,
}

class MonthHelper extends EnumHelper<Month> {
	public monthOptions(): SelectOption<number>[] {
		return Month.helper.members.map((value) => ({
			value: value as number,
			label: Month[value as number],
		}));
	}
}

export namespace Month {
	export const helper = new MonthHelper('Month', [
		Month.January,
		Month.February,
		Month.March,
		Month.April,
		Month.May,
		Month.June,
		Month.July,
		Month.August,
		Month.September,
		Month.October,
		Month.November,
		Month.December,
	]);
}
