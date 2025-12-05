# 📋 Plan de Desarrollo - Migración a MongoDB
## Pastelería Mil Sabores

**Integrantes:** Nicole Chavez, Nicolás Barra  
**Fecha:** 2025  
**Objetivo:** Migrar sistema Oracle SQL/PLSQL a MongoDB y crear presentación para evaluación

---

## 🎯 FASE 1: ANÁLISIS Y DISEÑO DEL MODELO (2-3 días)

### 1.1 Análisis del Sistema Actual
- ✅ **Completado:** Revisión de scripts Oracle
- ✅ **Completado:** Identificación de tablas y relaciones
- ⏳ **Pendiente:** Análisis de MER (Modelo Entidad-Relación) desde PDF

### 1.2 Diseño del Modelo MongoDB

#### **Estrategia de Modelado:**
MongoDB permite dos enfoques principales:
- **Documentos Anidados (Embedded):** Para relaciones 1:1 o 1:N donde los datos se leen juntos
- **Referencias (Referenced):** Para relaciones N:M o cuando los datos crecen mucho

#### **Decisiones de Diseño:**

**COLLECTION: `categorias`**
- **Estructura:** Documento simple
- **Razón:** Tabla maestra pequeña, consultada frecuentemente
```javascript
{
  _id: ObjectId,
  slug: String,
  nombre: String,
  icono: String
}
```

**COLLECTION: `productos`**
- **Estructura:** Documento con categoría embebida (referencia ligera)
- **Razón:** Los productos siempre se muestran con su categoría
```javascript
{
  _id: ObjectId,
  categoria: {
    _id: ObjectId,  // Referencia a categorias
    nombre: String,  // Denormalizado para consultas rápidas
    slug: String
  },
  nombre: String,
  precio: Number,
  stock: Number,
  descripcion_corta: String,
  descripcion_detallada: String,
  imagen: String
}
```

**COLLECTION: `clientes`**
- **Estructura:** Documento simple
- **Razón:** Entidad independiente
```javascript
{
  _id: ObjectId,
  nombre: String,
  apellido_paterno: String,
  apellido_materno: String,
  correo: String,  // Índice único
  direccion: String,
  fecha_nacimiento: Date,
  telefono: String,
  fecha_creacion: Date
}
```

**COLLECTION: `pedidos`**
- **Estructura:** Documento con detalles embebidos (array)
- **Razón:** Los detalles siempre se consultan con el pedido (1:N)
- **Ventaja:** Una sola consulta trae todo el pedido
```javascript
{
  _id: ObjectId,
  cliente: {
    _id: ObjectId,  // Referencia a clientes
    nombre_completo: String  // Denormalizado
  },
  estado: String,  // "Pendiente", "En Preparacion", etc.
  fecha_pedido: Date,
  total: Number,
  detalles: [  // Array embebido
    {
      producto: {
        _id: ObjectId,
        nombre: String,  // Denormalizado
        precio: Number
      },
      cantidad: Number,
      subtotal: Number
    }
  ]
}
```

**COLLECTION: `pedidos_estados`** (Opcional - puede ser enum)
- **Estructura:** Documento simple o constante en código
- **Razón:** Valores fijos, pocos cambios

**COLLECTION: `auditoria`**
- **Estructura:** Documento simple con diferentes tipos
- **Razón:** Logs de sistema, diferentes eventos
```javascript
{
  _id: ObjectId,
  tipo: String,  // "cliente", "producto", "pedido", "sistema"
  entidad_afectada: String,  // Nombre de la colección
  id_entidad: ObjectId,  // ID del documento afectado
  accion: String,  // "INSERT", "UPDATE", "DELETE"
  usuario: String,
  fecha_evento: Date,
  datos_anteriores: Object,  // Opcional: snapshot
  datos_nuevos: Object  // Opcional: snapshot
}
```

**COLLECTION: `reportes`**
- **Estructura:** Documentos con diferentes esquemas según tipo
- **Razón:** Reportes pre-calculados, diferentes estructuras
```javascript
// Reporte de ventas diarias
{
  _id: ObjectId,
  tipo: "ventas_diarias",
  fecha: Date,
  productos: [
    {
      producto_id: ObjectId,
      producto_nombre: String,
      cantidad_total: Number,
      subtotal: Number
    }
  ]
}

// Reporte de ganancias mensuales
{
  _id: ObjectId,
  tipo: "ganancias_mensuales",
  anio: Number,
  mes: Number,
  ganancia_total: Number
}

// Reporte de stock crítico
{
  _id: ObjectId,
  tipo: "stock_critico",
  fecha: Date,
  productos: [
    {
      producto_id: ObjectId,
      producto_nombre: String,
      stock_actual: Number
    }
  ]
}
```

