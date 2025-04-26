import PouchDB from 'pouchdb';
import { Injectable } from '@angular/core';
import { PouchDbService } from './pouch-db-service';
import { MonthlyReportModel } from '@shared/model/monthly-report.model';
import { CreateMonthlyReportCommand } from '@shared/commands';

@Injectable({
	providedIn: 'root',
})
export class PostService {
	public constructor(private dbService: PouchDbService) {}

	public async addMonthlyReport(monthlyReport: CreateMonthlyReportCommand): Promise<boolean> {
		// map to model and send to db
		return await this.dbService.addMonthlyReport(monthlyReport);
	}
}
