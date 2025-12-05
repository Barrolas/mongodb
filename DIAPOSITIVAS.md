# 📊 Diapositivas - Presentación MongoDB
## Pastelería Mil Sabores

**Herramienta:** PowerPoint o Canva  
**Formato:** 16:9 (1920x1080)  
**Total:** 20 diapositivas

---

## DIAPOSITIVA 1: PORTADA

**Título Principal:**
```
Migración de Oracle a MongoDB
```

**Subtítulo:**
```
Pastelería Mil Sabores
```

**Contenido:**
- Integrantes:
  - Nicole Chavez
  - Nicolás Barra
- Curso/Institución (opcional)
- Fecha (opcional)

**Diseño:**
- Fondo: Color pastel o imagen de pastelería
- Título: Fuente grande, negrita
- Colores: Tema de pastelería (rosado, crema, chocolate)

---

## DIAPOSITIVA 2: OBJETIVOS DEL VIDEO

**Título:**
```
¿Qué veremos en este video?
```

**Contenido (Bullet Points con animación):**
- ✅ Introducción a MongoDB y NoSQL
- ✅ Modelamiento de datos
- ✅ Operaciones CRUD
- ✅ Consultas avanzadas con aggregate()

**Diseño:**
- Fondo: Blanco o color claro
- Iconos de checkmark para cada punto
- Animación: Aparecer uno por uno

---

## DIAPOSITIVA 3: ¿QUÉ ES NOSQL?

**Título:**
```
¿Qué es NoSQL?
```

**Contenido:**
```
NoSQL (Not Only SQL)

Bases de datos que NO siguen el 
modelo relacional tradicional de SQL
```

**Imagen/Diagrama:**
- Lado izquierdo: Tabla SQL (filas y columnas)
- Lado derecho: Documento JSON (estructura anidada)
- Flecha indicando diferencia

**Diseño:**
- Título grande y claro
- Definición en texto mediano
- Comparación visual destacada

---

## DIAPOSITIVA 4: SQL VS NOSQL - COMPARACIÓN

**Título:**
```
SQL vs NoSQL - Comparación
```

**Tabla Comparativa:**

| Aspecto | SQL (Oracle) | NoSQL (MongoDB) |
|---------|-------------|-----------------|
| **Modelo de datos** | Tablas (filas/columnas) | Documentos (JSON/BSON) |
| **Esquema** | Fijo, definido antes | Flexible, puede cambiar |
| **Relaciones** | JOINs entre tablas | Embebidos/Referencias |
| **Escalabilidad** | Vertical (servidor más potente) | Horizontal (más servidores) |
| **Transacciones** | ACID completo | ACID limitado |
| **Consultas** | SQL estándar | JavaScript-like queries |

**Diseño:**
- Tabla clara y legible
- Colores alternados en filas
- Resaltar diferencias clave

---

## DIAPOSITIVA 5: VENTAJAS DE MONGODB

**Título:**
```
Ventajas de MongoDB
```

**Contenido (con iconos):**

✅ **Flexibilidad**
   - Sin esquema fijo
   - Adaptable a cambios

✅ **Escalabilidad Horizontal**
   - Agregar más servidores fácilmente
   - Crecimiento sin límites

✅ **Rendimiento Rápido**
   - Lecturas y escrituras eficientes
   - Sin JOINs costosos

✅ **Desarrollo Ágil**
   - JSON nativo
   - Menos código de mapeo

**Diseño:**
- Iconos de checkmark grandes
- Cada ventaja con su propio bloque
- Colores suaves y profesionales

---

## DIAPOSITIVA 6: DESVENTAJAS DE MONGODB

**Título:**
```
Desventajas de MongoDB
```

**Contenido (con iconos):**

❌ **No hay JOINs directos**
   - Se usa $lookup (más lento)
   - Requiere denormalización

❌ **No ideal para transacciones complejas**
   - ACID limitado
   - Mejor para operaciones simples

❌ **Requiere más planificación**
   - Diseño crítico
   - Índices deben planificarse

**Diseño:**
- Iconos de X o advertencia
- Formato similar a ventajas
- Colores más neutros

---

## DIAPOSITIVA 7: ESTRUCTURA DE MONGODB

**Título:**
```
Estructura de MongoDB
```

**Diagrama Jerárquico:**
```
┌─────────────────────┐
│  Base de Datos      │
│  (Database)         │
└──────────┬──────────┘
           │
           ├─── Colecciones (Collections)
           │    └─── Equivalente a "Tablas" en SQL
           │
           └─── Documentos (Documents)
                └─── Equivalente a "Filas" en SQL
                     │
                     └─── Campos (Fields)
                          └─── Equivalente a "Columnas" en SQL
```

