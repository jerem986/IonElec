import { Min, IsNotEmpty, IsNumber, Max } from 'class-validator';

export class CreateMonthlyReportCommand {
	@IsNotEmpty()
	@IsNumber()
	@Min(0)
	public dayCounter!: number;

	@IsNotEmpty()
	@IsNumber()
	@Min(0)
	public nightCounter!: number;

	@IsNotEmpty()
	@IsNumber()
	@Min(0)
	public productionCounter!: number;

	@IsNotEmpty()
	@IsNumber()
	@Min(0)
	public carCounter!: number;

	@IsNotEmpty()
	@IsNumber()
	@Min(0)
	@Max(11)
	public month!: number;

	@IsNotEmpty()
	@IsNumber()
	public year!: number;
}
