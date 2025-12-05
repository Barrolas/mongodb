# 📊 Comparación SQL vs NoSQL - Pastelería Mil Sabores

## 🔄 Migración de Oracle a MongoDB

---

## 1. ¿Qué es NoSQL?

**NoSQL** (Not Only SQL) es un término que engloba bases de datos que no siguen el modelo relacional tradicional de SQL.

### Características principales:
- **Sin esquema fijo:** Los documentos pueden tener estructuras diferentes
- **Escalabilidad horizontal:** Fácil agregar más servidores
- **Modelo flexible:** Adaptado a datos no estructurados o semi-estructurados

---

## 2. Diferencias Fundamentales

| Aspecto | SQL (Oracle) | NoSQL (MongoDB) |
|---------|--------------|-----------------|
| **Modelo de datos** | Tablas con filas y columnas | Documentos (JSON/BSON) |
| **Esquema** | Fijo, definido antes | Flexible, puede cambiar |
| **Relaciones** | JOINs entre tablas | Documentos embebidos o referencias |
| **Escalabilidad** | Vertical (servidor más potente) | Horizontal (más servidores) |
| **Transacciones** | ACID completo | ACID limitado (versiones recientes) |
| **Consultas** | SQL estándar | JavaScript-like queries |
| **Índices** | Índices en columnas | Índices en campos de documentos |

---

## 3. Ventajas de MongoDB

### ✅ Flexibilidad
- **Sin esquema fijo:** Puedes agregar campos nuevos sin modificar la estructura
- **Documentos anidados:** Datos relacionados en un solo documento
- **Evolución natural:** El esquema evoluciona con la aplicación

**Ejemplo:**
```javascript
// En MongoDB puedes tener documentos diferentes en la misma colección
{ nombre: "Torta Chocolate", precio: 45990 }
{ nombre: "Torta Vainilla", precio: 18990, descuento: 10 }  // Campo extra
```

### ✅ Escalabilidad Horizontal
- **Sharding:** Distribuir datos en múltiples servidores
- **Replicación:** Copias de datos para alta disponibilidad
- **Crecimiento:** Agregar servidores sin downtime

### ✅ Rendimiento
- **Lecturas rápidas:** Documentos completos en una consulta
- **Sin JOINs costosos:** Datos relacionados ya están juntos
- **Índices eficientes:** Búsquedas rápidas en documentos

### ✅ Desarrollo Ágil
- **JSON nativo:** Mismo formato que las aplicaciones web
- **Menos código:** Menos mapeo objeto-relacional
- **Prototipado rápido:** Sin definir esquemas complejos

---

## 4. Desventajas de MongoDB

### ❌ No hay JOINs directos
- **Solución:** Usar `$lookup` en agregaciones (más lento que JOINs SQL)
- **Alternativa:** Denormalizar datos (duplicar información)

**Ejemplo:**
```sql
-- SQL: JOIN simple
SELECT p.nombre, c.nombre 
FROM pedidos p
JOIN clientes c ON p.id_cliente = c.id_cliente;
```

```javascript
// MongoDB: $lookup (más complejo)
db.pedidos.aggregate([
  { $lookup: {
      from: "clientes",
      localField: "cliente._id",
      foreignField: "_id",
      as: "cliente_info"
  }}
])
```

### ❌ No ideal para transacciones complejas
- **ACID limitado:** Transacciones multi-documento más complejas
- **Consistencia eventual:** En algunos casos, consistencia no inmediata
- **Mejor para:** Operaciones simples o transacciones de un solo documento

### ❌ Requiere más planificación
- **Diseño crítico:** Mal diseño = problemas de rendimiento
- **Índices:** Deben planificarse cuidadosamente
- **Denormalización:** Decidir qué duplicar y qué no

### ❌ Menos herramientas maduras
- **Herramientas:** Menos opciones que en SQL
- **Comunidad:** Más pequeña que SQL (aunque crece rápido)
- **Estándares:** No hay un estándar universal como SQL

---

## 5. Organización de MongoDB

### Estructura Jerárquica:

```
Base de Datos (Database)
  └── Colecciones (Collections)  ← Equivalente a "Tablas" en SQL
        └── Documentos (Documents)  ← Equivalente a "Filas" en SQL
              └── Campos (Fields)  ← Equivalente a "Columnas" en SQL
```

### Ejemplo:

**SQL (Oracle):**
```sql
-- Base de datos: MIL_SABORES
-- Tabla: PRODUCTOS
-- Fila:
id_producto | nombre              | precio
1          | Torta Chocolate    | 45990
```

