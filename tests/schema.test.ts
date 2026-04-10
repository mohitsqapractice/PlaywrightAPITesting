import { test, expect } from '@playwright/test';
import { SchemaValidator } from '../utils/schemaValidator';
import { bookingSchema } from '../schemas/bookingSchema';

test('Schema validation',async({ request })=>{

      const resp = await request.get('https://restful-booker.herokuapp.com/booking/4');
         const data = await resp.json();
      console.log(data);
      const schemaValidation = new SchemaValidator();
      schemaValidation.validate(bookingSchema,data);
})