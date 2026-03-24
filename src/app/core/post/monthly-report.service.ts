import { Injectable } from '@angular/core';
import { PouchDbService } from '../pouch-db.service';
import { MonthlyReportModel } from '@shared/model/monthly-report.model';

@Injectable({
	providedIn: 'root',
})
export class PostService {
	public constructor(private dbService: PouchDbService<MonthlyReportModel>) {}

	public async createMonthlyReport(monthlyReport: MonthlyReportModel): Promise<boolean> {
		return await this.dbService.create(monthlyReport);
	}
}