**MongoDB:**
```javascript
// Base de datos: mil_sabores
// Colección: productos
// Documento:
{
  _id: ObjectId("..."),
  nombre: "Torta Chocolate",
  precio: 45990
}
```

---

## 6. JSON vs BSON

### JSON (JavaScript Object Notation)
- Formato de texto legible
- Usado para intercambio de datos
- Limitado en tipos de datos

### BSON (Binary JSON)
- Versión binaria de JSON
- Usado internamente por MongoDB
- Soporta más tipos: Date, ObjectId, Binary, etc.
- Más eficiente para almacenamiento y consultas

**Ejemplo:**
```json
// JSON
{
  "nombre": "Torta Chocolate",
  "precio": 45990,
  "fecha": "2025-01-15"
}
```

```javascript
// BSON (en MongoDB)
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  nombre: "Torta Chocolate",
  precio: NumberDecimal("45990.00"),
  fecha: ISODate("2025-01-15T00:00:00Z")
}
```

---

## 7. Comparación de Operaciones

### INSERT

**SQL:**
```sql
INSERT INTO productos (nombre, precio, stock)
VALUES ('Torta Chocolate', 45990, 100);
```

**MongoDB:**
```javascript
db.productos.insertOne({
  nombre: "Torta Chocolate",
  precio: 45990,
  stock: 100
});
```

### SELECT

**SQL:**
```sql
SELECT * FROM productos WHERE precio > 20000;
```

**MongoDB:**
```javascript
db.productos.find({ precio: { $gt: 20000 } });
```

### UPDATE

**SQL:**
```sql
UPDATE productos 
SET stock = stock - 5 
WHERE id_producto = 1;
```

**MongoDB:**
```javascript
db.productos.updateOne(
  { _id: ObjectId("...") },
  { $inc: { stock: -5 } }
);
```

### DELETE

**SQL:**
```sql
DELETE FROM productos WHERE stock = 0;
```

**MongoDB:**
```javascript
db.productos.deleteMany({ stock: 0 });
```

---

## 8. Modelado: SQL vs MongoDB

### Ejemplo: Pedido con Detalles

**SQL (Normalizado):**
```sql
-- Tabla PEDIDOS
id_pedido | id_cliente | fecha_pedido | total
1         | 5          | 2025-01-15   | 65980

-- Tabla PEDIDOS_DETALLES
id_detalle | id_pedido | id_producto | cantidad
1          | 1         | 10         | 2
2          | 1         | 15         | 1
```

**MongoDB (Documento Embebido):**
```javascript
{
  _id: ObjectId("..."),
  cliente: {
    _id: ObjectId("..."),
    nombre_completo: "Juan Pérez"
  },
  fecha_pedido: ISODate("2025-01-15"),
  total: 65980,
  detalles: [
    {
      producto: {
        _id: ObjectId("..."),
        nombre: "Torta Chocolate",
        precio: 45990
      },
      cantidad: 2,
      subtotal: 91980
    },
    {
      producto: {
        _id: ObjectId("..."),
        nombre: "Mousse Chocolate",
        precio: 5990
      },
      cantidad: 1,
      subtotal: 5990
    }
  ]
}
```

**Ventaja MongoDB:** Una sola consulta trae todo el pedido completo.

---

## 9. Cuándo Usar MongoDB

### ✅ Ideal para:
- Aplicaciones web modernas
- Contenido y catálogos
- Sistemas de logging
- Datos de IoT
- Aplicaciones móviles
- Big Data y análisis

### ❌ No ideal para:
- Sistemas transaccionales complejos (bancos)
- Datos altamente estructurados y relaciones complejas
- Aplicaciones que requieren JOINs frecuentes
- Sistemas legacy que dependen de SQL

---

## 10. Conclusión

### MongoDB es excelente cuando:
- Necesitas flexibilidad en el esquema
- Tus datos se leen más de lo que se escriben
- Quieres escalar horizontalmente
- Trabajas con datos JSON/BSON nativos

### SQL sigue siendo mejor cuando:
- Necesitas transacciones ACID complejas
- Tienes relaciones complejas entre datos
- Requieres consistencia estricta
- Tu equipo ya domina SQL

---

## 📚 Recursos Adicionales

- [MongoDB University](https://university.mongodb.com/)
- [SQL to MongoDB Mapping Chart](https://www.mongodb.com/docs/manual/reference/sql-comparison/)
- [MongoDB Best Practices](https://www.mongodb.com/docs/manual/administration/production-notes/)

---

**Nota:** Esta comparación es para el contexto de la evaluación. En la práctica, muchas empresas usan ambos tipos de bases de datos según sus necesidades.