### 1.3 Índices Necesarios
```javascript
// Índices para optimizar consultas
db.productos.createIndex({ "categoria._id": 1 })
db.productos.createIndex({ nombre: "text" })  // Búsqueda de texto
db.clientes.createIndex({ correo: 1 }, { unique: true })
db.pedidos.createIndex({ "cliente._id": 1 })
db.pedidos.createIndex({ fecha_pedido: -1 })
db.pedidos.createIndex({ estado: 1 })
db.auditoria.createIndex({ fecha_evento: -1 })
db.auditoria.createIndex({ tipo: 1, fecha_evento: -1 })
```

---

## 🛠️ FASE 2: IMPLEMENTACIÓN TÉCNICA (4-5 días)

### 2.1 Scripts de Creación de Colecciones

**Archivo:** `01_crear_colecciones.js`
- Crear base de datos
- Crear colecciones
- Crear índices
- Insertar datos iniciales (categorías, estados)

### 2.2 Scripts de Migración de Datos

**Archivo:** `02_migrar_datos.js`
- Migrar categorías
- Migrar productos (con referencias a categorías)
- Migrar clientes
- Migrar pedidos (con detalles embebidos)
- Validar integridad de datos

**📹 Para el Video:**
- Los scripts son ejecutables automáticamente, PERO en el video deben mostrar:
  - **MongoDB Compass** o **MongoDB Atlas** (interfaz gráfica)
  - Ejecutar comandos uno por uno en la consola de Compass/Atlas
  - Mostrar los resultados visualmente en la interfaz
  - Explicar cada paso mientras lo ejecutan

**💡 Estrategia:**
- Crear scripts completos para el documento entregable
- En el video, copiar y ejecutar comandos individuales desde los scripts
- Mostrar la interfaz gráfica de MongoDB para que sea visual

### 2.3 Scripts CRUD - CREATE

**Archivo:** `03_crud_create.js`
- `insertOne()` - Insertar un cliente
- `insertOne()` - Insertar un producto
- `insertMany()` - Insertar múltiples productos
- `insertOne()` - Crear un pedido completo (con detalles embebidos)

**📹 Para el Video:**
- **Mostrar en MongoDB Compass/Atlas:**
  1. Abrir la colección correspondiente
  2. Ir a la pestaña "Documents" o "Collections"
  3. Ejecutar el comando en la consola (mongosh integrado)
  4. Mostrar el documento insertado en la vista de documentos
  5. Explicar la estructura del documento creado

**Ejemplo de demostración:**
```javascript
// En la consola de Compass/Atlas, ejecutar:
db.clientes.insertOne({
  nombre: "Juan",
  apellido_paterno: "Pérez",
  correo: "juan@example.com"
})

// Luego mostrar en la vista de documentos cómo aparece
```

### 2.4 Scripts CRUD - READ

**Archivo:** `04_crud_read.js`
- `find()` - Consultas básicas
- `findOne()` - Obtener un documento
- Filtros con operadores:
  - `$gt` - Productos con precio mayor a X
  - `$lt` - Productos con stock menor a X
  - `$ne` - Pedidos que NO están cancelados
  - `$in` - Productos de categorías específicas
  - `$nin` - Productos que NO están en ciertas categorías
  - `$regex` - Búsqueda de texto (nombres de productos, clientes)

**📹 Para el Video:**
- **Mostrar en MongoDB Compass/Atlas:**
  1. Usar el **filtro visual** de Compass para algunos ejemplos
  2. Mostrar también la **consola** con el comando completo
  3. Ejecutar cada operador uno por uno
  4. Mostrar los resultados en la tabla de documentos
  5. Explicar qué hace cada operador

**Ejemplo de demostración:**
```javascript
// Mostrar en Compass:
// 1. Usar el filtro visual: { precio: { $gt: 20000 } }
// 2. Luego mostrar el comando equivalente:
db.productos.find({ precio: { $gt: 20000 } })

// 3. Mostrar los resultados filtrados en la interfaz
```

### 2.5 Scripts CRUD - UPDATE

