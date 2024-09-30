# Universal Translator

Universal Translator es una aplicación web moderna y fácil de usar que permite a los usuarios traducir texto entre una amplia variedad de idiomas. Con una interfaz intuitiva y características avanzadas, este traductor es perfecto para uso personal o profesional.

## Imagen App Universal Translator

## Características

- Soporte para más de 100 idiomas
- Interfaz de usuario intuitiva y atractiva
- Traducción de texto en tiempo real
- Función de texto a voz para escuchar las traducciones
- Función de copiar al portapapeles con un solo clic
- Diseño responsive para uso en dispositivos móviles y de escritorio
- Efecto de glassmorphism para una apariencia moderna

## Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- API de MyMemory para traducciones

## Cómo Usar

1. Clona este repositorio o descarga los archivos.
2. Abre el archivo `index.html` en tu navegador web.
3. Selecciona el idioma de origen y el idioma de destino en los menús desplegables.
4. Ingresa el texto que deseas traducir en el área de texto de la izquierda.
5. Haz clic en el botón "Traducir" para ver la traducción en el área de texto de la derecha.
6. Utiliza los botones de sonido para escuchar la pronunciación del texto original o traducido.
7. Usa los botones de copia para copiar rápidamente el texto al portapapeles.

## Configuración

Para personalizar la imagen de fondo:

1. Reemplaza la ruta de la imagen en el archivo `style.css`:
   ```css
   body {
     background-image: url('path/to/your/image.jpg');
   }
   ```
2. Ajusta la opacidad del overlay modificando el valor alfa en:
   ```css
   body::before {
     background: rgba(240, 242, 245, 0.8);
   }
   ```

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir qué te gustaría cambiar.

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Autor

[Tu Nombre]

## Agradecimientos

- MyMemory por proporcionar la API de traducción
- Font Awesome por los iconos utilizados en la interfaz