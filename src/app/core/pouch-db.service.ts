import { Injectable } from '@angular/core';
import { MonthlyReportModel } from '@shared/model/monthly-report.model';
import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';

PouchDB.plugin(PouchFind);

@Injectable({
	providedIn: 'root',
})
export class PouchDbService {
	private db: PouchDB.Database<MonthlyReportModel>;

	public constructor() {
		this.db = new PouchDB('ion-elec');
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

	async addMonthlyReport(_report: MonthlyReportModel): Promise<boolean> {
		// const rep = await this.db.post(report);
		const allDocs = await this.db.allDocs({ include_docs: true });
		console.log('📋 Contenu DB après ajout:', allDocs);
		// return rep.ok;
		return true;
	}

	public async exportForBootstrap(): Promise<any[]> {
		try {
			console.log('🔄 Export depuis Angular...');

			const result = await this.db.allDocs({ include_docs: true });

			const cleanData = result.rows.map((row) => {
				const doc = { ...row.doc };
				delete doc._id;
				delete doc._rev;
				return doc;
			});

			console.log('📋 JSON pour bootstrap (copie ce contenu):');
			console.log('==========================================');
			console.log(JSON.stringify(cleanData, null, 2));
			console.log('==========================================');
			console.log(`✅ ${cleanData.length} records exportés`);

			return cleanData;
		} catch (error) {
			console.error('❌ Erreur export:', error);
			throw error;
		}
	}

	// async getById(id: string): Promise<MonthlyReport> {
	// 	return this.db.get(id);
	// }

	// async remove(id: string, rev: string): Promise<PouchDB.Core.Response> {
	// 	return this.db.remove(id, rev);
	// }
}
