import { Command } from 'commander';
import * as dateFns from 'date-fns';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const program = new Command();
const MDX_DIR = path.join(process.cwd(), 'content/calendar-events');

// Ensure events directory exists
if (!fs.existsSync(MDX_DIR)) {
    fs.mkdirSync(MDX_DIR);
}

// cli add --date <date> --title <title> --time <time> --location [location] --description [description]
// cli list --date <date>
// cli get <index> --date <date>
// cli delete <index> --date <date>

function formatDate(date: Date) {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}

// Get events by date or month
program
    .command('list')
    .option('-d, --date <date>', 'Day to filter events', dateFns.formatDate(new Date(), 'yyyy-MM-dd'))
    .description('list events by date')
    .action((args) => {
        const dateStr = dateFns.formatDate(dateFns.parse(args.date, 'yyyy-MM-dd', new Date()), 'yyyy-MM-dd');
        console.log(dateStr);

        const filePath = path.join(MDX_DIR, `${dateStr}.mdx`);
        if (!fs.existsSync(filePath)) {
            console.error(`No event found for ${dateStr}.`);
            return;
        }
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const parsed = matter(fileContent);
        console.log(JSON.stringify(parsed.data, null, 4));
    });

program.parse(process.argv);

if (program.args.length === 0) {
    program.help();
}
