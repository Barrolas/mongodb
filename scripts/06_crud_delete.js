// ====================================================================
// ====================== Pastelería Mil Sabores ======================
// ===================== Evaluación Parcial N° 3 =====================
// ====================================================================
//
// Integrantes:
// - Nicole Chavez
// - Nicolás Barra
//
// Descripción: Script de operaciones CRUD - DELETE
// - deleteOne() - Eliminar un cliente
// - deleteOne() - Eliminar un producto
// - deleteMany() - Eliminar pedidos cancelados antiguos
// ====================================================================

use('mil_sabores');

// ====================================================================
// DELETE - deleteOne() - ELIMINAR UN CLIENTE
// ====================================================================
print('=== DELETE: deleteOne() - Eliminar un cliente ===\n');

// Primero crear un cliente de prueba para eliminar
print('Creando cliente de prueba para eliminar...\n');
const clientePrueba = db.clientes.insertOne({
  nombre: "Test",
  apellido_paterno: "Eliminar",
  correo: "test.eliminar@example.com",
  fecha_creacion: new Date()
});

print(`Cliente de prueba creado con ID: ${clientePrueba.insertedId}\n`);

// Verificar que existe
const clienteAntes = db.clientes.findOne({ _id: clientePrueba.insertedId });
print(`Cliente ANTES de eliminar: ${clienteAntes.correo}\n`);

// Eliminar el cliente
print('ELIMINANDO cliente...\n');
const resultadoDelete1 = db.clientes.deleteOne({
  correo: "test.eliminar@example.com"
});

print('Resultado de la eliminación:');
print(JSON.stringify(resultadoDelete1, null, 2));
print('\n');

// Verificar que fue eliminado
const clienteDespues = db.clientes.findOne({ correo: "test.eliminar@example.com" });
if (clienteDespues === null) {
  print('Cliente eliminado correctamente (no se encuentra en la base de datos)\n');
} else {
  print('Error: El cliente todavía existe\n');
}

// ====================================================================
// DELETE - deleteOne() - ELIMINAR UN PRODUCTO
// ====================================================================
print('=== DELETE: deleteOne() - Eliminar un producto ===\n');

// Crear un producto de prueba para eliminar
print('Creando producto de prueba para eliminar...\n');
const categoria = db.categorias.findOne({ slug: "tortas-cuadradas" });

const productoPrueba = db.productos.insertOne({
  categoria: {
    _id: categoria._id,
    nombre: categoria.nombre,
    slug: categoria.slug
  },
  nombre: "Producto de Prueba - Eliminar",
  precio: 1000,
  stock: 1,
  descripcion_corta: "Este producto será eliminado"
});

print(`Producto de prueba creado con ID: ${productoPrueba.insertedId}\n`);

// Verificar que existe
const productoAntes = db.productos.findOne({ _id: productoPrueba.insertedId });
print(`Producto ANTES de eliminar: ${productoAntes.nombre}\n`);

// Eliminar el producto
print('ELIMINANDO producto...\n');
const resultadoDelete2 = db.productos.deleteOne({
  nombre: "Producto de Prueba - Eliminar"
});

print('Resultado de la eliminación:');
print(JSON.stringify(resultadoDelete2, null, 2));
print('\n');

// Verificar que fue eliminado
const productoDespues = db.productos.findOne({ nombre: "Producto de Prueba - Eliminar" });
if (productoDespues === null) {
  print('Producto eliminado correctamente (no se encuentra en la base de datos)\n');
} else {
  print('Error: El producto todavía existe\n');
}

// ====================================================================
// DELETE - deleteMany() - ELIMINAR MÚLTIPLES PEDIDOS
// ====================================================================
print('=== DELETE: deleteMany() - Eliminar pedidos cancelados antiguos ===\n');

// Primero crear algunos pedidos de prueba con estado cancelado
print('Creando pedidos de prueba cancelados...\n');

const clienteTest = db.clientes.findOne({});
const fechaAntigua = new Date("2023-01-01");

if (clienteTest) {
  // Crear 2 pedidos cancelados antiguos
  db.pedidos.insertMany([
    {
      cliente: {
        _id: clienteTest._id,
        nombre_completo: clienteTest.nombre + " " + clienteTest.apellido_paterno
      },
      estado: "Cancelado",
      fecha_pedido: fechaAntigua,
      total: 10000,
      detalles: []
    },
    {
      cliente: {
        _id: clienteTest._id,
        nombre_completo: clienteTest.nombre + " " + clienteTest.apellido_paterno
      },
      estado: "Cancelado",
      fecha_pedido: fechaAntigua,
      total: 15000,
      detalles: []
    }
  ]);
  
  print('Pedidos de prueba creados\n');
  
  // Contar pedidos cancelados antes
  const pedidosCanceladosAntes = db.pedidos.countDocuments({
    estado: "Cancelado",
    fecha_pedido: { $lt: new Date("2024-01-01") }
  });
  
  print(`Pedidos cancelados antes de 2024: ${pedidosCanceladosAntes}\n`);
  print('ELIMINANDO pedidos cancelados antiguos...\n');
  
  // Eliminar pedidos cancelados anteriores a 2024
  const resultadoDeleteMany = db.pedidos.deleteMany({
    estado: "Cancelado",
    fecha_pedido: { $lt: new Date("2024-01-01") }
  });
  
  print('Resultado de la eliminación múltiple:');
  print(JSON.stringify(resultadoDeleteMany, null, 2));
  print(`\nPedidos eliminados: ${resultadoDeleteMany.deletedCount}\n`);
  
  // Verificar
  const pedidosCanceladosDespues = db.pedidos.countDocuments({
    estado: "Cancelado",
    fecha_pedido: { $lt: new Date("2024-01-01") }
  });
  
  print(`Pedidos cancelados después de eliminar: ${pedidosCanceladosDespues}\n`);
} else {
  print('No se encontró un cliente para crear pedidos de prueba\n');
}

// ====================================================================
// ADVERTENCIA IMPORTANTE
// ====================================================================
print('=== ADVERTENCIA IMPORTANTE ===\n');
print('Las operaciones DELETE son PERMANENTES.\n');
print('Siempre verificar el filtro antes de ejecutar deleteMany().\n');
print('Recomendación: Usar find() primero para ver qué se eliminará.\n\n');

// ====================================================================
// RESUMEN
// ====================================================================
print('=== RESUMEN DE OPERACIONES DELETE ===');
print('- deleteOne(): Cliente eliminado');
print('- deleteOne(): Producto eliminado');
print('- deleteMany(): Pedidos cancelados antiguos eliminados');
print('\n');

print('Script DELETE ejecutado correctamente!');
print('Recuerda: Las eliminaciones son permanentes.');

