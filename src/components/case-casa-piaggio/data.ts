import assets from './assets.json';
export const asset = (key: keyof typeof assets, alt: string) => ({ ...assets[key], alt });
export const stages = [
  { id: 'investigacion', short: 'Investigar', title: 'Investigación y diagnóstico' },
  { id: 'concepto', short: 'Explorar', title: 'Definición conceptual' },
  { id: 'desarrollo', short: 'Desarrollar', title: 'Diseño y desarrollo' },
  { id: 'experiencia', short: 'Habitar', title: 'Producción gráfica' },
];
export const climate = [
  { title: 'Humedad', question: '¿Cómo dejar respirar la casa?', text: 'Los períodos bochornosos del verano orientan la búsqueda hacia la ventilación cruzada, las galerías abiertas y los espacios con mayor altura.', image: asset('p05-X8', 'Análisis de humedad a lo largo del año') },
  { title: 'Temperatura', question: 'Abrirse en verano. Abrigarse en invierno.', text: 'La amplitud estacional lleva a combinar protección solar, captación de sol invernal y aislación. Las aberturas y los espacios intermedios forman parte de esa respuesta.', image: asset('p06-X4', 'Gráfico anual de temperatura') },
  { title: 'Lluvia', question: '¿Cómo proteger sin encerrar?', text: 'Las precipitaciones ponen en primer plano la cubierta inclinada, los aleros y los accesos secos. El anteproyecto plantea favorecer el escurrimiento y el secado del terreno.', image: asset('p07-X4', 'Análisis de precipitaciones') },
  { title: 'Viento', question: 'El aire también organiza la planta.', text: 'El análisis identifica vientos del este en los meses cálidos. La orientación de las aberturas y las conexiones entre ambientes buscan aprovechar ese movimiento.', image: asset('p08-X8', 'Direcciones predominantes del viento') },
];
export const concepts = [
  { title: 'Una regla para empezar.', text: 'La grilla modular de 16 m² permite ensayar ocupaciones y relacionar las partes. Es un soporte para investigar la forma y sus proporciones.', image: asset('p12-X8', 'Grilla modular con primeras ocupaciones') },
  { title: 'Separar para relacionar.', text: 'Dos volúmenes principales diferencian la vida compartida y el descanso. Los núcleos sanitarios conectan las tiras y concentran los servicios.', image: asset('p14-X8', 'Dos tiras principales conectadas por núcleos sanitarios') },
  { title: 'La materia también organiza.', text: 'Las tiras de ladrillo alojan los ambientes principales; los núcleos de hormigón concentran los servicios. Entre ambos, el patio aporta un vacío abierto al aire y a la luz.', image: asset('p15-X9', 'Diagrama de materialidad: ladrillo, hormigón y patio central') },
  { title: 'El centro es un patio.', text: 'El vacío central articula estar, cocina y dormitorios. Un árbol introduce una referencia compartida: la casa se conecta a través de un espacio exterior propio.', image: asset('p16-X8', 'Patio articulador y relaciones con los ambientes') },
];
export const drawings = [
  { title: 'Planta', page: 19, text: 'La organización se vuelve habitable: el bloque público reúne cocina, comedor y estar; el privado aloja el descanso. Entre ambos, servicios y patio construyen la conexión.' },
  { title: 'Fachadas', page: 20, text: 'Ladrillo, estructura de hormigón y cubiertas oscuras dan continuidad al conjunto. Los extremos curvos suavizan los encuentros y las sombras hacen visible la profundidad.' },
  { title: 'Axonométricas', page: 21, text: 'Dos miradas permiten leer el conjunto: los pabellones, las terrazas de los núcleos, el patio abierto y la relación con el jardín y la pileta.' },
  { title: 'Espacio público', page: 22, text: 'El corte fugado reúne parrilla, comedor, cocina y estar en una secuencia. La estructura ordena el espacio y las aberturas extienden las visuales hacia el jardín.' },
  { title: 'Espacio privado', page: 23, text: 'La sección de los dormitorios permite estudiar la altura interior, la cubierta y el mobiliario fijo en relación con los muros de ladrillo.' },
  { title: 'Patio central', page: 24, text: 'El árbol ocupa el vacío entre los bloques. La sección muestra cómo este exterior interiorizado relaciona escalas, visuales y entradas de luz.' },
  { title: 'Núcleo sanitario', page: 25, text: 'Los servicios se disponen a ambos lados del patio. La luz natural y el vidrio de las mamparas participan de la continuidad visual del núcleo.' },
  { title: 'Cuarto en suite', page: 26, text: 'El corte vincula dormitorio, núcleo y espacios contiguos. Permite revisar alturas y relaciones que la planta, por sí sola, no alcanza a explicar.' },
];
export const renders = [
  asset('p29-X8', 'Llegada a Casa Piaggio'),
  asset('p28-X9', 'Jardín y pileta'),
  asset('p30-X8', 'Los volúmenes al anochecer'),
  asset('p31-X8', 'Dormitorio principal'),
  asset('p31-X9', 'Espacio de descanso'),
  asset('p32-X8', 'La cocina mira al patio'),
  asset('p32-X9', 'La isla y la vida cotidiana'),
  asset('p33-X8', 'Profundidad y luz en la cocina'),
  asset('p34-X8', 'Luz natural en el baño'),
  asset('p35-X7', 'La galería como extensión de la casa'),
];
