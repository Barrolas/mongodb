# 🎥 Instrucciones Detalladas para Captura de Video
## Pastelería Mil Sabores - MongoDB

**Nota:** Algunas partes son diapositivas, otras son capturas de pantalla de MongoDB Compass

---

## DIAPOSITIVA 1: PORTADA

### Contenido a Mostrar:
- **Título:** "MIGRACIÓN DE BASE DE DATOS: DE ORACLE SQL A MONGODB"
- **Subtítulo:** "Transformando el Sistema de Gestión de Pastelería para el Crecimiento Escalable"
- **Texto secundario:** "Pastelería Mil Sabores"
- **Integrantes:** "Por: Nicole Chávez | Nicolás Barra"
- **Profesor:** "Profesor: Christian Acuña"

### Diagramación:
- Título centrado arriba
- Subtítulo centrado debajo del título
- Integrantes abajo izquierda
- Logo/icono pastelería (opcional) arriba izquierda

---

## DIAPOSITIVA 2: OBJETIVOS

### Contenido a Mostrar:
- **Título:** "¿Qué veremos en este video?"
- **Lista:**
  - ✅ Introducción a MongoDB y NoSQL
  - ✅ Modelamiento de datos
  - ✅ Operaciones CRUD
  - ✅ Consultas avanzadas con aggregate()

### Diagramación:
- Título arriba
- Lista centrada verticalmente
- Checkmarks antes de cada item

---

## DIAPOSITIVA 3: MODELO ORACLE → MONGODB

### Contenido a Mostrar:

#### LADO IZQUIERDO - Oracle (50% ancho):

**Tabla CATEGORIAS:**
```
CATEGORIAS
├─ id_categoria (PK)
├─ slug
├─ nombre
└─ icono
```

**Tabla PRODUCTOS:**
```
PRODUCTOS
├─ id_producto (PK)
├─ id_categoria (FK) → CATEGORIAS
├─ nombre
├─ precio
├─ stock
├─ descripcion_corta
└─ imagen
```

**Tabla CLIENTES:**
```
CLIENTES
├─ id_cliente (PK)
├─ nombre
├─ apellido_paterno
├─ apellido_materno
├─ correo (UNIQUE)
├─ direccion
├─ telefono
└─ fecha_creacion
```

**Tabla PEDIDOS:**
```
PEDIDOS
├─ id_pedido (PK)
├─ id_cliente (FK) → CLIENTES
├─ id_estado (FK) → PEDIDOS_ESTADOS
├─ fecha_pedido
└─ total
```

**Tabla PEDIDOS_DETALLES:**
```
PEDIDOS_DETALLES
├─ id_detalle (PK)
├─ id_pedido (FK) → PEDIDOS
├─ id_producto (FK) → PRODUCTOS
└─ cantidad
```

**Tabla PEDIDOS_ESTADOS:**
```
PEDIDOS_ESTADOS
├─ id_estado (PK)
└─ estado
```

**Relaciones:**
- PRODUCTOS.id_categoria → CATEGORIAS.id_categoria
- PEDIDOS.id_cliente → CLIENTES.id_cliente
- PEDIDOS.id_estado → PEDIDOS_ESTADOS.id_estado
- PEDIDOS_DETALLES.id_pedido → PEDIDOS.id_pedido
- PEDIDOS_DETALLES.id_producto → PRODUCTOS.id_producto

#### LADO DERECHO - MongoDB (50% ancho):

**Colección: categorias**
```json
{
  "_id": ObjectId("..."),
  "slug": "tortas-cuadradas",
  "nombre": "Tortas Cuadradas",
  "icono": "fas fa-square"
}
```

**Colección: productos**
```json
{
  "_id": ObjectId("..."),
  "categoria": {
    "_id": ObjectId("..."),
    "nombre": "Tortas Cuadradas",
    "slug": "tortas-cuadradas"
  },
  "nombre": "Torta Cuadrada de Chocolate",
  "precio": 45990,
  "stock": 100
}
```

