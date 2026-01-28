"use client";

import React, { useState, useEffect, Suspense } from "react";
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

function UrbLiftCatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState("landing");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStyleTag, setSelectedStyleTag] = useState("all");
  const [isLoading, setIsLoading] = useState(true); // ✅ Vuelve a true para mostrar loader inmediatamente
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

  // Estados del loader
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [colorReady, setColorReady] = useState(false); // ✅ Nuevo estado

  // Colores de la marca
  const brandColors = [
    {
      primary: "#FF5722", // Naranja
      shadow: "rgba(255, 87, 34, 0.5)",
      gradient: ["#FF5722", "#ff8a50"],
    },
    {
      primary: "#00C853", // Verde intenso
      shadow: "rgba(0, 200, 83, 0.5)",
      gradient: ["#00C853", "#00E676"],
    },
    {
      primary: "#2196F3", // Azul
      shadow: "rgba(33, 150, 243, 0.5)",
      gradient: ["#2196F3", "#42A5F5"],
    },
  ];

  const [currentColor, setCurrentColor] = useState(brandColors[0]); // ✅ Inicia con el primer color (sin random)

  const phrases = [
    "Preparando tu experiencia urbana...",
    "Conectando con la ciudad...",
    "Cargando eventos exclusivos...",
    "Construyendo tu comunidad...",
    "Activando el modo URBLIFT...",
  ];

  const ADMIN_PASSWORD = "urblift2024";

  // Selecciona un color aleatorio solo en el cliente
  useEffect(() => {
    setIsClient(true);
    setIsMounted(true);
    // ✅ Seleccionar color aleatorio SOLO en el cliente (después de montar)
    const randomColor =
      brandColors[Math.floor(Math.random() * brandColors.length)];
    setCurrentColor(randomColor);
    setColorReady(true); // ✅ Marcar que el color está listo
  }, []);

  // Rotación de frases
  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isLoading]);

  // ✅ CORRECCIÓN: Efecto para manejar el fade out
  useEffect(() => {
    if (!isLoading) {
      // Cuando termina de cargar, activar fade out inmediatamente
      setIsFadingOut(true);

      // Después del fade out, desactivarlo
      const timer = setTimeout(() => {
        setIsFadingOut(false);
      }, 700); // Duración del fade out (igual a la transición CSS)

      return () => clearTimeout(timer);
    } else {
      // Si vuelve a cargar, resetear fade out
      setIsFadingOut(false);
    }
  }, [isLoading]);

  // Verificar hash para acceso admin y parámetros de producto
  useEffect(() => {
    if (window.location.hash === "#admin") {
      setCurrentPage("admin");
    }

    const productId = searchParams.get("product");
    if (productId && products.length > 0) {
      const product = products.find((p) => p.id === productId);
      if (product) {
        setSelectedProduct(product);
        setCurrentPage("catalog");
        setTimeout(() => {
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname,
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
        try {
          const stored = localStorage.getItem("urblift_products");
          if (stored) {
            setProducts(JSON.parse(stored));
          }
        } catch (fallbackError) {
          console.error("Fallback error:", fallbackError);
        }
      } finally {
        // ✅ Solo desactivar loading si ya estamos montados en el cliente
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    // ✅ Solo cargar productos cuando el componente esté montado
    if (isMounted) {
      loadProducts();
    }
  }, [isMounted]);

  // Cargar carrito desde Supabase
  useEffect(() => {
    const loadCart = async () => {
      if (!cartId) return;
      try {
        const cartItems = await cartService.getCartItems(cartId);
        setCart(cartItems);
      } catch (error) {
        console.error("Error loading cart:", error);
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
      localStorage.setItem("urblift_cart", JSON.stringify(newCart));
      setCart(newCart);
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  };

  const saveProducts = async (newProducts) => {
    try {
      localStorage.setItem("urblift_products", JSON.stringify(newProducts));
      setProducts(newProducts);
    } catch (error) {
      console.error("Error saving products:", error);
    }
  };

  const addToCart = async (product) => {
    const cartId =
      product.cartId || `${product.id}-${product.selectedSize || "M"}`;
    const existingItem = cart.find((item) => item.cartId === cartId);

    let newCart;
    if (existingItem) {
      newCart = cart.map((item) =>
        item.cartId === cartId
          ? { ...item, quantity: item.quantity + (product.quantity || 1) }
          : item,
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

    const Swal = (await import("sweetalert2")).default;
    Swal.fire({
      title: "¡Producto agregado!",
      text: `${product.name} (Talla ${
        product.selectedSize || "M"
      }) ha sido agregado al carrito`,
      icon: "success",
      background: "#1a1a1a",
      color: "#ffffff",
      confirmButtonColor: "#FF5722",
      confirmButtonText: "¡Perfecto!",
      timer: 2000,
      timerProgressBar: true,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
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
          } - $${(item.price * item.quantity).toFixed(2)}`,
      )
      .join(", ");

    const message = `Hola! Quiero hacer un pedido de: ${orderText}. Total: $${calculateTotal()}. ¿Podemos proceder?`;
    const whatsappUrl = `https://wa.me/18295237077?text=${encodeURIComponent(
      message,
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const sendContactForm = () => {
    const message = `Hola! Soy ${contactForm.name}, mi email es ${contactForm.email}. ${contactForm.message}`;
    window.open(
      `https://wa.me/18295237077?text=${encodeURIComponent(message)}`,
      "_blank",
    );
    setContactForm({ name: "", email: "", message: "" });
  };

  const handleAdminLogin = async () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setCurrentPage("admin");
      setAdminPassword("");
    } else {
      const Swal = (await import("sweetalert2")).default;
      Swal.fire({
        title: "Error",
        text: "Contraseña incorrecta",
        icon: "error",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonColor: "#FF5722",
      });
    }
  };

  const createProduct = async () => {
    if (!newProduct.name || !newProduct.price) {
      const Swal = (await import("sweetalert2")).default;
      Swal.fire({
        title: "Error",
        text: "Nombre y precio son requeridos",
        icon: "error",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonColor: "#FF5722",
      });
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
        images: newProduct.images.filter((url) => url.trim() !== ""),
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

      const Swal = (await import("sweetalert2")).default;
      Swal.fire({
        title: "¡Éxito!",
        text: "Producto creado exitosamente",
        icon: "success",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonColor: "#FF5722",
        confirmButtonText: "¡Perfecto!",
        timer: 2000,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error("Error creating product:", error);
      const Swal = (await import("sweetalert2")).default;
      Swal.fire({
        title: "Error",
        text: "Error al crear el producto",
        icon: "error",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonColor: "#FF5722",
      });
    }
  };

  const updateProduct = async () => {
    if (!editingProduct.name || !editingProduct.price) {
      const Swal = (await import("sweetalert2")).default;
      Swal.fire({
        title: "Error",
        text: "Nombre y precio son requeridos",
        icon: "error",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonColor: "#FF5722",
      });
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
        images: editingProduct.images.filter((url) => url.trim() !== ""),
      };

      await productService.updateProduct(editingProduct.id, productData);

      setProducts(
        products.map((p) =>
          p.id === editingProduct.id ? { ...p, ...productData } : p,
        ),
      );

      setEditingProduct(null);

      const Swal = (await import("sweetalert2")).default;
      Swal.fire({
        title: "¡Éxito!",
        text: "Producto actualizado exitosamente",
        icon: "success",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonColor: "#FF5722",
        confirmButtonText: "¡Perfecto!",
        timer: 2000,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      const Swal = (await import("sweetalert2")).default;
      Swal.fire({
        title: "Error",
        text: "Error al actualizar el producto",
        icon: "error",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonColor: "#FF5722",
      });
    }
  };

  const cancelEditing = () => {
    setEditingProduct(null);
  };

  const deleteProduct = async (productId) => {
    const Swal = (await import("sweetalert2")).default;
    const result = await Swal.fire({
      title: "¿Eliminar este producto?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      background: "#1a1a1a",
      color: "#ffffff",
      confirmButtonColor: "#FF5722",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      cancelButtonColor: "#6c757d",
    });

    if (!result.isConfirmed) return;

    try {
      await productService.deleteProduct(productId);
      setProducts(products.filter((p) => p.id !== productId));
      Swal.fire({
        title: "¡Eliminado!",
        text: "Producto eliminado exitosamente",
        icon: "success",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonColor: "#FF5722",
        confirmButtonText: "¡Perfecto!",
        timer: 2000,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire({
        title: "Error",
        text: "Error al eliminar el producto",
        icon: "error",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonColor: "#FF5722",
      });
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
          p.id === productId ? { ...p, is_available: !p.is_available } : p,
        ),
      );
    } catch (error) {
      console.error("Error updating product:", error);
      const Swal = (await import("sweetalert2")).default;
      Swal.fire({
        title: "Error",
        text: "Error al actualizar el producto",
        icon: "error",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonColor: "#FF5722",
      });
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

  // ✅ LOADER ANIMADO - Visible mientras carga O durante el fade out
  if (isLoading || isFadingOut) {
    return (
      <div
        className={`min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A] flex flex-col items-center justify-center gap-8 relative overflow-hidden transition-opacity duration-700 ${
          !isLoading && isFadingOut ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-20 left-20 w-64 h-64 rounded-full blur-[100px] animate-pulse"
            style={{ backgroundColor: currentColor.primary }}
          ></div>
          <div
            className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-[120px] animate-pulse delay-700"
            style={{ backgroundColor: currentColor.primary }}
          ></div>
        </div>

        {/* Logo Container */}
        <div
          className={`relative z-10 flex flex-col items-center gap-6 transition-all duration-700 ${
            !isLoading && isFadingOut ? "scale-95 blur-sm" : "scale-100 blur-0"
          }`}
        >
          {/* Logo with glow effect */}
          <div className="relative group">
            <div
              className="absolute inset-0 blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-pulse"
              style={{ backgroundColor: currentColor.primary }}
            ></div>
            <img
              src="/Logo.svg"
              alt="URBLIFT Logo"
              className="w-32 h-32 relative z-10"
              style={{
                filter: `drop-shadow(0 0 25px ${currentColor.shadow})`,
              }}
            />
          </div>

          {/* Brand Name with Boomster font */}
          <div className="relative">
            <h1
              className="text-7xl md:text-8xl font-black tracking-wider relative z-10"
              style={{
                fontFamily: "var(--font-boomster)",
                color: currentColor.primary,
                textShadow: `
                0 0 10px ${currentColor.shadow},
                0 0 20px ${currentColor.shadow.replace("0.5", "0.3")},
                0 0 30px ${currentColor.shadow.replace("0.5", "0.2")},
                4px 4px 0px #000000,
                5px 5px 0px ${currentColor.shadow.replace("0.5", "0.3")}
              `,
              }}
            >
              URBLIFT
            </h1>
            {/* Animated underline */}
            <div
              className="h-1 animate-shimmer mt-2"
              style={{
                background: `linear-gradient(to right, transparent, ${currentColor.primary}, transparent)`,
              }}
            ></div>
          </div>

          {/* Loading text */}
          <div className="flex items-center gap-3 mt-4">
            <p className="text-white text-lg font-medium tracking-widest animate-pulse">
              CARGANDO
            </p>
            <div className="flex gap-1">
              <span
                className="w-2 h-2 rounded-full animate-bounce"
                style={{ backgroundColor: currentColor.primary }}
              ></span>
              <span
                className="w-2 h-2 rounded-full animate-bounce delay-100"
                style={{ backgroundColor: currentColor.primary }}
              ></span>
              <span
                className="w-2 h-2 rounded-full animate-bounce delay-200"
                style={{ backgroundColor: currentColor.primary }}
              ></span>
            </div>
          </div>

          {/* Rotating phrases with fade effect */}
          <div className="relative h-8 mt-4 overflow-hidden w-80">
            <p
              key={phraseIndex}
              className="text-gray-400 text-base font-light tracking-wide text-center absolute w-full animate-fadeInOut"
              style={{
                textShadow: `0 0 10px ${currentColor.shadow.replace("0.5", "0.3")}`,
              }}
            >
              {phrases[phraseIndex]}
            </p>
          </div>
        </div>

        {/* Urban style corner decorations */}
        <div
          className={`absolute top-8 left-8 w-16 h-16 border-l-4 border-t-4 opacity-30 transition-all duration-700 ${
            !isLoading && isFadingOut
              ? "opacity-0 -translate-x-4 -translate-y-4"
              : ""
          }`}
          style={{ borderColor: currentColor.primary }}
        ></div>
        <div
          className={`absolute top-8 right-8 w-16 h-16 border-r-4 border-t-4 opacity-30 transition-all duration-700 ${
            !isLoading && isFadingOut
              ? "opacity-0 translate-x-4 -translate-y-4"
              : ""
          }`}
          style={{ borderColor: currentColor.primary }}
        ></div>
        <div
          className={`absolute bottom-8 left-8 w-16 h-16 border-l-4 border-b-4 opacity-30 transition-all duration-700 ${
            !isLoading && isFadingOut
              ? "opacity-0 -translate-x-4 translate-y-4"
              : ""
          }`}
          style={{ borderColor: currentColor.primary }}
        ></div>
        <div
          className={`absolute bottom-8 right-8 w-16 h-16 border-r-4 border-b-4 opacity-30 transition-all duration-700 ${
            !isLoading && isFadingOut
              ? "opacity-0 translate-x-4 translate-y-4"
              : ""
          }`}
          style={{ borderColor: currentColor.primary }}
        ></div>
      </div>
    );
  }

  // ✅ CONTENIDO PRINCIPAL - después del loader
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        isAdmin={isAdmin}
      />

      {currentPage === "landing" && (
        <LandingPage setCurrentPage={setCurrentPage} />
      )}

      {currentPage === "catalog" && (
        <CatalogPage
          products={filteredProducts}
          setSelectedProduct={setSelectedProduct}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedStyleTag={selectedStyleTag}
          setSelectedStyleTag={setSelectedStyleTag}
        />
      )}

      {currentPage === "contact" && (
        <ContactPage
          contactForm={contactForm}
          setContactForm={setContactForm}
          sendContactForm={sendContactForm}
        />
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
          editingProduct={editingProduct}
          setEditingProduct={setEditingProduct}
          updateProduct={updateProduct}
          cancelEditing={cancelEditing}
          deleteProduct={deleteProduct}
          toggleProductAvailability={toggleProductAvailability}
        />
      )}

      <Footer setCurrentPage={setCurrentPage} />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          addToCart={addToCart}
        />
      )}

      <CartSidebar
        cart={cart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        calculateTotal={calculateTotal}
        sendWhatsAppOrder={sendWhatsAppOrder}
      />
    </div>
  );
}

export default function UrbLiftCatalog() {
  return (
    <Suspense
      fallback={
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
      }
    >
      <UrbLiftCatalogContent />
    </Suspense>
  );
}
