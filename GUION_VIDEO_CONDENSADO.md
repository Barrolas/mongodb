# 🎬 Guion Condensado - Video Migración a MongoDB
## Pastelería Mil Sabores - Versión 10 minutos

**Duración Total:** 10-12 minutos  
**Integrantes:** Nicole Chavez, Nicolás Barra

**✅ YA GRABADO:** Escenas 1 y 2 (hasta JSON/BSON)

---

## 🎥 ESTRUCTURA CONDENSADA

---

# ESCENA 3: MODELAMIENTO (1:30 - 2:00 min) ⚡ CONDENSADO
**Responsable:** Nicolás Barra

---

### TOMA 3.1: Modelo Oracle y Decisiones (COMBINADO)
**Duración:** 0:45 - 1:00 seg

**Pantalla:**
- **Diapositiva:** "Modelo Oracle → MongoDB"
  - **Lado izquierdo (50%):** Diagrama Oracle con tablas:
    - CATEGORIAS (id_categoria PK, slug, nombre, icono)
    - PRODUCTOS (id_producto PK, id_categoria FK → CATEGORIAS, nombre, precio, stock)
    - CLIENTES (id_cliente PK, nombre, apellido_paterno, correo UNIQUE, etc.)
    - PEDIDOS (id_pedido PK, id_cliente FK → CLIENTES, id_estado FK → PEDIDOS_ESTADOS, fecha_pedido, total)
    - PEDIDOS_DETALLES (id_detalle PK, id_pedido FK → PEDIDOS, id_producto FK → PRODUCTOS, cantidad)
    - PEDIDOS_ESTADOS (id_estado PK, estado)
    - Mostrar relaciones con flechas (FK)
  - **Lado derecho (50%):** Diagrama MongoDB con colecciones:
    - categorias: Documento simple con _id, slug, nombre, icono
    - productos: Documento con categoria embebida (parcialmente), nombre, precio, stock
    - clientes: Documento simple con _id, nombre, apellido_paterno, correo, etc.
    - pedidos: Documento con cliente referenciado, estado, fecha_pedido, total, y detalles embebidos como array
  - **Parte inferior:** Tres decisiones clave:
    1. Detalles embebidos en pedidos → Los detalles siempre se consultan con el pedido
    2. Denormalización estratégica → Campos duplicados para consultas rápidas
    3. Referencias para entidades grandes → Productos y clientes se referencian, no se embeben

**Audio:**
- Nicolás: "Nuestro sistema Oracle tenía estas tablas: categorías, productos con referencia a categorías, clientes, pedidos con referencia a clientes y estados, y pedidos_detalles que relaciona pedidos con productos. Todas estas relaciones se manejaban con llaves foráneas y JOINs. En MongoDB, embebimos los detalles de pedidos dentro del documento pedido como un array, denormalizamos campos como el nombre del cliente en el pedido para consultas rápidas, y usamos referencias para productos y clientes. Esto permite una sola consulta para obtener un pedido completo sin necesidad de JOINs."

**Acción:**
- Mostrar comparación lado a lado (Oracle vs MongoDB)
- Cursor señalando cada tabla/colección
- Señalar relaciones FK en Oracle
- Señalar estructura embebida en MongoDB
- Cursor señalando decisiones clave en la parte inferior
- Transición rápida

---

### TOMA 3.2: Estructura MongoDB en Compass (RÁPIDO)
**Duración:** 0:30 - 0:45 seg

**Pantalla:**
- **MongoDB Compass:**
  1. Mostrar conexión: `mongodb://localhost:27017`
  2. Mostrar base de datos: `mil_sabores`
  3. Navegar a colección `pedidos`
  4. Abrir un documento de pedido (clic en documento)
  5. Expandir completamente el documento
  6. Señalar campo `cliente` (objeto con referencia: _id y nombre_completo denormalizado)
  7. Señalar campo `detalles` (array)
  8. Expandir un elemento del array `detalles`
  9. Mostrar que cada detalle tiene `producto` embebido (con _id, nombre, precio)

**Audio:**
- Nicolás: "Aquí en MongoDB Compass vemos un pedido real. El cliente está referenciado con su ID y nombre denormalizado. Los detalles están embebidos como un array, y cada detalle contiene el producto con sus datos. Todo en un solo documento, sin necesidad de hacer JOINs."

