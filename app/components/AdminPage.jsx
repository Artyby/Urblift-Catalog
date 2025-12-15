// "use client";
import { Trash2 } from "lucide-react";

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
          <p className="text-xs text-gray-500 mt-4 text-center">
            Contraseña: urblift2024
          </p>
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

        <div className="bg-[#1a1a1a] border-4 border-[#76FF03] p-8 mb-12">
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
            <option value="wildstyle">Wildstyle</option>
            <option value="throw-up">Throw-up</option>
            <option value="tag">Tag</option>
            <option value="piece">Piece</option>
            <option value="abstracto">Abstracto</option>
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
      </div>
    </div>
  );
}
