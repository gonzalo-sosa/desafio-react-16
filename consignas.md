---

### Desafío: **Galería de Imágenes con Filtros y Modal**

#### Descripción:
Vas a crear una galería de imágenes que permita a los usuarios navegar por una colección de fotos, aplicar filtros y ver detalles de las imágenes en un modal al hacer clic sobre ellas.

### Requisitos:

1. **Galería de Imágenes:**
   - La galería debe mostrar un conjunto de imágenes de manera ordenada (en una cuadrícula o lista).
   - Las imágenes deben cargarse desde un arreglo en el estado inicial del componente. Asegúrate de usar imágenes reales, aunque se pueden usar URLs de imágenes públicas (por ejemplo, de un servicio como `unsplash.com` o `placeholder.com`).

2. **Filtros:**
   - Los usuarios deben poder filtrar las imágenes por categoría. Por ejemplo, las categorías pueden ser: "Paisajes", "Ciudades", "Animales", etc.
   - Al seleccionar un filtro, solo se deben mostrar las imágenes que pertenecen a la categoría seleccionada.
   - El filtro debe ser un componente de tipo "dropdown" o "select", donde el usuario puede elegir la categoría. El estado de la categoría seleccionada se debe gestionar en el componente de clase.

3. **Visualización de la imagen en modal:**
   - Cuando el usuario haga clic sobre una imagen de la galería, se debe abrir un modal que muestre la imagen a tamaño completo.
   - El modal debe mostrar también información adicional, como un título y una breve descripción de la imagen. Esta información debe estar disponible en el objeto de datos de cada imagen.
   - El modal debe poder cerrarse al hacer clic en un botón de cierre o al hacer clic fuera de la imagen.

4. **Gestión del estado:**
   - La galería y los filtros deben gestionarse a través del estado del componente de clase.
   - Debes tener dos estados principales: uno para las imágenes y otro para la categoría seleccionada.
   - Si se selecciona un filtro, el estado debe actualizarse y las imágenes mostradas deben reflejar ese cambio.

5. **Interactividad y ciclo de vida:**
   - **`componentDidMount()`** debe usarse para cargar las imágenes al inicio (aunque en este caso, puede estar representado como un arreglo estático).
   - **`componentDidUpdate()`** puede ser utilizado para hacer que el filtro se actualice correctamente cuando cambie el estado de la categoría seleccionada.
   - **`componentWillUnmount()`** podría ser usado para limpiar cualquier recurso, como temporizadores o eventos relacionados con el modal.

6. **Estilos:**
   - La galería debe tener un diseño claro y atractivo (utiliza una cuadrícula para las imágenes).
   - El modal debe tener un diseño sencillo pero elegante, con la imagen centrada y un fondo translúcido para el overlay.
   - Puedes usar `CSS` clásico o `inline styles` para los estilos de la aplicación.

### Funcionalidades adicionales opcionales:
- **Deslizar imágenes en el modal:**
   - Si terminas antes de lo esperado, puedes agregar la opción de navegar entre las imágenes (anterior/siguiente) dentro del modal.
  
- **Cargar imágenes de una API externa:**
   - Si te queda tiempo, puedes hacer que las imágenes sean cargadas desde una API pública (por ejemplo, la API de `Unsplash`) en lugar de usar un arreglo estático.

---

### Puntos a tener en cuenta:
- **Uso de clases:** Todos los componentes deben ser clases. Gestiona el estado de la galería y el filtro utilizando `this.setState()` y asegura que la lógica de interacción entre los diferentes componentes sea fluida.
  
- **Ciclo de vida del componente:** 
  - Asegúrate de utilizar correctamente los métodos del ciclo de vida como `componentDidMount`, `componentDidUpdate`, y `componentWillUnmount` para gestionar las actualizaciones de estado y la limpieza de recursos.

- **Interactividad:** Los filtros deben actualizarse correctamente y las imágenes deben mostrarse de acuerdo a la categoría seleccionada. Además, el modal debe ser interactivo y permitir la navegación o el cierre de la imagen.

- **Estilos:** Asegúrate de que la interfaz sea amigable y fácil de usar. La galería debe ser clara, con imágenes que se muestren bien en la interfaz, y el modal debe ser funcional y visualmente atractivo.

---

### Entregables:
- El código debe estar bien estructurado y comentado.
- Un archivo `README.md` explicando cómo ejecutar el proyecto, así como una breve explicación de la estructura y el flujo de la aplicación.

Este desafío pondrá a prueba tus habilidades con el manejo del estado, la interacción con el ciclo de vida de los componentes y la creación de una interfaz de usuario dinámica usando clases en React. Además, la gestión del modal y el filtrado de datos son tareas clave que permiten evaluar la interactividad y la lógica de la aplicación.