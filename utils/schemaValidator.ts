import Ajv, { JSONSchemaType } from "ajv";
import {expect} from '@playwright/test';

export class SchemaValidator {
  private ajv;

  constructor() {
    this.ajv = new Ajv({ allErrors: true }); // shows all errors
  }

  validate(schema: any, data: any) {
    const validate = this.ajv.compile(schema);
    const isValid = validate(data);

    if (!isValid) {
      console.error("Schema Validation Errors:", validate.errors);
    }

    expect(isValid).toBe(true); 
  }
}