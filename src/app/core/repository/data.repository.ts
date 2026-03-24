import { Injectable } from '@angular/core';
import { PouchDbService } from '../pouch-db.service';

@Injectable({
	providedIn: 'root',
})
export class DataRepository {
	public constructor(private dbService: PouchDbService<any>) {}

	public async exportDb(): Promise<Record<string, any[]>> {
		try {
			const allDocuments = await this.dbService.getAll();
			const groupedByType: Record<string, any[]> = {};
			allDocuments.forEach((doc: any) => {
				const type = doc.type || 'unknown';
				if (!groupedByType[type]) {
					groupedByType[type] = [];
				}
				groupedByType[type].push(doc);
			});
			return groupedByType;
		} catch (error) {
			console.error(`❌ Erreur lors de l'export des données :`, error);
			throw error;
		}
	}
}