**Equivalencias:**
- Base de Datos = Database
- Colecciones = Tablas (SQL)
- Documentos = Filas (SQL)
- Campos = Columnas (SQL)

**Diseño:**
- Diagrama visual claro
- Flechas y conexiones
- Colores diferenciados por nivel

---

## DIAPOSITIVA 8: JSON VS BSON

**Título:**
```
JSON vs BSON
```

**Lado Izquierdo - JSON:**
```json
{
  "nombre": "Torta Chocolate",
  "precio": 45990,
  "fecha": "2025-01-15"
}
```

**Lado Derecho - BSON:**
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  nombre: "Torta Chocolate",
  precio: NumberDecimal("45990.00"),
  fecha: ISODate("2025-01-15T00:00:00Z")
}
```

**Explicación:**
- **JSON:** Formato de texto legible
- **BSON:** Versión binaria de JSON
- **Ventajas BSON:** Más tipos de datos, más eficiente

**Diseño:**
- Comparación lado a lado
- Código con syntax highlighting
- Explicación debajo

---

## DIAPOSITIVA 9: MODELO ORACLE - ESTRUCTURA ORIGINAL

**Título:**
```
Modelo Oracle - Estructura Original
```

**Diagrama de Tablas:**

```
┌──────────────┐
│ CATEGORIAS   │
│──────────────│
│ id_categoria │
│ slug         │
│ nombre       │
└──────┬───────┘
       │
       │ FK
       ▼
┌──────────────┐
│ PRODUCTOS    │
│──────────────│
│ id_producto │
│ id_categoria │──┐
│ nombre       │  │
│ precio       │  │
│ stock        │  │
└──────────────┘  │
                  │
┌──────────────┐  │
│ CLIENTES     │  │
│──────────────│  │
│ id_cliente   │  │
│ nombre       │  │
│ correo       │  │
└──────┬───────┘  │
       │          │
       │ FK       │
       ▼          │
┌──────────────┐  │
│ PEDIDOS      │  │
│──────────────│  │
│ id_pedido    │  │
│ id_cliente   │──┘
│ id_estado    │
│ fecha_pedido │
│ total        │
└──────┬───────┘
       │
       │ FK
       ▼
┌──────────────────┐
│ PEDIDOS_DETALLES │
│──────────────────│
│ id_detalle       │
│ id_pedido        │
│ id_producto      │──┐
│ cantidad         │  │
└──────────────────┘  │
                      │
                      └─── (FK a PRODUCTOS)
```

**Leyenda:**
- FK = Foreign Key (Llave Foránea)
- Líneas = Relaciones

**Diseño:**
- Diagrama ER claro
- Colores diferentes por tabla
- Flechas indicando relaciones

---

## DIAPOSITIVA 10: DECISIONES DE DISEÑO MONGODB

**Título:**
```
Decisiones de Diseño MongoDB
```

**Contenido:**

### 1. 📦 Detalles Embebidos en Pedidos
**Razón:**
Los detalles siempre se consultan con el pedido
- Una sola consulta trae todo
- Sin necesidad de JOINs
- Mejor rendimiento

### 2. 🔄 Denormalización Estratégica
**Razón:**
Campos duplicados para consultas rápidas
- Nombre del cliente en el pedido
- Nombre y precio del producto en detalles
- Evita lookups frecuentes

### 3. 🔗 Referencias para Entidades Grandes
**Razón:**
Productos y clientes se referencian, no se embeben
- Evita duplicación excesiva
- Facilita actualizaciones
- Mantiene integridad

**Diseño:**
- Tres bloques separados
- Iconos distintivos
- Explicación clara de cada decisión

---

## DIAPOSITIVA 11: MODELO MONGODB - NUEVA ESTRUCTURA

**Título:**
```
Modelo MongoDB - Nueva Estructura
```

**Colecciones:**

```
📁 categorias
   └── Documento simple
       { _id, slug, nombre, icono }

📁 productos
   └── Con categoría embebida
       { _id, categoria: { _id, nombre, slug }, 
         nombre, precio, stock, ... }

📁 clientes
   └── Documento simple
       { _id, nombre, correo, ... }

📁 pedidos
   └── Con detalles embebidos
       { _id, cliente: { _id, nombre_completo },
         estado, fecha_pedido, total,
         detalles: [
           { producto: { _id, nombre, precio },
             cantidad, subtotal }
         ]
       }
