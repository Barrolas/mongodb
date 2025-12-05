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
- MongoDB instalado localmente O
- Cuenta en MongoDB Atlas (gratis)

### Opción 1: MongoDB Local
1. Descargar MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Instalar y ejecutar el servicio
3. Usar MongoDB Shell (mongosh) o MongoDB Compass

### Opción 2: MongoDB Atlas (Recomendado)
1. Crear cuenta gratuita en: https://www.mongodb.com/cloud/atlas
2. Crear un cluster gratuito
3. Obtener connection string
4. Conectar desde mongosh o Compass

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

