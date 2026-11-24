// Öffentliche Schnittstelle des Gruppen-Subsystems.
// Andere Subsysteme importieren nur, was hier exportiert wird.
export { GruppenService } from './gruppen-service.ts'
export { MitgliederService } from './mitglieder-service.ts'
export { Tabelle } from './tabelle.ts'
export * from './model.ts'
