const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const sqlPath = path.join(__dirname, 'healthbridge_schema.sql');
const outPath = path.join(__dirname, 'healthbridge_schema_hashed.sql');

if (!fs.existsSync(sqlPath)) {
  console.error('Source SQL file not found:', sqlPath);
  process.exit(1);
}

const src = fs.readFileSync(sqlPath, 'utf8');

// Map of plaintext -> target email to replace the password for that email row
const replacements = [
  { email: 'admin@healthbridge.gov', plain: 'admin123' },
  { email: 'citizen@example.com', plain: 'citizen123' }
];

let out = src;

replacements.forEach(r => {
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(r.plain, salt);

  // Replace the password value inside the tuple that contains the email
  const emailEscaped = r.email.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  const tupleRegex = new RegExp("(\(\s*'[^']*'\s*,\s*'" + emailEscaped + "'\s*,\s*)'[^']*'(\s*,\s*'[^']*'\s*\))", 'i');

  if (tupleRegex.test(out)) {
    out = out.replace(tupleRegex, `$1'${hash}'$2`);
  } else {
    // Fallback: replace the first occurrence of the plain password
    const plainRegex = new RegExp("'" + r.plain.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') + "'", 'i');
    out = out.replace(plainRegex, `'${hash}'`);
  }
});

fs.writeFileSync(outPath, out, 'utf8');
console.log('Wrote hashed SQL to', outPath);
