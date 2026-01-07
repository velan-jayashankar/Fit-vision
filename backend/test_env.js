const dotenv = require('dotenv');
const result = dotenv.config();

if (result.error) {
    console.log('dotenv error:', result.error);
}

console.log('Parsed keys:', result.parsed ? Object.keys(result.parsed) : 'None');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'FOUND' : 'MISSING');
console.log('SUPABASE_KEY:', process.env.SUPABASE_KEY ? 'FOUND' : 'MISSING');
