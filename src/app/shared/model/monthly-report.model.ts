import { ModelBase } from './model-base';

export class MonthlyReportModel extends ModelBase {
	public id: string = null;
	public month: number = null;
	public year: number = null;
	public dayCounter: number = null;
	public nightCounter: number = null;
	public productionCounter: number = null;
	public carCounter: number = null;
	public monthlyConsumption: number = null;
	public houseConsumption: number = null;
}
