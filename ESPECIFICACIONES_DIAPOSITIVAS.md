# 📊 Especificaciones Detalladas de Diapositivas
## Para Generación con IA - Pastelería Mil Sabores

**Formato:** PowerPoint/Canva - 16:9 (1920x1080px)  
**Tema:** Pastelería (colores rosado, crema, chocolate)

---

## DIAPOSITIVA 1: PORTADA

### Título Principal:
```
MIGRACIÓN DE BASE DE DATOS: DE ORACLE SQL A MONGODB
```
- **Fuente:** Sans-serif, negrita, 48-54pt
- **Color:** #1a1a2e (azul oscuro) o #8B4513 (chocolate)
- **Posición:** Centro superior, centrado

### Subtítulo:
```
Transformando el Sistema de Gestión de Pastelería para el Crecimiento Escalable
```
- **Fuente:** Sans-serif, semibold, 28-32pt
- **Color:** #00CED1 (cyan/teal)
- **Posición:** Debajo del título principal, centrado

### Texto Secundario:
```
Pastelería Mil Sabores
```
- **Fuente:** Sans-serif, regular, 24pt
- **Color:** #FF69B4 (rosa/magenta)
- **Posición:** Arriba del título principal, centrado

### Integrantes:
```
Por: Nicole Chávez | Nicolás Barra
Profesor: Christian Acuña
```
- **Fuente:** Sans-serif, regular, 18pt
- **Color:** #FF69B4 (rosa/magenta)
- **Posición:** Parte inferior izquierda

