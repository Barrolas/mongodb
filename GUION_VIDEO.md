# 🎬 Guion Completo - Video Migración a MongoDB
## Pastelería Mil Sabores

**Duración Total:** 15-18 minutos  
**Integrantes:** Nicole Chavez, Nicolás Barra

---

## 📋 PREPARACIÓN PRE-GRABACIÓN

### Checklist Técnico:
- [ ] MongoDB Community Edition instalado y corriendo
- [ ] MongoDB Compass instalado y conectado
- [ ] Base de datos `mil_sabores` creada
- [ ] Datos de ejemplo insertados
- [ ] Scripts probados y funcionando
- [ ] Presentación (PPT/Canva) lista
- [ ] Audio/micrófono probado
- [ ] Resolución: 1920x1080
- [ ] Fuente de Compass aumentada (View → Font Size → Large)
- [ ] Tema claro en Compass

### Configuración de Pantalla:
- **Lado izquierdo (30%):** Presentación PPT/Canva
- **Centro (70%):** MongoDB Compass
- **O alternar:** Pantalla completa según la escena

---

## 🎥 ESTRUCTURA DEL VIDEO

---

# ESCENA 1: INTRODUCCIÓN (1:30 - 2:00 min)

### TOMA 1.1: Portada y Presentación
**Duración:** 0:30 - 0:45 seg

**Pantalla:**
- **Diapositiva 1:** Portada del proyecto
  - Título: "MIGRACIÓN DE ORACLE A MONGODB: UNA TRANSFORMACIÓN NO-SQL"
  - Subtítulo: "Pastelería Mil Sabores"
  - Integrantes: Nicole Chavez, Nicolás Barra
  - Logo/Imagen de pastelería (opcional)

**Audio:**
- Nicole: "Hola, soy Nicole Chavez y junto con mi compañero Nicolás Barra, presentamos la migración de nuestro sistema de pastelería de Oracle SQL a MongoDB."
- Nicolás: "En este video mostraremos cómo migramos nuestra base de datos relacional a un modelo NoSQL, explicando las diferencias, ventajas y demostrando operaciones CRUD y consultas avanzadas."

**Acción:**
- Mostrar diapositiva completa
- Transición suave

---

### TOMA 1.2: Objetivos del Video
**Duración:** 0:45 - 1:15 seg

**Pantalla:**
- **Diapositiva 2:** "¿Qué veremos en este video?"
  - Bullet points:
    - Introducción a MongoDB y NoSQL
    - Modelamiento de datos
    - Operaciones CRUD
    - Consultas avanzadas con aggregate()

**Audio:**
- Nicole: "El video está dividido en varias secciones. Primero explicaremos qué es MongoDB y cómo funciona, luego mostraremos cómo modelamos nuestros datos, y finalmente demostraremos todas las operaciones CRUD y consultas avanzadas."

**Acción:**
- Mostrar diapositiva con animación de bullet points
- Cursor señalando cada punto

---

# ESCENA 2: INTRODUCCIÓN A MONGODB (3:00 - 4:00 min)
**Responsable:** Nicole Chavez

---

### TOMA 2.1: ¿Qué es NoSQL?
**Duración:** 0:45 - 1:00 seg

**Pantalla:**
- **Diapositiva 3:** "¿Qué es NoSQL?"
  - Título grande
  - Definición: "NoSQL (Not Only SQL) son bases de datos que no siguen el modelo relacional tradicional"
  - Imagen comparativa: Tabla SQL vs Documento JSON

**Audio:**
- Nicole: "NoSQL significa 'Not Only SQL', y se refiere a bases de datos que no siguen el modelo relacional tradicional de SQL. A diferencia de las bases de datos SQL que usan tablas con filas y columnas, las bases NoSQL como MongoDB almacenan datos en formato de documentos, similar a JSON."

**Acción:**
- Mostrar diapositiva
- Zoom en la comparación visual

---

### TOMA 2.2: Diferencias SQL vs NoSQL
**Duración:** 1:00 - 1:30 seg

**Pantalla:**
- **Diapositiva 4:** "SQL vs NoSQL - Comparación"
  - Tabla comparativa:
    | Aspecto | SQL (Oracle) | NoSQL (MongoDB) |
    |---------|-------------|-----------------|
    | Modelo | Tablas | Documentos |
    | Esquema | Fijo | Flexible |
    | Relaciones | JOINs | Embebidos/Referencias |
    | Escalabilidad | Vertical | Horizontal |

**Audio:**
- Nicole: "Las principales diferencias son: SQL usa tablas con esquemas fijos, mientras que MongoDB usa documentos con esquemas flexibles. En SQL hacemos JOINs para relacionar datos, en MongoDB podemos embebir datos relacionados o usar referencias. Y mientras SQL escala verticalmente, MongoDB escala horizontalmente agregando más servidores."

**Acción:**
- Mostrar tabla comparativa
- Cursor señalando cada diferencia
- Transición suave

---

### TOMA 2.3: Ventajas de MongoDB
**Duración:** 0:45 - 1:00 seg

**Pantalla:**
- **Diapositiva 5:** "Ventajas de MongoDB"
  - Iconos con texto:
    - ✅ Flexibilidad (sin esquema fijo)
    - ✅ Escalabilidad horizontal
    - ✅ Rendimiento rápido
    - ✅ Desarrollo ágil