**Colección: clientes**
```json
{
  "_id": ObjectId("..."),
  "nombre": "María",
  "apellido_paterno": "García",
  "correo": "maria@example.com",
  "telefono": "+56987654321"
}
```

**Colección: pedidos**
```json
{
  "_id": ObjectId("..."),
  "cliente": {
    "_id": ObjectId("..."),
    "nombre_completo": "María García López"
  },
  "estado": "Pendiente",
  "fecha_pedido": ISODate("2025-01-15"),
  "total": 64980,
  "detalles": [
    {
      "producto": {
        "_id": ObjectId("..."),
        "nombre": "Torta Cuadrada de Chocolate",
        "precio": 45990
      },
      "cantidad": 1,
      "subtotal": 45990
    }
  ]
}
```

#### DECISIONES CLAVE (abajo):
1. **Detalles embebidos en pedidos** → Los detalles siempre se consultan con el pedido
2. **Denormalización estratégica** → Campos duplicados para consultas rápidas
3. **Referencias para entidades grandes** → Productos y clientes se referencian, no se embeben

### Diagramación:
- División 50/50 vertical
- Oracle izquierda, MongoDB derecha
- Flecha de transformación en el centro
- Decisiones en la parte inferior

---

## CAPTURA DE VIDEO 1: ESTRUCTURA MONGODB EN COMPASS

### Acciones a Realizar:
1. **Abrir MongoDB Compass**
   - Mostrar conexión: `mongodb://localhost:27017`
   - Mostrar base de datos: `mil_sabores`

2. **Navegar a colección `pedidos`**
   - Clic en la colección
   - Mostrar lista de documentos

3. **Abrir un documento de pedido**
   - Clic en un documento
   - Expandir completamente

4. **Mostrar estructura:**
   - Señalar campo `cliente` (objeto con referencia)
   - Señalar campo `detalles` (array)
   - Expandir un elemento del array `detalles`
   - Mostrar que cada detalle tiene `producto` embebido

5. **Explicar visualmente:**
   - "Aquí vemos el cliente referenciado"
   - "Y aquí los detalles embebidos como array"
   - "Todo en un solo documento"

### Qué Capturar:
- Pantalla completa de Compass
- Documento expandido
- Cursor señalando elementos clave
- Zoom en la estructura de detalles

---

## DIAPOSITIVA 4: OPERACIONES CREATE

### Contenido a Mostrar:

**Título:** "Operaciones CREATE - Insertar Documentos"

**insertOne():**
```javascript
db.clientes.insertOne({
  nombre: "María",
  apellido_paterno: "García",
  correo: "maria@example.com",
  fecha_creacion: new Date()
})
```

**Resultado:**
```json
{
  "acknowledged": true,
  "insertedId": ObjectId("...")
}
```

**insertMany():**
```javascript
db.productos.insertMany([
  { nombre: "Torta A", precio: 30000, stock: 50 },
  { nombre: "Torta B", precio: 25000, stock: 30 }
])
```

**Resultado:**
```json
{
  "acknowledged": true,
  "insertedIds": [ObjectId("..."), ObjectId("...")]
}
```

### Diagramación:
- Título arriba
- Dos columnas: insertOne() izquierda, insertMany() derecha
- Código con resultado debajo de cada uno

---

## CAPTURA DE VIDEO 2: CREATE EN COMPASS

### Acciones a Realizar:

#### Parte 1: insertOne()
1. **Abrir colección `clientes`**
2. **Abrir consola mongosh** (parte inferior de Compass)
3. **Escribir comando:**
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
4. **Ejecutar** (Enter)
5. **Mostrar resultado** en la consola
6. **Refrescar vista de documentos** (F5)
7. **Mostrar documento creado** en la tabla

