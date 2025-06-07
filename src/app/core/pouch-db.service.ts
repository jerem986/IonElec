import { Injectable } from '@angular/core';
import { ModelBase } from '@shared/model/model-base';
import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';

PouchDB.plugin(PouchFind);

@Injectable({
	providedIn: 'root',
})
export class PouchDbService<T> {
	private db: PouchDB.Database<T>;

	public constructor() {
		this.db = new PouchDB('ion-elec');
	}

	async create(document: T): Promise<boolean> {
		try {
			const response = await this.db.put(document);
			return response.ok;
		} catch (error) {
			console.error(`❌ Erreur lors de la création du document :`, error);
			throw error;
		}
	}

	public async replace(document: T & ModelBase): Promise<boolean> {
		try {
			const response = await this.db.put(document);
			return response.ok;
		} catch (error) {
			console.error(`❌ Erreur lors du remplacement du document :`, error);
			throw error;
		}
	}

	public async delete(id: string, rev: string): Promise<boolean> {
		try {
			const response = await this.db.remove(id, rev);
			return response.ok;
		} catch (error) {
			console.error(`❌ Erreur lors de la suppression du document :`, error);
			throw error;
		}
	}

	public async getById(id: string): Promise<T> {
		try {
			const document = await this.db.get(id);
			return document;
		} catch (error) {
			console.error(`❌ Erreur lors de la récupération du document :`, error);
			throw error;
		}
	}

	public async getAllwithoutWhereParams(): Promise<T[]> {
		try {
			const result = await this.db.allDocs({ include_docs: true });
			const documents = result.rows.map((row) => row.doc as T);
			return documents;
		} catch (error) {
			console.error(`❌ Erreur lors de la récupération des documents :`, error);
			throw error;
		}
	}

	public async getAll(selector: Record<string, any>): Promise<T[]> {
		try {
			const result = await this.db.find({ selector });
			return result.docs as T[];
		} catch (error) {
			console.error(`❌ Erreur lors de la récupération des documents filtrés :`, error);
			throw error;
		}
	}

	public async find(selector: Record<string, any>): Promise<T> {
		try {
			const result = await this.db.find({ selector });
			return result.docs.length > 0 ? (result.docs[0] as T) : null;
		} catch (error) {
			console.error(`❌ Erreur lors de la recherche des documents :`, error);
			throw error;
		}
	}
}