**Audio:**
- Nicole: "MongoDB tiene varias ventajas: es flexible porque no requiere un esquema fijo, escala horizontalmente agregando servidores, tiene buen rendimiento para lectura y escritura, y permite desarrollo más ágil al trabajar directamente con JSON."

**Acción:**
- Mostrar diapositiva con animación de iconos
- Cada ventaja aparece secuencialmente

---

### TOMA 2.4: Desventajas de MongoDB
**Duración:** 0:30 - 0:45 seg

**Pantalla:**
- **Diapositiva 6:** "Desventajas de MongoDB"
  - Iconos con texto:
    - ❌ No hay JOINs directos (usa $lookup)
    - ❌ No ideal para transacciones ACID complejas
    - ❌ Requiere más planificación

**Audio:**
- Nicole: "Sin embargo, también tiene desventajas: no tiene JOINs directos como SQL, aunque podemos usar el operador lookup. No es ideal para transacciones ACID muy complejas, y requiere más planificación en el diseño de datos."

**Acción:**
- Mostrar diapositiva
- Transición rápida

---

### TOMA 2.5: Estructura de MongoDB
**Duración:** 0:30 - 0:45 seg

**Pantalla:**
- **Diapositiva 7:** "Estructura de MongoDB"
  - Diagrama jerárquico:
    ```
    Base de Datos
      └── Colecciones (Collections)
            └── Documentos (Documents)
                  └── Campos (Fields)
    ```

**Audio:**
- Nicole: "MongoDB se organiza jerárquicamente: tenemos bases de datos, que contienen colecciones, que son equivalentes a las tablas en SQL. Las colecciones contienen documentos, que son equivalentes a las filas, y los documentos tienen campos, equivalentes a las columnas."

**Acción:**
- Mostrar diagrama
- Animación de expansión del árbol

---

### TOMA 2.6: JSON/BSON Explicado
**Duración:** 0:30 - 0:45 seg

**Pantalla:**
- **Diapositiva 8:** "JSON vs BSON"
  - Código JSON de ejemplo
  - Explicación: "BSON es la versión binaria de JSON que MongoDB usa internamente"

**Audio:**
- Nicole: "MongoDB almacena datos en formato BSON, que es la versión binaria de JSON. Esto permite tipos de datos adicionales como fechas y ObjectIds, y es más eficiente para almacenamiento y consultas."

**Acción:**
- Mostrar ejemplo de JSON
- Zoom en la explicación

---

# ESCENA 3: MODELAMIENTO (2:30 - 3:30 min)
**Responsable:** Nicolás Barra

---

### TOMA 3.1: Modelo Oracle Original
**Duración:** 0:45 - 1:00 seg

**Pantalla:**
- **Diapositiva 9:** "Modelo Oracle - Estructura Original"
  - Diagrama de tablas:
    - CATEGORIAS
    - PRODUCTOS → FK a CATEGORIAS
    - CLIENTES
    - PEDIDOS → FK a CLIENTES, FK a PEDIDOS_ESTADOS
    - PEDIDOS_DETALLES → FK a PEDIDOS, FK a PRODUCTOS
  - Mostrar relaciones con líneas

**Audio:**
- Nicolás: "Nuestro sistema original en Oracle tenía estas tablas: categorías, productos con referencia a categorías, clientes, pedidos con referencia a clientes y estados, y pedidos_detalles que relaciona pedidos con productos. Todas estas relaciones se manejaban con llaves foráneas y JOINs."

**Acción:**
- Mostrar diagrama completo
- Cursor señalando cada tabla y relación
- Zoom en las relaciones

---

### TOMA 3.2: Decisiones de Diseño
**Duración:** 1:00 - 1:30 seg

**Pantalla:**
- **Diapositiva 10:** "Decisiones de Diseño MongoDB"
  - Tres decisiones principales:
    1. **Detalles embebidos en pedidos**
       - Razón: "Los detalles siempre se consultan con el pedido"
    2. **Denormalización estratégica**
       - Razón: "Campos duplicados para consultas rápidas"
    3. **Referencias para entidades grandes**
       - Razón: "Productos y clientes se referencian, no se embeben"

**Audio:**
- Nicolás: "Para migrar a MongoDB, tomamos tres decisiones clave: primero, embebimos los detalles de pedidos dentro del documento pedido, porque siempre se consultan juntos. Segundo, denormalizamos algunos campos como el nombre del cliente en el pedido, para consultas más rápidas. Y tercero, usamos referencias para productos y clientes, porque son entidades grandes que pueden cambiar."

**Acción:**
- Mostrar cada decisión con animación
- Cursor señalando cada punto

---

### TOMA 3.3: Modelo MongoDB - Estructura
**Duración:** 0:45 - 1:00 seg

**Pantalla:**
- **Diapositiva 11:** "Modelo MongoDB - Nueva Estructura"
  - Diagrama de colecciones:
    - categorias (documento simple)
    - productos (con categoría embebida)
    - clientes (documento simple)
    - pedidos (con detalles embebidos y referencias)
  - Mostrar estructura de documentos con ejemplo JSON

