import { Injectable } from '@angular/core';
import { PouchDbService } from '../pouch-db.service';
import { MonthlyReportModel } from '@shared/model/monthly-report.model';

@Injectable({
	providedIn: 'root',
})
export class MonthlyReportRepository {
	public constructor(private dbService: PouchDbService<MonthlyReportModel>) {}

	public async getByMonthAndYear(month: number, year: number): Promise<MonthlyReportModel> {
		return await this.dbService.getByMonthAndYear(month, year);
	}
}
