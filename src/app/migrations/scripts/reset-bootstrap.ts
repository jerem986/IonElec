const fs = require('fs');
const path = require('path');

class DataExporter {
	private bootstrapDir: string;

	constructor() {
		this.bootstrapDir = path.join(__dirname, '../bootstrap');

		if (!fs.existsSync(this.bootstrapDir)) {
			fs.mkdirSync(this.bootstrapDir, { recursive: true });
			console.log(`📁 Dossier bootstrap créé: ${this.bootstrapDir}`);
		}
	}

	async exportAll(): Promise<void> {
		console.log('🚀 Export des données bootstrap...');
		console.log(`📂 Dossier de destination: ${this.bootstrapDir}`);

		try {
			// Crée un fichier vide pour commencer
			const filePath = path.join(this.bootstrapDir, 'monthly-report.model.json');
			fs.writeFileSync(filePath, JSON.stringify([], null, 2));

			console.log(`✅ Fichier créé: ${filePath}`);
			console.log('');
			console.log('🔧 Pour récupérer tes vraies données :');
			console.log('1. Ouvre ton app Angular (localhost:4200)');
			console.log('2. Ouvre la console (F12)');
			console.log('3. Va dans un composant qui utilise PouchDbService');
			console.log('4. Dans la console, tape :');
			console.log('');
			console.log('   // Injecte le service');
			console.log('   const service = ng.getComponent($0).constructor.prototype.pouchDbService;');
			console.log("   // Ou depuis n'importe où :");
			console.log('   service.exportForBootstrap();');
			console.log('');
			console.log('5. Copie le JSON affiché dans le fichier bootstrap');

			console.log('🎉 Structure bootstrap créée !');
		} catch (error) {
			console.error('💥 Erreur:', error);
			process.exit(1);
		}
	}
}

const exporter = new DataExporter();
exporter.exportAll().catch(console.error);