**Audio:**
- Nicolás: "En MongoDB, tenemos estas colecciones: categorías y clientes son documentos simples. Productos tienen la categoría parcialmente embebida para consultas rápidas. Y pedidos tienen los detalles completamente embebidos como un array, junto con referencias a cliente y productos."

**Acción:**
- Mostrar diagrama
- Expandir ejemplo de documento pedido
- Mostrar estructura JSON del pedido con detalles

---

### TOMA 3.4: Comparación Lado a Lado
**Duración:** 0:30 - 0:45 seg

**Pantalla:**
- **Diapositiva 12:** "Comparación: Oracle vs MongoDB"
  - Lado izquierdo: Tabla SQL (PEDIDOS + PEDIDOS_DETALLES)
  - Lado derecho: Documento MongoDB (pedido con detalles embebidos)
  - Flecha indicando transformación

**Audio:**
- Nicolás: "Como pueden ver, en Oracle necesitábamos dos tablas y un JOIN para obtener un pedido completo. En MongoDB, todo está en un solo documento, lo que significa una sola consulta para obtener toda la información."

**Acción:**
- Mostrar comparación lado a lado
- Animación de transformación
- Zoom en el documento MongoDB

---

# ESCENA 4: CRUD - CREATE (2:30 - 3:00 min)
**Responsable:** Nicole Chavez

---

### TOMA 4.1: Introducción a CREATE
**Duración:** 0:15 - 0:30 seg

**Pantalla:**
- **Diapositiva 13:** "Operaciones CREATE"
  - Título: "Insertar Documentos"
  - Subtítulo: "insertOne() y insertMany()"

**Audio:**
- Nicole: "Ahora vamos a demostrar las operaciones CREATE, es decir, cómo insertar documentos en MongoDB."

**Acción:**
- Mostrar diapositiva brevemente
- Transición a MongoDB Compass

---

### TOMA 4.2: Abrir MongoDB Compass
**Duración:** 0:15 - 0:20 seg

**Pantalla:**
- **MongoDB Compass:** Pantalla completa
  - Mostrar conexión a `mongodb://localhost:27017`
  - Mostrar base de datos `mil_sabores`
  - Mostrar colecciones disponibles

**Audio:**
- Nicole: "Aquí tenemos MongoDB Compass conectado a nuestra base de datos local. Podemos ver nuestra base de datos mil_sabores y las colecciones que hemos creado."

**Acción:**
- Mostrar Compass en pantalla completa
- Cursor señalando la conexión
- Navegar por las colecciones

---

### TOMA 4.3: insertOne() - Cliente
**Duración:** 0:45 - 1:00 seg

**Pantalla:**
- **MongoDB Compass:**
  1. Abrir colección `clientes`
  2. Abrir consola (mongosh) en la parte inferior
  3. Escribir comando:
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
  4. Ejecutar (Enter)
  5. Mostrar resultado: `{ acknowledged: true, insertedId: ... }`
  6. Mostrar documento creado en la tabla de documentos

**Audio:**
- Nicole: "Vamos a insertar un cliente usando insertOne. Escribo el comando en la consola de Compass, especificando todos los campos del documento. Al ejecutarlo, MongoDB me devuelve un objeto con acknowledged true y el ID del documento insertado. Y aquí podemos ver el nuevo cliente en la colección."

**Acción:**
- Escribir comando lentamente (visible en pantalla)
- Ejecutar
- Mostrar resultado
- Hacer clic en el documento creado para expandirlo
- Mostrar la estructura del documento

---

### TOMA 4.4: insertMany() - Productos
**Duración:** 0:45 - 1:00 seg

**Pantalla:**
- **MongoDB Compass:**
  1. Cambiar a colección `productos`
  2. En la consola, escribir:
     ```javascript
     db.productos.insertMany([
       {
         categoria: {
           _id: ObjectId("..."),
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
           _id: ObjectId("..."),
           nombre: "Tortas Circulares",
           slug: "tortas-circulares"
         },
         nombre: "Torta de Vainilla",
         precio: 18990,
         stock: 80,
         descripcion_corta: "Torta tradicional de vainilla",
         imagen: "https://example.com/vainilla.jpg"
       }
     ])
     ```
  3. Ejecutar
  4. Mostrar resultado con múltiples insertedIds
  5. Mostrar documentos en la tabla

**Audio:**
- Nicole: "Ahora voy a insertar múltiples productos usando insertMany. Noten que cada producto tiene la categoría embebida parcialmente, con el ID de referencia y algunos campos denormalizados como el nombre y slug. Al ejecutar, vemos que se insertaron dos productos y obtenemos sus IDs. Aquí están los documentos en la colección."

**Acción:**
- Escribir comando (mostrar estructura completa)
- Ejecutar
- Mostrar resultado
- Navegar por los documentos insertados
- Expandir uno para mostrar la estructura completa

---

### TOMA 4.5: insertOne() - Pedido Completo
**Duración:** 0:45 - 1:00 seg

