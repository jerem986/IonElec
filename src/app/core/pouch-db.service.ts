import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';
import { Injectable } from '@angular/core';
import { MonthlyReportModel } from '@shared/model/monthly-report.model';

PouchDB.plugin(PouchFind);

@Injectable({
	providedIn: 'root',
})
export class PouchDbService {
	private db: PouchDB.Database<MonthlyReportModel>;

	public constructor() {
		this.db = new PouchDB('my-app-db');
	}

	public async getByMonthAndYear(month: number, year: number): Promise<MonthlyReportModel> {
		const result = await this.db.find({
			selector: {
				month,
				year,
			},
		});
		return result.docs[0];
	}

	async addMonthlyReport(report: MonthlyReportModel): Promise<boolean> {
		const rep = await this.db.put(report);
		return rep.ok;
	}

	// async getById(id: string): Promise<MonthlyReport> {
	// 	return this.db.get(id);
	// }

	// async remove(id: string, rev: string): Promise<PouchDB.Core.Response> {
	// 	return this.db.remove(id, rev);
	// }
}
