import { CommandBase } from './command.base';

export class CreateMonthlyReportCommand extends CommandBase {
	public dayCounter: number = null;
	public nightCounter: number = null;
	public productionCounter: number = null;
	public carCounter: number = null;
	public month: number = null;
	public year: number = null;
}
