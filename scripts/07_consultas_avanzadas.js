// ====================================================================
// ====================== Pastelería Mil Sabores ======================
// ===================== Evaluación Parcial N° 3 =====================
// ====================================================================
//
// Integrantes:
// - Nicole Chavez
// - Nicolás Barra
//
// Descripción: Consultas avanzadas
// - Consulta 1 con aggregate(): Top 5 productos más vendidos
// - Consulta 2 con find() y operadores: Productos con filtros combinados
// ====================================================================

use('mil_sabores');

// ====================================================================
// CONSULTA 1: TOP 5 PRODUCTOS MÁS VENDIDOS (con aggregate())
// ====================================================================
print('=== CONSULTA 1: Top 5 Productos Más Vendidos (aggregate()) ===\n');

const topProductos = db.pedidos.aggregate([
  // Descomponer el array de detalles para tener un documento por cada detalle
  { $unwind: "$detalles" },
  
  // Agrupar por nombre de producto y sumar las cantidades
  {
    $group: {
      _id: "$detalles.producto.nombre",
      total_vendido: { $sum: "$detalles.cantidad" },
      total_ingresos: { $sum: "$detalles.subtotal" }
    }
  },
  
  // Ordenar por cantidad vendida (descendente)
  { $sort: { total_vendido: -1 } },
  
  // Limitar a los primeros 5
  { $limit: 5 },
  
  // Proyectar campos con nombres más legibles
  {
    $project: {
      _id: 0,
      producto: "$_id",
      cantidad_vendida: "$total_vendido",
      ingresos_totales: "$total_ingresos"
    }
  }
]).toArray();

print('Top 5 productos más vendidos:');
topProductos.forEach((producto, index) => {
  print(`${index + 1}. ${producto.producto}`);
  print(`   Cantidad vendida: ${producto.cantidad_vendida} unidades`);
  print(`   Ingresos totales: $${producto.ingresos_totales}`);
  print('');
});
print('\n');

// ====================================================================
// CONSULTA 2: PRODUCTOS CON FILTROS COMBINADOS (con find() y operadores)
// ====================================================================
print('=== CONSULTA 2: Productos con Filtros Combinados (find() con operadores) ===\n');
print('Productos de categorías específicas, con precio entre $15,000 y $30,000, que contengan "torta" en el nombre:\n');

const productosFiltrados = db.productos.find({
  "categoria.slug": { $in: ["tortas-cuadradas", "tortas-circulares"] },
  precio: { $gt: 15000, $lt: 30000 },
  nombre: { $regex: /torta/i }
}).toArray();

productosFiltrados.forEach(producto => {
  print(`- ${producto.nombre} (${producto.categoria.nombre})`);
  print(`  Precio: $${producto.precio}`);
  print(`  Stock: ${producto.stock} unidades`);
  print('');
});

print(`Total encontrados: ${productosFiltrados.length} productos\n`);

print('Operadores utilizados en esta consulta:');
print('- $in: Productos de categorías específicas (tortas-cuadradas o tortas-circulares)');
print('- $gt: Precio mayor a $15,000');
print('- $lt: Precio menor a $30,000');
print('- $regex: Búsqueda de texto "torta" en el nombre (case insensitive)');
print('\n');

// ====================================================================
// RESUMEN
// ====================================================================
print('=== RESUMEN DE CONSULTAS AVANZADAS ===');
print('✅ Consulta 1: Top 5 productos más vendidos (aggregate())');
print('   - Operadores utilizados: $unwind, $group, $sort, $limit, $project');
print('✅ Consulta 2: Productos con filtros combinados (find() con operadores)');
print('   - Operadores utilizados: $in, $gt, $lt, $regex');
print('\n');

print('Script de consultas avanzadas ejecutado correctamente!');
