// ====================================================================
// ====================== Pastelería Mil Sabores ======================
// ===================== Evaluación Parcial N° 3 =====================
// ====================================================================
//
// Integrantes:
// - Nicole Chavez
// - Nicolás Barra
//
// Descripción: Consultas avanzadas con aggregate()
// - Consulta 1: Top 5 productos más vendidos
// - Consulta 2: Ventas totales por categoría
// - Consulta 3: Clientes con mayor gasto total
// - Consulta 4: Productos con stock crítico
// - Consulta 5: Ventas por mes del último año
// ====================================================================

use('mil_sabores');

// ====================================================================
// CONSULTA 1: TOP 5 PRODUCTOS MÁS VENDIDOS
// ====================================================================
print('=== CONSULTA 1: Top 5 Productos Más Vendidos ===\n');

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
// CONSULTA 2: VENTAS TOTALES POR CATEGORÍA
// ====================================================================
print('=== CONSULTA 2: Ventas Totales por Categoría ===\n');

const ventasPorCategoria = db.pedidos.aggregate([
  // Descomponer el array de detalles
  { $unwind: "$detalles" },
  
  // Agrupar por categoría
  {
    $group: {
      _id: "$detalles.producto.categoria.nombre",
      total_ventas: { $sum: "$detalles.subtotal" },
      cantidad_productos: { $sum: "$detalles.cantidad" },
      cantidad_pedidos: { $addToSet: "$_id" }  // Contar pedidos únicos
    }
  },
  
  // Calcular cantidad de pedidos únicos
  {
    $project: {
      _id: 0,
      categoria: "$_id",
      total_ventas: 1,
      cantidad_productos: 1,
      cantidad_pedidos: { $size: "$cantidad_pedidos" }
    }
  },
  
  // Ordenar por total de ventas (descendente)
  { $sort: { total_ventas: -1 } }
]).toArray();

print('Ventas por categoría:');
ventasPorCategoria.forEach((categoria) => {
  print(`Categoría: ${categoria.categoria}`);
  print(`  Total de ventas: $${categoria.total_ventas}`);
  print(`  Cantidad de productos vendidos: ${categoria.cantidad_productos}`);
  print(`  Pedidos únicos: ${categoria.cantidad_pedidos}`);
  print('');
});
print('\n');

// ====================================================================
// CONSULTA 3: CLIENTES CON MAYOR GASTO TOTAL
// ====================================================================
print('=== CONSULTA 3: Clientes con Mayor Gasto Total ===\n');

const clientesTopGasto = db.pedidos.aggregate([
  // Agrupar por cliente
  {
    $group: {
      _id: "$cliente.nombre_completo",
      total_gastado: { $sum: "$total" },
      cantidad_pedidos: { $sum: 1 },
      promedio_pedido: { $avg: "$total" }
    }
  },
  
  // Ordenar por total gastado (descendente)
  { $sort: { total_gastado: -1 } },
  
  // Limitar a los top 10
  { $limit: 10 },
  
  // Proyectar con nombres más legibles
  {
    $project: {
      _id: 0,
      cliente: "$_id",
      total_gastado: { $round: ["$total_gastado", 2] },
      cantidad_pedidos: 1,
      promedio_pedido: { $round: ["$promedio_pedido", 2] }
    }
  }
]).toArray();

print('Top 10 clientes con mayor gasto:');
clientesTopGasto.forEach((cliente, index) => {
  print(`${index + 1}. ${cliente.cliente}`);
  print(`   Total gastado: $${cliente.total_gastado}`);
  print(`   Cantidad de pedidos: ${cliente.cantidad_pedidos}`);
  print(`   Promedio por pedido: $${cliente.promedio_pedido}`);
  print('');
});
print('\n');

// ====================================================================
// CONSULTA 4: PRODUCTOS CON STOCK CRÍTICO
// ====================================================================
print('=== CONSULTA 4: Productos con Stock Crítico (< 20 unidades) ===\n');

const stockCritico = db.productos.aggregate([
  // Filtrar productos con stock menor a 20
  {
    $match: {
      stock: { $lt: 20 }
    }
  },
  
  // Proyectar campos relevantes y agregar campo calculado
  {
    $project: {
      _id: 0,
      nombre: 1,
      stock: 1,
      precio: 1,
      categoria: "$categoria.nombre",
      necesita_reposicion: {
        $cond: [
          { $lt: ["$stock", 10] },
          "URGENTE",
          "PRONTO"
        ]
      }
    }
  },
  
  // Ordenar por stock (ascendente - los más críticos primero)
  { $sort: { stock: 1 } }
]).toArray();