**Archivo:** `05_crud_update.js`
- `updateOne()` - Actualizar stock de un producto
- `updateOne()` - Cambiar estado de un pedido
- `updateMany()` - Actualizar precios de múltiples productos
- `updateOne()` con `$set`, `$inc`, `$push`, `$pull`

**📹 Para el Video:**
- **Mostrar en MongoDB Compass/Atlas:**
  1. Mostrar el documento ANTES de la actualización
  2. Ejecutar el comando de actualización en la consola
  3. Mostrar el documento DESPUÉS de la actualización
  4. Explicar los operadores `$set`, `$inc`, etc.
  5. Mostrar cómo se ve en la interfaz gráfica

**Ejemplo de demostración:**
```javascript
// 1. Mostrar documento actual (stock: 100)
// 2. Ejecutar:
db.productos.updateOne(
  { _id: ObjectId("...") },
  { $inc: { stock: -5 } }
)
// 3. Mostrar documento actualizado (stock: 95)
```

### 2.6 Scripts CRUD - DELETE

**Archivo:** `06_crud_delete.js`
- `deleteOne()` - Eliminar un cliente
- `deleteOne()` - Eliminar un producto
- `deleteMany()` - Eliminar pedidos cancelados antiguos

**📹 Para el Video:**
- **Mostrar en MongoDB Compass/Atlas:**
  1. Mostrar los documentos que se van a eliminar
  2. Ejecutar el comando de eliminación
  3. Verificar que desaparecieron de la colección
  4. Explicar la diferencia entre `deleteOne()` y `deleteMany()`
  5. **⚠️ Advertencia:** Explicar que las eliminaciones son permanentes

### 2.7 Consultas Avanzadas con aggregate()

**Archivo:** `07_consultas_avanzadas.js`

**📹 Para el Video:**
- **Mostrar en MongoDB Compass/Atlas:**
  1. Usar la pestaña **"Aggregations"** de Compass (interfaz visual)
  2. Mostrar cómo se construye el pipeline paso a paso
  3. Ejecutar cada etapa y mostrar resultados intermedios
  4. Luego mostrar el comando completo en la consola
  5. Explicar cada operador del pipeline (`$unwind`, `$group`, `$lookup`, etc.)

**Consulta 1:** Ventas totales por categoría (con $group, $lookup)
```javascript
db.pedidos.aggregate([
  { $unwind: "$detalles" },
  { $lookup: { ... } },
  { $group: { ... } }
])
```

**Consulta 2:** Top 5 productos más vendidos
```javascript
db.pedidos.aggregate([
  { $unwind: "$detalles" },
  { $group: { ... } },
  { $sort: { ... } },
  { $limit: 5 }
])
```

**Consulta 3:** Clientes con mayor gasto total
```javascript
db.pedidos.aggregate([
  { $group: { ... } },
  { $sort: { ... } },
  { $limit: 10 }
])
```

**Consulta 4:** Productos con stock crítico (stock < 20)
```javascript
db.productos.aggregate([
  { $match: { stock: { $lt: 20 } } },
  { $project: { ... } }
])
```

**Consulta 5:** Ventas por mes del último año
```javascript
db.pedidos.aggregate([
  { $match: { fecha_pedido: { $gte: ... } } },
  { $group: { ... } },
  { $sort: { ... } }
])
```

**💡 Recomendación para el Video:**
- Usar **MongoDB Compass** es ideal porque tiene:
  - Interfaz visual para agregaciones
  - Vista de documentos amigable
  - Consola integrada (mongosh)
  - Filtros visuales
  - Exportación de resultados

---

## 📊 FASE 3: PREPARACIÓN DE PRESENTACIÓN (3-4 días)

### 3.0 Preparación del Entorno para la Grabación

**📹 Herramientas Necesarias:**

1. **MongoDB Compass** (Recomendado para video)
   - Descarga: https://www.mongodb.com/try/download/compass
   - Interfaz gráfica amigable
   - Consola integrada (mongosh)
   - Vista de agregaciones visual
   - Filtros visuales
   - **Ventaja:** Muy visual para el video

2. **MongoDB Atlas** (Alternativa)
   - Cuenta gratuita: https://www.mongodb.com/cloud/atlas
   - Interfaz web
   - No requiere instalación
   - **Ventaja:** Accesible desde cualquier lugar

3. **Software de Grabación:**
   - OBS Studio (gratis)
   - Windows Game Bar (Windows 10/11)
   - QuickTime (Mac)
   - Loom, Screencast-O-Matic (online)

**🔧 Configuración Pre-Grabación:**

