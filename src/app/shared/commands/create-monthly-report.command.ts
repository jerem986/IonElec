import { CommandBase } from './command.base';

export class CreateMonthlyReportCommand extends CommandBase {
	public dayCounter!: number;
	public nightCounter!: number;
	public productionCounter!: number;
	public carCounter!: number;
	public month!: number;
	public year!: number;
}
