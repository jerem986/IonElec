import PouchDB from 'pouchdb';
import { Injectable } from '@angular/core';
import { PouchDbService } from './pouch-db-service';
import { MonthlyReportModel } from '@shared/model/monthly-report.model';

@Injectable({
	providedIn: 'root',
})
export class PostService {
	public constructor(private dbService: PouchDbService) {}

	public async addMonthlyReport(monthlyReport: MonthlyReportModel): Promise<boolean> {
		return await this.dbService.addMonthlyReport(monthlyReport);
	}
}
