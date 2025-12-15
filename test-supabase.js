// Test script to verify Supabase connection and categories table
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("Supabase URL:", supabaseUrl ? "Set" : "Not set");
console.log("Supabase Key:", supabaseAnonKey ? "Set" : "Not set");

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    console.log("Testing Supabase connection...");

    // Test basic connection
    const { data: tables, error: tablesError } = await supabase
      .from("categories")
      .select("*")
      .limit(1);

    if (tablesError) {
      console.error("Error accessing categories table:", tablesError);
      return;
    }

    console.log("Categories table exists. Data:", tables);

    // Test if we can get all categories
    const { data: allCategories, error: categoriesError } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: true });

    if (categoriesError) {
      console.error("Error fetching categories:", categoriesError);
      return;
    }

    console.log("All categories:", allCategories);
  } catch (error) {
    console.error("Unexpected error:", error);
  }
}

testConnection();
