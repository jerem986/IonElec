import { Injectable } from '@angular/core';
import { PouchDbService } from '../pouch-db.service';

@Injectable({
	providedIn: 'root',
})
export class DataRepository {
	public constructor(private dbService: PouchDbService<any>) {}

	public async exportDb(): Promise<void> {
		try {
			const allDocuments = await this.dbService.getAllwithoutWhereParams();
			const groupedByType: Record<string, any[]> = {};
			allDocuments.forEach((doc: any) => {
				const type = doc.type || 'unknown';
				if (!groupedByType[type]) {
					groupedByType[type] = [];
				}
				groupedByType[type].push(doc);
			});

			for (const [type, documents] of Object.entries(groupedByType)) {
				const fileName = `${type.toLowerCase().replace(/ /g, '-')}.json`;
				const jsonBlob = new Blob([JSON.stringify(documents, null, 2)], { type: 'application/json' });
				const url = URL.createObjectURL(jsonBlob);

				// Télécharge le fichier JSON
				const a = document.createElement('a');
				a.href = url;
				a.download = fileName;
				a.click();
				URL.revokeObjectURL(url);
				console.log(`✅ Fichier exporté avec succès: ${fileName}`);
			}
		} catch (error) {
			console.error(`❌ Erreur lors de l'export des données :`, error);
			throw error;
		}
	}
}
