import { PropertyType } from '@shared/decorator/property-type.decorator';
import { IsNumber, Max, Min } from 'class-validator';

export class CreateMonthlyReportCommand {
	@IsNumber()
	@Min(0)
	@PropertyType(Number)
	public dayCounter: number = null;

	@IsNumber()
	@Min(0)
	@PropertyType(Number)
	public nightCounter: number = null;

	@IsNumber()
	@Min(0)
	@PropertyType(Number)
	public productionCounter: number = null;

	@IsNumber()
	@Min(0)
	@PropertyType(Number)
	public carCounter: number = null;

	@IsNumber()
	@Min(0)
	@Max(11)
	@PropertyType(Number)
	public month: number = null;

	@IsNumber()
	@Min(2020)
	@PropertyType(Number)
	public year: number = null;
}