### Elementos Visuales:
- **Logo:** Pastel con velas (si disponible) - parte superior izquierda
- **Fondo:** Color crema claro (#FFF8DC) o blanco
- **Patrón:** Puntos rosados sutiles dispersos
- **Iconos:** Base de datos (lado derecho), flechas de transformación

---

## DIAPOSITIVA 2: OBJETIVOS DEL VIDEO

### Título:
```
¿Qué veremos en este video?
```
- **Fuente:** Sans-serif, negrita, 42pt
- **Color:** #1a1a2e
- **Posición:** Centro superior

### Lista de Objetivos (con checkmarks):
```
✅ Introducción a MongoDB y NoSQL
✅ Modelamiento de datos
✅ Operaciones CRUD
✅ Consultas avanzadas con aggregate()
```
- **Fuente:** Sans-serif, regular, 28pt
- **Color texto:** #333333
- **Color checkmarks:** #28a745 (verde)
- **Posición:** Centro de la diapositiva
- **Espaciado:** 20pt entre items
- **Animación:** Aparecer uno por uno

### Diseño:
- **Fondo:** Blanco (#FFFFFF)
- **Bordes:** Sin bordes
- **Iconos:** Checkmarks grandes (✓) antes de cada punto

---

## DIAPOSITIVA 3: MODELO ORACLE → MONGODB (COMBINADA)

### Título:
```
Modelo Oracle → MongoDB
```
- **Fuente:** Sans-serif, negrita, 40pt
- **Color:** #1a1a2e
- **Posición:** Centro superior

### LADO IZQUIERDO - Modelo Oracle (50% del ancho):

#### Tabla: CATEGORIAS
```
┌─────────────────────┐
│   CATEGORIAS        │
├─────────────────────┤
│ id_categoria (PK)   │
│ slug                │
│ nombre              │
│ icono               │
└─────────────────────┘
```
- **Color fondo:** #E8F4F8 (azul claro)
- **Color borde:** #4A90E2 (azul)
- **Datos ejemplo:**
  - id_categoria: 1
  - slug: "tortas-cuadradas"
  - nombre: "Tortas Cuadradas"
  - icono: "fas fa-square"

#### Tabla: PRODUCTOS
```
┌─────────────────────┐
│   PRODUCTOS         │
├─────────────────────┤
│ id_producto (PK)    │
│ id_categoria (FK) ───┼──→ CATEGORIAS
│ nombre              │
│ precio              │
│ stock               │
│ descripcion_corta   │
│ imagen              │
└─────────────────────┘
```
- **Color fondo:** #E8F4F8
- **Color borde:** #4A90E2
- **Relación:** Flecha desde id_categoria hacia CATEGORIAS
- **Datos ejemplo:**
  - id_producto: 1
  - id_categoria: 1
  - nombre: "Torta Cuadrada de Chocolate"
  - precio: 45990
  - stock: 100

#### Tabla: CLIENTES
```
┌─────────────────────┐
│   CLIENTES          │
├─────────────────────┤
│ id_cliente (PK)     │
│ nombre              │
│ apellido_paterno    │
│ apellido_materno    │
│ correo (UNIQUE)      │
│ direccion           │
│ telefono            │
│ fecha_creacion       │
└─────────────────────┘
```
- **Color fondo:** #E8F4F8
- **Color borde:** #4A90E2
- **Datos ejemplo:**
  - id_cliente: 1
  - nombre: "María"
  - apellido_paterno: "García"
  - correo: "maria@example.com"

#### Tabla: PEDIDOS
```
┌─────────────────────┐
│   PEDIDOS           │
├─────────────────────┤
│ id_pedido (PK)      │
│ id_cliente (FK) ────┼──→ CLIENTES
│ id_estado (FK)      │
│ fecha_pedido        │
│ total               │
└─────────────────────┘
```
- **Color fondo:** #E8F4F8
- **Color borde:** #4A90E2
- **Relaciones:** 
  - Flecha desde id_cliente hacia CLIENTES
  - Flecha desde id_estado hacia PEDIDOS_ESTADOS

#### Tabla: PEDIDOS_DETALLES
```
┌─────────────────────┐
│ PEDIDOS_DETALLES    │
├─────────────────────┤
│ id_detalle (PK)     │
│ id_pedido (FK) ─────┼──→ PEDIDOS
│ id_producto (FK) ───┼──→ PRODUCTOS
│ cantidad            │
└─────────────────────┘
```
- **Color fondo:** #E8F4F8
- **Color borde:** #4A90E2
- **Relaciones:** 
  - Flecha desde id_pedido hacia PEDIDOS
  - Flecha desde id_producto hacia PRODUCTOS

#### Tabla: PEDIDOS_ESTADOS
```
┌─────────────────────┐
│ PEDIDOS_ESTADOS     │
├─────────────────────┤
│ id_estado (PK)      │
│ estado              │
└─────────────────────┘
```
- **Color fondo:** #E8F4F8
- **Color borde:** #4A90E2
- **Datos ejemplo:**
  - id_estado: 1, estado: "Pendiente"
  - id_estado: 2, estado: "En Preparacion"
  - id_estado: 3, estado: "Enviado"
  - id_estado: 4, estado: "Entregado"
  - id_estado: 5, estado: "Cancelado"

### LADO DERECHO - Modelo MongoDB (50% del ancho):

#### Colección: categorias
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  slug: "tortas-cuadradas",
  nombre: "Tortas Cuadradas",
  icono: "fas fa-square"
}
```
- **Color fondo:** #FFF0F5 (rosa claro)
- **Color borde:** #FF69B4 (rosa)
- **Formato:** Código JSON con syntax highlighting

#### Colección: productos
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439012"),
  categoria: {
    _id: ObjectId("507f1f77bcf86cd799439011"),
    nombre: "Tortas Cuadradas",
    slug: "tortas-cuadradas"
  },
  nombre: "Torta Cuadrada de Chocolate",
  precio: 45990,
  stock: 100,
  descripcion_corta: "Deliciosa torta de chocolate",
  imagen: "https://example.com/torta.jpg"
}
```
- **Color fondo:** #FFF0F5
- **Color borde:** #FF69B4
- **Nota:** Mostrar categoría embebida (no referencia)

#### Colección: clientes
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439013"),
  nombre: "María",
  apellido_paterno: "García",
  apellido_materno: "López",
  correo: "maria@example.com",
  direccion: "Av. Principal 456",
  telefono: "+56987654321",
  fecha_creacion: ISODate("2025-01-15T10:30:00Z")
}
```
- **Color fondo:** #FFF0F5
- **Color borde:** #FF69B4

#### Colección: pedidos
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439014"),
  cliente: {
    _id: ObjectId("507f1f77bcf86cd799439013"),
    nombre_completo: "María García López"
  },
  estado: "Pendiente",
  fecha_pedido: ISODate("2025-01-15T14:00:00Z"),
  total: 64980,
  detalles: [
    {
      producto: {
        _id: ObjectId("507f1f77bcf86cd799439012"),
        nombre: "Torta Cuadrada de Chocolate",
        precio: 45990
      },
      cantidad: 1,
      subtotal: 45990
    },
    {
      producto: {
        _id: ObjectId("507f1f77bcf86cd799439015"),
        nombre: "Torta de Vainilla",
        precio: 18990
      },
      cantidad: 1,
      subtotal: 18990
    }
  ]
}
```
- **Color fondo:** #FFF0F5
- **Color borde:** #FF69B4
- **Nota:** Mostrar detalles embebidos como array

