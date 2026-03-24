import { Injectable } from '@angular/core';
import { CreateMonthlyReportCommand } from '@shared/commands';
import { MonthlyReportModel } from '@shared/model/monthly-report.model';
import { v4 as uuidv4 } from 'uuid';
import { PouchDbManager } from './pouch-db.manager';
import { DataRepository } from './repository/data.repository';
import { MonthlyReportRepository } from './repository/monthly-report-repository';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	public constructor(
		private queryService: MonthlyReportRepository,
		private pouchDbManager: PouchDbManager<MonthlyReportModel>,
		private dataRepository: DataRepository,
	) {}

	public async createMonthlyReport(command: CreateMonthlyReportCommand): Promise<void> {
		let previousMonth: number;
		let year: number;
		if (command.month === 0) {
			previousMonth = 11;
			year = command.year - 1;
		} else {
			previousMonth = command.month - 1;
			year = command.year;
		}
		const previousMonthReport = await this.queryService.getByMonthAndYear(previousMonth, year);

		const reportMonthlyModel = new MonthlyReportModel();
		reportMonthlyModel._id = uuidv4();
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

		await this.pouchDbManager.create(reportMonthlyModel);
	}

	public async exportDb(): Promise<void> {
		const groupedByType = await this.dataRepository.exportDb();
		for (const [type, documents] of Object.entries(groupedByType)) {
			const fileName = `${type.toLowerCase().replace(/ /g, '-')}.json`;
			const jsonBlob = new Blob([JSON.stringify(documents, null, 2)], { type: 'application/json' });
			const url = URL.createObjectURL(jsonBlob);
			const a = document.createElement('a');
			a.href = url;
			a.download = fileName;
			a.click();
			URL.revokeObjectURL(url);
		}
	}
}
