// ====================================================================
// ====================== Pastelería Mil Sabores ======================
// ===================== Evaluación Parcial N° 3 =====================
// ====================================================================
//
// Integrantes:
// - Nicole Chavez
// - Nicolás Barra
//
// Descripción: Script de operaciones CRUD - CREATE
// - insertOne() - Insertar un cliente
// - insertOne() - Insertar un producto
// - insertMany() - Insertar múltiples productos
// - insertOne() - Crear un pedido completo (con detalles embebidos)
// ====================================================================

use('mil_sabores');

// ====================================================================
// CREATE - insertOne() - INSERTAR UN CLIENTE
// ====================================================================
print('=== CREATE: insertOne() - Cliente ===\n');

const clienteNuevo = db.clientes.insertOne({
    nombre: "María",
    apellido_paterno: "García",
    apellido_materno: "López",
    correo: "maria.garcia@example.com",
    direccion: "Av. Principal 456, Santiago",
    fecha_nacimiento: new Date("1990-05-15"),
    telefono: "+56987654321",
    fecha_creacion: new Date()
});

print('Cliente insertado:');
print(JSON.stringify(clienteNuevo, null, 2));
print('\n');

// Obtener el ID del cliente insertado para usar después
const idCliente = clienteNuevo.insertedId;

// ====================================================================
// CREATE - insertOne() - INSERTAR UN PRODUCTO
// ====================================================================
print('=== CREATE: insertOne() - Producto ===\n');

// Primero obtener una categoría para referenciar
const categoria = db.categorias.findOne({ slug: "tortas-cuadradas" });

const productoNuevo = db.productos.insertOne({
    categoria: {
        _id: categoria._id,
        nombre: categoria.nombre,
        slug: categoria.slug
    },
    nombre: "Torta Cuadrada de Limón",
    precio: 32990,
    stock: 50,
    descripcion_corta: "Torta fresca de limón con merengue italiano.",
    descripcion_detallada: "Deliciosa torta cuadrada de limón con un toque ácido y fresco, decorada con merengue italiano.",
    imagen: "https://example.com/torta-limon.jpg"
});

print('Producto insertado:');
print(JSON.stringify(productoNuevo, null, 2));
print('\n');

// ====================================================================
// CREATE - insertMany() - INSERTAR MÚLTIPLES PRODUCTOS
// ====================================================================
print('=== CREATE: insertMany() - Múltiples Productos ===\n');

const categoriaCircular = db.categorias.findOne({ slug: "tortas-circulares" });

const productosNuevos = db.productos.insertMany([
    {
        categoria: {
            _id: categoriaCircular._id,
            nombre: categoriaCircular.nombre,
            slug: categoriaCircular.slug
        },
        nombre: "Torta Circular de Frambuesa",
        precio: 34990,
        stock: 75,
        descripcion_corta: "Torta circular con frambuesas frescas.",
        descripcion_detallada: "Exquisita torta circular con frambuesas frescas y crema de frambuesa.",
        imagen: "https://example.com/torta-frambuesa.jpg"
    },
    {
        categoria: {
            _id: categoriaCircular._id,
            nombre: categoriaCircular.nombre,
            slug: categoriaCircular.slug
        },
        nombre: "Torta Circular de Zanahoria",
        precio: 27990,
        stock: 60,
        descripcion_corta: "Torta circular de zanahoria con crema de queso.",
        descripcion_detallada: "Clásica torta de zanahoria con especias y crema de queso casera.",
        imagen: "https://example.com/torta-zanahoria.jpg"
    }
]);

print('Productos insertados:');
print(JSON.stringify(productosNuevos, null, 2));
print(`Total insertados: ${productosNuevos.insertedIds.length}\n`);

// ====================================================================
// CREATE - insertOne() - CREAR UN PEDIDO COMPLETO (con detalles embebidos)
// ====================================================================
print('=== CREATE: insertOne() - Pedido Completo con Detalles ===\n');

// Obtener algunos productos para el pedido
const producto1 = db.productos.findOne({ nombre: "Torta Cuadrada de Chocolate" });
const producto2 = db.productos.findOne({ nombre: "Mousse de Chocolate" });

// Calcular total
const cantidad1 = 2;
const cantidad2 = 3;
const subtotal1 = producto1.precio * cantidad1;
const subtotal2 = producto2.precio * cantidad2;
const totalPedido = subtotal1 + subtotal2;

const pedidoNuevo = db.pedidos.insertOne({
    cliente: {
        _id: idCliente,
        nombre_completo: "María García López"
    },
    estado: "Pendiente",
    fecha_pedido: new Date(),
    total: totalPedido,
    detalles: [
        {
            producto: {
                _id: producto1._id,
                nombre: producto1.nombre,
                precio: producto1.precio
            },
            cantidad: cantidad1,
            subtotal: subtotal1
        },
        {
            producto: {
                _id: producto2._id,
                nombre: producto2.nombre,
                precio: producto2.precio
            },
            cantidad: cantidad2,
            subtotal: subtotal2
        }
    ]
});

print('Pedido insertado:');
print(JSON.stringify(pedidoNuevo, null, 2));
print('\n');

// Mostrar el pedido completo
const pedidoCompleto = db.pedidos.findOne({ _id: pedidoNuevo.insertedId });
print('Pedido completo (con detalles embebidos):');
print(JSON.stringify(pedidoCompleto, null, 2));
print('\n');

// ====================================================================
// RESUMEN
// ====================================================================
print('=== RESUMEN DE OPERACIONES CREATE ===');
print(`- Cliente insertado: ${clienteNuevo.acknowledged}`);
print(`- Producto insertado: ${productoNuevo.acknowledged}`);
print(`- Productos múltiples insertados: ${productosNuevos.insertedIds.length}`);
print(`- Pedido completo insertado: ${pedidoNuevo.acknowledged}`);
print('\n');

print('Script CREATE ejecutado correctamente!');