```

**Ejemplo de Documento Pedido:**
```json
{
  "_id": ObjectId("..."),
  "cliente": {
    "_id": ObjectId("..."),
    "nombre_completo": "María García"
  },
  "estado": "Pendiente",
  "fecha_pedido": ISODate("2025-01-15"),
  "total": 64980,
  "detalles": [
    {
      "producto": {
        "_id": ObjectId("..."),
        "nombre": "Torta Chocolate",
        "precio": 45990
      },
      "cantidad": 1,
      "subtotal": 45990
    }
  ]
}
```

**Diseño:**
- Estructura de árbol
- Ejemplo de código JSON
- Colores diferenciados

---

## DIAPOSITIVA 12: COMPARACIÓN ORACLE VS MONGODB

**Título:**
```
Comparación: Oracle vs MongoDB
```

**Lado Izquierdo - Oracle SQL:**
```sql
-- Tabla PEDIDOS
id_pedido | id_cliente | fecha_pedido | total
1         | 5          | 2025-01-15   | 64980

-- Tabla PEDIDOS_DETALLES
id_detalle | id_pedido | id_producto | cantidad
1          | 1         | 10          | 1
2          | 1         | 15          | 1

-- Consulta con JOIN
SELECT p.*, pd.*
FROM PEDIDOS p
JOIN PEDIDOS_DETALLES pd ON p.id_pedido = pd.id_pedido
WHERE p.id_pedido = 1;
```

**Lado Derecho - MongoDB:**
```javascript
// Un solo documento
{
  _id: ObjectId("..."),
  cliente: { _id: ObjectId("..."), nombre: "María" },
  fecha_pedido: ISODate("2025-01-15"),
  total: 64980,
  detalles: [
    { producto: { _id: ObjectId("..."), nombre: "Torta" },
      cantidad: 1 }
  ]
}