1. **Preparar la Base de Datos:**
   - Ejecutar todos los scripts de creación
   - Insertar datos de ejemplo suficientes
   - Verificar que todo funciona correctamente
   - Tener datos variados para las demostraciones

2. **Preparar MongoDB Compass:**
   - Conectar a la base de datos
   - Abrir las colecciones principales
   - Ajustar tamaño de fuente (para que se vea bien en video)
   - Configurar tema claro (mejor para grabación)

3. **Preparar Scripts:**
   - Tener los scripts abiertos en un editor
   - Copiar comandos individuales para ejecutar
   - Tener comentarios listos para explicar

4. **Checklist Pre-Grabación:**
   - [ ] MongoDB Compass instalado y funcionando
   - [ ] Base de datos con datos de ejemplo
   - [ ] Scripts probados y funcionando
   - [ ] Presentación (PPT/Canva) lista
   - [ ] Guión del video preparado
   - [ ] Audio/micrófono probado
   - [ ] Resolución de pantalla adecuada (1920x1080 recomendado)

**💡 Tips para la Grabación:**
- Usar fuente grande en Compass (se ve mejor en video)
- Zoom al 100% o 125% para mejor legibilidad
- Pausar entre secciones para editar después
- Hablar claro y pausado
- Mostrar el cursor moviéndose por la interfaz
- Resaltar los resultados con el cursor

### 3.1 Estructura del Video (10-20 minutos)

#### **INTRO (1-2 min)**
- Presentación del equipo
  - Nicole Chavez: "Hola, soy Nicole y me encargaré de..."
  - Nicolás Barra: "Hola, soy Nicolás y me encargaré de..."
- Objetivo del video: Migración de Oracle a MongoDB

#### **PARTE 1: Introducción a MongoDB (3-4 min)**
**Responsable:** Integrante 1
- ¿Qué es NoSQL?
- Diferencias con SQL
- Ventajas de MongoDB:
  - Flexible (sin esquema fijo)
  - Escalable horizontalmente
  - Rápido para lectura/escritura
  - Ideal para datos no estructurados
- Desventajas:
  - No hay JOINs directos (se usa $lookup)
  - No ideal para transacciones ACID complejas
  - Requiere más planificación de índices
- Organización: Base de datos → Colecciones → Documentos → Campos
- JSON/BSON explicado

#### **PARTE 2: Modelamiento (2-3 min)**
**Responsable:** Integrante 2
- Mostrar modelo Oracle (tablas y relaciones)
- Explicar decisiones de diseño:
  - ¿Por qué embebimos detalles en pedidos?
  - ¿Por qué denormalizamos algunos campos?
  - ¿Cuándo usamos referencias vs documentos embebidos?
- Mostrar estructura de documentos MongoDB
- Comparación lado a lado (Oracle vs MongoDB)

#### **PARTE 3: CRUD - CREATE (2-3 min)**
**Responsable:** Integrante 1
- **Pantalla grabada en MongoDB Compass/Atlas:**
  - Abrir MongoDB Compass y conectar a la base de datos
  - Mostrar la interfaz: colecciones, documentos
  - **Ejecutar en la consola de Compass:**
    - `insertOne()` - Insertar un cliente nuevo
      - Mostrar el comando en la consola
      - Mostrar el documento creado en la vista de documentos
    - `insertMany()` - Insertar múltiples productos
      - Ejecutar el comando
      - Mostrar los documentos insertados en la tabla
    - `insertOne()` - Crear un pedido completo (con detalles embebidos)
      - Mostrar la estructura del documento con detalles anidados
      - Explicar cómo se ve en MongoDB vs cómo sería en SQL
- Explicar cada operación mientras se ejecuta

#### **PARTE 4: CRUD - READ (2-3 min)**
**Responsable:** Integrante 2
- **Pantalla grabada en MongoDB Compass/Atlas:**
  - **Usar filtros visuales de Compass:**
    - Mostrar cómo usar el filtro visual para `find()` básico
    - Luego mostrar el comando equivalente en la consola
  - **Ejecutar en la consola:**
    - `findOne()` - Mostrar un documento específico
    - **Filtros con operadores (uno por uno):**
      - `$gt` - Productos con precio mayor a 20000
        - Usar filtro visual: `{ precio: { $gt: 20000 } }`
        - Mostrar comando: `db.productos.find({ precio: { $gt: 20000 } })`
        - Mostrar resultados en la tabla
      - `$lt` - Productos con stock menor a 50
      - `$ne` - Pedidos que NO están cancelados
      - `$in` - Productos de categorías específicas
      - `$nin` - Productos que NO están en ciertas categorías
      - `$regex` - Búsqueda de texto (nombres de productos)
        - Ejemplo: `db.productos.find({ nombre: { $regex: /chocolate/i } })`
