"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import CatalogPage from "./components/CatalogPage";
import ContactPage from "./components/ContactPage";
import AdminPage from "./components/AdminPage";
import ProductModal from "./components/ProductModal";
import CartSidebar from "./components/CartSidebar";
import { productService, cartService } from "../lib/supabase";

export default function UrbLiftCatalog() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState("landing");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStyleTag, setSelectedStyleTag] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    style_tag: "wildstyle",
    main_image_url: "",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [],
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const ADMIN_PASSWORD = "urblift2024";

  // Verificar hash para acceso admin y parámetros de producto
  useEffect(() => {
    if (window.location.hash === "#admin") {
      setCurrentPage("admin");
    }

    // Verificar si hay un producto en la URL
    const productId = searchParams.get("product");
    if (productId && products.length > 0) {
      const product = products.find((p) => p.id === productId);
      if (product) {
        setSelectedProduct(product);
        setCurrentPage("catalog");
        // Limpiar la URL después de abrir el modal
        setTimeout(() => {
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
        }, 100);
      }
    }
  }, [searchParams, products]);

  // Generar ID único para el carrito si no existe
  const [cartId, setCartId] = useState(() => {
    if (typeof window !== "undefined") {
      let id = localStorage.getItem("urblift_cart_id");
      if (!id) {
        id = `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem("urblift_cart_id", id);
      }
      return id;
    }
    return null;
  });

  // Cargar productos desde Supabase
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await productService.getAllProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error loading products:", error);
        // Fallback a datos locales si falla Supabase
        try {
          const stored = localStorage.getItem("urblift_products");
          if (stored) {
            setProducts(JSON.parse(stored));
          }
        } catch (fallbackError) {
          console.error("Fallback error:", fallbackError);
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Cargar carrito desde Supabase
  useEffect(() => {
    const loadCart = async () => {
      if (!cartId) return;
      try {
        const cartItems = await cartService.getCartItems(cartId);
        setCart(cartItems);
      } catch (error) {
        console.error("Error loading cart:", error);
        // Fallback a localStorage
        try {
          const stored = localStorage.getItem("urblift_cart");
          if (stored) setCart(JSON.parse(stored));
        } catch (fallbackError) {
          console.error("Fallback error:", fallbackError);
        }
      }
    };
    loadCart();
  }, [cartId]);

  const saveCart = async (newCart) => {
    try {
      // For now, keep localStorage as backup, but in future could sync to Supabase
      localStorage.setItem("urblift_cart", JSON.stringify(newCart));
      setCart(newCart);
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  };

  const saveProducts = async (newProducts) => {
    try {
      // For admin operations, we still use localStorage for now
      // In a full implementation, this would sync with Supabase
      localStorage.setItem("urblift_products", JSON.stringify(newProducts));
      setProducts(newProducts);
    } catch (error) {
      console.error("Error saving products:", error);
    }
  };

  const addToCart = (product) => {
    const cartId =
      product.cartId || `${product.id}-${product.selectedSize || "M"}`;
    const existingItem = cart.find((item) => item.cartId === cartId);

    let newCart;
    if (existingItem) {
      newCart = cart.map((item) =>
        item.cartId === cartId
          ? { ...item, quantity: item.quantity + (product.quantity || 1) }
          : item
      );
    } else {
      newCart = [
        ...cart,
        {
          ...product,
          cartId,
          selectedSize: product.selectedSize || "M",
          quantity: product.quantity || 1,
        },
      ];
    }

    setCart(newCart);
    saveCart(newCart);

    // Feedback visual
    alert(
      `✓ ${product.name} (Talla ${
        product.selectedSize || "M"
      }) agregado al carrito`
    );
  };

  const updateQuantity = (cartId, change) => {
    const newCart = cart
      .map((item) => {
        if (item.cartId === cartId) {
          const newQuantity = Math.max(0, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    setCart(newCart);
    saveCart(newCart);
  };

  const removeFromCart = (cartId) => {
    const newCart = cart.filter((item) => item.cartId !== cartId);
    setCart(newCart);
    saveCart(newCart);
  };

  const calculateTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const sendWhatsAppOrder = () => {
    const orderText = cart
      .map(
        (item) =>
          `${item.name} talla ${item.selectedSize}, cantidad ${
            item.quantity
          } - $${(item.price * item.quantity).toFixed(2)}`
      )
      .join(", ");

    const message = `Hola! Quiero hacer un pedido de: ${orderText}. Total: $${calculateTotal()}. ¿Podemos proceder?`;
    const whatsappUrl = `https://wa.me/18295237077?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const sendContactForm = () => {
    const message = `Hola! Soy ${contactForm.name}, mi email es ${contactForm.email}. ${contactForm.message}`;
    window.open(
      `https://wa.me/18295237077?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    setContactForm({ name: "", email: "", message: "" });
  };

  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setCurrentPage("admin");
      setAdminPassword("");
    } else {
      alert("Contraseña incorrecta");
    }
  };

  const createProduct = async () => {
    if (!newProduct.name || !newProduct.price) {
      alert("Nombre y precio son requeridos");
      return;
    }

    try {
      const productData = {
        id: Date.now().toString(),
        name: newProduct.name,
        description: newProduct.description,
        price: parseFloat(newProduct.price),
        old_price: newProduct.old_price
          ? parseFloat(newProduct.old_price)
          : null,
        is_available: true,
        is_new: newProduct.is_new || false,
        main_image_url: newProduct.main_image_url,
        style_tag: newProduct.style_tag,
        sizes: newProduct.sizes,
        images: newProduct.images.filter((url) => url.trim() !== ""), // Filter out empty URLs
      };

      const createdProduct = await productService.createProduct(productData);
      setProducts([...products, createdProduct]);

      setNewProduct({
        name: "",
        description: "",
        price: "",
        style_tag: "wildstyle",
        main_image_url: "",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        images: [],
      });

      alert("Producto creado exitosamente");
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Error al crear el producto");
    }
  };

  const updateProduct = async () => {
    if (!editingProduct.name || !editingProduct.price) {
      alert("Nombre y precio son requeridos");
      return;
    }

    try {
      const productData = {
        name: editingProduct.name,
        description: editingProduct.description,
        price: parseFloat(editingProduct.price),
        old_price: editingProduct.old_price
          ? parseFloat(editingProduct.old_price)
          : null,
        is_available: editingProduct.is_available,
        is_new: editingProduct.is_new || false,
        main_image_url: editingProduct.main_image_url,
        style_tag: editingProduct.style_tag,
        sizes: editingProduct.sizes,
        images: editingProduct.images.filter((url) => url.trim() !== ""), // Filter out empty URLs
      };

      await productService.updateProduct(editingProduct.id, productData);

      setProducts(
        products.map((p) =>
          p.id === editingProduct.id ? { ...p, ...productData } : p
        )
      );

      setEditingProduct(null);

      alert("Producto actualizado exitosamente");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error al actualizar el producto");
    }
  };

  const cancelEditing = () => {
    setEditingProduct(null);
  };

  const deleteProduct = async (productId) => {
    if (!confirm("¿Eliminar este producto?")) return;

    try {
      await productService.deleteProduct(productId);
      setProducts(products.filter((p) => p.id !== productId));
      alert("Producto eliminado exitosamente");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error al eliminar el producto");
    }
  };

  const toggleProductAvailability = async (productId) => {
    try {
      const product = products.find((p) => p.id === productId);
      if (!product) return;

      await productService.updateProduct(productId, {
        is_available: !product.is_available,
      });

      setProducts(
        products.map((p) =>
          p.id === productId ? { ...p, is_available: !p.is_available } : p
        )
      );
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error al actualizar el producto");
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStyle =
      selectedStyleTag === "all" || product.style_tag === selectedStyleTag;
    return matchesSearch && matchesStyle && product.is_available;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center gap-0">
        <img
          src="/Logo.svg"
          alt="URBLIFT Logo"
          className="w-85 h-85 animate-bounce m-0"
        />
        <div className="text-[#FF5722] text-6xl font-black animate-pulse -mt-4">
          URBLIFT
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        isAdmin={isAdmin}
      />

      {currentPage === "landing" && (
        <>
          <LandingPage setCurrentPage={setCurrentPage} />
          <Footer />
        </>
      )}

      {currentPage === "catalog" && (
        <>
          <CatalogPage
            products={filteredProducts}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedStyleTag={selectedStyleTag}
            setSelectedStyleTag={setSelectedStyleTag}
            onSelectProduct={setSelectedProduct}
            onAddToCart={addToCart}
          />
          <Footer />
        </>
      )}

      {currentPage === "contact" && (
        <>
          <ContactPage
            contactForm={contactForm}
            setContactForm={setContactForm}
            sendContactForm={sendContactForm}
          />
          <Footer />
        </>
      )}

      {currentPage === "admin" && (
        <AdminPage
          isAdmin={isAdmin}
          adminPassword={adminPassword}
          setAdminPassword={setAdminPassword}
          handleAdminLogin={handleAdminLogin}
          products={products}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          createProduct={createProduct}
          deleteProduct={deleteProduct}
          toggleProductAvailability={toggleProductAvailability}
          editingProduct={editingProduct}
          setEditingProduct={setEditingProduct}
          updateProduct={updateProduct}
          cancelEditing={cancelEditing}
        />
      )}

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        calculateTotal={calculateTotal}
        sendWhatsAppOrder={sendWhatsAppOrder}
      />
    </div>
  );
}