**Pantalla:**
- **MongoDB Compass:**
  1. Cambiar a colección `pedidos`
  2. En la consola, escribir:
     ```javascript
     db.pedidos.insertOne({
       cliente: {
         _id: ObjectId("..."),
         nombre_completo: "María García López"
       },
       estado: "Pendiente",
       fecha_pedido: new Date(),
       total: 64980,
       detalles: [
         {
           producto: {
             _id: ObjectId("..."),
             nombre: "Torta de Chocolate Premium",
             precio: 45990
           },
           cantidad: 1,
           subtotal: 45990
         },
         {
           producto: {
             _id: ObjectId("..."),
             nombre: "Torta de Vainilla",
             precio: 18990
           },
           cantidad: 1,
           subtotal: 18990
         }
       ]
     })
     ```
  3. Ejecutar
  4. Mostrar documento creado
  5. Expandir para mostrar detalles embebidos

**Audio:**
- Nicole: "Ahora voy a crear un pedido completo. Noten que el pedido tiene el cliente con referencia y nombre denormalizado, el estado, la fecha, el total, y aquí está lo importante: un array de detalles embebidos. Cada detalle tiene el producto con referencia y datos denormalizados, la cantidad y el subtotal. Todo en un solo documento, sin necesidad de JOINs."

**Acción:**
- Escribir comando completo
- Ejecutar
- Mostrar documento creado
- Expandir el array de detalles
- Mostrar cómo se ve la estructura anidada
- Comparar visualmente con cómo sería en SQL (2 tablas)

---

# ESCENA 5: CRUD - READ (3:00 - 4:00 min)
**Responsable:** Nicolás Barra

---

### TOMA 5.1: Introducción a READ
**Duración:** 0:15 - 0:30 seg

**Pantalla:**
- **Diapositiva 14:** "Operaciones READ"
  - Título: "Consultar Documentos"
  - Subtítulo: "find() y findOne() con operadores"

**Audio:**
- Nicolás: "Ahora vamos a ver las operaciones READ, es decir, cómo consultar documentos usando find y findOne con diferentes operadores."

**Acción:**
- Mostrar diapositiva
- Transición a Compass

---

### TOMA 5.2: find() Básico
**Duración:** 0:30 - 0:45 seg

**Pantalla:**
- **MongoDB Compass:**
  1. Colección `productos`
  2. En el filtro visual, escribir: `{}`
  3. O en consola: `db.productos.find()`
  4. Mostrar todos los documentos en la tabla
  5. Explicar que sin filtro trae todo

**Audio:**
- Nicolás: "El método find sin parámetros trae todos los documentos de la colección. Es equivalente a SELECT * FROM productos en SQL."

**Acción:**
- Mostrar filtro visual vacío
- Mostrar resultados
- Alternar a consola para mostrar comando

---

### TOMA 5.3: findOne()
**Duración:** 0:30 - 0:45 seg

**Pantalla:**
- **MongoDB Compass:**
  1. En consola:
     ```javascript
     db.productos.findOne({ nombre: "Torta de Chocolate Premium" })
     ```
  2. Ejecutar
  3. Mostrar un solo documento
  4. Explicar diferencia con find()

**Audio:**
- Nicolás: "findOne devuelve solo el primer documento que coincide con el criterio. Es útil cuando sabemos que solo hay un resultado o queremos el primero."

**Acción:**
- Escribir comando
- Ejecutar
- Mostrar resultado
- Comparar con find() que devuelve cursor

---

### TOMA 5.4: Operador $gt (Mayor que)
**Duración:** 0:30 - 0:45 seg

**Pantalla:**
- **MongoDB Compass:**
  1. En filtro visual: `{ precio: { $gt: 20000 } }`
  2. Mostrar resultados filtrados
  3. Luego en consola:
     ```javascript
     db.productos.find({ precio: { $gt: 20000 } })
     ```
  4. Mostrar mismos resultados

**Audio:**
- Nicolás: "El operador $gt significa 'greater than', mayor que. Aquí busco productos con precio mayor a 20 mil pesos. Puedo usar el filtro visual de Compass o escribir el comando directamente."

**Acción:**
- Usar filtro visual primero
- Mostrar resultados
- Luego mostrar comando equivalente
- Comparar resultados

---

### TOMA 5.5: Operador $lt (Menor que)
**Duración:** 0:30 - 0:45 seg

**Pantalla:**
- **MongoDB Compass:**
  1. En consola:
     ```javascript
     db.productos.find({ stock: { $lt: 50 } })
     ```
  2. Ejecutar
  3. Mostrar productos con stock menor a 50

**Audio:**
- Nicolás: "El operador $lt significa 'less than', menor que. Aquí busco productos con stock menor a 50 unidades, útil para identificar productos que necesitan reposición."

**Acción:**
- Escribir comando
- Ejecutar
- Mostrar resultados
- Explicar caso de uso

---

### TOMA 5.6: Operador $ne (No igual)
**Duración:** 0:30 - 0:45 seg

**Pantalla:**
- **MongoDB Compass:**
  1. Colección `pedidos`
  2. En consola:
     ```javascript
     db.pedidos.find({ estado: { $ne: "Cancelado" } })
     ```
  3. Ejecutar
  4. Mostrar pedidos que NO están cancelados

**Audio:**
- Nicolás: "El operador $ne significa 'not equal', no igual. Aquí busco todos los pedidos que NO están cancelados, es decir, pedidos activos."