- Mostrar resultados en pantalla y explicar cada operador

#### **PARTE 5: CRUD - UPDATE (1-2 min)**
**Responsable:** Integrante 1
- **Pantalla grabada en MongoDB Compass/Atlas:**
  - **Mostrar documento ANTES:**
    - Abrir un producto, mostrar su stock actual (ej: 100)
  - **Ejecutar en la consola:**
    - `updateOne()` - Actualizar stock
      - Comando: `db.productos.updateOne({ _id: ... }, { $inc: { stock: -5 } })`
      - Explicar `$inc` (incrementar/decrementar)
    - `updateMany()` - Actualizar precios de múltiples productos
      - Comando: `db.productos.updateMany({ categoria: "..." }, { $set: { precio: nuevo_precio } })`
      - Explicar `$set` (establecer valor)
  - **Mostrar documento DESPUÉS:**
    - Refrescar la vista, mostrar el stock actualizado (ej: 95)
- Mostrar antes/después claramente

#### **PARTE 6: CRUD - DELETE (1 min)**
**Responsable:** Integrante 2
- **Pantalla grabada en MongoDB Compass/Atlas:**
  - **Mostrar documentos que se eliminarán:**
    - Mostrar en la tabla los documentos que cumplen el criterio
  - **Ejecutar en la consola:**
    - `deleteOne()` - Eliminar un cliente específico
      - Mostrar el comando y ejecutarlo
      - Verificar que desapareció de la colección
    - `deleteMany()` - Eliminar pedidos cancelados antiguos
      - Ejemplo: `db.pedidos.deleteMany({ estado: "Cancelado", fecha_pedido: { $lt: ... } })`
      - Mostrar cuántos documentos se eliminaron
  - **⚠️ Explicar precauciones:**
    - Las eliminaciones son permanentes
    - Siempre verificar el filtro antes de ejecutar

#### **PARTE 7: Consultas Avanzadas (3-4 min)**
**Responsable:** Ambos (1-2 consultas cada uno)
- **Pantalla grabada en MongoDB Compass/Atlas:**
  - **Usar la pestaña "Aggregations" de Compass:**
    - Mostrar la interfaz visual de agregaciones
    - Construir el pipeline paso a paso visualmente
  - **Ejecutar en la consola:**
    - **Consulta 1 con `aggregate()`** - Ventas por categoría
      - Explicar cada etapa del pipeline: `$unwind`, `$lookup`, `$group`
      - Mostrar resultados intermedios
      - Mostrar resultado final
    - **Consulta 2 con `aggregate()`** - Top 5 productos más vendidos
      - Pipeline: `$unwind`, `$group`, `$sort`, `$limit`
      - Mostrar resultados
    - **Consulta 3 con `aggregate()`** - Comparar con SQL equivalente
      - Mostrar cómo sería en SQL (JOIN, GROUP BY)
      - Mostrar cómo es en MongoDB (aggregate pipeline)
      - Explicar diferencias y ventajas

#### **CIERRE (1 min)**
- Resumen de lo aprendido
- Mencionar que el script completo está en el documento
- Agradecimientos

### 3.2 Presentación Visual (PPT/Canva)

**Diapositivas sugeridas:**
1. Portada - Pastelería Mil Sabores
2. Integrantes
3. ¿Qué es NoSQL?
4. MongoDB vs SQL - Comparación
5. Ventajas y Desventajas
6. Estructura de MongoDB
7. Modelo Oracle (diagrama)
8. Modelo MongoDB (diagrama)
9. Decisiones de Diseño
10. CREATE - Ejemplos
11. READ - Operadores
12. UPDATE - Ejemplos
13. DELETE - Ejemplos
14. Aggregate - Pipeline
15. Consultas Avanzadas
16. Conclusiones

### 3.3 Documento con Script Completo

**Archivo:** `SCRIPT_COMPLETO_MONGODB.md` o `.js`