**Acción:**
- Abrir MongoDB Compass
- Navegar a colección pedidos
- Abrir y expandir un documento
- Cursor señalando: cliente (referencia), detalles (array), producto embebido
- Zoom en la estructura de detalles si es necesario
- Transición rápida

---

# ESCENA 4: CRUD - CREATE (1:00 - 1:30 min) ⚡ CONDENSADO
**Responsable:** Nicole Chavez

---

### TOMA 4.1: insertOne() y insertMany() (COMBINADO)
**Duración:** 0:45 - 1:00 seg

**Pantalla:**
- **MongoDB Compass:**
  1. Colección `clientes`
  2. Consola: `db.clientes.insertOne({ nombre: "María", correo: "maria@example.com", ... })`
  3. Ejecutar y mostrar resultado
  4. Cambiar a `productos`
  5. Consola: `db.productos.insertMany([{...}, {...}])`
  6. Ejecutar y mostrar múltiples documentos insertados

**Audio:**
- Nicole: "insertOne inserta un documento y retorna su ID. insertMany inserta múltiples documentos de una vez. Ambos son muy simples de usar."

**Acción:**
- Ejecutar ambos comandos rápidamente
- Mostrar resultados
- Transición rápida

---

### TOMA 4.2: Pedido Completo (RÁPIDO)
**Duración:** 0:30 - 0:45 seg

**Pantalla:**
- **MongoDB Compass:**
  - Consola: Insertar pedido con detalles embebidos
  - Mostrar documento creado
  - Expandir detalles

**Audio:**
- Nicole: "Aquí creo un pedido completo con detalles embebidos. Todo en una sola operación, sin necesidad de múltiples tablas."

**Acción:**
- Ejecutar comando
- Mostrar resultado
- Transición

---

# ESCENA 5: CRUD - READ (2:00 - 2:30 min) ⚡ CONDENSADO
**Responsable:** Nicolás Barra

---

### TOMA 5.1: find() y findOne() (RÁPIDO)
**Duración:** 0:20 - 0:30 seg

**Pantalla:**
- **MongoDB Compass:**
  - `db.productos.find()` - mostrar todos
  - `db.productos.findOne({ nombre: "..." })` - mostrar uno

**Audio:**
- Nicolás: "find trae múltiples documentos, findOne trae solo el primero que coincide."

**Acción:**
- Ejecutar ambos rápidamente
- Transición

---

### TOMA 5.2: Operadores $gt, $lt, $ne (COMBINADO)
**Duración:** 0:30 - 0:45 seg

**Pantalla:**
- **MongoDB Compass:**
  - Filtro visual o consola:
    - `{ precio: { $gt: 20000 } }` - productos caros
    - `{ stock: { $lt: 50 } }` - stock bajo
    - `{ estado: { $ne: "Cancelado" } }` - pedidos activos
  - Mostrar resultados de cada uno rápidamente

**Audio:**
- Nicolás: "$gt es mayor que, $lt es menor que, y $ne es no igual. Muy útiles para filtros numéricos y de estado."

**Acción:**
- Ejecutar los tres filtros uno tras otro
- Mostrar resultados brevemente
- Transición rápida

---

### TOMA 5.3: Operadores $in, $nin, $regex (COMBINADO)
**Duración:** 0:30 - 0:45 seg

**Pantalla:**
- **MongoDB Compass:**
  - Consola:
    - `{ "categoria.slug": { $in: ["tortas-cuadradas", "tortas-circulares"] } }`
    - `{ "categoria.slug": { $nin: ["productos-veganos"] } }`
    - `{ nombre: { $regex: /chocolate/i } }`
  - Mostrar resultados

**Audio:**
- Nicolás: "$in busca valores en una lista, $nin es lo opuesto, y $regex permite búsqueda de texto con expresiones regulares."

**Acción:**
- Ejecutar los tres comandos
- Mostrar resultados
- Transición

---

# ESCENA 6: CRUD - UPDATE (0:45 - 1:00 min) ⚡ CONDENSADO
**Responsable:** Nicole Chavez

---

### TOMA 6.1: updateOne() y updateMany() (COMBINADO)
**Duración:** 0:45 - 1:00 seg

