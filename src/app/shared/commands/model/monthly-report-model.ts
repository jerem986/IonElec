import { ModelBase } from './model-base';

export class MonthlyReportModel extends ModelBase {
	public id: string = '';
	public month: number = 0;
	public year: number = 0;
	public dayCounter: number = 0;
	public nightCounter: number = 0;
	public productionCounter: number = 0;
	public carCounter: number = 0;
	public monthlyConsumption: number = 0;
	public houseConsumption: number = 0;
}