if (stockCritico.length > 0) {
  print('Productos con stock crítico:');
  stockCritico.forEach((producto) => {
    print(`Producto: ${producto.nombre}`);
    print(`  Categoría: ${producto.categoria}`);
    print(`  Stock actual: ${producto.stock} unidades`);
    print(`  Precio: $${producto.precio}`);
    print(`  Estado: ${producto.necesita_reposicion}`);
    print('');
  });
} else {
  print('No hay productos con stock crítico (todos tienen stock >= 20)\n');
}
print('\n');

// ====================================================================
// CONSULTA 5: VENTAS POR MES DEL ÚLTIMO AÑO
// ====================================================================
print('=== CONSULTA 5: Ventas por Mes del Último Año ===\n');

// Calcular fecha de hace un año
const fechaUnAnoAtras = new Date();
fechaUnAnoAtras.setFullYear(fechaUnAnoAtras.getFullYear() - 1);

const ventasPorMes = db.pedidos.aggregate([
  // Filtrar pedidos del último año
  {
    $match: {
      fecha_pedido: {
        $gte: fechaUnAnoAtras,
        $lte: new Date()
      }
    }
  },
  
  // Agrupar por año y mes
  {
    $group: {
      _id: {
        año: { $year: "$fecha_pedido" },
        mes: { $month: "$fecha_pedido" }
      },
      total_ventas: { $sum: "$total" },
      cantidad_pedidos: { $sum: 1 },
      promedio_pedido: { $avg: "$total" }
    }
  },
  
  // Ordenar cronológicamente
  {
    $sort: {
      "_id.año": 1,
      "_id.mes": 1
    }
  },
  
  // Proyectar con nombres de meses
  {
    $project: {
      _id: 0,
      año: "$_id.año",
      mes: "$_id.mes",
      nombre_mes: {
        $switch: {
          branches: [
            { case: { $eq: ["$_id.mes", 1] }, then: "Enero" },
            { case: { $eq: ["$_id.mes", 2] }, then: "Febrero" },
            { case: { $eq: ["$_id.mes", 3] }, then: "Marzo" },
            { case: { $eq: ["$_id.mes", 4] }, then: "Abril" },
            { case: { $eq: ["$_id.mes", 5] }, then: "Mayo" },
            { case: { $eq: ["$_id.mes", 6] }, then: "Junio" },
            { case: { $eq: ["$_id.mes", 7] }, then: "Julio" },
            { case: { $eq: ["$_id.mes", 8] }, then: "Agosto" },
            { case: { $eq: ["$_id.mes", 9] }, then: "Septiembre" },
            { case: { $eq: ["$_id.mes", 10] }, then: "Octubre" },
            { case: { $eq: ["$_id.mes", 11] }, then: "Noviembre" },
            { case: { $eq: ["$_id.mes", 12] }, then: "Diciembre" }
          ],
          default: "Desconocido"
        }
      },
      total_ventas: { $round: ["$total_ventas", 2] },
      cantidad_pedidos: 1,
      promedio_pedido: { $round: ["$promedio_pedido", 2] }
    }
  }
]).toArray();

print('Ventas por mes (último año):');
ventasPorMes.forEach((mes) => {
  print(`${mes.nombre_mes} ${mes.año}:`);
  print(`  Total de ventas: $${mes.total_ventas}`);
  print(`  Cantidad de pedidos: ${mes.cantidad_pedidos}`);
  print(`  Promedio por pedido: $${mes.promedio_pedido}`);
  print('');
});
print('\n');

// ====================================================================
// RESUMEN DE CONSULTAS
// ====================================================================
print('=== RESUMEN DE CONSULTAS AVANZADAS ===');
print('✅ Consulta 1: Top 5 productos más vendidos');
print('✅ Consulta 2: Ventas totales por categoría');
print('✅ Consulta 3: Clientes con mayor gasto total');
print('✅ Consulta 4: Productos con stock crítico');
print('✅ Consulta 5: Ventas por mes del último año');
print('\n');

print('Operadores de agregación utilizados:');
print('- $unwind: Descomponer arrays');
print('- $group: Agrupar y calcular');
print('- $match: Filtrar documentos');
print('- $sort: Ordenar resultados');
print('- $limit: Limitar cantidad');
print('- $project: Seleccionar y transformar campos');
print('- $sum, $avg: Operadores de acumulación');
print('- $cond, $switch: Operadores condicionales');
print('\n');

print('✅ Script de consultas avanzadas ejecutado correctamente!');

