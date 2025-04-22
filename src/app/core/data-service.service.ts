import { Injectable } from '@angular/core';
import { CreateMonthlyReportCommand } from '@shared/commands';

@Injectable({
	providedIn: 'root',
})
export class DataServiceService {
	constructor() {}

	public async createMonthlyReport(
		command: CreateMonthlyReportCommand,
	): Promise<void> {}
}
