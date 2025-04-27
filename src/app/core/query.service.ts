import PouchDB from 'pouchdb';
import { Injectable } from '@angular/core';
import { PouchDbService } from './pouch-db.service';
import { MonthlyReportModel } from '@shared/model/monthly-report.model';

@Injectable({
	providedIn: 'root',
})
export class QueryService {
	public constructor(private dbService: PouchDbService) {}

	public async getByMonthAndYear(month: number, year: number): Promise<MonthlyReportModel> {
		return await this.dbService.getByMonthAndYear(month, year);
	}
}
