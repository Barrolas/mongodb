// ====================================================================
// ====================== Pastelería Mil Sabores ======================
// ===================== Evaluación Parcial N° 3 =====================
// ====================================================================
//
// Integrantes:
// - Nicole Chavez
// - Nicolás Barra
//
// Descripción: Script para crear el modelo completo de MongoDB
// - Crea la base de datos
// - Crea las colecciones
// - Crea los índices necesarios
// - Inserta datos iniciales (categorías y estados)
// ====================================================================

// Conectar a la base de datos (si no existe, se crea automáticamente)
use('mil_sabores');

// ====================================================================
// LIMPIAR BASE DE DATOS (Opcional - comentar si no se quiere limpiar)
// ====================================================================
print('🗑️  Limpiando colecciones existentes (si existen)...');
db.categorias.drop();
db.productos.drop();
db.clientes.drop();
db.pedidos.drop();
db.auditoria.drop();
db.reportes.drop();
print('✅ Colecciones limpiadas\n');

// ====================================================================
// CREAR COLECCIONES
// ====================================================================
print('📦 Creando colecciones...');

// Las colecciones se crean automáticamente al insertar datos
// Pero podemos crearlas explícitamente si queremos opciones
db.createCollection('categorias');
db.createCollection('productos');
db.createCollection('clientes');
db.createCollection('pedidos');
db.createCollection('auditoria');
db.createCollection('reportes');

print('✅ Colecciones creadas\n');

// ====================================================================
// CREAR ÍNDICES
// ====================================================================
print('🔍 Creando índices...');

// Índices para productos
db.productos.createIndex({ "categoria._id": 1 }, { name: "idx_categoria" });
db.productos.createIndex({ nombre: "text" }, { name: "idx_nombre_texto" });
db.productos.createIndex({ precio: 1 }, { name: "idx_precio" });
db.productos.createIndex({ stock: 1 }, { name: "idx_stock" });

// Índices para clientes
db.clientes.createIndex({ correo: 1 }, { unique: true, name: "idx_correo_unique" });
db.clientes.createIndex({ nombre: 1, apellido_paterno: 1 }, { name: "idx_nombre" });

// Índices para pedidos
db.pedidos.createIndex({ "cliente._id": 1 }, { name: "idx_pedido_cliente" });
db.pedidos.createIndex({ fecha_pedido: -1 }, { name: "idx_fecha_pedido" });
db.pedidos.createIndex({ estado: 1 }, { name: "idx_estado" });

// Índices para auditoria
db.auditoria.createIndex({ fecha_evento: -1 }, { name: "idx_fecha_evento" });
db.auditoria.createIndex({ tipo: 1, fecha_evento: -1 }, { name: "idx_tipo_fecha" });

print('✅ Índices creados\n');

// ====================================================================
// INSERTAR DATOS INICIALES - CATEGORÍAS
// ====================================================================
print('📂 Insertando categorías...');

const categorias = [
  { slug: 'tortas-cuadradas', nombre: 'Tortas Cuadradas', icono: 'fas fa-square' },
  { slug: 'tortas-circulares', nombre: 'Tortas Circulares', icono: 'fas fa-circle' },
  { slug: 'postres-individuales', nombre: 'Postres Individuales', icono: 'fas fa-cookie-bite' },
  { slug: 'productos-sin-azucar', nombre: 'Productos Sin Azúcar', icono: 'fas fa-heart' },
  { slug: 'pasteleria-tradicional', nombre: 'Pastelería Tradicional', icono: 'fas fa-home' },
  { slug: 'productos-sin-gluten', nombre: 'Productos Sin Gluten', icono: 'fas fa-leaf' },
  { slug: 'productos-veganos', nombre: 'Productos Veganos', icono: 'fas fa-seedling' },
  { slug: 'tortas-especiales', nombre: 'Tortas Especiales', icono: 'fas fa-star' }
];

const resultadoCategorias = db.categorias.insertMany(categorias);
print(`✅ ${resultadoCategorias.insertedIds.length} categorías insertadas\n`);

// Guardar los IDs de categorías para usar en productos
const categoriasIds = {};
db.categorias.find({}).forEach(cat => {
  categoriasIds[cat.slug] = cat._id;
});

// ====================================================================
// INSERTAR DATOS INICIALES - PRODUCTOS
// ====================================================================
print('🍰 Insertando productos...');

