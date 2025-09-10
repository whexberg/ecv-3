import fs from 'fs';
import path from 'path';

const filePath = path.resolve('./node_modules/kysely-codegen/dist/db.d.ts');

let content = fs.readFileSync(filePath, 'utf8');
content = content.replaceAll(
    /Timestamp = ColumnType<Date, Date \| string, Date \| string>/g,
    'Timestamp = ColumnType<string, string, string>',
);

fs.writeFileSync(filePath, content);

console.log(`✅ Kysely types patched`);