**Acción:**
- Escribir comando
- Ejecutar
- Mostrar resultados
- Explicar lógica de negocio

---

### TOMA 5.7: Operador $in (En lista)
**Duración:** 0:30 - 0:45 seg

**Pantalla:**
- **MongoDB Compass:**
  1. En consola:
     ```javascript
     db.productos.find({ 
       "categoria.slug": { 
         $in: ["tortas-cuadradas", "tortas-circulares"] 
       }
     })
     ```
  2. Ejecutar
  3. Mostrar productos de esas categorías

**Audio:**
- Nicolás: "El operador $in busca documentos donde el campo está en una lista de valores. Aquí busco productos que pertenezcan a las categorías 'tortas-cuadradas' o 'tortas-circulares'."

**Acción:**
- Escribir comando
- Ejecutar
- Mostrar resultados
- Explicar equivalencia SQL: WHERE categoria IN (...)

---

### TOMA 5.8: Operador $nin (No en lista)
**Duración:** 0:30 - 0:45 seg

**Pantalla:**
- **MongoDB Compass:**
  1. En consola:
     ```javascript
     db.productos.find({ 
       "categoria.slug": { 
         $nin: ["productos-veganos"] 
       }
     })
     ```
  2. Ejecutar
  3. Mostrar productos que NO son veganos

**Audio:**
- Nicolás: "El operador $nin es lo opuesto a $in, busca documentos donde el campo NO está en la lista. Aquí busco productos que NO sean veganos."

**Acción:**
- Escribir comando
- Ejecutar
- Mostrar resultados

---

### TOMA 5.9: Operador $regex (Búsqueda de texto)
**Duración:** 0:30 - 0:45 seg

**Pantalla:**
- **MongoDB Compass:**
  1. En consola:
     ```javascript
     db.productos.find({ 
       nombre: { $regex: /chocolate/i } 
     })
     ```
  2. Ejecutar
  3. Mostrar productos con "chocolate" en el nombre
  4. Explicar la 'i' para case insensitive

**Audio:**
- Nicolás: "El operador $regex permite búsqueda de texto usando expresiones regulares. Aquí busco productos cuyo nombre contenga la palabra 'chocolate', y la 'i' al final hace que sea case insensitive, es decir, no distingue entre mayúsculas y minúsculas."

**Acción:**
- Escribir comando
- Ejecutar
- Mostrar resultados
- Explicar regex básico

---

# ESCENA 6: CRUD - UPDATE (1:30 - 2:00 min)
**Responsable:** Nicole Chavez

---

### TOMA 6.1: Introducción a UPDATE
**Duración:** 0:15 - 0:30 seg

**Pantalla:**
- **Diapositiva 15:** "Operaciones UPDATE"
  - Título: "Actualizar Documentos"
  - Subtítulo: "updateOne() y updateMany()"

**Audio:**
- Nicole: "Ahora vamos a ver las operaciones UPDATE, cómo modificar documentos existentes."

**Acción:**
- Mostrar diapositiva
- Transición a Compass

---

### TOMA 6.2: updateOne() con $inc
**Duración:** 0:45 - 1:00 seg

**Pantalla:**
- **MongoDB Compass:**
  1. Colección `productos`
  2. Buscar un producto específico
  3. Mostrar documento ANTES (ej: stock: 100)
  4. En consola:
     ```javascript
     db.productos.updateOne(
       { _id: ObjectId("...") },
       { $inc: { stock: -5 } }
     )
     ```
  5. Ejecutar
  6. Mostrar resultado: `{ acknowledged: true, modifiedCount: 1 }`
  7. Refrescar vista (F5)
  8. Mostrar documento DESPUÉS (ej: stock: 95)

**Audio:**
- Nicole: "Voy a actualizar el stock de un producto usando updateOne con el operador $inc, que incrementa o decrementa un valor numérico. Primero muestro el stock actual, ejecuto el comando que resta 5 unidades, y aquí vemos el stock actualizado."

**Acción:**
- Mostrar documento antes claramente
- Escribir comando
- Ejecutar
- Mostrar resultado
- Refrescar
- Mostrar documento después
- Comparar antes/después

---

### TOMA 6.3: updateOne() con $set
**Duración:** 0:30 - 0:45 seg

**Pantalla:**
- **MongoDB Compass:**
  1. En consola:
     ```javascript
     db.productos.updateOne(
       { nombre: "Torta de Chocolate Premium" },
       { $set: { precio: 49990 } }
     )
     ```
  2. Ejecutar
  3. Mostrar documento actualizado

**Audio:**
- Nicole: "El operador $set establece o actualiza el valor de un campo. Aquí actualizo el precio de un producto específico."

**Acción:**
- Escribir comando
- Ejecutar
- Mostrar resultado
- Mostrar documento actualizado

---

### TOMA 6.4: updateMany()
**Duración:** 0:30 - 0:45 seg

**Pantalla:**
- **MongoDB Compass:**
  1. En consola:
     ```javascript
     db.productos.updateMany(
       { "categoria.slug": "tortas-cuadradas" },
       { $set: { descuento: 10 } }
     )
     ```
  2. Ejecutar
  3. Mostrar resultado: `{ acknowledged: true, modifiedCount: 5 }`
  4. Explicar que actualizó múltiples documentos

