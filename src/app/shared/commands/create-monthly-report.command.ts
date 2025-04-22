import { CommandBase } from './command.base';

export class CreateMonthlyReportCommand extends CommandBase {
	public dayCounter: number | null = null;
	public nightCounter: number | null = null;
	public productionCounter: number | null = null;
	public carCounter: number | null = null;
	public month: number | null = null;
	public year: number | null = null;
}