// Una sola consulta
db.pedidos.findOne({ _id: ObjectId("...") })
```

**Flecha:** Oracle (2 tablas + JOIN) → MongoDB (1 documento)

**Diseño:**
- Comparación lado a lado
- Código con syntax highlighting
- Flecha de transformación

---

## DIAPOSITIVA 13: OPERACIONES CREATE

**Título:**
```
Operaciones CREATE
```

**Subtítulo:**
```
Insertar Documentos
```

**Contenido:**

### insertOne()
- Inserta un solo documento
- Retorna el ID del documento insertado

### insertMany()
- Inserta múltiples documentos
- Retorna array de IDs insertados

**Ejemplo Visual:**
```javascript
db.clientes.insertOne({
  nombre: "María",
  correo: "maria@example.com"
})
```

**Diseño:**
- Título destacado
- Iconos de inserción
- Ejemplo de código

---

## DIAPOSITIVA 14: OPERACIONES READ

**Título:**
```
Operaciones READ
```

**Subtítulo:**
```
Consultar Documentos
```

**Contenido:**

### find()
- Consulta múltiples documentos
- Retorna un cursor

### findOne()
- Consulta un solo documento
- Retorna el primer documento que coincide

### Operadores de Filtro:
- `$gt` - Mayor que
- `$lt` - Menor que
- `$ne` - No igual
- `$in` - En lista
- `$nin` - No en lista
- `$regex` - Búsqueda de texto

**Ejemplo:**
```javascript
db.productos.find({ precio: { $gt: 20000 } })
```

**Diseño:**
- Lista de operadores
- Ejemplo destacado
- Iconos de búsqueda

---

## DIAPOSITIVA 15: OPERACIONES UPDATE

**Título:**
```
Operaciones UPDATE
```

**Subtítulo:**
```
Actualizar Documentos
```

**Contenido:**

### updateOne()
- Actualiza el primer documento que coincide
- Retorna cantidad de documentos modificados

### updateMany()
- Actualiza todos los documentos que coinciden
- Retorna cantidad total modificada

### Operadores:
- `$set` - Establecer valor
- `$inc` - Incrementar/Decrementar
- `$push` - Agregar a array
- `$pull` - Remover de array

**Ejemplo:**
```javascript
db.productos.updateOne(
  { _id: ObjectId("...") },
  { $inc: { stock: -5 } }
)
```

**Diseño:**
- Operadores destacados
- Ejemplo práctico
- Iconos de actualización

---

## DIAPOSITIVA 16: OPERACIONES DELETE

**Título:**
```
Operaciones DELETE
```

**Subtítulo:**
```
Eliminar Documentos
```

**⚠️ Advertencia Destacada:**
```
Las eliminaciones son PERMANENTES
```

**Contenido:**

### deleteOne()
- Elimina el primer documento que coincide
- Retorna cantidad eliminada

### deleteMany()
- Elimina todos los documentos que coinciden
- Retorna cantidad total eliminada

**Ejemplo:**
```javascript
db.clientes.deleteOne({ correo: "test@example.com" })
```

**Diseño:**
- Advertencia en rojo/amarillo destacado
- Ejemplo de código
- Iconos de eliminación

---

## DIAPOSITIVA 17: CONSULTAS AVANZADAS CON AGGREGATE()

**Título:**
```
Consultas Avanzadas
```

**Subtítulo:**
```
Pipeline de Agregación
```

**Contenido:**

### Concepto:
Procesa documentos a través de **etapas** (pipeline)

### Operadores Comunes:

**Filtrado:**
- `$match` - Filtrar documentos

**Transformación:**
- `$unwind` - Descomponer arrays
- `$project` - Seleccionar campos

**Agrupación:**
- `$group` - Agrupar y calcular

**Ordenamiento:**
- `$sort` - Ordenar resultados

**Límites:**
- `$limit` - Limitar cantidad

**Relaciones:**
- `$lookup` - Hacer "JOIN" con otra colección

**Ejemplo de Pipeline:**
```javascript
db.pedidos.aggregate([
  { $unwind: "$detalles" },
  { $group: { _id: "$detalles.producto.nombre",
              total: { $sum: "$detalles.cantidad" }}},
  { $sort: { total: -1 } },
  { $limit: 5 }
])
```

**Diseño:**
- Diagrama de pipeline (flechas entre etapas)
- Lista de operadores
- Ejemplo completo

---

## DIAPOSITIVA 18: RESUMEN

**Título:**
```
Resumen
```

**Contenido (con checkmarks animados):**

✅ Migramos de Oracle SQL a MongoDB

✅ Modelamos datos con documentos embebidos y referencias

✅ Demostramos operaciones CRUD completas
   - CREATE (insertOne, insertMany)
   - READ (find, findOne con operadores)
   - UPDATE (updateOne, updateMany)
   - DELETE (deleteOne, deleteMany)

✅ Realizamos consultas avanzadas con aggregate()
   - Top productos más vendidos
   - Ventas por categoría
   - Clientes con mayor gasto
   - Productos con stock crítico
   - Ventas por mes

**Diseño:**
- Checkmarks grandes
- Lista clara
- Colores de éxito (verde)

---

## DIAPOSITIVA 19: ENTREGABLES

**Título:**
```
Entregables
```

**Contenido:**

📹 **Video**
- 10-20 minutos de duración
- Explicación completa de la migración
- Demostraciones en MongoDB Compass

📊 **Presentación**
- Este documento (PowerPoint/Canva)
- 20 diapositivas
- Comparaciones y ejemplos visuales

📄 **Documento con Script Completo**
- Todos los scripts MongoDB
- Comentados y explicados
- Listos para ejecutar

**Nota:**
```
Todos los scripts están disponibles 
en el repositorio del proyecto
```

**Diseño:**
- Iconos grandes para cada entregable
- Lista clara
- Nota al final

---

## DIAPOSITIVA 20: GRACIAS

**Título Principal:**
```
Gracias por su atención
```

**Contenido:**

**Integrantes:**
- Nicole Chavez
- Nicolás Barra

**Curso/Institución:**
- [Nombre del curso]
- [Nombre de la institución]

**Fecha:**
- [Fecha de presentación]

**Diseño:**
- Fondo elegante
- Título grande y claro
- Información de integrantes destacada
- Fade out suave (para video)

---

## 🎨 RECOMENDACIONES DE DISEÑO

### Paleta de Colores:
- **Principal:** Rosado pastel (#FFB6C1)
- **Secundario:** Crema (#FFF8DC)
- **Acento:** Chocolate (#8B4513)
- **Texto:** Negro o gris oscuro
- **Fondo:** Blanco o crema claro

### Tipografía:
- **Títulos:** Fuente sans-serif, negrita, 36-48pt
- **Subtítulos:** Sans-serif, semibold, 24-30pt
- **Cuerpo:** Sans-serif, regular, 18-22pt
- **Código:** Monospace (Consolas, Courier), 14-16pt

### Elementos Visuales:
- Iconos consistentes (usar un set completo)
- Bordes redondeados
- Sombras sutiles
- Transiciones suaves entre diapositivas

### Animaciones:
- Entrada de elementos (fade in)
- Bullet points aparecen uno por uno
- Transiciones entre diapositivas (fade o slide)

---

## 📝 NOTAS ADICIONALES

1. **Consistencia:** Mantener el mismo estilo en todas las diapositivas
2. **Legibilidad:** Asegurar que el texto sea legible desde lejos
3. **Contraste:** Buen contraste entre texto y fondo
4. **Espaciado:** No saturar con información
5. **Imágenes:** Usar imágenes relevantes si es posible (opcional)

---

**¡Listo para crear en PowerPoint o Canva! 🎨**

