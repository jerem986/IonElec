import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';
import { Injectable } from '@angular/core';
import { MonthlyReportModel } from '@shared/commands/model/monthly-report-model';

PouchDB.plugin(PouchFind);

@Injectable({
	providedIn: 'root',
})
export class PouchDbService {
	private db: PouchDB.Database<MonthlyReportModel>;

	constructor() {
		this.db = new PouchDB('my-app-db');
	}

	async getByMonthAndYear(
		month: number,
		year: number,
	): Promise<MonthlyReportModel> {
		const result = await this.db.find({
			selector: {
				month,
				year,
			},
		});
		return result.docs;
	}

	// // Tu pourras facilement ajouter d’autres méthodes ici :
	// async add(report: MonthlyReport): Promise<PouchDB.Core.Response> {
	// 	return this.db.put(report);
	// }

	// async getById(id: string): Promise<MonthlyReport> {
	// 	return this.db.get(id);
	// }

	async remove(id: string, rev: string): Promise<PouchDB.Core.Response> {
		return this.db.remove(id, rev);
	}
}
