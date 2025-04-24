import { Injectable } from '@angular/core';
import { CreateMonthlyReportCommand } from '@shared/commands';
import { QueryService } from './query-service';
import { MonthlyReportModel } from '@shared/model/monthly-report.model';
import { v4 as uuidv4 } from 'uuid';
import { PostService } from './post-service';

@Injectable({
	providedIn: 'root',
})
export class DataServiceService {
	public constructor(
		private queryService: QueryService,
		private postService: PostService,
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

		let reportMonthlyModel = new MonthlyReportModel();
		reportMonthlyModel.id = uuidv4();
		reportMonthlyModel.carCounter = command.carCounter;
		reportMonthlyModel.dayCounter = command.dayCounter;
		reportMonthlyModel.nightCounter = command.nightCounter;
		reportMonthlyModel.month = command.month;
		reportMonthlyModel.year = command.year;
		reportMonthlyModel.productionCounter = command.productionCounter;

		if (previousMonth) {
			const dayDiff = command.dayCounter - previousMonthReport.dayCounter;
			const nightDiff = command.nightCounter - previousMonthReport.nightCounter;
			reportMonthlyModel.monthlyConsumption = dayDiff + nightDiff + command.productionCounter;
			reportMonthlyModel.houseConsumption = reportMonthlyModel.monthlyConsumption - command.carCounter;
		}
	}
}