**Estructura:**
1. Comentarios de encabezado (integrantes, fecha)
2. Creación de base de datos y colecciones
3. Creación de índices
4. Datos iniciales (categorías, estados)
5. Inserts de ejemplo (productos, clientes, pedidos)
6. Updates de ejemplo
7. Deletes de ejemplo
8. Find() con todos los operadores
9. Aggregate() - Todas las consultas avanzadas
10. Comentarios explicativos en cada sección

---

## 📝 FASE 4: ENTREGABLES FINALES

### 4.1 Checklist de Entrega

- [ ] Video de 10-20 minutos subido (YouTube, Drive, Teams)
- [ ] Video NO privado (verificar configuración)
- [ ] Presentación (PPT/Canva) creada
- [ ] Documento con script completo
- [ ] Scripts MongoDB funcionando
- [ ] Datos de ejemplo insertados
- [ ] Todas las consultas probadas

### 4.2 Estructura de Archivos del Proyecto

```
mongodb/
├── contexto/                    # Archivos originales Oracle
│   ├── Mil Sabores EV2 - Tablas
│   ├── Mil Sabores EV2 - Package
│   ├── Mil Sabores EV2 - Triggers
│   └── *.pdf
├── scripts/
│   ├── 01_crear_colecciones.js
│   ├── 02_migrar_datos.js
│   ├── 03_crud_create.js
│   ├── 04_crud_read.js
│   ├── 05_crud_update.js
│   ├── 06_crud_delete.js
│   └── 07_consultas_avanzadas.js
├── SCRIPT_COMPLETO_MONGODB.js   # Script unificado
├── PLAN_DESARROLLO.md           # Este documento
├── README.md                     # Instrucciones de uso
└── .gitignore
```

---

## ⏱️ CRONOGRAMA SUGERIDO

| Fase | Tareas | Días | Responsable |
|------|--------|------|-------------|
| **Fase 1** | Análisis y diseño | 2-3 | Ambos |
| **Fase 2** | Scripts MongoDB | 4-5 | Ambos (dividir tareas) |
| **Fase 3** | Video y PPT | 3-4 | Ambos |
| **Fase 4** | Revisión final | 1 | Ambos |
| **TOTAL** | | **10-13 días** | |

---

## 🎯 DIVISIÓN DE TRABAJO SUGERIDA

### **Nicole Chavez:**
- Diseño del modelo MongoDB
- Scripts: CREATE, UPDATE, DELETE
- Parte del video: Introducción MongoDB, CREATE, UPDATE
- Consultas aggregate: 1-2

### **Nicolás Barra:**
- Análisis de migración
- Scripts: READ, Consultas avanzadas
- Parte del video: Modelamiento, READ, DELETE
- Consultas aggregate: 1-2

### **Ambos:**
- Revisión de scripts
- Grabación y edición del video
- Creación de presentación
- Documento final

---

## 📚 RECURSOS Y REFERENCIAS

### Documentación MongoDB:
- https://www.mongodb.com/docs/manual/
- https://www.mongodb.com/docs/manual/reference/operator/query/
- https://www.mongodb.com/docs/manual/reference/operator/aggregation/

### Herramientas:
- MongoDB Compass (GUI)
- MongoDB Shell (mongosh)
- Studio 3T (alternativa)

### Conceptos clave a explicar:
- Documentos embebidos vs referencias
- Índices en MongoDB
- Pipeline de agregación
- Operadores de consulta ($gt, $lt, $in, etc.)
- BSON vs JSON

---

## ✅ CRITERIOS DE ÉXITO

1. ✅ Todos los scripts funcionan sin errores
2. ✅ Se muestran al menos 3 consultas aggregate diferentes
3. ✅ Se demuestran todos los operadores de consulta requeridos
4. ✅ El video explica claramente las diferencias SQL vs NoSQL
5. ✅ Se justifica el diseño del modelo MongoDB
6. ✅ El documento tiene el script completo y comentado
7. ✅ La presentación es clara y profesional

---

## 🚀 PRÓXIMOS PASOS INMEDIATOS

1. **HOY:**
   - Revisar este plan
   - Instalar MongoDB localmente o usar MongoDB Atlas (gratis)
   - Crear estructura de carpetas

2. **MAÑANA:**
   - Comenzar Fase 1: Diseño del modelo
   - Crear primeros scripts de colecciones

3. **ESTA SEMANA:**
   - Completar Fase 2: Todos los scripts CRUD
   - Probar todas las consultas

4. **PRÓXIMA SEMANA:**
   - Grabar video
   - Crear presentación
   - Revisar y entregar

---

**¡Éxito en la evaluación! 🎂🍰**