**Pantalla:**
- **MongoDB Compass:**
  1. Mostrar producto ANTES (stock: 100)
  2. Consola: `db.productos.updateOne({ _id: ... }, { $inc: { stock: -5 } })`
  3. Ejecutar y mostrar resultado
  4. Refrescar y mostrar DESPUÉS (stock: 95)
  5. Consola: `db.productos.updateMany({ categoria: "..." }, { $set: { descuento: 10 } })`
  6. Ejecutar y mostrar modifiedCount

**Audio:**
- Nicole: "updateOne actualiza un documento. Aquí uso $inc para decrementar stock. updateMany actualiza múltiples documentos que coinciden con el criterio."

**Acción:**
- Mostrar antes/después claramente
- Ejecutar ambos comandos
- Transición rápida

---

# ESCENA 7: CRUD - DELETE (0:30 - 0:45 min) ⚡ CONDENSADO
**Responsable:** Nicolás Barra

---

### TOMA 7.1: deleteOne() y deleteMany() (COMBINADO)
**Duración:** 0:30 - 0:45 seg

**Pantalla:**
- **MongoDB Compass:**
  1. Mostrar documento que se eliminará
  2. Consola: `db.clientes.deleteOne({ correo: "test@example.com" })`
  3. Ejecutar y mostrar resultado
  4. Consola: `db.pedidos.deleteMany({ estado: "Cancelado", fecha: { $lt: ... } })`
  5. Ejecutar y mostrar deletedCount
  6. ⚠️ Advertencia breve: "Las eliminaciones son permanentes"

**Audio:**
- Nicolás: "deleteOne elimina un documento, deleteMany elimina todos los que coinciden. Recordar que son permanentes."

**Acción:**
- Ejecutar ambos rápidamente
- Mostrar advertencia
- Transición

---

# ESCENA 8: CONSULTAS AVANZADAS (1:30 - 2:00 min) ⚡ CONDENSADO
**Responsable:** Ambos (1 consulta cada uno)

---

### TOMA 8.1: Consulta 1 - Top 5 Productos Más Vendidos (aggregate())
**Responsable:** Nicole
**Duración:** 0:45 - 1:00 seg

**Pantalla:**
- **MongoDB Compass - Pestaña Aggregations:**
  - Construir pipeline visualmente (rápido):
    1. $unwind: "$detalles"
    2. $group: { 
         _id: "$detalles.producto.nombre", 
         total_vendido: { $sum: "$detalles.cantidad" },
         total_ingresos: { $sum: "$detalles.subtotal" }
       }
    3. $sort: { total_vendido: -1 }
    4. $limit: 5
    5. $project: { 
         _id: 0, 
         producto: "$_id", 
         cantidad_vendida: "$total_vendido",
         ingresos_totales: "$total_ingresos"
       }
  - Ejecutar y mostrar resultado
  - Mostrar comando completo en consola brevemente

**Audio:**
- Nicole: "Esta consulta encuentra los 5 productos más vendidos usando aggregate. $unwind descompone el array de detalles, $group agrupa por nombre de producto y suma cantidades e ingresos, $sort ordena por cantidad vendida, $limit toma los primeros 5, y $project formatea los resultados con nombres más legibles."

**Acción:**
- Construir pipeline rápidamente
- Ejecutar
- Mostrar resultado
- Transición

---

### TOMA 8.2: Consulta 2 - Productos con Filtros Combinados (find() con operadores)
**Responsable:** Nicolás
**Duración:** 0:45 - 1:00 seg

**Pantalla:**
- **MongoDB Compass - Consola:**
  ```javascript
  db.productos.find({
    "categoria.slug": { $in: ["tortas-cuadradas", "tortas-circulares"] },
    precio: { $gt: 15000, $lt: 30000 },
    nombre: { $regex: /torta/i }
  })
  ```
  - Ejecutar y mostrar resultados
  - Explicar cada operador usado

**Audio:**
- Nicolás: "Esta consulta usa find con operadores combinados. $in busca productos de categorías específicas, $gt y $lt definen un rango de precios entre 15 y 30 mil pesos, y $regex busca el texto 'torta' en el nombre de forma flexible, sin importar mayúsculas o minúsculas."

