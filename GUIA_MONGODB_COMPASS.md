# 🎥 Guía para Grabar con MongoDB Compass

Esta guía te ayudará a mostrar las operaciones MongoDB de forma visual y profesional en tu video.

---

## 📋 Instalación y Configuración

### 1. Instalar MongoDB Community Edition

**Descarga:** https://www.mongodb.com/try/download/community

**Pasos:**
1. Descargar MongoDB Community Edition para tu sistema operativo
2. Instalar siguiendo el asistente
3. **Windows:** El servicio se iniciará automáticamente
4. **Mac/Linux:** Iniciar el servicio manualmente si es necesario
5. Verificar que MongoDB está corriendo:
   - Windows: Verificar en "Servicios" que MongoDB está activo
   - Mac/Linux: `brew services list` o `sudo systemctl status mongod`

### 2. Instalar MongoDB Compass

**Descarga:** https://www.mongodb.com/try/download/compass

**Pasos:**
1. Descargar MongoDB Compass
2. Instalar (siguiente, siguiente, instalar)
3. Abrir la aplicación

### 3. Conectar a MongoDB Local

**Conexión a MongoDB Community Edition:**
```
mongodb://localhost:27017
```

**Pasos:**
1. Abrir MongoDB Compass
2. En la pantalla de conexión, pegar: `mongodb://localhost:27017`
3. Clic en "Connect"
4. Si la conexión es exitosa, verás las bases de datos disponibles

**⚠️ Si no conecta:**
- Verificar que el servicio MongoDB está corriendo
- Verificar que el puerto 27017 no está bloqueado
- Revisar los logs de MongoDB para errores

---

## 🎬 Cómo Mostrar Operaciones en el Video

### CREATE - Insertar Documentos

**Paso 1: Abrir la Colección**
- En el panel izquierdo, hacer clic en la colección (ej: `clientes`)
- Se abrirá la vista de documentos

**Paso 2: Abrir la Consola**
- Clic en la pestaña **"Documents"** (si no está abierta)
- En la parte inferior, clic en **"mongosh"** o buscar el ícono de consola
- Se abrirá la consola integrada

**Paso 3: Ejecutar Comando**
```javascript
// Escribir en la consola:
db.clientes.insertOne({
  nombre: "Juan",
  apellido_paterno: "Pérez",
  apellido_materno: "González",
  correo: "juan.perez@example.com",
  direccion: "Av. Principal 123",
  telefono: "+56912345678",
  fecha_creacion: new Date()
})
```

**Paso 4: Mostrar Resultado**
- El documento aparecerá automáticamente en la tabla de documentos
- Hacer clic en el documento para verlo expandido
- Explicar la estructura del documento

**Para `insertMany()`:**
```javascript
db.productos.insertMany([
  { nombre: "Producto 1", precio: 10000, stock: 50 },
  { nombre: "Producto 2", precio: 20000, stock: 30 },
  { nombre: "Producto 3", precio: 15000, stock: 40 }
])
```
- Mostrar cómo aparecen múltiples documentos en la tabla

---

### READ - Consultar Documentos

**Método 1: Filtro Visual (Recomendado para video)**

1. En la vista de documentos, verás un campo de filtro arriba
2. Escribir el filtro en formato JSON:
   ```json
   { precio: { $gt: 20000 } }
   ```
3. Presionar Enter o clic en "Find"
4. Mostrar los resultados filtrados
5. Luego mostrar el comando equivalente en la consola:
   ```javascript
   db.productos.find({ precio: { $gt: 20000 } })
   ```

**Método 2: Solo Consola**

1. Abrir la consola
2. Escribir el comando:
   ```javascript
   db.productos.find({ stock: { $lt: 50 } })
   ```
3. Mostrar los resultados en la tabla

**Operadores a Mostrar:**

**$gt (Mayor que):**
```javascript
// Filtro visual: { precio: { $gt: 20000 } }
// O en consola:
db.productos.find({ precio: { $gt: 20000 } })
```

**$lt (Menor que):**
```javascript
db.productos.find({ stock: { $lt: 50 } })
```

**$ne (No igual):**
```javascript
db.pedidos.find({ estado: { $ne: "Cancelado" } })
```

**$in (En lista):**
```javascript
db.productos.find({ 
  "categoria.slug": { $in: ["tortas-cuadradas", "tortas-circulares"] }
})
```

