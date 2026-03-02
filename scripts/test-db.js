#!/usr/bin/env node

/**
 * Database Connection Test Script
 * Validates Supabase connectivity and all required tables
 * Story 1.1: AC #9
 */

const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../packages/backend/.env.local') });

const REQUIRED_TABLES = [
  'clientes',
  'questoes',
  'respostas',
  'scores',
  'decisoes',
  'aprovacoes',
  'sessoes',
  'cadernos',
  'blueprints',
  'checkins',
  'emails_enviados',
];

async function testConnection() {
  console.log('🔌 Testing Supabase Connection...\n');

  try {
    // Validate environment variables
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      console.error('❌ Missing SUPABASE_URL or SUPABASE_ANON_KEY in .env.local');
      process.exit(1);
    }

    console.log(`✅ Environment variables loaded`);
    console.log(`   URL: ${process.env.SUPABASE_URL.substring(0, 30)}...`);
    console.log(`   Key: ${process.env.SUPABASE_ANON_KEY.substring(0, 20)}...\n`);

    // Create Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );

    console.log('🔍 Checking tables...\n');

    // Test each table
    let allTablesExist = true;
    for (const table of REQUIRED_TABLES) {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1);

      if (error && error.code === '42P01') {
        // Table does not exist
        console.log(`❌ Table "${table}" - NOT FOUND`);
        allTablesExist = false;
      } else if (error) {
        console.log(`⚠️  Table "${table}" - Error: ${error.message}`);
      } else {
        console.log(`✅ Table "${table}" - OK`);
      }
    }

    console.log('\n' + '='.repeat(50));
    if (allTablesExist) {
      console.log('✅ All required tables exist and are accessible!');
      console.log('✅ Database is ready for development.');
      process.exit(0);
    } else {
      console.log('❌ Some tables are missing.');
      console.log('   Run: supabase db push');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Connection failed:');
    console.error(error.message);
    process.exit(1);
  }
}

testConnection();