const productos = [
  {
    categoria: {
      _id: categoriasIds['tortas-cuadradas'],
      nombre: 'Tortas Cuadradas',
      slug: 'tortas-cuadradas'
    },
    nombre: 'Torta Cuadrada de Chocolate',
    precio: 45990,
    stock: 100,
    descripcion_corta: 'Deliciosa torta de chocolate con relleno de crema.',
    descripcion_detallada: 'Exquisita torta de chocolate premium elaborada con los mejores ingredientes. Capas de bizcocho de chocolate esponjoso, relleno de crema de chocolate belga y decoración artesanal con virutas de chocolate.',
    imagen: 'https://delicakesysnacks.com/wp-content/uploads/2025/01/vitxekmdoeio3sgmh5dr-1.webp'
  },
  {
    categoria: {
      _id: categoriasIds['tortas-cuadradas'],
      nombre: 'Tortas Cuadradas',
      slug: 'tortas-cuadradas'
    },
    nombre: 'Torta Cuadrada de Frutas',
    precio: 22990,
    stock: 100,
    descripcion_corta: 'Torta fresca con frutas de temporada y crema chantilly.',
    descripcion_detallada: 'Hermosa torta cuadrada decorada con una selección de frutas frescas de temporada como fresas, kiwis, duraznos y arándanos.',
    imagen: 'https://thumbs.dreamstime.com/b/este-delicioso-pastel-de-fruta-cuadrada-con-capas-esponja-ligera-y-crema-delicada-adornado-generosidad-est%C3%A1-decorado-una-gran-398214730.jpg'
  },
  {
    categoria: {
      _id: categoriasIds['tortas-circulares'],
      nombre: 'Tortas Circulares',
      slug: 'tortas-circulares'
    },
    nombre: 'Torta Circular de Vainilla',
    precio: 18990,
    stock: 100,
    descripcion_corta: 'Torta tradicional de vainilla con buttercream y frutas frescas.',
    descripcion_detallada: 'Clásica torta circular de vainilla, elaborada con extracto de vainilla natural y decorada con buttercream suave.',
    imagen: 'https://wiltonenespanol.com/wp-content/uploads/2017/02/pastel-de-vainilla.jpg'
  },
  {
    categoria: {
      _id: categoriasIds['tortas-circulares'],
      nombre: 'Tortas Circulares',
      slug: 'tortas-circulares'
    },
    nombre: 'Torta Circular de Manjar',
    precio: 15990,
    stock: 100,
    descripcion_corta: 'Torta circular con manjar casero y decoración elegante.',
    descripcion_detallada: 'Exquisita torta circular de manjar casero, elaborada con la receta tradicional chilena.',
    imagen: 'https://www.elingenio.cl/productos/bizcocho-manjar-lucuma.jpg'
  },
  {
    categoria: {
      _id: categoriasIds['tortas-circulares'],
      nombre: 'Tortas Circulares',
      slug: 'tortas-circulares'
    },
    nombre: 'Torta Circular de Frutilla',
    precio: 19990,
    stock: 100,
    descripcion_corta: 'Torta circular de frutillas frescas con crema chantilly.',
    descripcion_detallada: 'Deliciosa torta circular de frutillas frescas, elaborada con las mejores frutillas de temporada.',
    imagen: 'https://www.annarecetasfaciles.com/files/tarta-de-fresas-y-nata-3.jpg'
  },
  {
    categoria: {
      _id: categoriasIds['postres-individuales'],
      nombre: 'Postres Individuales',
      slug: 'postres-individuales'
    },
    nombre: 'Mousse de Chocolate',
    precio: 5990,
    stock: 100,
    descripcion_corta: 'Delicioso mousse de chocolate con decoración de frutas.',
    descripcion_detallada: 'Exquisito mousse de chocolate intenso, elaborado con chocolate premium y crema fresca.',
    imagen: 'https://images.aws.nestle.recipes/original/2024_10_18T11_53_16_badun_images.badun.es_4ed41e942636_mousse_de_chocolate_intenso.jpg'
  },
  {
    categoria: {
      _id: categoriasIds['postres-individuales'],
      nombre: 'Postres Individuales',
      slug: 'postres-individuales'
    },
    nombre: 'Tiramisú Clásico',
    precio: 7990,
    stock: 100,
    descripcion_corta: 'Tiramisú tradicional italiano con café y mascarpone.',
    descripcion_detallada: 'Auténtico tiramisú italiano, elaborado siguiendo la receta tradicional.',
    imagen: 'https://www.kingarthurbaking.com/sites/default/files/2023-03/Tiramisu_1426.jpg'
  },
  {
    categoria: {
      _id: categoriasIds['productos-sin-azucar'],
      nombre: 'Productos Sin Azúcar',
      slug: 'productos-sin-azucar'
    },
    nombre: 'Torta Sin Azúcar de Naranja',
    precio: 25990,
    stock: 100,
    descripcion_corta: 'Torta saludable sin azúcar con sabor a naranja natural.',
    descripcion_detallada: 'Deliciosa torta de naranja sin azúcar, elaborada con naranjas frescas y edulcorantes naturales.',
    imagen: 'https://santaisabel.vtexassets.com/arquivos/ids/447848-900-900?width=900&&height=900&aspect=true'
  },
  {
    categoria: {
      _id: categoriasIds['pasteleria-tradicional'],
      nombre: 'Pastelería Tradicional',
      slug: 'pasteleria-tradicional'
    },
    nombre: 'Empanada de Manzana',
    precio: 1890,
    stock: 100,
    descripcion_corta: 'Empanada tradicional de manzana con canela y azúcar.',
    descripcion_detallada: 'Deliciosa empanada de manzana casera, elaborada con masa fresca y relleno de manzanas cortadas en cubos con canela.',
    imagen: 'https://cocinachilena.cl/wp-content/uploads/2012/11/empanadas-manzana-3-scaled.jpg'
  },
  {
    categoria: {
      _id: categoriasIds['productos-sin-gluten'],
      nombre: 'Productos Sin Gluten',
      slug: 'productos-sin-gluten'
    },
    nombre: 'Brownie Sin Gluten',
    precio: 2990,
    stock: 100,
    descripcion_corta: 'Brownie delicioso sin gluten con chocolate premium.',
    descripcion_detallada: 'Exquisito brownie sin gluten elaborado con chocolate premium y harina de arroz.',
    imagen: 'https://www.justspices.es/media/recipe/brownie-chocolate.jpg'
  },
  {
    categoria: {
      _id: categoriasIds['productos-veganos'],
      nombre: 'Productos Veganos',
      slug: 'productos-veganos'
    },
    nombre: 'Torta Vegana de Chocolate',
    precio: 22990,
    stock: 100,
    descripcion_corta: 'Torta de chocolate 100% vegana con ingredientes naturales.',
    descripcion_detallada: 'Exquisita torta de chocolate 100% vegana, elaborada sin productos de origen animal.',
    imagen: 'https://www.lagloriavegana.com/wp-content/uploads/2020/08/Bizcocho-muerte-por-chocolate-1280x1280.jpg'
  },
  {
    categoria: {
      _id: categoriasIds['tortas-especiales'],
      nombre: 'Tortas Especiales',
      slug: 'tortas-especiales'
    },
    nombre: 'Torta Especial de Cumpleaños',
    precio: 29990,
    stock: 100,
    descripcion_corta: 'Torta personalizada para cumpleaños con decoración especial.',
    descripcion_detallada: 'Torta especial de cumpleaños personalizada según tus gustos y preferencias.',
    imagen: 'assets/images/torta-cumpleaños.webp'
  }
];

const resultadoProductos = db.productos.insertMany(productos);
print(`✅ ${resultadoProductos.insertedIds.length} productos insertados\n`);

// ====================================================================
// VERIFICACIÓN
// ====================================================================
print('📊 Resumen de creación:');
print(`   - Categorías: ${db.categorias.countDocuments()}`);
print(`   - Productos: ${db.productos.countDocuments()}`);
print(`   - Clientes: ${db.clientes.countDocuments()}`);
print(`   - Pedidos: ${db.pedidos.countDocuments()}`);
print('\n');

// Listar índices creados
print('🔍 Índices creados:');
print('   - productos: categoria._id, nombre (texto), precio, stock');
print('   - clientes: correo (único), nombre');
print('   - pedidos: cliente._id, fecha_pedido, estado');
print('   - auditoria: fecha_evento, tipo+fecha_evento');
print('\n');

print('✅ Script ejecutado correctamente - Modelo creado!');
print('💡 Ahora puedes insertar clientes y pedidos usando los scripts de CRUD');