**$nin (No en lista):**
```javascript
db.productos.find({ 
  "categoria.slug": { $nin: ["productos-veganos"] }
})
```

**$regex (Búsqueda de texto):**
```javascript
// Buscar productos con "chocolate" en el nombre (case insensitive)
db.productos.find({ nombre: { $regex: /chocolate/i } })
```

---

### UPDATE - Actualizar Documentos

**Mostrar ANTES y DESPUÉS:**

**Paso 1: Mostrar Documento Original**
- Buscar un producto específico
- Mostrar sus valores actuales (ej: stock: 100)
- Explicar qué vamos a cambiar

**Paso 2: Ejecutar Update**
```javascript
// Actualizar stock (decrementar)
db.productos.updateOne(
  { _id: ObjectId("507f1f77bcf86cd799439011") },
  { $inc: { stock: -5 } }
)
```

**Paso 3: Mostrar Documento Actualizado**
- Refrescar la vista (F5 o clic en refresh)
- Mostrar el nuevo valor (ej: stock: 95)
- Explicar qué hizo `$inc`

**Otros Operadores:**

**$set (Establecer valor):**
```javascript
db.productos.updateOne(
  { _id: ObjectId("...") },
  { $set: { precio: 49990 } }
)
```

**$inc (Incrementar/Decrementar):**
```javascript
db.productos.updateOne(
  { _id: ObjectId("...") },
  { $inc: { stock: 10 } }  // Aumentar stock en 10
)
```

**updateMany():**
```javascript
// Actualizar múltiples productos
db.productos.updateMany(
  { "categoria.slug": "tortas-cuadradas" },
  { $set: { descuento: 10 } }
)
```
- Mostrar cuántos documentos se actualizaron

---

### DELETE - Eliminar Documentos

**⚠️ ADVERTENCIA VISUAL:**
- Mostrar claramente qué se va a eliminar
- Explicar que es permanente

**Paso 1: Mostrar Documentos a Eliminar**
- Usar un filtro para mostrar los documentos que se eliminarán
- Ejemplo: `{ estado: "Cancelado" }`
- Contar cuántos hay

**Paso 2: Ejecutar Delete**
```javascript
// Eliminar uno
db.clientes.deleteOne({ correo: "test@example.com" })

// Eliminar múltiples
db.pedidos.deleteMany({ 
  estado: "Cancelado",
  fecha_pedido: { $lt: new Date("2024-01-01") }
})
```

**Paso 3: Verificar Eliminación**
- Refrescar la vista
- Mostrar que los documentos desaparecieron
- Mostrar el resultado: `{ acknowledged: true, deletedCount: 3 }`

---

### AGGREGATE - Consultas Avanzadas

**Método 1: Interfaz Visual de Agregaciones (MEJOR PARA VIDEO)**

1. En la colección, clic en la pestaña **"Aggregations"**
2. Se abrirá el builder visual de agregaciones
3. Agregar etapas del pipeline una por una:
   - Clic en "Add Stage"
   - Seleccionar el operador (`$match`, `$group`, etc.)
   - Completar los campos
4. Ejecutar cada etapa y mostrar resultados
5. Explicar qué hace cada etapa

**Ejemplo: Top 5 Productos Más Vendidos**

**Etapa 1: $unwind**
- Agregar stage: `$unwind`
- Campo: `detalles`
- Explicar: "Descompone el array de detalles"

**Etapa 2: $group**
- Agregar stage: `$group`
- `_id`: `"$detalles.producto.nombre"`
- Agregar campo: `total_vendido` con `$sum: "$detalles.cantidad"`
- Agregar campo: `total_ingresos` con `$sum: "$detalles.subtotal"`
- Explicar: "Agrupa por nombre de producto y suma cantidades e ingresos"

**Etapa 3: $sort**
- Agregar stage: `$sort`
- Campo: `total_vendido`, orden: `-1` (descendente)
- Explicar: "Ordena de mayor a menor"

**Etapa 4: $limit**
- Agregar stage: `$limit`
- Valor: `5`
- Explicar: "Solo los primeros 5"

**Etapa 5: $project (Opcional)**
- Agregar stage: `$project`
- Renombrar campos para mejor legibilidad
- Explicar: "Formatea los resultados con nombres más claros"