**Audio:**
- Nicole: "updateMany actualiza todos los documentos que coinciden con el criterio. Aquí actualizo todos los productos de la categoría 'tortas-cuadradas' agregando un campo de descuento. El resultado muestra que se modificaron 5 documentos."

**Acción:**
- Escribir comando
- Ejecutar
- Mostrar resultado con modifiedCount
- Verificar documentos actualizados

---

# ESCENA 7: CRUD - DELETE (1:00 - 1:30 min)
**Responsable:** Nicolás Barra

---

### TOMA 7.1: Introducción a DELETE
**Duración:** 0:15 - 0:30 seg

**Pantalla:**
- **Diapositiva 16:** "Operaciones DELETE"
  - Título: "Eliminar Documentos"
  - ⚠️ Advertencia: "Las eliminaciones son permanentes"

**Audio:**
- Nicolás: "Finalmente, las operaciones DELETE. Es importante recordar que las eliminaciones en MongoDB son permanentes, así que debemos ser cuidadosos."

**Acción:**
- Mostrar diapositiva con advertencia destacada
- Transición a Compass

---

### TOMA 7.2: deleteOne()
**Duración:** 0:30 - 0:45 seg

**Pantalla:**
- **MongoDB Compass:**
  1. Colección `clientes`
  2. Mostrar documento que se eliminará
  3. En consola:
     ```javascript
     db.clientes.deleteOne({ correo: "test@example.com" })
     ```
  4. Ejecutar
  5. Mostrar resultado: `{ acknowledged: true, deletedCount: 1 }`
  6. Refrescar vista
  7. Mostrar que el documento desapareció

**Audio:**
- Nicolás: "deleteOne elimina el primer documento que coincide con el criterio. Aquí elimino un cliente de prueba. El resultado confirma que se eliminó un documento, y al refrescar vemos que ya no está en la colección."

**Acción:**
- Mostrar documento antes
- Escribir comando
- Ejecutar
- Mostrar resultado
- Refrescar
- Mostrar que desapareció
- Advertir sobre permanencia

---

### TOMA 7.3: deleteMany()
**Duración:** 0:30 - 0:45 seg

**Pantalla:**
- **MongoDB Compass:**
  1. Colección `pedidos`
  2. Mostrar pedidos que se eliminarán (filtro primero)
  3. En consola:
     ```javascript
     db.pedidos.deleteMany({ 
       estado: "Cancelado",
       fecha_pedido: { $lt: new Date("2024-01-01") }
     })
     ```
  4. Ejecutar
  5. Mostrar resultado: `{ acknowledged: true, deletedCount: 3 }`
  6. Explicar que eliminó pedidos cancelados antiguos

**Audio:**
- Nicolás: "deleteMany elimina todos los documentos que coinciden. Aquí elimino pedidos cancelados anteriores a 2024, como limpieza de datos antiguos. Se eliminaron 3 pedidos. Siempre debemos verificar el filtro antes de ejecutar deleteMany."

**Acción:**
- Mostrar filtro primero (qué se eliminará)
- Contar documentos
- Escribir comando
- Ejecutar
- Mostrar resultado
- Advertir sobre cuidado con deleteMany

---

# ESCENA 8: CONSULTAS AVANZADAS - AGGREGATE (4:00 - 5:30 min)
**Responsable:** Ambos (2-3 consultas cada uno)

---

### TOMA 8.1: Introducción a Aggregate
**Duración:** 0:30 - 0:45 seg

**Pantalla:**
- **Diapositiva 17:** "Consultas Avanzadas con aggregate()"
  - Título: "Pipeline de Agregación"
  - Explicación: "Procesa documentos a través de etapas"
  - Operadores comunes: $match, $group, $sort, $limit, $unwind, $lookup

**Audio:**
- Nicole: "Las consultas avanzadas en MongoDB se hacen con aggregate, que procesa documentos a través de un pipeline de etapas. Cada etapa transforma los documentos y los pasa a la siguiente."

**Acción:**
- Mostrar diapositiva
- Explicar concepto de pipeline
- Transición a Compass

---

### TOMA 8.2: Consulta 1 - Top 5 Productos Más Vendidos
**Responsable:** Nicole
**Duración:** 1:00 - 1:30 seg

**Pantalla:**
- **MongoDB Compass:**
  1. Colección `pedidos`
  2. Abrir pestaña "Aggregations"
  3. **Etapa 1: $unwind**
     - Agregar stage
     - Seleccionar `$unwind`
     - Campo: `detalles`
     - Explicar: "Descompone el array de detalles"
     - Ejecutar y mostrar resultados intermedios
  4. **Etapa 2: $group**
     - Agregar stage
     - Seleccionar `$group`
     - `_id`: `$detalles.producto.nombre`
     - Agregar campo: `total_vendido` → `$sum` → `$detalles.cantidad`
     - Explicar: "Agrupa por producto y suma cantidades"
     - Ejecutar y mostrar resultados
  5. **Etapa 3: $sort**
     - Agregar stage
     - Seleccionar `$sort`
     - Campo: `total_vendido`, orden: `-1` (descendente)
     - Ejecutar
  6. **Etapa 4: $limit**
     - Agregar stage
     - Seleccionar `$limit`
     - Valor: `5`
     - Ejecutar y mostrar resultado final
  7. Mostrar comando completo en consola:
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

