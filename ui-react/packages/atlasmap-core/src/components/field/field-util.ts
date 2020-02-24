import { ConfigModel } from '../../models/config.model';
import { Field } from '../../models/field.model';

export function createConstant(constValue: string, constType: string): void {
  const cfg = ConfigModel.getConfig();
  let field = cfg.constantDoc.getField(constValue);
  field = (!field) ? new Field() : field.copy();
  field.name = constValue;
  field.value = constValue;
  field.type = constType;
  field.docDef = cfg.constantDoc;
  field.userCreated = true;
  cfg.constantDoc.addField(field);
  cfg.mappingService.notifyMappingUpdated();
}

export function createProperty(propName: string, propValue: string, propType: string): void {
  const cfg = ConfigModel.getConfig();
  let field = cfg.propertyDoc.getField(propName);
  field = (!field) ? new Field() : field.copy();
  field.name = propName;
  field.value = propValue;
  field.type = propType;
  field.docDef = cfg.propertyDoc;
  field.userCreated = true;
  cfg.propertyDoc.addField(field);
  cfg.mappingService.notifyMappingUpdated();
}

/**
 * Create a new mapping using the specified source and target IDs.
 *
 * @param source
 * @param target
 */
export function createMapping(source: Field, target: Field): void {
  const cfg = ConfigModel.getConfig();
  cfg.mappingService.addNewMapping(source, false);
  addToCurrentMapping(target);
}

/**
 * Add the specified field to the current mapping.
 *
 * @param field
 */
export function addToCurrentMapping(field: Field): void {
  const cfg = ConfigModel.getConfig();
  cfg.mappingService.fieldSelected(field);
}

/**
 * Return the Field object associated with the specified UUID in the specified document.
 *
 * @param docName
 * @param cfg
 * @param isSource
 * @param uuid
 */
export function getFieldByUUID(docName: string, cfg: ConfigModel, isSource: boolean,
  uuid: string): Field | undefined
{
  const docDef = cfg.getDocForIdentifier(docName, isSource);
  if (docDef === null) {
    return;
  }
  for (const field of docDef.getAllFields()) {
    if (field.uuid === uuid) {
      return field;
    }
  }
  return undefined;
}