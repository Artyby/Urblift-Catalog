// "use client";
import { Trash2, Edit3, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { categoriesService } from "../../lib/supabase";

export default function AdminPage({
  isAdmin,
  adminPassword,
  setAdminPassword,
  handleAdminLogin,
  products,
  newProduct,
  setNewProduct,
  createProduct,
  deleteProduct,
  toggleProductAvailability,
  editingProduct,
  setEditingProduct,
  updateProduct,
  cancelEditing,
}) {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    id: "",
    name: "",
    icon: "",
  });

  // Load categories from Supabase on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await categoriesService.getAllCategories();
        // If no categories exist, create default ones
        if (data.length === 0) {
          const defaultCategories = [
            { id: "all", name: "Todos", icon: "🎨" },
            { id: "wildstyle", name: "Wildstyle", icon: "🎨" },
            { id: "throw-up", name: "Throw-up", icon: "🖌️" },
            { id: "tag", name: "Tag", icon: "🏷️" },
            { id: "piece", name: "Piece", icon: "🖼️" },
            { id: "abstracto", name: "Abstracto", icon: "🌌" },
          ];
          // Create default categories in Supabase
          for (const cat of defaultCategories) {
            await categoriesService.createCategory(cat);
          }
          setCategories(defaultCategories);
        } else {
          setCategories(data);
        }
      } catch (error) {
        console.error("Error loading categories:", error);
        // Fallback to default categories
        const defaultCategories = [
          { id: "all", name: "Todos", icon: "🎨" },
          { id: "wildstyle", name: "Wildstyle", icon: "🎨" },
          { id: "throw-up", name: "Throw-up", icon: "🖌️" },
          { id: "tag", name: "Tag", icon: "🏷️" },
          { id: "piece", name: "Piece", icon: "🖼️" },
          { id: "abstracto", name: "Abstracto", icon: "🌌" },
        ];
        setCategories(defaultCategories);
      }
    };
    loadCategories();
  }, []);

  const addCategory = async () => {
    if (!newCategory.id || !newCategory.name) {
      const Swal = (await import("sweetalert2")).default;
      Swal.fire({
        title: "Error",
        text: "ID y nombre son requeridos",
        icon: "error",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonColor: "#FF5722",
      });
      return;
    }
    try {
      await categoriesService.createCategory(newCategory);
      setCategories([...categories, newCategory]);
      setNewCategory({ id: "", name: "", icon: "" });
      const Swal = (await import("sweetalert2")).default;
      Swal.fire({
        title: "¡Éxito!",
        text: "Categoría creada exitosamente",
        icon: "success",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonColor: "#FF5722",
        confirmButtonText: "¡Perfecto!",
        timer: 2000,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error("Error creating category:", error);
      const Swal = (await import("sweetalert2")).default;
      Swal.fire({
        title: "Error",
        text: "Error al crear la categoría",
        icon: "error",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonColor: "#FF5722",
      });
    }
  };

  const updateCategory = async () => {
    if (!editingCategory.name) {
      const Swal = (await import("sweetalert2")).default;
      Swal.fire({
        title: "Error",
        text: "Nombre es requerido",
        icon: "error",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonColor: "#FF5722",
      });
      return;
    }
    try {
      await categoriesService.updateCategory(editingCategory.id, {
        name: editingCategory.name,
        icon: editingCategory.icon,
      });
      const updatedCategories = categories.map((cat) =>
        cat.id === editingCategory.id ? editingCategory : cat
      );
      setCategories(updatedCategories);
      setEditingCategory(null);
      const Swal = (await import("sweetalert2")).default;
      Swal.fire({
        title: "¡Éxito!",
        text: "Categoría actualizada exitosamente",
        icon: "success",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonColor: "#FF5722",
        confirmButtonText: "¡Perfecto!",
        timer: 2000,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error("Error updating category:", error);
      const Swal = (await import("sweetalert2")).default;
      Swal.fire({
        title: "Error",
        text: "Error al actualizar la categoría",
        icon: "error",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonColor: "#FF5722",
      });
    }
  };

  const deleteCategory = async (categoryId) => {
    const Swal = (await import("sweetalert2")).default;
    const result = await Swal.fire({
      title: "¿Eliminar esta categoría?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      background: "#1a1a1a",
      color: "#ffffff",
      confirmButtonColor: "#FF5722",
      confirmButtonText: "Sí, eliminar",
      cancelButtonColor: "#00BCD4",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
    });

    if (result.isConfirmed) {
      try {
        await categoriesService.deleteCategory(categoryId);
        const updatedCategories = categories.filter(
          (cat) => cat.id !== categoryId
        );
        setCategories(updatedCategories);
        Swal.fire({
          title: "¡Eliminado!",
          text: "La categoría ha sido eliminada exitosamente",
          icon: "success",
          background: "#1a1a1a",
          color: "#ffffff",
          confirmButtonColor: "#FF5722",
          confirmButtonText: "¡Perfecto!",
          timer: 2000,
          timerProgressBar: true,
        });
      } catch (error) {
        console.error("Error deleting category:", error);
        Swal.fire({
          title: "Error",
          text: "Error al eliminar la categoría",
          icon: "error",
          background: "#1a1a1a",
          color: "#ffffff",
          confirmButtonColor: "#FF5722",
        });
      }
    }
  };
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
        <div className="bg-white p-8 max-w-md w-full">
          <h2 className="text-4xl font-black text-[#0A0A0A] uppercase mb-6 text-center">
            ADMIN
          </h2>
          <input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAdminLogin()}
            placeholder="Contraseña..."
            className="w-full border-2 border-[#0A0A0A] px-4 py-3 font-bold mb-4 focus:outline-none"
          />
          <button
            onClick={handleAdminLogin}
            className="w-full bg-[#FF5722] text-white py-4 font-black uppercase hover:bg-[#76FF03] hover:text-[#0A0A0A] transition-colors"
          >
            Acceder
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-5xl font-black text-white mb-12 uppercase"
          style={{ textShadow: "4px 4px 0 #00BCD4" }}
        >
          ADMINISTRACIÓN
        </h2>

        <div className="bg-[#1a1a1a] border-4 border-[#76FF03] p-8 mb-12 text-black">
          <h3 className="text-3xl font-black text-[#76FF03] mb-6 uppercase">
            {editingProduct ? "Editar Producto" : "Nuevo Producto"}
          </h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Nombre"
              value={editingProduct ? editingProduct.name : newProduct.name}
              onChange={(e) => {
                if (editingProduct) {
                  setEditingProduct({
                    ...editingProduct,
                    name: e.target.value,
                  });
                } else {
                  setNewProduct({ ...newProduct, name: e.target.value });
                }
              }}
              className="bg-white border-2 px-4 py-3 font-bold text-[#0A0A0A] focus:outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="Precio"
              value={editingProduct ? editingProduct.price : newProduct.price}
              onChange={(e) => {
                if (editingProduct) {
                  setEditingProduct({
                    ...editingProduct,
                    price: e.target.value,
                  });
                } else {
                  setNewProduct({ ...newProduct, price: e.target.value });
                }
              }}
              className="bg-white border-2 px-4 py-3 font-bold focus:outline-none"
            />
          </div>
          <textarea
            placeholder="Descripción"
            value={
              editingProduct
                ? editingProduct.description
                : newProduct.description
            }
            onChange={(e) => {
              if (editingProduct) {
                setEditingProduct({
                  ...editingProduct,
                  description: e.target.value,
                });
              } else {
                setNewProduct({ ...newProduct, description: e.target.value });
              }
            }}
            rows="3"
            className="w-full bg-white border-2 px-4 py-3 font-bold mb-4 focus:outline-none"
          />
          <select
            value={
              editingProduct ? editingProduct.style_tag : newProduct.style_tag
            }
            onChange={(e) => {
              if (editingProduct) {
                setEditingProduct({
                  ...editingProduct,
                  style_tag: e.target.value,
                });
              } else {
                setNewProduct({ ...newProduct, style_tag: e.target.value });
              }
            }}
            className="w-full bg-white border-2 px-4 py-3 font-bold mb-4 focus:outline-none"
          >
            {categories
              .filter((cat) => cat.id !== "all") // Exclude "all" category from product creation
              .map((category) => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </option>
              ))}
          </select>
          <input
            type="text"
            placeholder="URL imagen principal"
            value={
              editingProduct
                ? editingProduct.main_image_url
                : newProduct.main_image_url
            }
            onChange={(e) => {
              if (editingProduct) {
                setEditingProduct({
                  ...editingProduct,
                  main_image_url: e.target.value,
                });
              } else {
                setNewProduct({
                  ...newProduct,
                  main_image_url: e.target.value,
                });
              }
            }}
            className="w-full bg-white border-2 px-4 py-3 font-bold mb-4 focus:outline-none"
          />

          <div className="mb-4">
            <h4 className="text-xl font-black text-[#76FF03] mb-2 uppercase">
              Tallas Disponibles
            </h4>
            <div className="grid grid-cols-3 gap-2 mb-2">
              {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                <label key={size} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={(editingProduct
                      ? editingProduct.sizes
                      : newProduct.sizes
                    ).includes(size)}
                    onChange={(e) => {
                      const currentProduct = editingProduct || newProduct;
                      const setProduct = editingProduct
                        ? setEditingProduct
                        : setNewProduct;
                      if (e.target.checked) {
                        setProduct({
                          ...currentProduct,
                          sizes: [...currentProduct.sizes, size],
                        });
                      } else {
                        setProduct({
                          ...currentProduct,
                          sizes: currentProduct.sizes.filter((s) => s !== size),
                        });
                      }
                    }}
                    className="w-4 h-4"
                  />
                  <span className="text-white font-bold">{size}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-xl font-black text-[#76FF03] mb-2 uppercase">
              Imágenes Adicionales
            </h4>
            {(editingProduct ? editingProduct.images : newProduct.images).map(
              (url, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder={`URL imagen ${index + 1}`}
                    value={url}
                    onChange={(e) => {
                      const currentProduct = editingProduct || newProduct;
                      const setProduct = editingProduct
                        ? setEditingProduct
                        : setNewProduct;
                      const updatedImages = [...currentProduct.images];
                      updatedImages[index] = e.target.value;
                      setProduct({ ...currentProduct, images: updatedImages });
                    }}
                    className="flex-1 bg-white border-2 px-4 py-3 font-bold focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      const currentProduct = editingProduct || newProduct;
                      const setProduct = editingProduct
                        ? setEditingProduct
                        : setNewProduct;
                      const updatedImages = currentProduct.images.filter(
                        (_, i) => i !== index
                      );
                      setProduct({ ...currentProduct, images: updatedImages });
                    }}
                    className="bg-[#FF5722] text-white px-4 py-3 font-black uppercase hover:scale-105 transition-transform"
                  >
                    X
                  </button>
                </div>
              )
            )}
            <button
              onClick={() => {
                const currentProduct = editingProduct || newProduct;
                const setProduct = editingProduct
                  ? setEditingProduct
                  : setNewProduct;
                setProduct({
                  ...currentProduct,
                  images: [...currentProduct.images, ""],
                });
              }}
              className="w-full bg-[#00BCD4] text-[#0A0A0A] py-3 font-black uppercase hover:scale-105 transition-transform"
            >
              + Agregar Imagen
            </button>
          </div>

          <div className="flex gap-4">
            <button
              onClick={editingProduct ? updateProduct : createProduct}
              className="flex-1 bg-[#76FF03] text-[#0A0A0A] py-4 font-black uppercase hover:scale-105 transition-transform"
            >
              {editingProduct ? "Actualizar Producto" : "+ Crear Producto"}
            </button>
            {editingProduct && (
              <button
                onClick={cancelEditing}
                className="bg-gray-600 text-white py-4 px-6 font-black uppercase hover:scale-105 transition-transform"
              >
                Cancelar
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-3xl font-black text-white mb-6 uppercase">
            Productos
          </h3>
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-[#1a1a1a] border-2 border-[#FF5722] p-6 flex items-center gap-4"
            >
              <img
                src={product.main_image_url}
                alt={product.name}
                className="w-24 h-24 object-cover"
              />
              <div className="flex-1">
                <h4 className="text-2xl font-black text-white uppercase">
                  {product.name}
                </h4>
                <p className="text-[#76FF03] font-bold">
                  {product.description}
                </p>
                <p className="text-[#FF5722] text-xl font-black">
                  ${product.price}
                </p>
                <span
                  className={`inline-block px-3 py-1 text-xs font-black uppercase mt-2 ${
                    product.is_available
                      ? "bg-[#76FF03] text-[#0A0A0A]"
                      : "bg-gray-500 text-white"
                  }`}
                >
                  {product.is_available ? "Disponible" : "No disponible"}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => toggleProductAvailability(product.id)}
                  className="bg-[#76FF03] text-[#0A0A0A] p-2 hover:scale-110 transition-transform"
                >
                  {product.is_available ? "👁️" : "🚫"}
                </button>
                <button
                  onClick={() => setEditingProduct(product)}
                  className="bg-[#00BCD4] text-[#0A0A0A] p-2 hover:scale-110 transition-transform"
                >
                  ✏️
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="bg-[#FF5722] text-white p-2 hover:scale-110 transition-transform"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Categories Management */}
        <div className="bg-[#1a1a1a] border-4 border-[#00BCD4] p-8 mt-12">
          <h3 className="text-3xl font-black text-[#00BCD4] mb-6 uppercase">
            Gestionar Categorías
          </h3>

          {/* Add New Category */}
          <div className="mb-8">
            <h4 className="text-xl font-black text-white mb-4 uppercase">
              Agregar Nueva Categoría
            </h4>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="ID (ej: nueva-categoria)"
                value={newCategory.id}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, id: e.target.value })
                }
                className="bg-white border-2 px-4 py-3 font-bold text-[#0A0A0A] focus:outline-none"
              />
              <input
                type="text"
                placeholder="Nombre (ej: Nueva Categoría)"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
                className="bg-white border-2 px-4 py-3 font-bold text-[#0A0A0A] focus:outline-none"
              />
              <input
                type="text"
                placeholder="Icono (ej: 🎨)"
                value={newCategory.icon}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, icon: e.target.value })
                }
                className="bg-white border-2 px-4 py-3 font-bold text-[#0A0A0A] focus:outline-none"
              />
            </div>
            <button
              onClick={addCategory}
              className="bg-[#00BCD4] text-[#0A0A0A] px-6 py-3 font-black uppercase hover:scale-105 transition-transform flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Agregar Categoría
            </button>
          </div>

          {/* Edit Category */}
          {editingCategory && (
            <div className="mb-8">
              <h4 className="text-xl font-black text-white mb-4 uppercase">
                Editando: {editingCategory.name}
              </h4>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="ID"
                  value={editingCategory.id}
                  disabled
                  className="bg-gray-300 border-2 px-4 py-3 font-bold text-[#0A0A0A] focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Nombre"
                  value={editingCategory.name}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      name: e.target.value,
                    })
                  }
                  className="bg-white border-2 px-4 py-3 font-bold text-[#0A0A0A] focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Icono"
                  value={editingCategory.icon}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      icon: e.target.value,
                    })
                  }
                  className="bg-white border-2 px-4 py-3 font-bold text-[#0A0A0A] focus:outline-none"
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={updateCategory}
                  className="bg-[#76FF03] text-[#0A0A0A] px-6 py-3 font-black uppercase hover:scale-105 transition-transform"
                >
                  Actualizar
                </button>
                <button
                  onClick={() => setEditingCategory(null)}
                  className="bg-gray-600 text-white px-6 py-3 font-black uppercase hover:scale-105 transition-transform"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Categories List */}
          <div className="space-y-4">
            <h4 className="text-xl font-black text-white mb-4 uppercase">
              Categorías Existentes
            </h4>
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-[#2a2a2a] border-2 border-gray-600 p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <h5 className="text-lg font-black text-white uppercase">
                      {category.name}
                    </h5>
                    <p className="text-gray-400 text-sm">ID: {category.id}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingCategory(category)}
                    className="bg-[#00BCD4] text-[#0A0A0A] p-2 hover:scale-110 transition-transform"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteCategory(category.id)}
                    className="bg-[#FF5722] text-white p-2 hover:scale-110 transition-transform"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