**Audio:**
- Nicole: "Voy a encontrar los 5 productos más vendidos. Primero uso $unwind para descomponer el array de detalles, creando un documento por cada detalle. Luego $group agrupa por nombre de producto y suma las cantidades. Después $sort ordena de mayor a menor, y finalmente $limit toma solo los primeros 5. Aquí está el resultado: los productos más vendidos con sus cantidades totales."

**Acción:**
- Construir pipeline paso a paso en la interfaz visual
- Ejecutar cada etapa y mostrar resultados
- Explicar cada operador
- Mostrar comando completo al final
- Mostrar resultado final

---

### TOMA 8.3: Consulta 2 - Ventas Totales por Categoría
**Responsable:** Nicolás
**Duración:** 1:00 - 1:30 seg

**Pantalla:**
- **MongoDB Compass:**
  1. En consola (o usar Aggregations):
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
  2. Ejecutar
  3. Mostrar resultados por categoría
  4. Explicar cada etapa

**Audio:**
- Nicolás: "Esta consulta agrupa las ventas por categoría. Primero $unwind descompone los detalles, luego $group agrupa por nombre de categoría y suma tanto el subtotal como la cantidad de productos. Finalmente ordeno por total de ventas. Esto nos muestra qué categorías generan más ingresos."

**Acción:**
- Escribir comando completo
- Ejecutar
- Mostrar resultados
- Explicar lógica de negocio
- Comparar con cómo sería en SQL (GROUP BY)

---

### TOMA 8.4: Consulta 3 - Clientes con Mayor Gasto Total
**Responsable:** Nicole
**Duración:** 1:00 - 1:30 seg

**Pantalla:**
- **MongoDB Compass:**
  1. En consola:
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
  2. Ejecutar
  3. Mostrar top 10 clientes
  4. Explicar uso de datos denormalizados

**Audio:**
- Nicole: "Esta consulta encuentra los clientes que más han gastado. Agrupo por nombre completo del cliente, que está denormalizado en el pedido, sumo el total de cada pedido y cuento cuántos pedidos tiene. Luego ordeno y limito a los top 10. Gracias a la denormalización, no necesitamos hacer un lookup a la colección de clientes."

**Acción:**
- Escribir comando
- Ejecutar
- Mostrar resultados
- Explicar ventaja de denormalización
- Mostrar datos relevantes

---

### TOMA 8.5: Consulta 4 - Productos con Stock Crítico
**Responsable:** Nicolás
**Duración:** 0:45 - 1:00 seg

**Pantalla:**
- **MongoDB Compass:**
  1. En consola:
     ```javascript
     db.productos.aggregate([
       { $match: { stock: { $lt: 20 } } },
       { $project: {
           nombre: 1,
           stock: 1,
           precio: 1,
           "categoria.nombre": 1,
           necesita_reposicion: { $cond: [
             { $lt: ["$stock", 10] },
             "URGENTE",
             "PRONTO"
           ]}
       }},
       { $sort: { stock: 1 } }
     ])
     ```
  2. Ejecutar
  3. Mostrar productos con stock bajo
  4. Explicar $match, $project, $cond

**Audio:**
- Nicolás: "Esta consulta encuentra productos con stock crítico, menor a 20 unidades. Uso $match para filtrar, $project para seleccionar campos y agregar un campo calculado que indica si necesita reposición urgente o pronto. Finalmente ordeno por stock ascendente para ver los más críticos primero."

**Acción:**
- Escribir comando
- Ejecutar
- Mostrar resultados
- Explicar cada operador
- Mostrar campo calculado

---

### TOMA 8.6: Consulta 5 - Ventas por Mes
**Responsable:** Nicole
**Duración:** 1:00 - 1:30 seg

**Pantalla:**
- **MongoDB Compass:**
  1. En consola:
     ```javascript
     db.pedidos.aggregate([
       { $match: {
           fecha_pedido: { 
             $gte: new Date("2024-01-01"),
             $lte: new Date("2024-12-31")
           }
       }},
       { $group: {
           _id: {
             año: { $year: "$fecha_pedido" },
             mes: { $month: "$fecha_pedido" }
           },
           total_ventas: { $sum: "$total" },
           cantidad_pedidos: { $sum: 1 }
       }},
       { $sort: { "_id.año": 1, "_id.mes": 1 } }
     ])
     ```
  2. Ejecutar
  3. Mostrar ventas por mes
  4. Explicar operadores de fecha

**Audio:**
- Nicole: "Esta consulta agrupa las ventas por mes del año 2024. Primero filtro por rango de fechas, luego agrupo por año y mes usando operadores de fecha de MongoDB, sumo el total y cuento pedidos. Finalmente ordeno cronológicamente. Esto nos da un reporte mensual de ventas."

**Acción:**
- Escribir comando
- Ejecutar
- Mostrar resultados
- Explicar operadores de fecha ($year, $month)
- Mostrar estructura de resultados

