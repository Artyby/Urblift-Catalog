-- Script de migración para Supabase: Creación de tablas y datos iniciales para UrbLift Catalog

-- Habilitar RLS (Row Level Security) si es necesario para seguridad
-- Para este caso, mantendremos las tablas públicas ya que no hay autenticación implementada

-- Limpiar tablas existentes si hay conflictos de tipos
DROP TABLE IF EXISTS cart_items CASCADE;
DROP TABLE IF EXISTS product_images CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- Tabla de productos
CREATE TABLE products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    old_price DECIMAL(10,2),
    is_available BOOLEAN DEFAULT true,
    is_new BOOLEAN DEFAULT false,
    main_image_url TEXT,
    style_tag TEXT,
    sizes JSONB DEFAULT '["XS", "S", "M", "L", "XL", "XXL"]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de imágenes de productos
CREATE TABLE IF NOT EXISTS product_images (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    sort_order INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de categorías
CREATE TABLE categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de elementos del carrito (para persistencia del carrito)
CREATE TABLE IF NOT EXISTS cart_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    cart_id TEXT NOT NULL, -- ID del carrito (puede ser generado por el cliente)
    product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
    selected_size TEXT DEFAULT 'M',
    quantity INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_products_style_tag ON products(style_tag);
CREATE INDEX IF NOT EXISTS idx_products_is_available ON products(is_available);
CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_cart_id ON cart_items(cart_id);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON cart_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Datos iniciales de productos
INSERT INTO products (id, name, description, price, old_price, is_available, is_new, main_image_url, style_tag) VALUES
('1', 'Camiseta "Fe Urbana"', 'Diseño exclusivo con tipografía graffiti. Mensaje inspirador que habla de tu fe con estilo único.', 29.99, 39.99, true, true, 'https://i.pinimg.com/1200x/95/55/c8/9555c895b3b806e25e15ecc762c16bde.jpg', 'camisetas'),
('2', 'Hoodie "Elevado"', 'Sudadera premium con capucha. Arte urbano que refleja tu identidad en Cristo. Máxima comodidad.', 49.99, 65.99, true, true, 'https://i.pinimg.com/1200x/60/b2/b2/60b2b2dbc1c2fdf4cc8a8921a5c28162.jpg', 'hoodies'),
('3', 'Camiseta "Cruz Graffiti"', 'Estampado bold con cruz estilo street art. Declara tu fe sin filtros. 100% algodón.', 27.99, null, true, false, 'https://i.pinimg.com/1200x/80/6b/f5/806bf5d074f563eb942b5f081a5b41bf.jpg', 'camisetas'),
('4', 'Hoodie "Redimido"', 'Diseño minimalista con mensaje poderoso. Perfecto para el día a día urbano con propósito.', 52.99, null, true, false, 'https://i.pinimg.com/1200x/9c/ca/63/9cca635655e4f517f4754295ffead3ba.jpg', 'hoodies'),
('5', 'Camiseta "Salvaje Santo"', 'Arte abstracto cristiano. Para quienes viven su fe sin límites. Estilo único garantizado.', 31.99, null, true, false, 'https://i.pinimg.com/736x/0a/01/cd/0a01cd04084451142cac9b23eb779b9c.jpg', 'camisetas'),
('6', 'Hoodie "Gracia Infinita"', 'Oversize fit con diseño tipográfico exclusivo. Comodidad premium con mensaje eterno.', 55.99, null, true, true, 'https://i.pinimg.com/1200x/32/42/21/3242215807b0d2662af153ebf97db902.jpg', 'hoodies'),
('7', 'Camiseta "Mural de Fe"', 'Inspirada en el arte callejero. Cada prenda cuenta una historia de redención y esperanza.', 28.99, null, true, false, 'https://i.pinimg.com/1200x/41/ec/b3/41ecb3ac10a424bdadddefdedf2d046e.jpg', 'camisetas'),
('8', 'Camiseta "Renacido"', 'Diseño impactante con colores vibrantes. Declara tu nueva identidad en Cristo con orgullo.', 29.99, null, true, false, 'https://i.pinimg.com/736x/e8/50/c1/e850c16529153c649054269cf653d5d7.jpg', 'camisetas');

-- Datos iniciales de categorías
INSERT INTO categories (id, name, icon) VALUES
('all', 'Todos', '🎨'),
('camisetas', 'Camisetas', '👕'),
('hoodies', 'Hoodies', '🧥'),
('wildstyle', 'Wildstyle', '🎨'),
('throw-up', 'Throw-up', '🖌️'),
('tag', 'Tag', '🏷️'),
('piece', 'Piece', '🖼️'),
('abstracto', 'Abstracto', '🌌');

-- Datos iniciales de imágenes de productos
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
('1', 'https://i.pinimg.com/1200x/95/55/c8/9555c895b3b806e25e15ecc762c16bde.jpg', 1),
('1', 'https://i.pinimg.com/1200x/60/b2/b2/60b2b2dbc1c2fdf4cc8a8921a5c28162.jpg', 2),
('2', 'https://i.pinimg.com/1200x/60/b2/b2/60b2b2dbc1c2fdf4cc8a8921a5c28162.jpg', 1),
('3', 'https://i.pinimg.com/1200x/80/6b/f5/806bf5d074f563eb942b5f081a5b41bf.jpg', 1),
('4', 'https://i.pinimg.com/1200x/9c/ca/63/9cca635655e4f517f4754295ffead3ba.jpg', 1),
('5', 'https://i.pinimg.com/736x/0a/01/cd/0a01cd04084451142cac9b23eb779b9c.jpg', 1),
('6', 'https://i.pinimg.com/1200x/32/42/21/3242215807b0d2662af153ebf97db902.jpg', 1),
('7', 'https://i.pinimg.com/1200x/41/ec/b3/41ecb3ac10a424bdadddefdedf2d046e.jpg', 1),
('8', 'https://i.pinimg.com/736x/e8/50/c1/e850c16529153c649054269cf653d5d7.jpg', 1);

-- Políticas RLS (opcional, para futura implementación de autenticación)
-- ALTER TABLE products ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Políticas básicas (permitir todo por ahora)
-- CREATE POLICY "Allow all operations on products" ON products FOR ALL USING (true);
-- CREATE POLICY "Allow all operations on product_images" ON product_images FOR ALL USING (true);
-- CREATE POLICY "Allow all operations on cart_items" ON cart_items FOR ALL USING (true);
-- CREATE POLICY "Allow all operations on categories" ON categories FOR ALL USING (true);