**Acción:**
- Escribir comando (o copiar)
- Ejecutar
- Mostrar resultados
- Señalar cada operador usado
- Transición

---

# ESCENA 9: CIERRE (0:30 - 0:45 min) ⚡ CONDENSADO

---

### TOMA 9.1: Resumen y Entregables (COMBINADO)
**Duración:** 0:30 - 0:45 seg

**Pantalla:**
- **Diapositiva:** "Resumen"
  - ✅ Migración Oracle → MongoDB
  - ✅ CRUD completo demostrado
  - ✅ Consultas avanzadas con aggregate()
  - 📄 Script completo disponible

**Audio:**
- Ambos: "Hemos migrado nuestro sistema a MongoDB, demostrado todas las operaciones CRUD y consultas avanzadas. El script completo está disponible en el documento entregable. Gracias por su atención."

**Acción:**
- Mostrar diapositiva
- Fade out

---

## ⏱️ DISTRIBUCIÓN DE TIEMPOS CONDENSADA

| Escena | Duración | Responsable |
|--------|----------|-------------|
| 1. Introducción | 1:30 - 2:00 | Ambos ✅ GRABADO |
| 2. Introducción MongoDB | 3:00 - 4:00 | Nicole ✅ GRABADO |
| 3. Modelamiento | 1:30 - 2:00 | Nicolás ⚡ NUEVO |
| 4. CRUD - CREATE | 1:00 - 1:30 | Nicole ⚡ NUEVO |
| 5. CRUD - READ | 2:00 - 2:30 | Nicolás ⚡ NUEVO |
| 6. CRUD - UPDATE | 0:45 - 1:00 | Nicole ⚡ NUEVO |
| 7. CRUD - DELETE | 0:30 - 0:45 | Nicolás ⚡ NUEVO |
| 8. Consultas Avanzadas | 1:30 - 2:00 | Ambos ⚡ NUEVO |
| 9. Cierre | 0:30 - 0:45 | Ambos ⚡ NUEVO |
| **TOTAL** | **9:15 - 11:30** | |

**Tiempo ya grabado:** ~4:30 - 6:00 min  
**Tiempo restante:** ~4:45 - 5:30 min  
**Total estimado:** 9-11 minutos

---

## ✅ REQUISITOS DE RÚBRICA CUMPLIDOS

### ✅ Explicación de MongoDB
- ✅ Qué es NoSQL (grabado)
- ✅ Diferencias SQL vs NoSQL (grabado)
- ✅ Ventajas/Desventajas (grabado)
- ✅ Estructura MongoDB (grabado)
- ✅ JSON/BSON (grabado)

### ✅ Modelamiento
- ✅ Modelo Oracle mostrado
- ✅ Decisiones de diseño explicadas
- ✅ Modelo MongoDB mostrado
- ✅ Comparación Oracle vs MongoDB

### ✅ CRUD Completo
- ✅ CREATE: insertOne() y insertMany()
- ✅ READ: find(), findOne() con operadores ($gt, $lt, $ne, $in, $nin, $regex)
- ✅ UPDATE: updateOne() y updateMany()
- ✅ DELETE: deleteOne() y deleteMany()

### ✅ Consultas Avanzadas
- ✅ 1 consulta con aggregate() (Top 5 productos más vendidos)
- ✅ 1 consulta con find() y operadores combinados ($in, $gt, $lt, $regex)
- ✅ Pipeline explicado (aggregate: $unwind, $group, $sort, $limit, $project)
- ✅ Operadores de find explicados

---

## 🎯 CAMBIOS REALIZADOS PARA CONDENSAR

1. **Combinación de tomas:** Operaciones similares juntas
2. **Reducción de tiempos:** Explicaciones más directas
3. **Eliminación de redundancias:** Sin repeticiones
4. **Transiciones rápidas:** Menos pausas
5. **Mantiene requisitos:** Todo lo esencial de la rúbrica

---

## 📝 NOTAS PARA GRABACIÓN

- **Ritmo:** Más rápido pero claro
- **Pausas:** Mínimas, solo donde sea necesario
- **Explicaciones:** Directas al punto
- **MongoDB Compass:** Ejecutar comandos sin mucha pausa
- **Resultados:** Mostrar brevemente y continuar

---

**¡Listo para grabar el resto! 🎬**