#### Parte 2: insertMany()
1. **Cambiar a colección `productos`**
2. **En consola, escribir:**
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
       descripcion_corta: "Deliciosa torta de chocolate"
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
       descripcion_corta: "Torta tradicional de vainilla"
     }
   ])
   ```
3. **Ejecutar**
4. **Mostrar resultado** con múltiples IDs
5. **Mostrar documentos insertados** en la tabla

#### Parte 3: Pedido Completo
1. **Cambiar a colección `pedidos`**
2. **En consola, escribir:**
   ```javascript
   db.pedidos.insertOne({
     cliente: {
       _id: ObjectId("507f1f77bcf86cd799439013"),
       nombre_completo: "María García López"
     },
     estado: "Pendiente",
     fecha_pedido: new Date(),
     total: 64980,
     detalles: [
       {
         producto: {
           _id: ObjectId("507f1f77bcf86cd799439012"),
           nombre: "Torta de Chocolate Premium",
           precio: 45990
         },
         cantidad: 1,
         subtotal: 45990
       },
       {
         producto: {
           _id: ObjectId("507f1f77bcf86cd799439016"),
           nombre: "Torta de Vainilla",
           precio: 18990
         },
         cantidad: 1,
         subtotal: 18990
       }
     ]
   })
   ```
3. **Ejecutar**
4. **Mostrar documento creado**
5. **Expandir array `detalles`**
6. **Mostrar estructura completa**

### Qué Capturar:
- Consola con comando visible
- Ejecución del comando
- Resultado en consola
- Vista de documentos actualizada
- Documento expandido (especialmente para pedido)

---

## DIAPOSITIVA 5: OPERACIONES READ

### Contenido a Mostrar:

**Título:** "Operaciones READ - Consultar Documentos"

**Tabla de Operadores:**

| Operador | Significado | Ejemplo |
|----------|-------------|---------|
| $gt | Mayor que | `{ precio: { $gt: 20000 } }` |
| $lt | Menor que | `{ stock: { $lt: 50 } }` |
| $ne | No igual | `{ estado: { $ne: "Cancelado" } }` |
| $in | En lista | `{ categoria: { $in: ["A", "B"] } }` |
| $nin | No en lista | `{ categoria: { $nin: ["C"] } }` |
| $regex | Expresión regular | `{ nombre: { $regex: /chocolate/i } }` |

**Ejemplos:**
- `db.productos.find()` - Todos los productos
- `db.productos.findOne({ nombre: "..." })` - Un producto

### Diagramación:
- Título arriba
- Tabla centrada
- Ejemplos debajo de la tabla

---

## CAPTURA DE VIDEO 3: READ EN COMPASS

### Acciones a Realizar:

#### Parte 1: find() y findOne()
1. **Colección `productos`**
2. **Consola:**
   ```javascript
   db.productos.find()
   ```
3. **Ejecutar y mostrar** todos los documentos en la tabla
4. **Consola:**
   ```javascript
   db.productos.findOne({ nombre: "Torta de Chocolate Premium" })
   ```
5. **Ejecutar y mostrar** un solo documento

#### Parte 2: Operadores $gt, $lt, $ne
1. **Filtro visual o consola:**
   ```javascript
   db.productos.find({ precio: { $gt: 20000 } })
   ```
2. **Ejecutar y mostrar** resultados
3. **Consola:**
   ```javascript
   db.productos.find({ stock: { $lt: 50 } })
   ```
4. **Ejecutar y mostrar** resultados
5. **Colección `pedidos`, consola:**
   ```javascript
   db.pedidos.find({ estado: { $ne: "Cancelado" } })
   ```
6. **Ejecutar y mostrar** resultados

#### Parte 3: Operadores $in, $nin, $regex
1. **Consola:**
   ```javascript
   db.productos.find({ 
     "categoria.slug": { 
       $in: ["tortas-cuadradas", "tortas-circulares"] 
     }
   })
   ```
2. **Ejecutar y mostrar** resultados
3. **Consola:**
   ```javascript
   db.productos.find({ 
     "categoria.slug": { 
       $nin: ["productos-veganos"] 
     }
   })
   ```
4. **Ejecutar y mostrar** resultados
5. **Consola:**
   ```javascript
   db.productos.find({ 
     nombre: { $regex: /chocolate/i } 
   })
   ```
6. **Ejecutar y mostrar** resultados

### Qué Capturar:
- Filtro visual de Compass (si se usa)
- Consola con comandos
- Resultados en la tabla de documentos
- Cursor señalando resultados relevantes

---

## DIAPOSITIVA 6: OPERACIONES UPDATE

### Contenido a Mostrar:

**Título:** "Operaciones UPDATE - Actualizar Documentos"

**updateOne() con $inc:**
- **ANTES:** `{ stock: 100 }`
- **Comando:**
  ```javascript
  db.productos.updateOne(
    { _id: ObjectId("...") },
    { $inc: { stock: -5 } }
  )
  ```
- **DESPUÉS:** `{ stock: 95 }`

**updateMany():**
```javascript
db.productos.updateMany(
  { "categoria.slug": "tortas-cuadradas" },
  { $set: { descuento: 10 } }
)
```

**Resultado:**
```json
{
  "acknowledged": true,
  "modifiedCount": 5
}
```

**Operadores:**
- `$set` - Establecer valor
- `$inc` - Incrementar/Decrementar
- `$push` - Agregar a array
- `$pull` - Remover de array

### Diagramación:
- Título arriba
- Sección ANTES/DESPUÉS para updateOne()
- Código y resultado para updateMany()
- Lista de operadores abajo

---

## CAPTURA DE VIDEO 4: UPDATE EN COMPASS

### Acciones a Realizar:

#### Parte 1: updateOne() con $inc
1. **Colección `productos`**
2. **Buscar un producto específico**
3. **Mostrar documento ANTES** (ej: stock: 100)
4. **Consola:**
   ```javascript
   db.productos.updateOne(
     { _id: ObjectId("507f1f77bcf86cd799439012") },
     { $inc: { stock: -5 } }
   )
   ```
5. **Ejecutar**
6. **Mostrar resultado:** `{ acknowledged: true, modifiedCount: 1 }`
7. **Refrescar vista** (F5)
8. **Mostrar documento DESPUÉS** (ej: stock: 95)
9. **Comparar** antes/después claramente

#### Parte 2: updateMany()
1. **Consola:**
   ```javascript
   db.productos.updateMany(
     { "categoria.slug": "tortas-cuadradas" },
     { $set: { descuento: 10 } }
   )
   ```
2. **Ejecutar**
3. **Mostrar resultado:** `{ acknowledged: true, modifiedCount: 5 }`
4. **Verificar** documentos actualizados en la tabla

### Qué Capturar:
- Documento antes (stock: 100)
- Comando en consola
- Resultado de ejecución
- Documento después (stock: 95)
- Comparación lado a lado si es posible

---

## DIAPOSITIVA 7: OPERACIONES DELETE

### Contenido a Mostrar:

**Título:** "Operaciones DELETE - Eliminar Documentos"

**⚠️ ADVERTENCIA:** "Las eliminaciones son PERMANENTES"

**deleteOne():**
```javascript
db.clientes.deleteOne({ correo: "test@example.com" })
```

**Resultado:**
```json
{
  "acknowledged": true,
  "deletedCount": 1
}
```

**deleteMany():**
```javascript
db.pedidos.deleteMany({ 
  estado: "Cancelado",
  fecha_pedido: { $lt: new Date("2024-01-01") }
})
```

**Resultado:**
```json
{
  "acknowledged": true,
  "deletedCount": 3
}
```

**Nota:** "Siempre verificar el filtro antes de ejecutar deleteMany()"

### Diagramación:
- Título arriba
- Advertencia destacada (rojo/amarillo)
- Código y resultado para cada operación
- Nota al final

---

## CAPTURA DE VIDEO 5: DELETE EN COMPASS

### Acciones a Realizar:

#### Parte 1: deleteOne()
1. **Colección `clientes`**
2. **Mostrar documento** que se eliminará
3. **Consola:**
   ```javascript
   db.clientes.deleteOne({ correo: "test@example.com" })
   ```
4. **Ejecutar**
5. **Mostrar resultado:** `{ acknowledged: true, deletedCount: 1 }`
6. **Refrescar vista**
7. **Mostrar que el documento desapareció**

#### Parte 2: deleteMany()
1. **Colección `pedidos`**
2. **Aplicar filtro primero** para mostrar qué se eliminará:
   ```javascript
   db.pedidos.find({ 
     estado: "Cancelado",
     fecha_pedido: { $lt: new Date("2024-01-01") }
   })
   ```
3. **Contar documentos** que se eliminarán
4. **Consola:**
   ```javascript
   db.pedidos.deleteMany({ 
     estado: "Cancelado",
     fecha_pedido: { $lt: new Date("2024-01-01") }
   })
   ```
5. **Ejecutar**
6. **Mostrar resultado:** `{ acknowledged: true, deletedCount: 3 }`
7. **Refrescar y verificar** que desaparecieron

### Qué Capturar:
- Documento(s) antes de eliminar
- Filtro mostrando qué se eliminará
- Comando en consola
- Resultado con deletedCount
- Vista después (documentos desaparecidos)

---

## DIAPOSITIVA 8: CONSULTAS AVANZADAS - AGGREGATE

### Contenido a Mostrar:

**Título:** "Consultas Avanzadas - Pipeline de Agregación"

**Concepto:** "Procesa documentos a través de ETAPAS (pipeline)"

**Diagrama de Pipeline:**
```
Documentos → [$match] → [$unwind] → [$group] → [$sort] → [$limit] → Resultado
```

**Tabla de Operadores:**

| Operador | Función | Ejemplo |
|----------|---------|---------|
| $match | Filtrar | `{ stock: { $lt: 20 } }` |
| $unwind | Descomponer arrays | `"$detalles"` |
| $group | Agrupar y calcular | `{ _id: "$categoria", total: { $sum: "$precio" } }` |
| $sort | Ordenar | `{ total: -1 }` |
| $limit | Limitar | `5` |
| $project | Seleccionar campos | `{ nombre: 1, precio: 1 }` |
| $lookup | Hacer "JOIN" | `{ from: "clientes", ... }` |

**Ejemplo Completo:**
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

**Resultado Esperado:**
```json
[
  { "_id": "Torta de Chocolate", "total_vendido": 25 },
  { "_id": "Torta de Vainilla", "total_vendido": 18 },
  { "_id": "Mousse de Chocolate", "total_vendido": 15 }
]
```

### Diagramación:
- Título arriba
- Diagrama de pipeline horizontal
- Tabla de operadores centrada
- Ejemplo completo con resultado debajo

---

## CAPTURA DE VIDEO 6: AGGREGATE EN COMPASS

### Acciones a Realizar:

#### Consulta 1: Top 5 Productos Más Vendidos
1. **Colección `pedidos`**
2. **Abrir pestaña "Aggregations"** (interfaz visual)
3. **Agregar etapa 1: $unwind**
   - Campo: `detalles`
   - Ejecutar y mostrar resultados intermedios
4. **Agregar etapa 2: $group**
   - `_id`: `$detalles.producto.nombre`
   - Agregar campo: `total_vendido` → `$sum` → `$detalles.cantidad`
   - Ejecutar y mostrar resultados
5. **Agregar etapa 3: $sort**
   - Campo: `total_vendido`
   - Orden: `-1` (descendente)
   - Ejecutar
6. **Agregar etapa 4: $limit**
   - Valor: `5`
   - Ejecutar y mostrar resultado final
7. **Mostrar comando completo en consola:**
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

#### Consulta 2: Ventas por Categoría
1. **Cambiar a consola**
2. **Escribir comando:**
   ```javascript
   db.pedidos.aggregate([
     { $unwind: "$detalles" },
     { $group: {
         _id: "$detalles.producto.categoria.nombre",
         total_ventas: { $sum: "$detalles.subtotal" },
         cantidad_productos: { $sum: "$detalles.cantidad" }
     }},
     { $sort: { total_ventas: -1 } }
   ])
   ```
3. **Ejecutar**
4. **Mostrar resultados** agrupados por categoría

#### Consulta 3: Clientes con Mayor Gasto
1. **Consola:**
   ```javascript
   db.pedidos.aggregate([
     { $group: {
         _id: "$cliente.nombre_completo",
         total_gastado: { $sum: "$total" },
         cantidad_pedidos: { $sum: 1 }
     }},
     { $sort: { total_gastado: -1 } },
     { $limit: 10 }
   ])
   ```
2. **Ejecutar**
3. **Mostrar top 10 clientes**

#### Consulta 4: Productos con Stock Crítico (Opcional)
1. **Colección `productos`**
2. **Consola:**
   ```javascript
   db.productos.aggregate([
     { $match: { stock: { $lt: 20 } } },
     { $project: {
         nombre: 1,
         stock: 1,
         "categoria.nombre": 1
     }},
     { $sort: { stock: 1 } }
   ])
   ```
3. **Ejecutar**
4. **Mostrar productos con stock bajo**

### Qué Capturar:
- Interfaz de Aggregations (pestaña visual)
- Construcción del pipeline paso a paso
- Resultados de cada etapa
- Resultado final
- Comandos completos en consola
- Resultados en formato tabla/JSON

---

## DIAPOSITIVA 9: RESUMEN

### Contenido a Mostrar:

**Título:** "Resumen"

**Lista de Logros:**
- ✅ Migración Oracle → MongoDB
  - Modelamiento con documentos embebidos
  - Denormalización estratégica
  - Referencias para entidades grandes
- ✅ CRUD Completo Demostrado
  - CREATE: insertOne(), insertMany()
  - READ: find(), findOne() con operadores ($gt, $lt, $ne, $in, $nin, $regex)
  - UPDATE: updateOne(), updateMany()
  - DELETE: deleteOne(), deleteMany()
- ✅ Consultas Avanzadas con aggregate()
  - Top productos más vendidos
  - Ventas por categoría
  - Clientes con mayor gasto
  - Productos con stock crítico

**Entregables:**
- 📹 Video (10-12 minutos)
- 📊 Presentación
- 📄 Script completo MongoDB

### Diagramación:
- Título arriba
- Lista de logros con subitems indentados
- Entregables al final

---

## NOTAS GENERALES PARA CAPTURAS

### Configuración de Compass:
- Fuente aumentada (View → Font Size → Large)
- Tema claro
- Vista de tabla (no JSON) para mejor legibilidad
- Consola visible en la parte inferior

### Durante la Captura:
- **Cursor visible:** Mover suavemente, señalar elementos importantes
- **Zoom:** 100% o 125% para legibilidad
- **Pausas:** Breves entre comandos
- **Resultados:** Mostrar claramente antes de continuar
- **Transiciones:** Suaves entre secciones

### Elementos a Resaltar:
- Comandos escritos en consola
- Resultados de ejecución
- Documentos creados/modificados
- Estructura de documentos (especialmente arrays y objetos anidados)
- Resultados de agregaciones

### Errores Comunes a Evitar:
- No mostrar el comando completo
- Ejecutar demasiado rápido
- No mostrar resultados
- No refrescar la vista después de cambios
- No expandir documentos para mostrar estructura

---

**¡Listo para grabar! 🎬**

