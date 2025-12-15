import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const productService = {
  async getAllProducts() {
    const { data, error } = await supabase
      .from("products")
      .select(
        `
        id, name, description, price, old_price, is_available, is_new, main_image_url, style_tag, sizes, created_at, updated_at,
        product_images (id, product_id, image_url, sort_order, created_at)
      `
      )
      .eq("is_available", true)
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Transform data to match the expected format
    return data.map((product) => ({
      ...product,
      images: product.product_images?.map((img) => img.image_url) || [],
    }));
  },

  async createProduct(productData) {
    // Extract images from productData before inserting into products table
    const { images, ...productDataWithoutImages } = productData;

    const { data, error } = await supabase
      .from("products")
      .insert([productDataWithoutImages])
      .select()
      .single();

    if (error) throw error;

    // Insert images if provided
    if (images && images.length > 0) {
      const imagesToInsert = images.map((url, index) => ({
        product_id: data.id,
        image_url: url,
        sort_order: index + 1,
      }));

      const { error: imageError } = await supabase
        .from("product_images")
        .insert(imagesToInsert);

      if (imageError) throw imageError;
    }

    return data;
  },

  async updateProduct(productId, updates) {
    // Extract images from updates before updating products table
    const { images, ...updatesWithoutImages } = updates;

    const { data, error } = await supabase
      .from("products")
      .update(updatesWithoutImages)
      .eq("id", productId)
      .select()
      .single();

    if (error) throw error;

    // Update images if provided
    if (images !== undefined) {
      // Delete existing images
      const { error: deleteError } = await supabase
        .from("product_images")
        .delete()
        .eq("product_id", productId);

      if (deleteError) throw deleteError;

      // Insert new images if any
      if (images.length > 0) {
        const imagesToInsert = images.map((url, index) => ({
          product_id: productId,
          image_url: url,
          sort_order: index + 1,
        }));

        const { error: insertError } = await supabase
          .from("product_images")
          .insert(imagesToInsert);

        if (insertError) throw insertError;
      }
    }

    return data;
  },

  async deleteProduct(productId) {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);

    if (error) throw error;
  },
};

export const cartService = {
  async getCartItems(cartId) {
    const { data, error } = await supabase
      .from("cart_items")
      .select(
        `
        *,
        products (*)
      `
      )
      .eq("cart_id", cartId);

    if (error) throw error;

    // Transform to match expected cart format
    return data.map((item) => ({
      ...item.products,
      cartId: item.id,
      selectedSize: item.selected_size,
      quantity: item.quantity,
    }));
  },

  async addToCart(cartId, productId, selectedSize = "M", quantity = 1) {
    const { data, error } = await supabase
      .from("cart_items")
      .insert([
        {
          cart_id: cartId,
          product_id: productId,
          selected_size: selectedSize,
          quantity: quantity,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateCartItem(cartItemId, updates) {
    const { data, error } = await supabase
      .from("cart_items")
      .update(updates)
      .eq("id", cartItemId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async removeFromCart(cartItemId) {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", cartItemId);

    if (error) throw error;
  },

  async clearCart(cartId) {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("cart_id", cartId);

    if (error) throw error;
  },
};