---

# ESCENA 9: CIERRE (1:00 - 1:30 min)

---

### TOMA 9.1: Resumen
**Duración:** 0:30 - 0:45 seg

**Pantalla:**
- **Diapositiva 18:** "Resumen"
  - Bullet points:
    - ✅ Migramos de Oracle SQL a MongoDB
    - ✅ Modelamos datos con documentos embebidos y referencias
    - ✅ Demostramos operaciones CRUD completas
    - ✅ Realizamos consultas avanzadas con aggregate()

**Audio:**
- Nicolás: "En resumen, hemos migrado exitosamente nuestro sistema de Oracle a MongoDB, modelando los datos de forma eficiente, y demostrado todas las operaciones CRUD y consultas avanzadas."

**Acción:**
- Mostrar diapositiva
- Animación de checkmarks

---

### TOMA 9.2: Entregables
**Duración:** 0:30 - 0:45 seg

**Pantalla:**
- **Diapositiva 19:** "Entregables"
  - Lista:
    - 📹 Este video (10-20 minutos)
    - 📊 Presentación (PPT/Canva)
    - 📄 Documento con script completo MongoDB
  - Nota: "Todos los scripts están disponibles en el repositorio"

**Audio:**
- Nicole: "Como entregables, presentamos este video, la presentación que hemos mostrado, y un documento completo con todos los scripts de MongoDB que pueden ejecutar."

**Acción:**
- Mostrar diapositiva
- Transición suave

---

### TOMA 9.3: Agradecimientos
**Duración:** 0:15 - 0:30 seg

**Pantalla:**
- **Diapositiva 20:** "Gracias"
  - Título: "Gracias por su atención"
  - Integrantes: Nicole Chavez, Nicolás Barra
  - Curso/Institución (opcional)

**Audio:**
- Ambos: "Gracias por su atención. Nicole Chavez y Nicolás Barra."

**Acción:**
- Mostrar diapositiva final
- Fade out suave

---

## 📊 RESUMEN DE DIAPOSITIVAS

### Total: 20 Diapositivas

1. Portada del proyecto
2. Objetivos del video
3. ¿Qué es NoSQL?
4. SQL vs NoSQL - Comparación
5. Ventajas de MongoDB
6. Desventajas de MongoDB
7. Estructura de MongoDB
8. JSON vs BSON
9. Modelo Oracle - Estructura Original
10. Decisiones de Diseño MongoDB
11. Modelo MongoDB - Nueva Estructura
12. Comparación: Oracle vs MongoDB
13. Operaciones CREATE
14. Operaciones READ
15. Operaciones UPDATE
16. Operaciones DELETE
17. Consultas Avanzadas con aggregate()
18. Resumen
19. Entregables
20. Gracias

---

## ⏱️ DISTRIBUCIÓN DE TIEMPOS

| Escena | Duración | Responsable |
|--------|----------|-------------|
| 1. Introducción | 1:30 - 2:00 | Ambos |
| 2. Introducción a MongoDB | 3:00 - 4:00 | Nicole |
| 3. Modelamiento | 2:30 - 3:30 | Nicolás |
| 4. CRUD - CREATE | 2:30 - 3:00 | Nicole |
| 5. CRUD - READ | 3:00 - 4:00 | Nicolás |
| 6. CRUD - UPDATE | 1:30 - 2:00 | Nicole |
| 7. CRUD - DELETE | 1:00 - 1:30 | Nicolás |
| 8. Consultas Avanzadas | 4:00 - 5:30 | Ambos |
| 9. Cierre | 1:00 - 1:30 | Ambos |
| **TOTAL** | **20:00 - 26:30** | |

---

## 🎬 INSTRUCCIONES DE GRABACIÓN

### Configuración de Pantalla:
- **Resolución:** 1920x1080 (Full HD)
- **Formato:** 16:9
- **Frame rate:** 30 fps (mínimo)

### Audio:
- **Micrófono:** Externo preferiblemente
- **Volumen:** Consistente entre integrantes
- **Ruido:** Ambiente silencioso
- **Prueba:** Grabar 10 segundos de prueba antes

### Iluminación:
- Buena iluminación frontal
- Evitar sombras en la cara
- Fondo neutro si aparecen en cámara

### Durante la Grabación:
- Hablar claro y pausado
- Pausar entre escenas para editar
- Si hay error, repetir la toma
- Mantener el cursor visible y moviéndose suavemente
- Zoom al 100% o 125% para legibilidad

### Post-Producción:
- Editar pausas largas
- Agregar transiciones suaves
- Verificar audio sincronizado
- Agregar títulos si es necesario
- Verificar que todo se vea bien

---

## ✅ CHECKLIST FINAL PRE-GRABACIÓN

- [ ] Todas las diapositivas creadas
- [ ] MongoDB Compass configurado y funcionando
- [ ] Datos de ejemplo insertados
- [ ] Scripts probados
- [ ] Guion leído completamente
- [ ] Prueba de audio realizada
- [ ] Prueba de pantalla realizada
- [ ] Software de grabación configurado
- [ ] Tiempo estimado calculado
- [ ] División de trabajo acordada

---

**¡Éxito en la grabación! 🎬🎥**

