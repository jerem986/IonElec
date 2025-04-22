import { ModelBase } from './model-base';

export class MonthlyReportModel extends ModelBase {
	public id: string | null = null;
	public month: number | null = null;
	public year: number | null = null;
	public dayCounter: number | null = null;
	public nightCounter: number | null = null;
	public productionCounter: number | null = null;
	public carCounter: number | null = null;
}
