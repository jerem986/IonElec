import { CommandBase } from './command.base';

export class CreateMonthlyReportCommand extends CommandBase {
	public dayCounter: number = 0;
	public nightCounter: number = 0;
	public productionCounter: number = 0;
	public carCounter: number = 0;
	public month: number = 0;
	public year: number = 0;
}
