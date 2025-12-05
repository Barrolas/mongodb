// ====================================================================
// ====================== Pastelería Mil Sabores ======================
// ===================== Evaluación Parcial N° 3 =====================
// ====================================================================
//
// Integrantes:
// - Nicole Chavez
// - Nicolás Barra
//
// Descripción: Script de operaciones CRUD - UPDATE
// - updateOne() - Actualizar stock de un producto
// - updateOne() - Cambiar estado de un pedido
// - updateMany() - Actualizar precios de múltiples productos
// - Operadores: $set, $inc, $push, $pull
// ====================================================================

use('mil_sabores');

// ====================================================================
// UPDATE - updateOne() con $inc (Incrementar/Decrementar)
// ====================================================================
print('=== UPDATE: updateOne() con $inc - Decrementar stock ===\n');

// Obtener un producto primero
const producto = db.productos.findOne({ nombre: "Torta Cuadrada de Chocolate" });
print(`Stock ANTES: ${producto.stock}\n`);

// Actualizar stock (decrementar en 5)
const resultadoUpdate1 = db.productos.updateOne(
  { _id: producto._id },
  { $inc: { stock: -5 } }
);

print('Resultado de la actualización:');
print(JSON.stringify(resultadoUpdate1, null, 2));
print('\n');

// Verificar el cambio
const productoActualizado = db.productos.findOne({ _id: producto._id });
print(`Stock DESPUÉS: ${productoActualizado.stock}\n`);

// ====================================================================
// UPDATE - updateOne() con $set (Establecer valor)
// ====================================================================
print('=== UPDATE: updateOne() con $set - Actualizar precio ===\n');

// Obtener otro producto
const producto2 = db.productos.findOne({ nombre: "Torta Circular de Vainilla" });
print(`Precio ANTES: $${producto2.precio}\n`);

// Actualizar precio
const resultadoUpdate2 = db.productos.updateOne(
  { _id: producto2._id },
  { $set: { precio: 19990 } }
);

print('Resultado de la actualización:');
print(JSON.stringify(resultadoUpdate2, null, 2));
print('\n');

// Verificar el cambio
const producto2Actualizado = db.productos.findOne({ _id: producto2._id });
print(`Precio DESPUÉS: $${producto2Actualizado.precio}\n`);

// ====================================================================
// UPDATE - updateOne() - Cambiar estado de un pedido
// ====================================================================
print('=== UPDATE: updateOne() - Cambiar estado de pedido ===\n');

// Obtener un pedido
const pedido = db.pedidos.findOne({ estado: "Pendiente" });
if (pedido) {
  print(`Estado ANTES: ${pedido.estado}\n`);
  
  // Cambiar estado
  const resultadoUpdatePedido = db.pedidos.updateOne(
    { _id: pedido._id },
    { $set: { estado: "En Preparacion" } }
  );
  
  print('Resultado de la actualización:');
  print(JSON.stringify(resultadoUpdatePedido, null, 2));
  print('\n');
  
  // Verificar el cambio
  const pedidoActualizado = db.pedidos.findOne({ _id: pedido._id });
  print(`Estado DESPUÉS: ${pedidoActualizado.estado}\n`);
} else {
  print('No se encontraron pedidos pendientes para actualizar\n');
}

// ====================================================================
// UPDATE - updateMany() - Actualizar múltiples productos
// ====================================================================
print('=== UPDATE: updateMany() - Actualizar múltiples productos ===\n');

// Obtener categoría primero
const categoriaTortasCuadradas = db.categorias.findOne({ slug: "tortas-cuadradas" });

print(`Actualizando todos los productos de la categoría "${categoriaTortasCuadradas.nombre}"...\n`);

// Actualizar todos los productos de una categoría agregando un campo descuento
const resultadoUpdateMany = db.productos.updateMany(
  { "categoria.slug": "tortas-cuadradas" },
  { $set: { descuento: 10 } }
);

print('Resultado de la actualización múltiple:');
print(JSON.stringify(resultadoUpdateMany, null, 2));
print(`\nProductos actualizados: ${resultadoUpdateMany.modifiedCount}\n`);

// Verificar productos actualizados
const productosActualizados = db.productos.find({ "categoria.slug": "tortas-cuadradas" }).toArray();
print('Productos con descuento aplicado:');
productosActualizados.forEach(prod => {
  print(`- ${prod.nombre}: Descuento ${prod.descuento || 0}%`);
});
print('\n');

// ====================================================================
// UPDATE - updateOne() con $push (Agregar a array)
// ====================================================================
print('=== UPDATE: updateOne() con $push - Agregar a array ===\n');

// Si tuviéramos un array de tags o imágenes adicionales, ejemplo:
// Esto es solo demostrativo, no aplica directamente a nuestro modelo actual

print('Ejemplo de $push (no aplica a nuestro modelo actual, solo demostración):\n');
print('Si tuviéramos un campo "tags" como array:');
print('db.productos.updateOne({ _id: ... }, { $push: { tags: "nuevo" } });\n');

// ====================================================================
// UPDATE - updateOne() con $pull (Remover de array)
// ====================================================================
print('=== UPDATE: updateOne() con $pull - Remover de array ===\n');

print('Ejemplo de $pull (no aplica a nuestro modelo actual, solo demostración):\n');
print('Si tuviéramos un campo "tags" como array:');
print('db.productos.updateOne({ _id: ... }, { $pull: { tags: "viejo" } });\n');

// ====================================================================
// RESUMEN
// ====================================================================
print('=== RESUMEN DE OPERACIONES UPDATE ===');
print('- updateOne() con $inc: Stock decrementado');
print('- updateOne() con $set: Precio actualizado');
print('- updateOne() con $set: Estado de pedido cambiado');
print(`- updateMany() con $set: ${resultadoUpdateMany.modifiedCount} productos actualizados`);
print('\n');

print('Script UPDATE ejecutado correctamente!');

