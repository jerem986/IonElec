import { Injectable } from '@angular/core';
import { CreateMonthlyReportCommand } from '@shared/commands';
import { MonthlyReportModel } from '@shared/model/monthly-report.model';
import { v4 as uuidv4 } from 'uuid';
import { PouchDbManager } from './pouch-db.manager';
import { MonthlyReportModelRepository } from './repository/monthly-report-model.repository';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	public constructor(
		private queryService: MonthlyReportModelRepository,
		private pouchDbManager: PouchDbManager<any>,
	) {}

	public async createMonthlyReport(command: CreateMonthlyReportCommand): Promise<void> {
		let previousMonth: number;
		let year: number;
		if (command.month === 1) {
			previousMonth = 12;
			year = command.year - 1;
		} else {
			previousMonth = command.month - 1;
			year = command.year;
		}
		const previousMonthReport = await this.queryService.getByMonthAndYear(previousMonth, year);

		const reportMonthlyModel = new MonthlyReportModel();
		reportMonthlyModel.id = uuidv4();
		reportMonthlyModel.carCounter = command.carCounter;
		reportMonthlyModel.dayCounter = command.dayCounter;
		reportMonthlyModel.nightCounter = command.nightCounter;
		reportMonthlyModel.month = command.month;
		reportMonthlyModel.year = command.year;
		reportMonthlyModel.productionCounter = command.productionCounter;

		if (previousMonthReport) {
			const dayDiff = command.dayCounter - previousMonthReport.dayCounter;
			const nightDiff = command.nightCounter - previousMonthReport.nightCounter;
			reportMonthlyModel.monthlyConsumption = dayDiff + nightDiff + command.productionCounter;
			reportMonthlyModel.houseConsumption = reportMonthlyModel.monthlyConsumption - command.carCounter;
		}

		const response = await this.pouchDbManager.create(reportMonthlyModel);
	}
}
