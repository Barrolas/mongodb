// ====================================================================
// ====================== Pastelería Mil Sabores ======================
// ===================== Evaluación Parcial N° 3 =====================
// ====================================================================
//
// Integrantes:
// - Nicole Chavez
// - Nicolás Barra
//
// Descripción: Script de operaciones CRUD - READ
// - find() - Consultas básicas
// - findOne() - Obtener un documento
// - Operadores: $gt, $lt, $ne, $in, $nin, $regex
// ====================================================================

use('mil_sabores');

// ====================================================================
// READ - find() - CONSULTA BÁSICA
// ====================================================================
print('=== READ: find() - Todos los productos ===\n');

const todosProductos = db.productos.find({}).toArray();
print(`Total de productos encontrados: ${todosProductos.length}\n`);

// Mostrar primeros 3 productos
todosProductos.slice(0, 3).forEach(producto => {
  print(`- ${producto.nombre}: $${producto.precio}`);
});
print('\n');

// ====================================================================
// READ - findOne() - OBTENER UN DOCUMENTO
// ====================================================================
print('=== READ: findOne() - Un producto específico ===\n');

const productoUnico = db.productos.findOne({ nombre: "Torta Cuadrada de Chocolate" });
print('Producto encontrado:');
print(JSON.stringify(productoUnico, null, 2));
print('\n');

// ====================================================================
// READ - Operador $gt (Mayor que)
// ====================================================================
print('=== READ: Operador $gt (Mayor que) ===\n');
print('Productos con precio mayor a $30,000:\n');

const productosCaros = db.productos.find({ precio: { $gt: 30000 } }).toArray();
productosCaros.forEach(producto => {
  print(`- ${producto.nombre}: $${producto.precio}`);
});
print(`Total: ${productosCaros.length} productos\n`);

// ====================================================================
// READ - Operador $lt (Menor que)
// ====================================================================
print('=== READ: Operador $lt (Menor que) ===\n');
print('Productos con stock menor a 80:\n');

const stockBajo = db.productos.find({ stock: { $lt: 80 } }).toArray();
stockBajo.forEach(producto => {
  print(`- ${producto.nombre}: Stock ${producto.stock}`);
});
print(`Total: ${stockBajo.length} productos\n`);

// ====================================================================
// READ - Operador $ne (No igual)
// ====================================================================
print('=== READ: Operador $ne (No igual) ===\n');
print('Pedidos que NO están cancelados:\n');

const pedidosActivos = db.pedidos.find({ estado: { $ne: "Cancelado" } }).toArray();
pedidosActivos.forEach(pedido => {
  print(`- Pedido ID: ${pedido._id}, Estado: ${pedido.estado}, Total: $${pedido.total}`);
});
print(`Total: ${pedidosActivos.length} pedidos activos\n`);

// ====================================================================
// READ - Operador $in (En lista)
// ====================================================================
print('=== READ: Operador $in (En lista) ===\n');
print('Productos de categorías específicas (tortas-cuadradas o tortas-circulares):\n');

const productosCategorias = db.productos.find({
  "categoria.slug": { $in: ["tortas-cuadradas", "tortas-circulares"] }
}).toArray();

productosCategorias.forEach(producto => {
  print(`- ${producto.nombre} (${producto.categoria.nombre})`);
});
print(`Total: ${productosCategorias.length} productos\n`);

// ====================================================================
// READ - Operador $nin (No en lista)
// ====================================================================
print('=== READ: Operador $nin (No en lista) ===\n');
print('Productos que NO son veganos:\n');

const productosNoVeganos = db.productos.find({
  "categoria.slug": { $nin: ["productos-veganos"] }
}).toArray();

productosNoVeganos.slice(0, 5).forEach(producto => {
  print(`- ${producto.nombre} (${producto.categoria.nombre})`);
});
print(`Total: ${productosNoVeganos.length} productos (mostrando primeros 5)\n`);

// ====================================================================
// READ - Operador $regex (Búsqueda de texto)
// ====================================================================
print('=== READ: Operador $regex (Búsqueda de texto) ===\n');
print('Productos con "chocolate" en el nombre (case insensitive):\n');

const productosChocolate = db.productos.find({
  nombre: { $regex: /chocolate/i }
}).toArray();

productosChocolate.forEach(producto => {
  print(`- ${producto.nombre}: $${producto.precio}`);
});
print(`Total: ${productosChocolate.length} productos\n`);

// Búsqueda más compleja
print('Productos con "torta" o "Torta" en el nombre:\n');
const productosTorta = db.productos.find({
  nombre: { $regex: /torta/i }
}).toArray();

productosTorta.slice(0, 5).forEach(producto => {
  print(`- ${producto.nombre}`);
});
print(`Total: ${productosTorta.length} productos (mostrando primeros 5)\n`);

// ====================================================================
// READ - Combinando operadores
// ====================================================================
print('=== READ: Combinando operadores ===\n');
print('Productos con precio entre $15,000 y $30,000:\n');

const productosRango = db.productos.find({
  precio: { $gt: 15000, $lt: 30000 }
}).toArray();

productosRango.forEach(producto => {
  print(`- ${producto.nombre}: $${producto.precio}`);
});
print(`Total: ${productosRango.length} productos\n`);

// ====================================================================
// RESUMEN
// ====================================================================
print('=== RESUMEN DE OPERACIONES READ ===');
print(`- Total productos: ${db.productos.countDocuments()}`);
print(`- Total clientes: ${db.clientes.countDocuments()}`);
print(`- Total pedidos: ${db.pedidos.countDocuments()}`);
print('\n');

print('✅ Script READ ejecutado correctamente!');

