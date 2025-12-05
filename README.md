# 🍰 Pastelería Mil Sabores - Migración a MongoDB

Sistema de gestión de pastelería migrado de Oracle SQL/PLSQL a MongoDB.

## 📋 Integrantes
- Nicole Chavez
- Nicolás Barra

## 🎯 Objetivo
Migrar el sistema de base de datos de Oracle a MongoDB, demostrando:
- Comprensión de bases de datos NoSQL
- Capacidad de modelar datos en MongoDB
- Implementación de operaciones CRUD
- Consultas avanzadas con aggregate()

## 📁 Estructura del Proyecto

```
mongodb/
├── contexto/                    # Archivos originales Oracle
│   ├── Mil Sabores EV2 - Tablas
│   ├── Mil Sabores EV2 - Package
│   ├── Mil Sabores EV2 - Triggers
│   └── *.pdf
├── scripts/                     # Scripts MongoDB organizados
│   ├── 01_crear_colecciones.js
│   ├── 02_migrar_datos.js
│   ├── 03_crud_create.js
│   ├── 04_crud_read.js
│   ├── 05_crud_update.js
│   ├── 06_crud_delete.js
│   └── 07_consultas_avanzadas.js
├── SCRIPT_COMPLETO_MONGODB.js   # Script unificado para entrega
├── PLAN_DESARROLLO.md           # Plan de trabajo detallado
└── README.md                    # Este archivo
```

## 🚀 Instalación y Configuración

### Requisitos
- **MongoDB Community Edition** (instalación local)
- **MongoDB Compass** (interfaz gráfica)

### Instalación de MongoDB Community Edition

1. **Descargar MongoDB Community Server:**
   - URL: https://www.mongodb.com/try/download/community
   - Seleccionar tu sistema operativo (Windows/Mac/Linux)
   - Descargar la versión más reciente

2. **Instalar MongoDB:**
   - **Windows:** Ejecutar el instalador y seguir el asistente
     - El servicio se instalará automáticamente
     - Verificar en "Servicios" que MongoDB está corriendo
   - **Mac:** Usar Homebrew: `brew install mongodb-community`
   - **Linux:** Seguir instrucciones según tu distribución

3. **Verificar Instalación:**
   ```bash
   mongosh --version
   ```
   - Debería mostrar la versión instalada

4. **Iniciar MongoDB:**
   - **Windows:** El servicio inicia automáticamente
   - **Mac/Linux:** `brew services start mongodb-community` o `sudo systemctl start mongod`

### Instalación de MongoDB Compass

1. **Descargar MongoDB Compass:**
   - URL: https://www.mongodb.com/try/download/compass
   - Descargar para tu sistema operativo

2. **Instalar y Conectar:**
   - Instalar MongoDB Compass
   - Abrir la aplicación
   - Conectar a: `mongodb://localhost:27017`
   - Verificar conexión exitosa

## 📖 Uso de los Scripts

### Ejecutar scripts individuales:
```bash
mongosh < scripts/01_crear_colecciones.js
mongosh < scripts/03_crud_create.js
```

### Ejecutar script completo:
```bash
mongosh < SCRIPT_COMPLETO_MONGODB.js
```

### Desde MongoDB Compass:
- Abrir cada archivo .js
- Copiar y pegar en la consola
- Ejecutar

## 📊 Modelo de Datos

### Colecciones Principales:
1. **categorias** - Categorías de productos
2. **productos** - Catálogo de productos
3. **clientes** - Información de clientes
4. **pedidos** - Pedidos con detalles embebidos
5. **auditoria** - Logs del sistema
6. **reportes** - Reportes pre-calculados

### Decisiones de Diseño:
- **Documentos embebidos:** Detalles de pedidos dentro del documento pedido
- **Referencias:** Productos y clientes referenciados en pedidos
- **Denormalización:** Algunos campos duplicados para consultas rápidas

## 📝 Entregables

1. ✅ Video de 10-20 minutos explicando la migración
2. ✅ Presentación (PPT/Canva)
3. ✅ Documento con script completo MongoDB
4. ✅ Scripts funcionando y probados

## 📚 Recursos

- [Documentación MongoDB](https://www.mongodb.com/docs/manual/)
- [Operadores de Consulta](https://www.mongodb.com/docs/manual/reference/operator/query/)
- [Agregación](https://www.mongodb.com/docs/manual/reference/operator/aggregation/)

## 👥 Contribuidores
- Nicole Chavez
- Nicolás Barra

---

**Nota:** Ver `PLAN_DESARROLLO.md` para el plan de trabajo detallado.

