/** @type {import('next').NextConfig} */
import fs from 'fs';
const nextConfig = {};

// security checks for the version backup file
const VERSION_FILE = 'version-cache';

if (!fs.existsSync(VERSION_FILE)) {
  console.error('✘ Version backup file needs to be created!');
  process.exit(1);
} else {
  const version = fs.readFileSync(VERSION_FILE, { encoding: 'utf-8' });
  if (version.match(/"^\d+\.\d+\.\d+$/) === null) {
    console.error('✘ Version backup file is invalid');
    process.exit(1);
  }
}

export default nextConfig;