### DECISIONES CLAVE (Parte inferior, centrado):

#### Texto de Decisiones:
```
📦 Detalles embebidos en pedidos
   → Los detalles siempre se consultan con el pedido

🔄 Denormalización estratégica
   → Campos duplicados para consultas rápidas

🔗 Referencias para entidades grandes
   → Productos y clientes se referencian, no se embeben
```
- **Fuente:** Sans-serif, regular, 20pt
- **Color texto:** #333333
- **Iconos:** 📦 🔄 🔗 (emojis o iconos)
- **Posición:** Parte inferior, centrado
- **Fondo:** #F5F5F5 (gris muy claro)

### Flecha de Transformación:
- **Desde:** Lado izquierdo (Oracle)
- **Hacia:** Lado derecho (MongoDB)
- **Estilo:** Flecha doble (↔) o flecha simple (→)
- **Color:** #FF69B4 (rosa)
- **Grosor:** 3px
- **Posición:** Centro horizontal, entre ambos lados

### Diseño General:
- **Fondo:** Blanco (#FFFFFF)
- **Divisor vertical:** Línea punteada gris (#CCCCCC) en el centro
- **Título sección Oracle:** "Oracle SQL" - arriba izquierda, 24pt
- **Título sección MongoDB:** "MongoDB" - arriba derecha, 24pt

---

## DIAPOSITIVA 4: OPERACIONES CREATE

### Título:
```
Operaciones CREATE
```
- **Fuente:** Sans-serif, negrita, 42pt
- **Color:** #1a1a2e
- **Posición:** Centro superior

### Subtítulo:
```
Insertar Documentos
```
- **Fuente:** Sans-serif, semibold, 28pt
- **Color:** #666666
- **Posición:** Debajo del título

### Sección: insertOne()
```
insertOne()
```
- **Fuente:** Monospace, negrita, 32pt
- **Color:** #4A90E2 (azul)
- **Posición:** Lado izquierdo, 30% del ancho

#### Ejemplo de Código:
```javascript
db.clientes.insertOne({
  nombre: "María",
  apellido_paterno: "García",
  apellido_materno: "López",
  correo: "maria.garcia@example.com",
  direccion: "Av. Principal 456",
  telefono: "+56987654321",
  fecha_creacion: new Date()
})
```
- **Fuente:** Monospace, 16pt
- **Color fondo código:** #F5F5F5
- **Color borde:** #CCCCCC
- **Syntax highlighting:** JavaScript
- **Posición:** Debajo de insertOne()

#### Resultado:
```json
{
  "acknowledged": true,
  "insertedId": ObjectId("507f1f77bcf86cd799439013")
}
```
- **Fuente:** Monospace, 14pt
- **Color:** #28a745 (verde)
- **Posición:** Debajo del código

### Sección: insertMany()
```
insertMany()
```
- **Fuente:** Monospace, negrita, 32pt
- **Color:** #4A90E2
- **Posición:** Lado derecho, 30% del ancho

#### Ejemplo de Código:
```javascript
db.productos.insertMany([
  {
    categoria: {
      _id: ObjectId("507f1f77bcf86cd799439011"),
      nombre: "Tortas Cuadradas",
      slug: "tortas-cuadradas"
    },
    nombre: "Torta de Chocolate Premium",
    precio: 45990,
    stock: 100,
    descripcion_corta: "Deliciosa torta de chocolate",
    imagen: "https://example.com/torta.jpg"
  },
  {
    categoria: {
      _id: ObjectId("507f1f77bcf86cd799439011"),
      nombre: "Tortas Cuadradas",
      slug: "tortas-cuadradas"
    },
    nombre: "Torta de Vainilla",
    precio: 18990,
    stock: 80,
    descripcion_corta: "Torta tradicional de vainilla",
    imagen: "https://example.com/vainilla.jpg"
  }
])
```
- **Fuente:** Monospace, 14pt
- **Color fondo código:** #F5F5F5
- **Posición:** Debajo de insertMany()

#### Resultado:
```json
{
  "acknowledged": true,
  "insertedIds": [
    ObjectId("507f1f77bcf86cd799439012"),
    ObjectId("507f1f77bcf86cd799439016")
  ]
}
```
- **Fuente:** Monospace, 14pt
- **Color:** #28a745
- **Posición:** Debajo del código

### Iconos:
- ➕ Icono de inserción (lado izquierdo)
- 📝 Icono de documento (lado derecho)

### Diseño:
- **Fondo:** Blanco
- **Layout:** Dos columnas (50% cada una)
- **Separador:** Línea vertical punteada en el centro

---

## DIAPOSITIVA 5: OPERACIONES READ

### Título:
```
Operaciones READ
```
- **Fuente:** Sans-serif, negrita, 42pt
- **Color:** #1a1a2e
- **Posición:** Centro superior

### Subtítulo:
```
Consultar Documentos
```
- **Fuente:** Sans-serif, semibold, 28pt
- **Color:** #666666

### Sección: find() y findOne()
```
find()          → Múltiples documentos
findOne()       → Un solo documento
```
- **Fuente:** Monospace, 24pt
- **Color:** #4A90E2
- **Posición:** Centro superior (debajo del subtítulo)

### Tabla de Operadores:

| Operador | Significado | Ejemplo | Uso |
|----------|-------------|---------|-----|
| **$gt** | Mayor que | `{ precio: { $gt: 20000 } }` | Filtros numéricos |
| **$lt** | Menor que | `{ stock: { $lt: 50 } }` | Filtros numéricos |
| **$ne** | No igual | `{ estado: { $ne: "Cancelado" } }` | Excluir valores |
| **$in** | En lista | `{ categoria: { $in: ["A", "B"] } }` | Múltiples valores |
| **$nin** | No en lista | `{ categoria: { $nin: ["C"] } }` | Excluir múltiples |
| **$regex** | Expresión regular | `{ nombre: { $regex: /chocolate/i } }` | Búsqueda texto |

- **Fuente tabla:** Sans-serif, 18pt (encabezados), 16pt (contenido)
- **Color encabezados:** #4A90E2 (fondo), #FFFFFF (texto)
- **Color filas alternadas:** #F5F5F5 y #FFFFFF
- **Color borde:** #CCCCCC
- **Ancho:** 90% del ancho de la diapositiva
- **Posición:** Centro

### Ejemplos Visuales (debajo de la tabla):

#### Ejemplo 1: $gt
```javascript
db.productos.find({ precio: { $gt: 20000 } })
```
- **Resultado esperado:** Productos con precio > 20000
- **Color código:** #4A90E2

#### Ejemplo 2: $regex
```javascript
db.productos.find({ nombre: { $regex: /chocolate/i } })
```
- **Resultado esperado:** Productos con "chocolate" en el nombre
- **Color código:** #4A90E2
- **Nota:** La 'i' significa case insensitive

### Iconos:
- 🔍 Icono de búsqueda (lado superior derecho)

### Diseño:
- **Fondo:** Blanco
- **Tabla:** Con bordes y sombra sutil

---

## DIAPOSITIVA 6: OPERACIONES UPDATE

### Título:
```
Operaciones UPDATE
```
- **Fuente:** Sans-serif, negrita, 42pt
- **Color:** #1a1a2e

### Subtítulo:
```
Actualizar Documentos
```
- **Fuente:** Sans-serif, semibold, 28pt
- **Color:** #666666

### Sección: updateOne()
```
updateOne()
```
- **Fuente:** Monospace, negrita, 32pt
- **Color:** #FFA500 (naranja)

#### Ejemplo ANTES:
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439012"),
  "nombre": "Torta de Chocolate",
  "precio": 45990,
  "stock": 100
}
```
- **Color fondo:** #FFF5E6 (naranja muy claro)
- **Etiqueta:** "ANTES" en rojo

#### Comando:
```javascript
db.productos.updateOne(
  { _id: ObjectId("507f1f77bcf86cd799439012") },
  { $inc: { stock: -5 } }
)
```
- **Color código:** #FFA500

#### Ejemplo DESPUÉS:
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439012"),
  "nombre": "Torta de Chocolate",
  "precio": 45990,
  "stock": 95
}
```
- **Color fondo:** #E6F7E6 (verde muy claro)
- **Etiqueta:** "DESPUÉS" en verde
- **Cambio resaltado:** stock: 100 → 95 (en rojo/verde)

### Sección: updateMany()
```
updateMany()
```
- **Fuente:** Monospace, negrita, 32pt
- **Color:** #FFA500

#### Ejemplo:
```javascript
db.productos.updateMany(
  { "categoria.slug": "tortas-cuadradas" },
  { $set: { descuento: 10 } }
)
```
- **Resultado:**
```json
{
  "acknowledged": true,
  "modifiedCount": 5
}
```
- **Color:** #28a745

### Operadores:
```
$set   → Establecer valor
$inc   → Incrementar/Decrementar
$push  → Agregar a array
$pull  → Remover de array
```
- **Fuente:** Monospace, 20pt
- **Color:** #666666
- **Posición:** Parte inferior

### Iconos:
- ✏️ Icono de edición (lado superior derecho)
- ⬆️⬇️ Iconos de incremento/decremento

### Diseño:
- **Fondo:** Blanco
- **Layout:** Vertical, antes/después claramente separados
- **Flecha:** De ANTES a DESPUÉS (→)

---

## DIAPOSITIVA 7: OPERACIONES DELETE

### Título:
```
Operaciones DELETE
```
- **Fuente:** Sans-serif, negrita, 42pt
- **Color:** #1a1a2e

### Subtítulo:
```
Eliminar Documentos
```
- **Fuente:** Sans-serif, semibold, 28pt
- **Color:** #666666

### ⚠️ ADVERTENCIA (Destacada):
```
⚠️ Las eliminaciones son PERMANENTES
```
- **Fuente:** Sans-serif, negrita, 32pt
- **Color texto:** #DC3545 (rojo)
- **Color fondo:** #FFE6E6 (rojo muy claro)
- **Borde:** Rojo, 3px
- **Posición:** Centro superior (debajo del subtítulo)
- **Icono:** ⚠️ Triángulo de advertencia

### Sección: deleteOne()
```
deleteOne()
```
- **Fuente:** Monospace, negrita, 32pt
- **Color:** #DC3545 (rojo)

#### Ejemplo:
```javascript
db.clientes.deleteOne({ correo: "test@example.com" })
```
- **Resultado:**
```json
{
  "acknowledged": true,
  "deletedCount": 1
}
```
- **Color:** #DC3545

### Sección: deleteMany()
```
deleteMany()
```
- **Fuente:** Monospace, negrita, 32pt
- **Color:** #DC3545

#### Ejemplo:
```javascript
db.pedidos.deleteMany({ 
  estado: "Cancelado",
  fecha_pedido: { $lt: new Date("2024-01-01") }
})
```
- **Resultado:**
```json
{
  "acknowledged": true,
  "deletedCount": 3
}
```
- **Color:** #DC3545

### Nota Importante:
```
Siempre verificar el filtro antes de ejecutar deleteMany()
```
- **Fuente:** Sans-serif, italic, 18pt
- **Color:** #666666
- **Posición:** Parte inferior

### Iconos:
- 🗑️ Icono de basura (lado superior derecho)
- ❌ Icono de X (en advertencia)

### Diseño:
- **Fondo:** Blanco
- **Énfasis:** Advertencia muy visible
- **Colores:** Rojo para operaciones DELETE

---

## DIAPOSITIVA 8: CONSULTAS AVANZADAS - AGGREGATE

### Título:
```
Consultas Avanzadas
```
- **Fuente:** Sans-serif, negrita, 42pt
- **Color:** #1a1a2e

### Subtítulo:
```
Pipeline de Agregación
```
- **Fuente:** Sans-serif, semibold, 28pt
- **Color:** #666666

### Concepto:
```
Procesa documentos a través de ETAPAS (pipeline)
```
- **Fuente:** Sans-serif, regular, 22pt
- **Color:** #333333
- **Posición:** Debajo del subtítulo

### Diagrama de Pipeline (Visual):

```
Documentos → [$match] → [$unwind] → [$group] → [$sort] → [$limit] → Resultado
```

- **Estilo:** Flechas entre cajas
- **Color cajas:** #4A90E2 (azul)
- **Color texto:** #FFFFFF
- **Color flechas:** #666666
- **Forma:** Rectángulos redondeados
- **Tamaño:** Cada caja 120px x 60px
- **Espaciado:** 20px entre cajas

### Operadores Principales:

#### Tabla de Operadores:

| Operador | Función | Ejemplo |
|----------|---------|---------|
| **$match** | Filtrar documentos | `{ stock: { $lt: 20 } }` |
| **$unwind** | Descomponer arrays | `"$detalles"` |
| **$group** | Agrupar y calcular | `{ _id: "$categoria", total: { $sum: "$precio" } }` |
| **$sort** | Ordenar resultados | `{ total: -1 }` |
| **$limit** | Limitar cantidad | `5` |
| **$project** | Seleccionar campos | `{ nombre: 1, precio: 1 }` |
| **$lookup** | Hacer "JOIN" | `{ from: "clientes", localField: "cliente_id", foreignField: "_id", as: "cliente_info" }` |

- **Fuente:** Sans-serif, 16pt
- **Color encabezados:** #4A90E2 (fondo), #FFFFFF (texto)
- **Color filas:** Alternadas #F5F5F5 y #FFFFFF

### Ejemplo Completo de Pipeline:

#### Consulta: Top 5 Productos Más Vendidos
```javascript
db.pedidos.aggregate([
  { $unwind: "$detalles" },
  { $group: {
      _id: "$detalles.producto.nombre",
      total_vendido: { $sum: "$detalles.cantidad" }
  }},
  { $sort: { total_vendido: -1 } },
  { $limit: 5 }
])
```

#### Resultado Esperado:
```json
[
  { "_id": "Torta de Chocolate", "total_vendido": 25 },
  { "_id": "Torta de Vainilla", "total_vendido": 18 },
  { "_id": "Mousse de Chocolate", "total_vendido": 15 },
  { "_id": "Tiramisú Clásico", "total_vendido": 12 },
  { "_id": "Torta de Frutilla", "total_vendido": 10 }
]
```

- **Fuente código:** Monospace, 14pt
- **Color fondo código:** #F5F5F5
- **Syntax highlighting:** JavaScript

### Explicación Visual:
- **Etapa 1 ($unwind):** Mostrar array descompuesto
- **Etapa 2 ($group):** Mostrar agrupación
- **Etapa 3 ($sort):** Mostrar ordenamiento
- **Etapa 4 ($limit):** Mostrar límite aplicado

### Iconos:
- 🔄 Icono de pipeline/proceso (lado superior derecho)
- 📊 Icono de gráfico (lado inferior)

### Diseño:
- **Fondo:** Blanco
- **Layout:** Vertical
- **Diagrama:** Horizontal en la parte superior
- **Tabla y código:** Debajo del diagrama

---

## DIAPOSITIVA 9: RESUMEN

### Título:
```
Resumen
```
- **Fuente:** Sans-serif, negrita, 48pt
- **Color:** #1a1a2e
- **Posición:** Centro superior

### Lista de Logros (con checkmarks):

```
✅ Migración Oracle → MongoDB
   • Modelamiento con documentos embebidos
   • Denormalización estratégica
   • Referencias para entidades grandes

✅ CRUD Completo Demostrado
   • CREATE: insertOne(), insertMany()
   • READ: find(), findOne() con operadores ($gt, $lt, $ne, $in, $nin, $regex)
   • UPDATE: updateOne(), updateMany()
   • DELETE: deleteOne(), deleteMany()

✅ Consultas Avanzadas con aggregate()
   • Top productos más vendidos
   • Ventas por categoría
   • Clientes con mayor gasto
   • Productos con stock crítico
```
- **Fuente:** Sans-serif, 24pt (títulos), 18pt (subitems)
- **Color checkmarks:** #28a745 (verde)
- **Color texto:** #333333
- **Espaciado:** 15pt entre items principales
- **Indentación:** 20px para subitems

### Entregables:
```
📹 Video (10-12 minutos)
📊 Presentación (esta diapositiva)
📄 Script completo MongoDB
```
- **Fuente:** Sans-serif, 22pt
- **Color:** #666666
- **Iconos:** 📹 📊 📄
- **Posición:** Parte inferior

### Diseño:
- **Fondo:** Blanco o crema muy claro (#FFF8DC)
- **Layout:** Vertical, centrado
- **Checkmarks:** Grandes y visibles
- **Animación:** Aparecer uno por uno (opcional)

---

## ESPECIFICACIONES DE DISEÑO GENERAL

### Paleta de Colores:
- **Principal:** #FF69B4 (Rosa/Magenta)
- **Secundario:** #FFF8DC (Crema)
- **Acento:** #8B4513 (Chocolate)
- **Texto oscuro:** #1a1a2e (Azul oscuro)
- **Texto medio:** #333333 (Gris oscuro)
- **Texto claro:** #666666 (Gris)
- **Éxito:** #28a745 (Verde)
- **Advertencia:** #DC3545 (Rojo)
- **Info:** #4A90E2 (Azul)
- **Fondo:** #FFFFFF (Blanco) o #FFF8DC (Crema)

### Tipografía:
- **Títulos:** Sans-serif (Arial, Helvetica, Calibri), Negrita, 36-48pt
- **Subtítulos:** Sans-serif, Semibold, 24-30pt
- **Cuerpo:** Sans-serif, Regular, 18-22pt
- **Código:** Monospace (Consolas, Courier New), 14-16pt

### Elementos Visuales:
- **Bordes:** 2-3px, colores según sección
- **Sombras:** Sutiles (2px blur, 10% opacidad)
- **Esquinas:** Redondeadas (5-10px radius)
- **Espaciado:** Mínimo 20px entre elementos
- **Iconos:** Tamaño 32-48px, alineados con texto

### Animaciones (Opcional):
- **Entrada:** Fade in (0.5s)
- **Bullet points:** Aparecer uno por uno (0.3s cada uno)
- **Transiciones:** Slide o fade (0.5s)

---

## INSTRUCCIONES PARA IA GENERADORA

### Para Diagramas de Tablas (Oracle):
1. Crear cajas rectangulares con bordes
2. Nombre de tabla en la parte superior (negrita)
3. Campos listados verticalmente
4. PK (Primary Key) marcado con (PK)
5. FK (Foreign Key) marcado con (FK) y flecha hacia tabla relacionada
6. Colores: Azul claro para fondo, azul para borde

### Para Documentos JSON (MongoDB):
1. Usar formato de código JSON
2. Syntax highlighting (claves en un color, valores en otro)
3. Mostrar estructura anidada con indentación
4. Arrays con corchetes []
5. Objetos con llaves {}
6. Colores: Rosa claro para fondo, rosa para borde

### Para Tablas Comparativas:
1. Encabezados con fondo de color
2. Filas alternadas para legibilidad
3. Bordes visibles
4. Alineación: texto izquierda, números derecha

### Para Código:
1. Monospace font
2. Fondo gris claro (#F5F5F5)
3. Borde sutil
4. Syntax highlighting cuando sea posible
5. Indentación clara

---

**¡Listo para generar las diapositivas! 🎨**

