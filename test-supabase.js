/**
 * Test Supabase Connection
 * Run: node test-supabase.js
 */

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://btxhaeslqhxcorvgicyl.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_pECz6hGQ_znXoAHs-mAtZA_5Oh668QZ";

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

async function testConnection() {
  console.log("🔍 Testing Supabase connection...\n");
  
  try {
    // Test categories table
    console.log("📋 Checking 'categories' table...");
    const { data: categories, error: catError } = await supabase
      .from("categories")
      .select("*")
      .limit(5);
    
    if (catError) {
      console.error("❌ Error fetching categories:", catError.message);
    } else if (categories && categories.length > 0) {
      console.log(`✅ Found ${categories.length} categories:`);
      categories.forEach(cat => console.log(`   - ${cat.name} (${cat.slug})`));
    } else {
      console.log("⚠️  No categories found in 'categories' table");
    }
    
    // Test products table
    console.log("\n📦 Checking 'products' table...");
    const { data: products, error: prodError } = await supabase
      .from("products")
      .select("*")
      .limit(5);
    
    if (prodError) {
      console.error("❌ Error fetching products:", prodError.message);
    } else if (products && products.length > 0) {
      console.log(`✅ Found ${products.length} products:`);
      products.forEach(prod => console.log(`   - ${prod.name} (${prod.category}/${prod.slug})`));
    } else {
      console.log("⚠️  No products found in 'products' table");
    }
    
    // List all tables
    console.log("\n📊 Available tables:");
    try {
      const { data: tables, error: tableError } = await supabase
        .from("information_schema.tables")
        .select("table_name")
        .eq("table_schema", "public");
      
      if (!tableError && tables) {
        tables.forEach(table => console.log(`   - ${table.table_name}`));
      }
    } catch (e) {
      console.log("   (Cannot list tables - may need PostgreSQL permissions)");
    }
    
    console.log("\n✅ Connection test complete!");
    
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
    console.log("\n💡 Check your .env.local file:");
    console.log("   NEXT_PUBLIC_SUPABASE_URL=" + supabaseUrl);
    console.log("   NEXT_PUBLIC_SUPABASE_ANON_KEY=" + supabaseAnonKey.substring(0, 10) + "...");
  }
}

testConnection();
