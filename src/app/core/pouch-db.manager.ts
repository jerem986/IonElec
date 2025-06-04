import { Injectable } from '@angular/core';
import { ModelBase } from '@shared/model/model-base';
import { PouchDbService } from './pouch-db.service';

@Injectable({
	providedIn: 'root',
})
export class PouchDbManager<T> {
	private dbService: PouchDbService<any>;

	public constructor() {
		this.dbService = new PouchDbService<any>();
	}

	public async create(document: T): Promise<boolean> {
		return await this.dbService.create(document);
	}

	public async replace(document: T & ModelBase): Promise<boolean> {
		return await this.dbService.replace(document);
	}

	public async delete(id: string, rev: string): Promise<boolean> {
		return await this.dbService.delete(id, rev);
	}
}