**Método 2: Consola (Mostrar Comando Completo)**

Después de construir el pipeline visualmente, mostrar el comando completo:

```javascript
db.pedidos.aggregate([
  { $unwind: "$detalles" },
  { $group: {
      _id: "$detalles.producto.nombre",
      total_vendido: { $sum: "$detalles.cantidad" },
      total_ingresos: { $sum: "$detalles.subtotal" }
  }},
  { $sort: { total_vendido: -1 } },
  { $limit: 5 },
  { $project: {
      _id: 0,
      producto: "$_id",
      cantidad_vendida: "$total_vendido",
      ingresos_totales: "$total_ingresos"
  }}
])
```

---

## 🎨 Tips Visuales para el Video

### 1. Configuración de Compass
- **Tema:** Usar tema claro (mejor para grabación)
- **Fuente:** Aumentar tamaño (View → Font Size → Large)
- **Vista:** Usar vista de tabla (más clara que JSON)

### 2. Resaltar Resultados
- Usar el cursor para señalar resultados importantes
- Hacer zoom en secciones específicas si es necesario
- Usar colores de resaltado si Compass lo permite

### 3. Organización de la Pantalla
- **Lado izquierdo:** Scripts o presentación
- **Centro:** MongoDB Compass
- **Derecha:** (Opcional) Resultados o notas

### 4. Transiciones
- Pausar entre operaciones
- Explicar antes de ejecutar
- Mostrar resultados después de ejecutar
- Usar zoom/focus en elementos importantes

---

## 📝 Checklist para Cada Operación

Antes de grabar cada operación CRUD:

- [ ] Tener datos de ejemplo listos
- [ ] Saber qué comando vas a ejecutar
- [ ] Tener la explicación preparada
- [ ] Verificar que el comando funciona
- [ ] Preparar mostrar "antes" y "después" (si aplica)
- [ ] Tener el cursor listo para señalar resultados

---

## 🎯 Ejemplos de Scripts para Copiar y Pegar

### CREATE
```javascript
// Insertar cliente
db.clientes.insertOne({
  nombre: "María",
  apellido_paterno: "García",
  correo: "maria@example.com",
  fecha_creacion: new Date()
})

// Insertar múltiples productos
db.productos.insertMany([
  { nombre: "Torta A", precio: 30000, stock: 50 },
  { nombre: "Torta B", precio: 25000, stock: 30 }
])
```

### READ
```javascript
// Básico
db.productos.find()

// Con filtro $gt
db.productos.find({ precio: { $gt: 20000 } })

// Con $regex
db.productos.find({ nombre: { $regex: /chocolate/i } })
```

### UPDATE
```javascript
// Actualizar uno
db.productos.updateOne(
  { _id: ObjectId("...") },
  { $inc: { stock: -5 } }
)

// Actualizar muchos
db.productos.updateMany(
  { stock: { $lt: 20 } },
  { $set: { stock_critico: true } }
)
```

### DELETE
```javascript
// Eliminar uno
db.clientes.deleteOne({ correo: "test@example.com" })

// Eliminar muchos
db.pedidos.deleteMany({ estado: "Cancelado" })
```

### AGGREGATE
```javascript
// Top 5 productos más vendidos
db.pedidos.aggregate([
  { $unwind: "$detalles" },
  { $group: {
      _id: "$detalles.producto.nombre",
      total_vendido: { $sum: "$detalles.cantidad" },
      total_ingresos: { $sum: "$detalles.subtotal" }
  }},
  { $sort: { total_vendido: -1 } },
  { $limit: 5 },
  { $project: {
      _id: 0,
      producto: "$_id",
      cantidad_vendida: "$total_vendido",
      ingresos_totales: "$total_ingresos"
  }}
])

// Productos filtrados con operadores
db.productos.find({
  "categoria.slug": { $in: ["tortas-cuadradas", "tortas-circulares"] },
  precio: { $gt: 15000, $lt: 30000 },
  nombre: { $regex: /torta/i }
})
```
      _id: "$detalles.producto.nombre",
      total: { $sum: "$detalles.cantidad" }
  }},
  { $sort: { total: -1 } },
  { $limit: 5 }
])
```

---

**💡 Recuerda:** El objetivo es mostrar que entiendes MongoDB, no solo ejecutar comandos. Explica el "por qué" además del "cómo".

