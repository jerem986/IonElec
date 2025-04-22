import PouchDB from 'pouchdb';
import { Injectable } from '@angular/core';
import { PouchDbService } from './pouch-db-service';
import { MonthlyReportModel } from '@shared/commands/model/monthly-report-model';

@Injectable({
	providedIn: 'root',
})
export class QueryService {
	constructor(private dbService: PouchDbService) {}

	async getByMonthAndYear(
		month: number,
		year: number,
	): Promise<MonthlyReportModel> {
		const result = await this.dbService.find({
			selector: {
				month,
				year,
			},
		});
		return result.docs;
	}
}
