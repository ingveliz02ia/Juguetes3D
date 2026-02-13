# 📸 Guía de Imágenes Completas del Proyecto

Esta guía detalla todas las imágenes necesarias para el sitio web, incluyendo las del producto principal y los carruseles.

## 1. Imágenes del Producto (Galería de Compra)

Estas imágenes aparecen en la sección de compra ("Juguetes de Papel en 3D") donde está el botón de añadir al carrito.

**Ubicación:** Carpeta raíz `images/`

| Archivo | Descripción | Dimensiones Recomendadas | Peso Máx. |
| :--- | :--- | :--- | :--- |
| `product-preview.jpg` | **Imagen Principal.** Es la foto grande que se ve por defecto. Debe ser la mejor foto del pack completo o un "hero shot". | **800x800px** o **1000x1000px** (Cuadrada) | 300KB |
| `thumb-1.jpg` | **Miniatura 1.** Vista detalle 1 (ej. un juguete armado). | **200x200px** (Cuadrada) | 50KB |
| `thumb-2.jpg` | **Miniatura 2.** Vista detalle 2 (ej. un niño jugando). | **200x200px** (Cuadrada) | 50KB |
| `thumb-3.jpg` | **Miniatura 3.** Vista detalle 3 (ej. las hojas impresas). | **200x200px** (Cuadrada) | 50KB |
| `thumb-4.jpg` | **Miniatura 4.** Vista detalle 4 (ej. el resultado final en grupo). | **200x200px** (Cuadrada) | 50KB |

> **Nota:** Las miniaturas (`thumb-X.jpg`) deben ser versiones pequeñas, pero idealmente la imagen principal (`product-preview.jpg`) cambia dinámicamente al hacer clic en ellas. Para simplificar, asegúrate de que `thumb-1.jpg` sea la misma imagen que `product-preview.jpg` pero en pequeño.

---

## 2. Imágenes de Carruseles

Estas imágenes van en carpetas específicas dentro de `images/`.

### 📂 Carpeta `images/ellos/`
> **Formato:** SVG (recomendado) o JPG transparente. Fondo oscuro aplicado por CSS.

- `ellos-1.svg`
- `ellos-2.svg`
- ... hasta `ellos-10.svg`
- **Dimensiones:** SVG vectorial (sin tamaño fijo) o PNG 500x500px.

### 📂 Carpeta `images/ellas/`
> **Formato:** SVG (recomendado) o imagenes con fondo transparente.

- `ellas-1.svg`
- `ellas-2.svg`
- ... hasta `ellas-10.svg`

### 📂 Carpeta `images/todos/`
> **Formato:** SVG (recomendado) o JPG.

- `todos-1.svg` (Si decides cambiarlas a SVG) o `todos-1.jpg`
- ... hasta `todos-8.svg`

---

## 3. Resumen de Archivos Faltantes

Actualmente en tu carpeta `images/` faltan los siguientes archivos. Por favor, añádelos:

1.  `product-preview.jpg`
2.  `thumb-1.jpg`
3.  `thumb-2.jpg`
4.  `thumb-3.jpg`
5.  `thumb-4.jpg`

### ¿Cómo subirlas?
Simplemente copia tus fotos con estos nombres exactos dentro de la carpeta `d:\Paginas Web\Juguetes de Papel\images\`.
