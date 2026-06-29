/* Infinito Water Park — i18n compartido (ES default / EN / PT)
   Incluir en el <helmet> de cada pantalla:  <script src="i18n.js"></script>
   - Traduce automáticamente todo el texto visible (y se re-traduce ante cambios dinámicos de React).
   - Auto-inyecta un selector de idioma flotante (abajo a la izquierda).
   - Expone window.InfinitoI18n: { lang, locale, setLang(l), t(esString) } y dispara el evento 'infinito:lang'.
*/
(function () {
  'use strict';
  if (window.__InfinitoI18nInit) return;   // evitar doble inicialización (dos observers que se pisan)
  window.__InfinitoI18nInit = true;
  var LANG_KEY = 'infinito_lang';
  var LOCALES = { es: 'es-AR', en: 'en-US', pt: 'pt-BR' };

  var DICT = {
    en: {
      // ---- Nav / común ----
      'Descubrinos': 'Discover', 'Atracciones': 'Attractions', 'Gastronomía': 'Dining',
      'Cómo llegar': 'Getting here', 'Contacto': 'Contact', 'Mi cuenta': 'My account',
      'Comprá tu entrada': 'Buy your ticket', 'Volver a entradas': 'Back to tickets',
      'Inicio': 'Home', 'Entradas': 'Tickets',
      // ---- Hero ----
      '🌊 Nueva temporada 2025–2026': '🌊 New season 2025–2026',
      'El agua. La adrenalina. Lo infinito.': 'The water. The thrill. The infinite.',
      'El parque acuático más grande de Argentina está en Córdoba. 13 hectáreas para que vivas el agua como nunca.': "Argentina's largest water park is in Córdoba. 13 hectares to experience water like never before.",
      'Conseguí tus entradas': 'Get your tickets', 'Conocé el parque': 'Explore the park',
      // ---- Stats ----
      'Toboganes': 'Slides', 'Visitantes / día': 'Visitors / day', 'Hectáreas': 'Hectares',
      // ---- Zonas ----
      'El parque': 'The park',
      'Un mundo de agua para cada momento': 'A world of water for every moment',
      'Siete zonas, siete climas. De la pura adrenalina al relax absoluto.': 'Seven zones, seven moods. From pure adrenaline to total relaxation.',
      'Familias': 'Families', 'Relax': 'Relax', 'Extremo': 'Extreme', 'Niños': 'Kids', 'Adrenalina': 'Adrenaline',
      'Explorar zona': 'Explore zone',
      // ---- Tickets teaser ----
      'Elegí tu experiencia': 'Choose your experience',
      'Acceso general al parque': 'General park access', 'Reposera': 'Lounge chair', 'Flotador': 'Float',
      'Sombra de uso libre': 'Free-use shade', 'Desde': 'From', 'Ver detalles': 'See details',
      'Todo lo de Acqua Fun, y más': 'Everything in Acqua Fun, and more',
      'Estacionamiento incluido': 'Parking included', 'Seguro de lluvia': 'Rain insurance',
      'Combo gastronómico': 'Food combo', 'Comprar ahora': 'Buy now', '★ MÁS ELEGIDA': '★ MOST POPULAR',
      'La experiencia premium': 'The premium experience', 'Cabaña lounge privada': 'Private lounge cabana',
      'Acceso rápido sin filas': 'Fast access, no lines', 'Frigobar y atención': 'Minibar and service',
      'Menores de 4 años gratis · 20% de descuento para menores de 12': 'Under 4 free · 20% off for under 12',
      'Ver todas las opciones': 'See all options',
      // ---- Bento ----
      'Lo destacado': 'Highlights', 'Experiencias que solo vivís acá': "Experiences you'll only find here",
      'Piscina de Olas': 'Wave Pool', '3,5 millones de litros · olas de hasta 1,8 m': '3.5 million liters · waves up to 1.8 m',
      'Río': 'Lazy', 'Lento': 'River', '500 metros de recorrido': '500 meters long',
      'Gastronomía sin límites': 'Dining without limits',
      // ---- Cómo funciona ----
      'Sin filas, sin vueltas': 'No lines, no fuss', 'Comprá, escaneá y entrá': 'Buy, scan and enter',
      'Elegís tu entrada online': 'Choose your ticket online',
      'Fecha, tipo de entrada y add-ons en minutos.': 'Date, ticket type and add-ons in minutes.',
      'Recibís tu QR por email': 'Get your QR by email',
      'Tu entrada digital, lista en tu wallet.': 'Your digital ticket, ready in your wallet.',
      'Escaneás y entrás sin filas': 'Scan and enter, no lines',
      'Presentá el QR en el torniquete y a disfrutar.': 'Show the QR at the turnstile and enjoy.',
      // ---- Ubicación ----
      'Te esperamos en Córdoba': "We're waiting for you in Córdoba",
      'Predio Infinito Water Park': 'Infinito Water Park grounds',
      'Ruta provincial, Córdoba · Acceso desde autopista Córdoba–Rosario': 'Provincial route, Córdoba · Access from the Córdoba–Rosario highway',
      'Horarios': 'Hours', 'Viernes a Domingo': 'Friday to Sunday', 'Lunes a Jueves': 'Monday to Thursday',
      'Cerrado (temporada)': 'Closed (season)', 'Ver en Google Maps': 'View on Google Maps',
      // ---- Social ----
      'Etiquetanos y aparecé en nuestro feed.': 'Tag us and appear in our feed.',
      'Seguinos en Instagram': 'Follow us on Instagram',
      // ---- FAQ ----
      'Dudas': 'Questions', 'Preguntas frecuentes': 'Frequently asked questions',
      '¿Puedo comprar la entrada en la puerta?': 'Can I buy tickets at the gate?',
      'Sí, pero te recomendamos comprar online: asegurás tu lugar en días de alta demanda y evitás las filas de boletería. Online suele tener mejor precio anticipado.': 'Yes, but we recommend buying online: you secure your spot on busy days and skip the box-office lines. Online usually has a better advance price.',
      '¿Qué pasa si llueve? ¿Tienen seguro de lluvia?': "What if it rains? Do you offer rain insurance?",
      'Las entradas Acqua Plus y Tribu VIP incluyen seguro de lluvia. Si la jornada se ve afectada por mal tiempo, podés reprogramar tu visita sin costo. En Acqua Fun lo podés sumar como add-on.': 'Acqua Plus and Tribu VIP tickets include rain insurance. If the day is affected by bad weather, you can reschedule your visit at no cost. With Acqua Fun you can add it as an add-on.',
      '¿Hay estacionamiento en el predio?': 'Is there parking on site?',
      'Sí, contamos con más de 1.200 lugares en 4 sectores. Acqua Plus y Tribu VIP lo incluyen sin cargo. Para Acqua Fun se abona por separado y podés pagarlo con tu pulsera cashless.': 'Yes, we have over 1,200 spaces across 4 sectors. Acqua Plus and Tribu VIP include it at no charge. For Acqua Fun it is paid separately and you can pay with your cashless band.',
      '¿Los menores de 4 años pagan entrada?': 'Do children under 4 pay admission?',
      'No. Los menores de 4 años ingresan gratis y no requieren ticket. Los menores de 12 tienen un 20% de descuento sobre la tarifa de adulto.': 'No. Children under 4 enter free and need no ticket. Children under 12 get 20% off the adult fare.',
      '¿Puedo llevar comida y bebidas?': 'Can I bring food and drinks?',
      'No se permite el ingreso de comida ni bebidas de afuera, salvo casos médicos justificados. Dentro del parque vas a encontrar Novecento, Mostaza, Betos, Barilate y varios kioscos.': 'Outside food and drinks are not allowed, except for justified medical cases. Inside the park you will find Novecento, Mostaza, Betos, Barilate and several kiosks.',
      '¿Tienen lockers?': 'Do you have lockers?',
      'Sí, hay lockers en tamaños S, M, L y XL disponibles por día. Podés reservarlos al comprar tu entrada o alquilarlos el mismo día en el parque.': 'Yes, lockers come in S, M, L and XL sizes available by the day. You can reserve them when buying your ticket or rent them on the day at the park.',
      '¿Cómo funciona el acceso rápido VIP?': 'How does VIP fast access work?',
      'Con la entrada Tribu VIP accedés a las atracciones VIP sin hacer fila, además de tu cabaña lounge privada con frigobar y atención personalizada.': 'With the Tribu VIP ticket you access VIP attractions without queuing, plus your private lounge cabana with a minibar and personalized service.',
      '¿Hay descuentos para grupos y colegios?': 'Are there discounts for groups and schools?',
      'Sí, ofrecemos tarifas especiales y coordinación para grupos de más de 15 personas, turismo estudiantil y colegios. Solicitá una cotización desde la sección de tickets.': 'Yes, we offer special rates and coordination for groups of more than 15 people, student tourism and schools. Request a quote from the tickets section.',
      '¿Qué pasa si necesito reprogramar mi visita?': 'What if I need to reschedule my visit?',
      'Podés reprogramar tu visita desde Mi cuenta hasta 48 hs antes, sujeto a disponibilidad de fechas. Con seguro de lluvia la reprogramación por clima es sin cargo.': 'You can reschedule from My account up to 48 hours in advance, subject to date availability. With rain insurance, weather rescheduling is free.',
      '¿Cómo recibo mis entradas?': 'How do I receive my tickets?',
      'Apenas confirmás el pago recibís tus entradas digitales con QR por email y quedan guardadas en tu wallet dentro de Mi cuenta. Solo tenés que presentar el QR en el torniquete.': 'As soon as you confirm payment you receive your digital QR tickets by email, saved in your wallet under My account. Just show the QR at the turnstile.',
      // ---- Footer ----
      'El Parque': 'The Park', 'Quiénes somos': 'About us', 'Las 7 zonas': 'The 7 zones', 'Noticias': 'News',
      'Tipos de entrada': 'Ticket types', 'Grupos y colegios': 'Groups and schools', 'Promociones': 'Promotions',
      'Información': 'Information', 'Estacionamiento': 'Parking', 'Preguntas frecuentes': 'FAQ',
      'Reglamento': 'Rules', '© 2026 Infinito Water Park. Todos los derechos reservados.': '© 2026 Infinito Water Park. All rights reserved.',
      'Política de privacidad': 'Privacy policy', 'Términos': 'Terms', '¿Tenés dudas?': 'Need help?',
      // ---- Tickets page ----
      'Comprá tus entradas': 'Buy your tickets', 'Alta demanda este fin de semana': 'High demand this weekend',
      'Seleccioná la fecha': 'Select the date',
      'Lun': 'Mon', 'Mar': 'Tue', 'Mié': 'Wed', 'Jue': 'Thu', 'Vie': 'Fri', 'Sáb': 'Sat', 'Dom': 'Sun',
      'Disponible (vie–dom)': 'Available (Fri–Sun)', 'Cerrado': 'Closed', 'Seleccionado': 'Selected',
      'Elegí tu tipo de entrada': 'Choose your ticket type',
      'Acceso general · reposera · flotador · sombra de uso libre': 'General access · lounge chair · float · free-use shade',
      'Adulto': 'Adult', 'Menor -12': 'Child -12', 'Menor -4': 'Child -4', 'Gratis': 'Free',
      'Adultos': 'Adults', 'Menores': 'Children', 'adulto': 'adult', 'menor': 'child',
      'Todo Acqua Fun + estacionamiento + seguro de lluvia + combo gastronómico': 'All of Acqua Fun + parking + rain insurance + food combo',
      'Acceso rápido · todo Acqua Plus · cabaña lounge privada · frigobar · atención personalizada · 2 a 6 personas': 'Fast access · all of Acqua Plus · private lounge cabana · minibar · personalized service · 2 to 6 people',
      'Cabaña (hasta 6 personas)': 'Cabana (up to 6 people)', 'Cabañas': 'Cabanas',
      '¿Más de 15 personas? Descuentos especiales y coordinación grupal.': 'More than 15 people? Special discounts and group coordination.',
      'Solicitar cotización': 'Request a quote',
      'Mejorá tu visita': 'Enhance your visit', '(opcional)': '(optional)',
      'Locker mediano /día': 'Medium locker /day', 'Locker grande /día': 'Large locker /day',
      'Upgrade acceso rápido': 'Fast-access upgrade', 'Pack de fotos profesionales': 'Pro photo pack',
      'Toalla de alquiler': 'Towel rental',
      'Resumen de compra': 'Purchase summary',
      'Elegí una fecha y tus entradas para ver el detalle.': 'Choose a date and your tickets to see the breakdown.',
      'Subtotal': 'Subtotal', 'Aplicar': 'Apply', 'Descuento': 'Discount', 'Continuar': 'Continue',
      'Pago 100% seguro': '100% secure payment',
      // ---- Checkout ----
      'Tus datos': 'Your details', 'Visitantes': 'Visitors', 'Pago': 'Payment',
      'Usamos estos datos para enviarte tus entradas con QR.': 'We use these details to send your QR tickets.',
      'Nombre completo': 'Full name', 'Quiero crear una cuenta para guardar mis tickets y sumar puntos': 'I want to create an account to save my tickets and earn points',
      '¿Ya tenés cuenta?': 'Already have an account?', 'Iniciá sesión': 'Log in',
      'Datos de los visitantes': 'Visitor details',
      'Nombre y DNI de cada visitante para el sistema de acceso con QR.': 'Name and ID for each visitor for the QR access system.',
      'El titular de la compra es uno de los visitantes': 'The buyer is one of the visitors',
      'Visitante': 'Visitor', 'Atrás': 'Back', 'Continuar al pago': 'Continue to payment',
      'Tarjeta': 'Card', 'Transferencia': 'Transfer', 'Número de tarjeta': 'Card number',
      'Nombre como figura en la tarjeta': 'Name as shown on card', 'Vencimiento': 'Expiry',
      'Cuotas sin interés': 'Interest-free installments', 'Vas a pagar con Mercado Pago': "You'll pay with Mercado Pago",
      'Te redirigimos a tu cuenta para confirmar el pago de forma segura.': "We'll redirect you to your account to confirm payment securely.",
      'Datos para transferencia': 'Transfer details',
      'Enviá el comprobante por WhatsApp para confirmar tu reserva.': 'Send the receipt via WhatsApp to confirm your booking.',
      'Resumen del pedido': 'Order summary', 'Acepto los': 'I accept the', 'términos y condiciones': 'terms and conditions',
      'y la': 'and the', 'política de privacidad': 'privacy policy', 'Pagar': 'Pay',
      // ---- Confirmación ----
      '¡Listo! Tu visita está asegurada 🌊': 'Done! Your visit is secured 🌊',
      'Te enviamos las entradas a': 'We sent your tickets to', '. Orden': '. Order',
      'Escaneá en el acceso': 'Scan at entry', 'Fecha': 'Date', 'Horario': 'Hours', 'Código': 'Code',
      'Sombra libre': 'Free shade', 'Cabaña lounge': 'Lounge cabana', 'Acceso rápido': 'Fast access', 'Frigobar': 'Minibar',
      'Descargar tickets': 'Download tickets', 'Compartir': 'Share', 'Próximos pasos': 'Next steps',
      'Antes de tu visita': 'Before your visit',
      'Descargá la app · Leé el reglamento · Planificá tu recorrido desde Mi cuenta': 'Download the app · Read the rules · Plan your route from My account',
      'El día de tu visita': 'On the day of your visit',
      'Llegá 30 min antes · Presentá tu QR en el torniquete · Retirá tu pulsera cashless': 'Arrive 30 min early · Show your QR at the turnstile · Pick up your cashless band',
      'Después de tu visita': 'After your visit',
      'Calificá tu experiencia y ganás puntos InfinitoPass · Compartí fotos con #InfinitoWaterpark': 'Rate your experience and earn InfinitoPass points · Share photos with #InfinitoWaterpark',
      'Registrate y acumulá puntos': 'Sign up and earn points',
      'Guardá tus tickets, sumá InfinitoPass y desbloqueá beneficios en cada visita.': 'Save your tickets, build InfinitoPass and unlock perks on every visit.',
      'Crear mi cuenta': 'Create my account',
      'Dónde comer en el parque':'Where to eat in the park',
      'Cuatro propuestas para todos los gustos, sistema de pago sin efectivo y todo lo que necesitás para tu día perfecto.':'Four options for every taste, cashless payment and everything you need for your perfect day.',
      'La propuesta':'The lineup','Comé rico en cada rincón':'Great food in every corner','Ver menú':'View menu',
      'Bistró argentino · cocina de autor':'Argentine bistro · signature cuisine','Fast food · hamburguesas':'Fast food · burgers','Parrilla · sándwiches':'Grill · sandwiches','Heladería · café':'Ice cream · coffee',
      'Pulsera cashless':'Cashless band','Comprá sin sacar la billetera':'Pay without reaching for your wallet',
      'Cargás saldo, pagás con tu pulsera en cualquier punto del parque y controlás todo desde tu cuenta. Sin efectivo, sin tarjetas mojadas.':'Top up, pay with your band anywhere in the park and track everything from your account. No cash, no wet cards.',
      'Cargás saldo en la app o en el parque':'Top up in the app or at the park','Pagás en cualquier punto de venta con tu pulsera':'Pay at any point of sale with your band','Controlás todo el consumo desde tu cuenta':'Track all your spending from your account',
      'Activá tu pulsera':'Activate your band','Tu pulsera':'Your band','Saldo disponible':'Available balance','Carga inicial':'Initial top-up',
      'Servicios':'Services','Todo para tu comodidad':'Everything for your comfort',
      'Lockers':'Lockers','Reposeras':'Lounge chairs','Sombrillas':'Umbrellas','Flotadores':'Floats','Protector solar':'Sunscreen','Toallas':'Towels',
      'Tamaños S, M, L y XL por día':'Sizes S, M, L and XL per day','Alquiler por día, zonas de sombra':'Daily rental, shaded areas','Reservá tu sombra':'Reserve your shade','Para río lento y olas':'For the lazy river and waves','Disponible en kioscos':'Available at kiosks','Alquiler con depósito':'Rental with deposit',
      'Puntos de hidratación gratuitos':'Free hydration points','Más de 20 bebederos de agua potable distribuidos en todas las zonas del parque.':'Over 20 drinking-water fountains across every zone of the park.',
      'Menú':'Menu','Pagá con tu pulsera cashless en este local.':'Pay with your cashless band at this spot.','Cargá tu pulsera':'Top up your band','Elegí cuánto querés cargar a tu saldo cashless.':'Choose how much to add to your cashless balance.','Nuevo saldo':'New balance','Cargar saldo':'Top up','Desde $6.000':'From $6,000',
      'Mis tickets':'My tickets','Tu wallet de entradas digitales. Presentá el QR en el acceso.':'Your digital ticket wallet. Show the QR at entry.','Tu próxima visita':'Your next visit',
      'Próximas':'Upcoming','Usadas':'Used','Vencidas':'Expired','Titular':'Holder','Válida':'Valid','Usada':'Used','Vencida':'Expired',
      'Presentar en acceso':'Show at entry','Transferir':'Transfer','Ya registrada':'Already registered','No tenés entradas en esta categoría.':'You have no tickets in this category.','Listo para escanear':'Ready to scan','Mi pulsera':'My band',
      'Tu sistema de pago sin efectivo dentro del parque.':'Your cashless payment system inside the park.','Pulsera Infinito':'Infinito Band','Activa':'Active','ID DE PULSERA':'BAND ID',
      'Sumá dinero a tu pulsera':'Add money to your band','Ver historial de consumos':'View spending history','Todos tus movimientos':'All your transactions',
      'Transferir saldo':'Transfer balance','A otro usuario Infinito':'To another Infinito user','Historial de consumos':'Spending history',
      'Elegí el monto a cargar.':'Choose the amount to add.','Confirmar carga':'Confirm top-up','Carga de saldo':'Balance top-up','Ahora':'Now','Locker grande':'Large locker',
      'Planificador':'Planner','Planificador de visita':'Visit planner','Armá tu recorrido ideal y aprovechá al máximo el día.':'Build your ideal route and make the most of the day.',
      'Compartir mi plan':'Share my plan','Mapa del parque':'Park map','Sugerencias inteligentes':'Smart suggestions',
      'La Piscina de Olas tiene menor espera entre 11:00 y 13:00.':'The Wave Pool has shorter waits between 11:00 and 13:00.','Chuncanas: menores tiempos en los primeros 30 min del día.':'Chuncanas: shortest waits in the first 30 min of the day.','La Zona VIP requiere ticket Tribu Cabaña.':'The VIP Zone requires a Tribu Cabaña ticket.',
      'Mi itinerario del día':'My day itinerary','Agregar atracción':'Add attraction','Tu día está libre.':'Your day is open.','Agregá atracciones para armar tu recorrido.':'Add attractions to build your route.',
      'Se agregan a tu itinerario en el próximo horario libre.':'They are added to your itinerary in the next free slot.','Agregar':'Add','Tranquila':'Calm','Moderada':'Moderate','Alta':'High','Extrema':'Extreme','· espera ~':'· wait ~',
      'Más de 1.200 lugares en el predio, en 4 sectores. Consultá la disponibilidad en tiempo real.':'Over 1,200 spaces on site across 4 sectors. Check availability in real time.',
      'Estado actual en vivo':'Live status now','Próxima actualización:':'Next update:','Actualizar':'Refresh','Sector':'Sector','Completo':'Full','Casi lleno':'Almost full','Disponible':'Available','libres':'free',
      '¿Incluido en tu ticket?':'Included in your ticket?','Se abona aparte':'Paid separately','Incluido':'Included','Tarifas y medios de pago':'Rates and payment methods','Por hora (sin ticket)':'Per hour (no ticket)','Día completo':'Full day','Con Acqua Plus':'With Acqua Plus','Sin cargo':'Free','Efectivo':'Cash','Mapa de sectores':'Sector map','Accesibilidad':'Accessibility',
      '40 espacios reservados para personas con discapacidad, ubicados junto al acceso peatonal. Presentá tu credencial al ingresar.':'40 spaces reserved for people with disabilities, next to the pedestrian entrance. Show your card on arrival.',
      'Estamos en Córdoba, a minutos de la ciudad y con acceso directo desde la autopista.':"We're in Córdoba, minutes from the city with direct highway access.",
      'Predio Infinito Water Park, Córdoba. Acceso directo desde la autopista Córdoba–Rosario, salida señalizada.':'Infinito Water Park grounds, Córdoba. Direct access from the Córdoba–Rosario highway, signposted exit.',
      'En auto':'By car','Desde el centro de Córdoba, 25 minutos por autopista. Estacionamiento propio con más de 1.200 lugares.':'25 minutes from downtown Córdoba by highway. On-site parking with over 1,200 spaces.',
      'Transporte público':'Public transport','Líneas de colectivo con parada en el ingreso del predio. Consultá horarios de temporada en la app.':'Bus lines stop at the park entrance. Check seasonal schedules in the app.',
      'Remis, Uber y micros':'Taxi, Uber and coaches','Zona de ascenso y descenso señalizada. Espacio dedicado para micros de turismo y colegios.':'Signposted drop-off and pick-up zone. Dedicated space for tour and school coaches.',
      'Resolvé tus dudas antes de tu visita. Si necesitás más ayuda, escribinos.':'Clear up your questions before your visit. If you need more help, write to us.',
      '¿Todavía tenés dudas?':'Still have questions?','Nuestro equipo te responde por WhatsApp o desde el formulario de contacto.':'Our team replies via WhatsApp or through the contact form.',
      '¿Tenés una consulta? Escribinos y te respondemos a la brevedad.':'Have a question? Write to us and we will reply shortly.',
      'Escribinos':'Write to us','Nombre':'Name','Asunto':'Subject','Mensaje':'Message','Tu nombre':'Your name','¿Sobre qué nos escribís?':'What is it about?','Contanos tu consulta...':'Tell us your question...',
      'Enviar consulta':'Send message','¡Mensaje enviado!':'Message sent!','Gracias por escribirnos. Te respondemos dentro de las 48 horas hábiles.':'Thanks for writing. We reply within 48 business hours.','Enviar otra consulta':'Send another message','Viernes a Domingo · 9:30 a 20:00':'Friday to Sunday · 9:30 to 20:00',
      'Noticias y novedades':'News & updates','Todo lo que pasa en Infinito Water Park, en un solo lugar.':'Everything happening at Infinito Water Park, in one place.',
      'Novedades':'Updates','Tips':'Tips','Enterate antes que nadie':'Be the first to know','Suscribite y recibí novedades, promos y aperturas de temporada.':'Subscribe and get news, deals and season openings.','Tu email':'Your email','Suscribirme':'Subscribe',
      'Inauguramos la nueva Torre de Caída Libre':"We're opening the new Free Fall Tower",'Temporada 2025–2026: todo lo que tenés que saber':'Season 2025–2026: everything you need to know','La pulsera cashless llega a todo el parque':'The cashless band arrives across the park','Cómo aprovechar tu día en la Piscina de Olas':'How to make the most of your day at the Wave Pool','Descuentos especiales para colegios y grupos':'Special discounts for schools and groups','Sumamos nuevas opciones en Buen Este':'New dining options at Buen Este','Récord de visitantes en el fin de semana de apertura':'Record attendance on opening weekend',
      '40 metros de adrenalina pura llegan a la zona Chuncanas. La caída más extrema del parque ya está operativa para esta temporada.':"40 meters of pure adrenaline arrive at the Chuncanas zone. The park's most extreme drop is now open this season.",'Horarios, nuevas atracciones y experiencias que te esperan este verano.':'Hours, new attractions and experiences waiting for you this summer.','Pagá sin efectivo en cualquier punto de venta con tu pulsera Infinito.':'Pay cashless at any point of sale with your Infinito band.','Los mejores horarios y consejos para disfrutar el espejo de agua más grande.':'The best times and tips to enjoy the largest body of water.','Tarifas y coordinación para grupos de más de 15 personas y turismo estudiantil.':'Rates and coordination for groups of more than 15 people and student tourism.','Más variedad gastronómica en el corazón del parque para todos los gustos.':'More dining variety in the heart of the park for every taste.','Miles de familias disfrutaron del arranque de la temporada en Córdoba.':'Thousands of families enjoyed the season kickoff in Córdoba.',
      '15 de diciembre de 2025':'December 15, 2025','2 de diciembre de 2025':'December 2, 2025','20 de noviembre de 2025':'November 20, 2025','8 de noviembre de 2025':'November 8, 2025','28 de octubre de 2025':'October 28, 2025','15 de octubre de 2025':'October 15, 2025','5 de octubre de 2025':'October 5, 2025',
      // ---- Login / Registro (B1) ----
      'Tu mundo de agua, siempre con vos': 'Your world of water, always with you',
      'Guardá tus tickets, controlá tu pulsera cashless, planificá tu visita y sumá puntos InfinitoPass en cada ola.': 'Save your tickets, manage your cashless band, plan your visit and earn InfinitoPass points with every wave.',
      'Ingresá': 'Log in', 'Registrate': 'Sign up', 'Bienvenido de nuevo': 'Welcome back',
      'Ingresá para ver tus tickets y tu pulsera.': 'Log in to see your tickets and your band.',
      'Email': 'Email', 'Contraseña': 'Password', '¿Olvidaste tu contraseña?': 'Forgot your password?',
      'Ingresar': 'Log in', 'o continuá con': 'or continue with', 'Creá tu cuenta': 'Create your account',
      'Sumá +50 puntos InfinitoPass al completar tu perfil.': 'Earn +50 InfinitoPass points when you complete your profile.',
      'Nombre': 'First name', 'Apellido': 'Last name', 'Repetir contraseña': 'Repeat password',
      'Acepto los términos y quiero recibir promociones de Infinito Water Park': 'I accept the terms and want to receive Infinito Water Park promotions',
      // ---- Dashboard huésped (B2) ----
      'Mis tickets': 'My tickets', 'Mi pulsera': 'My band', 'Planificar visita': 'Plan visit',
      '🏄 Nivel': '🏄 Level', 'puntos': 'points', 'Tu próxima visita': 'Your next visit',
      'Ver ticket completo': 'See full ticket', 'Te faltan': 'You need',
      'pts para desbloquear el nivel': 'pts to unlock the level', 'Últimas visitas': 'Recent visits',
      'Calificar': 'Rate', 'Beneficios activos': 'Active perks', '10% off próxima visita': '10% off next visit',
      'Locker gratis 1 día': 'Free locker 1 day', 'Bonus de cumpleaños': 'Birthday bonus',
      // ---- Backoffice (C) ----
      'Control de acceso': 'Access control', 'Tickets & Ventas': 'Tickets & Sales', 'CRM': 'CRM',
      'Reportes': 'Reports', 'Configuración': 'Settings', 'Cerrar sesión': 'Log out', 'Gerente General': 'General Manager',
      'Buscar visitante, ticket, patente…': 'Search visitor, ticket, plate…', 'Parque ABIERTO': 'Park OPEN',
      'Dashboard ejecutivo': 'Executive dashboard',
      'Rendimiento comercial del día':'Daily commercial performance','Exportar CSV':'Export CSV','Vendidos hoy':'Sold today','Bolería':'Box office','Boletería':'Box office','Reembolsos':'Refunds','Ventas por hora':'Sales by hour','Mix por tipo':'Mix by type','Detalle de ventas':'Sales detail',
      'Panel de atracciones':'Attractions panel',
      'Gestión de estacionamiento':'Parking management',
      'Gastronomía & F&B':'Dining & F&B',
      'CRM de visitantes':'Visitor CRM',
      'Gamificación InfinitoPass':'InfinitoPass gamification',
      'Reportes & Analytics':'Reports & Analytics',
      'Configuración del sistema':'System settings',
      'Torniquete 3 · Acceso Norte':'Turnstile 3 · North Entrance',
      'POS · Mostaza':'POS · Mostaza',
      'Chuncanas · Operador: Juan T.':'Chuncanas · Operator: Juan T.',
      'Seguridad & Emergencias':'Security & Emergencies',
      'Puesto Guardavidas':'Lifeguard post','Piscina de Olas · Carla M. ·':'Wave Pool · Carla M. ·','En servicio':'On duty','Capacidad de mi zona':'My zone capacity','de ocupación':'occupancy','Alta':'High','Moderada':'Moderate','Solicitar apoyo':'Request backup','Alertas y mensajes':'Alerts and messages','Central: rotación de turno en 25 min.':'Center: shift rotation in 25 min.','Ocupación creciente en sector oeste.':'Rising occupancy in the west sector.','Control de cloro OK.':'Chlorine check OK.','Incidente reportado a central. Apoyo en camino.':'Incident reported to center. Backup on the way.','Tipo: Médico leve':'Type: Minor medical','Tipo: Rescate acuático':'Type: Water rescue','Tipo: Conducta / seguridad':'Type: Conduct / security','Tipo: Otro':'Type: Other','Describí la situación…':'Describe the situation…','Enviar reporte':'Send report','Apoyo solicitado a zona contigua':'Backup requested from adjacent zone','EMERGENCIA enviada a central y seguridad':'EMERGENCY sent to center and security',
      'Limpieza & Mantenimiento':'Cleaning & Maintenance','Turno tarde · Equipo B ·':'Afternoon shift · Team B ·','Reportar problema':'Report problem','Pendientes':'Pending','En progreso':'In progress','Completadas':'Completed','Checklist de tareas':'Task checklist','Completada':'Completed','En curso':'In progress','Sin iniciar':'Not started','Pendiente':'Pending','Limpieza de baños sector Olas':'Restroom cleaning Olas sector','Reposición de cloro pileta principal':'Chlorine refill main pool','Control de toboganes Chuncanas':'Chuncanas slides check','Vaciado de cestos zona gastronómica':'Bin emptying dining area','Limpieza de vestuarios':'Locker room cleaning','Revisión de bombas río lento':'Lazy river pump check','Reporte enviado a mantenimiento central.':'Report sent to central maintenance.','Describí el problema…':'Describe the problem…','Adjuntar foto':'Attach photo','Central de monitoreo ·':'Monitoring center ·','EMERGENCIA ACTIVA':'EMERGENCY ACTIVE','Alerta':'Alert','Todo normal':'All normal','Normal':'Normal','guardias ·':'guards ·','personas':'people','Activar alerta':'Trigger alert','Emergencia activa':'Emergency active','Comunicaciones':'Communications','Mensaje a todas las zonas…':'Message to all zones…','Protocolo de evacuación':'Evacuation protocol','Activar alarma sonora y detener todas las atracciones.':'Activate audible alarm and stop all attractions.','Guiar a los visitantes a los puntos de encuentro señalizados.':'Guide visitors to the marked assembly points.','Confirmar evacuación por zona y reportar a central.':'Confirm evacuation by zone and report to center.','Ver protocolo completo':'View full protocol','Pausa técnica':'Technical pause','Detenida · Emergencia':'Stopped · Emergency','Espera (min)':'Wait (min)','En cola':'In queue','Enviados turno':'Sent this shift','Enviar usuario':'Send rider','Emergencia':'Emergency','Reportar incidente':'Report incident','Historial del turno':'Shift history','Tanda enviada (4 personas)':'Batch sent (4 people)','Tanda enviada (3 personas)':'Batch sent (3 people)','Pausa técnica (2 min)':'Technical pause (2 min)','Incidente reportado':'Incident reported','ALERTA DE EMERGENCIA enviada':'EMERGENCY ALERT sent','Confirmar emergencia':'Confirm emergency','Se enviará una alerta inmediata a seguridad, guardavidas y backoffice. La atracción se detiene automáticamente.':'An immediate alert will be sent to security, lifeguards and back office. The ride stops automatically.','Confirmar alerta':'Confirm alert','Cajero: Pablo S.':'Cashier: Pablo S.','Combos':'Combos','Hamburguesas':'Burgers','Bebidas':'Drinks','Postres':'Desserts','Pedido actual':'Current order','Tocá un producto para agregarlo.':'Tap a product to add it.','Pulsera':'Band','Cobrar':'Charge','¡Cobrado!':'Charged!','Ingresá el código del ticket':'Enter the ticket code','Validar':'Validate','Simular escaneo (demo)':'Simulate scan (demo)','Escaneá o ingresá un código':'Scan or enter a code','para validar el acceso.':'to validate access.','Acceso válido':'Valid access','Ticket inválido':'Invalid ticket','Código no reconocido o ya utilizado.':'Code not recognized or already used.','Verificá e intentá nuevamente.':'Check and try again.','Ingresos del turno':'Shift entries','Ritmo actual':'Current pace','Parámetros generales de la plataforma':'General platform parameters','General':'General','Nombre del parque':'Park name','Capacidad máxima':'Maximum capacity','Idioma por defecto':'Default language','Moneda':'Currency','Integraciones y notificaciones':'Integrations and notifications','Procesamiento de pagos online':'Online payment processing','Notificaciones y soporte':'Notifications and support','Email transaccional':'Transactional email','Envío de tickets y comprobantes':'Sending tickets and receipts','Notificaciones push':'Push notifications','Alertas en la app del huésped':'Alerts in the guest app','Seguro de lluvia automático':'Automatic rain insurance','Reprogramación por clima':'Weather rescheduling','Usuarios y roles':'Users and roles','Agregar usuario':'Add user','Operaciones':'Operations','Guardar cambios':'Save changes','¡Guardado!':'Saved!','Análisis del rendimiento de la temporada':'Season performance analysis','Hoy':'Today','Semana':'Week','Mes':'Month','Temporada':'Season','Visitantes por día':'Visitors per day','Últimos 14 días':'Last 14 days','Ingresos por día':'Revenue per day','En millones ARS':'In millions ARS','Mix de tickets':'Ticket mix','Distribución por tipo':'Distribution by type','NPS por semana':'NPS by week','Origen por provincia':'Origin by province','Top 6 provincias':'Top 6 provinces','Ocupación por hora y día':'Occupancy by hour and day','Heatmap semanal':'Weekly heatmap','Programa de fidelización y puntos':'Loyalty and points program','Usuarios registrados':'Registered users','Activos este mes':'Active this month','Puntos otorgados hoy':'Points awarded today','Tasa de canje':'Redemption rate','Distribución de niveles':'Level distribution','Leaderboard global':'Global leaderboard','Catálogo de canjes':'Rewards catalog','Nueva recompensa':'New reward','10% descuento próxima entrada':'10% off next ticket','Upgrade a Acqua Plus':'Upgrade to Acqua Plus','Locker un día gratis':'Free locker for a day','Combo gastronómico premium':'Premium food combo','Acceso VIP Cabaña 1 día':'VIP Cabana access 1 day','Entrada Acqua Fun gratis':'Free Acqua Fun ticket','24.847 registrados · 8.392 activos este mes':'24,847 registered · 8,392 active this month','Todos':'All','Frecuentes':'Frequent','Dormidos':'Dormant','Capitanes':'Captains','Colegios':'Schools','Visitantes registrados':'Registered visitors','Nivel':'Level','Visitas':'Visits','Última visita':'Last visit','Gasto total':'Total spend','Campañas activas':'Active campaigns','Nueva campaña':'New campaign','Campaña':'Campaign','Segmento':'Segment','Enviados':'Sent','Conversión':'Conversion','Enviar mensaje':'Send message','Agregar nota':'Add note','Puntos':'Points','Consumo y operación gastronómica · Hoy':'Food & beverage consumption and operations · Today','Ventas F&B hoy':'F&B sales today','Transacciones':'Transactions','Local top':'Top venue','Stock crítico':'Critical stock','Pedidos en cola':'Orders in queue','Ventas':'Sales','Preparando':'Preparing','Listo':'Ready','Entregado':'Delivered','Plano del playón en tiempo real':'Real-time lot map','Ocupados':'Occupied','Libres':'Free','de 1.200 lugares':'of 1,200 spaces','ocupación':'occupancy','Estadía prom.':'Avg. stay','Ingresos hoy':'Revenue today','Sector C al 95%.':'Sector C at 95%.','Se recomienda redirigir ingresos al Sector B.':'Redirecting entries to Sector B is recommended.','Activar señalética':'Activate signage','Plano del playón':'Lot map','Libre':'Free','Ocupado':'Occupied','Discapacidad':'Disability','Buscar por patente':'Search by plate','Buscar':'Search','Vehículo encontrado':'Vehicle found','Patente no encontrada':'Plate not found','Cobro: $1.500/hora. ¿Registrar ingreso manual?':'Charge: $1,500/hour. Register manual entry?','Riders hoy':'Riders today','Capac./h':'Cap./h','Operativa':'Operational','Mantenimiento':'Maintenance','Detenida':'Stopped','Detener':'Stop','Reactivar':'Reactivate','Throughput acumulado (riders/hora)':'Cumulative throughput (riders/hour)','Mantenimiento preventivo':'Preventive maintenance','Cambiar estado':'Change status','Motivo (obligatorio)':'Reason (required)','Cancelar':'Cancel','Confirmar':'Confirm','Cliente':'Customer','Tipo':'Type','Canal':'Channel','Monto':'Amount','Boletería manual':'Manual box office','Nombre del cliente':'Customer name','Efectivo / tarjeta':'Cash / card','Emitir e imprimir':'Issue & print','Ticket emitido e impreso.':'Ticket issued and printed.','Online':'Online', 'Resumen operativo en tiempo real · Hoy': 'Real-time operations summary · Today',
      'Visitantes': 'Visitors', 'Ocupación': 'Occupancy', 'Ingresos': 'Revenue', 'Tickets': 'Tickets',
      'Espera prom.': 'Avg wait', 'NPS hoy': 'NPS today', 'Estacionam.': 'Parking', 'Alertas': 'Alerts',
      'Flujo de visitantes': 'Visitor flow', 'Hoy': 'Today', 'Semana pasada': 'Last week', 'Mix de ventas': 'Sales mix',
      'Alertas en tiempo real': 'Real-time alerts', 'Resolver': 'Resolve', 'Ver': 'View',
      'Ocupación por zona': 'Occupancy by zone', 'Proyección de la temporada': 'Season projection',
      'Visitantes en el parque ahora': 'Visitors in the park now', 'de capacidad': 'of capacity',
      '🟢 Capacidad OK': '🟢 Capacity OK', 'Torniquetes en vivo': 'Live turnstiles', 'Acceso': 'Gate',
      'hoy': 'today', 'Lento': 'Slow', 'Error': 'Error', 'Simulador de escaneo QR': 'QR scan simulator',
      'Simular escaneo': 'Simulate scan', 'ACCESO VÁLIDO': 'VALID ACCESS', 'TICKET INVÁLIDO': 'INVALID TICKET',
      'Código no reconocido o ya utilizado.': 'Code not recognized or already used.', 'Historial de accesos': 'Access history',
      'Exportar CSV': 'Export CSV', 'Hora': 'Time', 'Tipo': 'Type', 'Puerta': 'Gate',
      'Panel de Administración': 'Admin Panel', 'Acceso restringido al personal autorizado': 'Restricted to authorized staff',
      'Ingresar al panel': 'Enter the panel', 'Acceso restringido': 'Restricted access',
      // ---- Atracciones (A2) ----
      'Explorá el parque': 'Explore the park',
      'Tocá una zona en el mapa para descubrir sus atracciones, tiempos de espera y restricciones en tiempo real.': 'Tap a zone on the map to discover its attractions, wait times and restrictions in real time.',
      'Mapa del parque': 'Park map', 'Espera baja': 'Low wait', 'Espera media': 'Medium wait', 'Espera alta': 'High wait',
      'Intensidad:': 'Intensity:', 'Menor espera': 'Shorter wait', 'Detalles': 'Details',
      'Tranquila': 'Calm', 'Moderada': 'Moderate', 'Alta': 'High', 'Extrema': 'Extreme',
      'Sin espera': 'No wait', 'Todo público': 'All ages', 'Mín.': 'Min.',
      'Capacidad': 'Capacity', 'Edad mínima': 'Minimum age', 'Intensidad': 'Intensity', 'Espera actual': 'Current wait',
      'Mejor momento: antes de las 13 hs': 'Best time: before 1 pm',
      'Agregar a mi planificador': 'Add to my planner', 'Agregado al planificador': 'Added to planner',
      // ---- InfinitoPass (B6) ----
      'Cada visita te acerca a más': 'Every visit gets you more',
      'Sumá puntos en cada visita, subí de nivel y desbloqueá beneficios exclusivos.': 'Earn points on every visit, level up and unlock exclusive perks.',
      'Tu nivel': 'Your level', 'Los 4 niveles': 'The 4 levels', 'TU NIVEL ACTUAL': 'YOUR CURRENT LEVEL',
      'Cómo ganar puntos': 'How to earn points', 'Mis logros': 'My achievements', 'Catálogo de canjes': 'Rewards catalog',
      'Ranking semanal': 'Weekly ranking', 'Traé un amigo': 'Bring a friend',
      'Comprar ticket': 'Buy a ticket', 'Completar tu perfil': 'Complete your profile', 'Dejar una reseña': 'Leave a review',
      'Foto con hashtag': 'Photo with hashtag', 'Visitar en tu cumpleaños': 'Visit on your birthday', 'Referir un amigo': 'Refer a friend',
      'Primera ola': 'First wave', 'Maratonista (5 visitas)': 'Marathoner (5 visits)', 'Rey del tobogán': 'Slide king',
      'Foodie Infinito': 'Infinito Foodie', 'Familia Infinita': 'Infinite Family', 'Cumpleañero': 'Birthday star',
      'Rider nocturno': 'Night rider', 'Fotógrafo oficial': 'Official photographer', 'Obtenido': 'Earned', 'Bloqueado': 'Locked',
      '10% off próxima entrada': '10% off next ticket', 'Upgrade a Acqua Plus': 'Upgrade to Acqua Plus',
      'Locker un día gratis': 'Free locker for a day', 'Combo gastronómico premium': 'Premium food combo',
      'Acceso VIP Cabaña 1 día': 'VIP Cabana access 1 day', 'Entrada Acqua Fun gratis': 'Free Acqua Fun ticket',
      'Canjear': 'Redeem', 'Faltan pts': 'Need more pts', '(vos)': '(you)', 'Copiar': 'Copy', '¡Copiado!': 'Copied!',
      'Acceso al programa · Descuentos básicos': 'Program access · Basic discounts', '10% off · Locker con descuento': '10% off · Discounted locker',
      '15% off · Acceso rápido 1 día · Combo bonus': '15% off · Fast access 1 day · Combo bonus', '20% off · Cabaña VIP · Beneficios premium': '20% off · VIP cabana · Premium perks',
      'Compartí tu link y ganá': 'Share your link and earn', '200 puntos': '200 points', 'por cada amigo que compre su entrada.': 'for every friend who buys a ticket.'
    },
    pt: {
      'Descubrinos': 'Descubra', 'Atracciones': 'Atrações', 'Gastronomía': 'Gastronomia',
      'Cómo llegar': 'Como chegar', 'Contacto': 'Contato', 'Mi cuenta': 'Minha conta',
      'Comprá tu entrada': 'Compre seu ingresso', 'Volver a entradas': 'Voltar aos ingressos',
      'Inicio': 'Início', 'Entradas': 'Ingressos',
      '🌊 Nueva temporada 2025–2026': '🌊 Nova temporada 2025–2026',
      'El agua. La adrenalina. Lo infinito.': 'A água. A adrenalina. O infinito.',
      'El parque acuático más grande de Argentina está en Córdoba. 13 hectáreas para que vivas el agua como nunca.': 'O maior parque aquático da Argentina está em Córdoba. 13 hectares para você viver a água como nunca.',
      'Conseguí tus entradas': 'Garanta seus ingressos', 'Conocé el parque': 'Conheça o parque',
      'Toboganes': 'Toboáguas', 'Visitantes / día': 'Visitantes / dia', 'Hectáreas': 'Hectares',
      'El parque': 'O parque',
      'Un mundo de agua para cada momento': 'Um mundo de água para cada momento',
      'Siete zonas, siete climas. De la pura adrenalina al relax absoluto.': 'Sete zonas, sete climas. Da pura adrenalina ao relax absoluto.',
      'Familias': 'Famílias', 'Relax': 'Relax', 'Extremo': 'Extremo', 'Niños': 'Crianças', 'Adrenalina': 'Adrenalina',
      'Explorar zona': 'Explorar zona',
      'Elegí tu experiencia': 'Escolha sua experiência',
      'Acceso general al parque': 'Acesso geral ao parque', 'Reposera': 'Espreguiçadeira', 'Flotador': 'Boia',
      'Sombra de uso libre': 'Sombra de uso livre', 'Desde': 'A partir de', 'Ver detalles': 'Ver detalhes',
      'Todo lo de Acqua Fun, y más': 'Tudo do Acqua Fun, e mais',
      'Estacionamiento incluido': 'Estacionamento incluído', 'Seguro de lluvia': 'Seguro de chuva',
      'Combo gastronómico': 'Combo gastronômico', 'Comprar ahora': 'Comprar agora', '★ MÁS ELEGIDA': '★ MAIS ESCOLHIDA',
      'La experiencia premium': 'A experiência premium', 'Cabaña lounge privada': 'Cabana lounge privada',
      'Acceso rápido sin filas': 'Acesso rápido sem filas', 'Frigobar y atención': 'Frigobar e atendimento',
      'Menores de 4 años gratis · 20% de descuento para menores de 12': 'Menores de 4 anos grátis · 20% de desconto para menores de 12',
      'Ver todas las opciones': 'Ver todas as opções',
      'Lo destacado': 'Destaques', 'Experiencias que solo vivís acá': 'Experiências que só se vivem aqui',
      'Piscina de Olas': 'Piscina de Ondas', '3,5 millones de litros · olas de hasta 1,8 m': '3,5 milhões de litros · ondas de até 1,8 m',
      'Río': 'Rio', 'Lento': 'Lento', '500 metros de recorrido': '500 metros de percurso',
      'Gastronomía sin límites': 'Gastronomia sem limites',
      'Sin filas, sin vueltas': 'Sem filas, sem complicação', 'Comprá, escaneá y entrá': 'Compre, escaneie e entre',
      'Elegís tu entrada online': 'Escolha seu ingresso online',
      'Fecha, tipo de entrada y add-ons en minutos.': 'Data, tipo de ingresso e adicionais em minutos.',
      'Recibís tu QR por email': 'Receba seu QR por e-mail',
      'Tu entrada digital, lista en tu wallet.': 'Seu ingresso digital, pronto na sua carteira.',
      'Escaneás y entrás sin filas': 'Escaneie e entre sem filas',
      'Presentá el QR en el torniquete y a disfrutar.': 'Apresente o QR na catraca e aproveite.',
      'Te esperamos en Córdoba': 'Esperamos por você em Córdoba',
      'Predio Infinito Water Park': 'Complexo Infinito Water Park',
      'Ruta provincial, Córdoba · Acceso desde autopista Córdoba–Rosario': 'Rodovia provincial, Córdoba · Acesso pela autoestrada Córdoba–Rosario',
      'Horarios': 'Horários', 'Viernes a Domingo': 'Sexta a Domingo', 'Lunes a Jueves': 'Segunda a Quinta',
      'Cerrado (temporada)': 'Fechado (temporada)', 'Ver en Google Maps': 'Ver no Google Maps',
      'Etiquetanos y aparecé en nuestro feed.': 'Marque-nos e apareça no nosso feed.',
      'Seguinos en Instagram': 'Siga-nos no Instagram',
      'Dudas': 'Dúvidas', 'Preguntas frecuentes': 'Perguntas frequentes',
      '¿Puedo comprar la entrada en la puerta?': 'Posso comprar o ingresso na bilheteria?',
      'Sí, pero te recomendamos comprar online: asegurás tu lugar en días de alta demanda y evitás las filas de boletería. Online suele tener mejor precio anticipado.': 'Sim, mas recomendamos comprar online: você garante seu lugar em dias de alta procura e evita as filas da bilheteria. Online costuma ter melhor preço antecipado.',
      '¿Qué pasa si llueve? ¿Tienen seguro de lluvia?': 'E se chover? Vocês têm seguro de chuva?',
      'Las entradas Acqua Plus y Tribu VIP incluyen seguro de lluvia. Si la jornada se ve afectada por mal tiempo, podés reprogramar tu visita sin costo. En Acqua Fun lo podés sumar como add-on.': 'Os ingressos Acqua Plus e Tribu VIP incluem seguro de chuva. Se o dia for afetado pelo mau tempo, você pode remarcar sua visita sem custo. No Acqua Fun é possível adicioná-lo como adicional.',
      '¿Hay estacionamiento en el predio?': 'Há estacionamento no complexo?',
      'Sí, contamos con más de 1.200 lugares en 4 sectores. Acqua Plus y Tribu VIP lo incluyen sin cargo. Para Acqua Fun se abona por separado y podés pagarlo con tu pulsera cashless.': 'Sim, temos mais de 1.200 vagas em 4 setores. Acqua Plus e Tribu VIP incluem sem custo. No Acqua Fun é pago à parte e você pode pagar com sua pulseira cashless.',
      '¿Los menores de 4 años pagan entrada?': 'Crianças menores de 4 anos pagam ingresso?',
      'No. Los menores de 4 años ingresan gratis y no requieren ticket. Los menores de 12 tienen un 20% de descuento sobre la tarifa de adulto.': 'Não. Menores de 4 anos entram grátis e não precisam de ingresso. Menores de 12 têm 20% de desconto sobre a tarifa de adulto.',
      '¿Puedo llevar comida y bebidas?': 'Posso levar comida e bebidas?',
      'No se permite el ingreso de comida ni bebidas de afuera, salvo casos médicos justificados. Dentro del parque vas a encontrar Novecento, Mostaza, Betos, Barilate y varios kioscos.': 'Não é permitido entrar com comida ou bebida de fora, salvo casos médicos justificados. Dentro do parque você encontra Novecento, Mostaza, Betos, Barilate e vários quiosques.',
      '¿Tienen lockers?': 'Vocês têm armários?',
      'Sí, hay lockers en tamaños S, M, L y XL disponibles por día. Podés reservarlos al comprar tu entrada o alquilarlos el mismo día en el parque.': 'Sim, há armários nos tamanhos P, M, G e GG disponíveis por dia. Você pode reservá-los na compra do ingresso ou alugá-los no mesmo dia no parque.',
      '¿Cómo funciona el acceso rápido VIP?': 'Como funciona o acesso rápido VIP?',
      'Con la entrada Tribu VIP accedés a las atracciones VIP sin hacer fila, además de tu cabaña lounge privada con frigobar y atención personalizada.': 'Com o ingresso Tribu VIP você acessa as atrações VIP sem fila, além da sua cabana lounge privada com frigobar e atendimento personalizado.',
      '¿Hay descuentos para grupos y colegios?': 'Há descontos para grupos e escolas?',
      'Sí, ofrecemos tarifas especiales y coordinación para grupos de más de 15 personas, turismo estudiantil y colegios. Solicitá una cotización desde la sección de tickets.': 'Sim, oferecemos tarifas especiais e coordenação para grupos de mais de 15 pessoas, turismo estudantil e escolas. Solicite um orçamento na seção de ingressos.',
      '¿Qué pasa si necesito reprogramar mi visita?': 'E se eu precisar remarcar minha visita?',
      'Podés reprogramar tu visita desde Mi cuenta hasta 48 hs antes, sujeto a disponibilidad de fechas. Con seguro de lluvia la reprogramación por clima es sin cargo.': 'Você pode remarcar em Minha conta até 48 h antes, sujeito à disponibilidade de datas. Com seguro de chuva, a remarcação por clima é sem custo.',
      '¿Cómo recibo mis entradas?': 'Como recebo meus ingressos?',
      'Apenas confirmás el pago recibís tus entradas digitales con QR por email y quedan guardadas en tu wallet dentro de Mi cuenta. Solo tenés que presentar el QR en el torniquete.': 'Assim que você confirma o pagamento, recebe seus ingressos digitais com QR por e-mail, guardados na sua carteira em Minha conta. Basta apresentar o QR na catraca.',
      'El Parque': 'O Parque', 'Quiénes somos': 'Quem somos', 'Las 7 zonas': 'As 7 zonas', 'Noticias': 'Notícias',
      'Tipos de entrada': 'Tipos de ingresso', 'Grupos y colegios': 'Grupos e escolas', 'Promociones': 'Promoções',
      'Información': 'Informações', 'Estacionamiento': 'Estacionamento', 'Preguntas frecuentes': 'Perguntas frequentes',
      'Reglamento': 'Regulamento', '© 2026 Infinito Water Park. Todos los derechos reservados.': '© 2026 Infinito Water Park. Todos os direitos reservados.',
      'Política de privacidad': 'Política de privacidade', 'Términos': 'Termos', '¿Tenés dudas?': 'Precisa de ajuda?',
      'Comprá tus entradas': 'Compre seus ingressos', 'Alta demanda este fin de semana': 'Alta procura neste fim de semana',
      'Seleccioná la fecha': 'Selecione a data',
      'Lun': 'Seg', 'Mar': 'Ter', 'Mié': 'Qua', 'Jue': 'Qui', 'Vie': 'Sex', 'Sáb': 'Sáb', 'Dom': 'Dom',
      'Disponible (vie–dom)': 'Disponível (sex–dom)', 'Cerrado': 'Fechado', 'Seleccionado': 'Selecionado',
      'Elegí tu tipo de entrada': 'Escolha seu tipo de ingresso',
      'Acceso general · reposera · flotador · sombra de uso libre': 'Acesso geral · espreguiçadeira · boia · sombra de uso livre',
      'Adulto': 'Adulto', 'Menor -12': 'Criança -12', 'Menor -4': 'Criança -4', 'Gratis': 'Grátis',
      'Adultos': 'Adultos', 'Menores': 'Crianças', 'adulto': 'adulto', 'menor': 'criança',
      'Todo Acqua Fun + estacionamiento + seguro de lluvia + combo gastronómico': 'Tudo do Acqua Fun + estacionamento + seguro de chuva + combo gastronômico',
      'Acceso rápido · todo Acqua Plus · cabaña lounge privada · frigobar · atención personalizada · 2 a 6 personas': 'Acesso rápido · tudo do Acqua Plus · cabana lounge privada · frigobar · atendimento personalizado · 2 a 6 pessoas',
      'Cabaña (hasta 6 personas)': 'Cabana (até 6 pessoas)', 'Cabañas': 'Cabanas',
      '¿Más de 15 personas? Descuentos especiales y coordinación grupal.': 'Mais de 15 pessoas? Descontos especiais e coordenação em grupo.',
      'Solicitar cotización': 'Solicitar orçamento',
      'Mejorá tu visita': 'Melhore sua visita', '(opcional)': '(opcional)',
      'Locker mediano /día': 'Armário médio /dia', 'Locker grande /día': 'Armário grande /dia',
      'Upgrade acceso rápido': 'Upgrade de acesso rápido', 'Pack de fotos profesionales': 'Pacote de fotos profissionais',
      'Toalla de alquiler': 'Aluguel de toalha',
      'Resumen de compra': 'Resumo da compra',
      'Elegí una fecha y tus entradas para ver el detalle.': 'Escolha uma data e seus ingressos para ver o detalhe.',
      'Subtotal': 'Subtotal', 'Aplicar': 'Aplicar', 'Descuento': 'Desconto', 'Continuar': 'Continuar',
      'Pago 100% seguro': 'Pagamento 100% seguro',
      'Tus datos': 'Seus dados', 'Visitantes': 'Visitantes', 'Pago': 'Pagamento',
      'Usamos estos datos para enviarte tus entradas con QR.': 'Usamos estes dados para enviar seus ingressos com QR.',
      'Nombre completo': 'Nome completo', 'Quiero crear una cuenta para guardar mis tickets y sumar puntos': 'Quero criar uma conta para guardar meus ingressos e somar pontos',
      '¿Ya tenés cuenta?': 'Já tem conta?', 'Iniciá sesión': 'Entrar',
      'Datos de los visitantes': 'Dados dos visitantes',
      'Nombre y DNI de cada visitante para el sistema de acceso con QR.': 'Nome e documento de cada visitante para o sistema de acesso com QR.',
      'El titular de la compra es uno de los visitantes': 'O titular da compra é um dos visitantes',
      'Visitante': 'Visitante', 'Atrás': 'Voltar', 'Continuar al pago': 'Continuar para o pagamento',
      'Tarjeta': 'Cartão', 'Transferencia': 'Transferência', 'Número de tarjeta': 'Número do cartão',
      'Nombre como figura en la tarjeta': 'Nome como no cartão', 'Vencimiento': 'Validade',
      'Cuotas sin interés': 'Parcelas sem juros', 'Vas a pagar con Mercado Pago': 'Você vai pagar com Mercado Pago',
      'Te redirigimos a tu cuenta para confirmar el pago de forma segura.': 'Vamos redirecionar você para sua conta para confirmar o pagamento com segurança.',
      'Datos para transferencia': 'Dados para transferência',
      'Enviá el comprobante por WhatsApp para confirmar tu reserva.': 'Envie o comprovante pelo WhatsApp para confirmar sua reserva.',
      'Resumen del pedido': 'Resumo do pedido', 'Acepto los': 'Aceito os', 'términos y condiciones': 'termos e condições',
      'y la': 'e a', 'política de privacidad': 'política de privacidade', 'Pagar': 'Pagar',
      '¡Listo! Tu visita está asegurada 🌊': 'Pronto! Sua visita está garantida 🌊',
      'Te enviamos las entradas a': 'Enviamos seus ingressos para', '. Orden': '. Pedido',
      'Escaneá en el acceso': 'Escaneie no acesso', 'Fecha': 'Data', 'Horario': 'Horário', 'Código': 'Código',
      'Sombra libre': 'Sombra livre', 'Cabaña lounge': 'Cabana lounge', 'Acceso rápido': 'Acesso rápido', 'Frigobar': 'Frigobar',
      'Descargar tickets': 'Baixar ingressos', 'Compartir': 'Compartilhar', 'Próximos pasos': 'Próximos passos',
      'Antes de tu visita': 'Antes da sua visita',
      'Descargá la app · Leé el reglamento · Planificá tu recorrido desde Mi cuenta': 'Baixe o app · Leia o regulamento · Planeje seu percurso em Minha conta',
      'El día de tu visita': 'No dia da sua visita',
      'Llegá 30 min antes · Presentá tu QR en el torniquete · Retirá tu pulsera cashless': 'Chegue 30 min antes · Apresente seu QR na catraca · Retire sua pulseira cashless',
      'Después de tu visita': 'Depois da sua visita',
      'Calificá tu experiencia y ganás puntos InfinitoPass · Compartí fotos con #InfinitoWaterpark': 'Avalie sua experiência e ganhe pontos InfinitoPass · Compartilhe fotos com #InfinitoWaterpark',
      'Registrate y acumulá puntos': 'Cadastre-se e acumule pontos',
      'Guardá tus tickets, sumá InfinitoPass y desbloqueá beneficios en cada visita.': 'Guarde seus ingressos, some InfinitoPass e desbloqueie benefícios a cada visita.',
      'Crear mi cuenta': 'Criar minha conta',
      'Dónde comer en el parque':'Onde comer no parque',
      'Cuatro propuestas para todos los gustos, sistema de pago sin efectivo y todo lo que necesitás para tu día perfecto.':'Quatro opções para todos os gostos, pagamento sem dinheiro e tudo o que você precisa para o seu dia perfeito.',
      'La propuesta':'A seleção','Comé rico en cada rincón':'Coma bem em cada cantinho','Ver menú':'Ver cardápio',
      'Bistró argentino · cocina de autor':'Bistrô argentino · cozinha autoral','Fast food · hamburguesas':'Fast food · hambúrgueres','Parrilla · sándwiches':'Churrasco · sanduíches','Heladería · café':'Sorveteria · café',
      'Pulsera cashless':'Pulseira cashless','Comprá sin sacar la billetera':'Pague sem tirar a carteira',
      'Cargás saldo, pagás con tu pulsera en cualquier punto del parque y controlás todo desde tu cuenta. Sin efectivo, sin tarjetas mojadas.':'Carregue saldo, pague com sua pulseira em qualquer ponto do parque e controle tudo pela sua conta. Sem dinheiro, sem cartões molhados.',
      'Cargás saldo en la app o en el parque':'Carregue saldo no app ou no parque','Pagás en cualquier punto de venta con tu pulsera':'Pague em qualquer ponto de venda com sua pulseira','Controlás todo el consumo desde tu cuenta':'Controle todo o consumo pela sua conta',
      'Activá tu pulsera':'Ative sua pulseira','Tu pulsera':'Sua pulseira','Saldo disponible':'Saldo disponível','Carga inicial':'Carga inicial',
      'Servicios':'Serviços','Todo para tu comodidad':'Tudo para o seu conforto',
      'Lockers':'Armários','Reposeras':'Espreguiçadeiras','Sombrillas':'Guarda-sóis','Flotadores':'Boias','Protector solar':'Protetor solar','Toallas':'Toalhas',
      'Tamaños S, M, L y XL por día':'Tamanhos P, M, G e GG por dia','Alquiler por día, zonas de sombra':'Aluguel por dia, áreas de sombra','Reservá tu sombra':'Reserve sua sombra','Para río lento y olas':'Para o rio lento e as ondas','Disponible en kioscos':'Disponível nos quiosques','Alquiler con depósito':'Aluguel com caução',
      'Puntos de hidratación gratuitos':'Pontos de hidratação gratuitos','Más de 20 bebederos de agua potable distribuidos en todas las zonas del parque.':'Mais de 20 bebedouros de água potável distribuídos em todas as zonas do parque.',
      'Menú':'Cardápio','Pagá con tu pulsera cashless en este local.':'Pague com sua pulseira cashless neste local.','Cargá tu pulsera':'Carregue sua pulseira','Elegí cuánto querés cargar a tu saldo cashless.':'Escolha quanto carregar no seu saldo cashless.','Nuevo saldo':'Novo saldo','Cargar saldo':'Carregar saldo','Desde $6.000':'A partir de $6.000',
      'Mis tickets':'Meus ingressos','Tu wallet de entradas digitales. Presentá el QR en el acceso.':'Sua carteira de ingressos digitais. Apresente o QR no acesso.','Tu próxima visita':'Sua próxima visita',
      'Próximas':'Próximas','Usadas':'Usados','Vencidas':'Vencidos','Titular':'Titular','Válida':'Válido','Usada':'Usado','Vencida':'Vencido',
      'Presentar en acceso':'Apresentar no acesso','Transferir':'Transferir','Ya registrada':'Já registrado','No tenés entradas en esta categoría.':'Você não tem ingressos nesta categoria.','Listo para escanear':'Pronto para escanear','Mi pulsera':'Minha pulseira',
      'Tu sistema de pago sin efectivo dentro del parque.':'Seu sistema de pagamento sem dinheiro dentro do parque.','Pulsera Infinito':'Pulseira Infinito','Activa':'Ativa','ID DE PULSERA':'ID DA PULSEIRA',
      'Sumá dinero a tu pulsera':'Adicione dinheiro à sua pulseira','Ver historial de consumos':'Ver histórico de consumos','Todos tus movimientos':'Todos os seus movimentos',
      'Transferir saldo':'Transferir saldo','A otro usuario Infinito':'Para outro usuário Infinito','Historial de consumos':'Histórico de consumos',
      'Elegí el monto a cargar.':'Escolha o valor a carregar.','Confirmar carga':'Confirmar carga','Carga de saldo':'Carga de saldo','Ahora':'Agora','Locker grande':'Armário grande',
      'Planificador':'Planejador','Planificador de visita':'Planejador de visita','Armá tu recorrido ideal y aprovechá al máximo el día.':'Monte seu percurso ideal e aproveite ao máximo o dia.',
      'Compartir mi plan':'Compartilhar meu plano','Mapa del parque':'Mapa do parque','Sugerencias inteligentes':'Sugestões inteligentes',
      'La Piscina de Olas tiene menor espera entre 11:00 y 13:00.':'A Piscina de Ondas tem menor espera entre 11:00 e 13:00.','Chuncanas: menores tiempos en los primeros 30 min del día.':'Chuncanas: menores tempos nos primeiros 30 min do dia.','La Zona VIP requiere ticket Tribu Cabaña.':'A Zona VIP requer ingresso Tribu Cabaña.',
      'Mi itinerario del día':'Meu itinerário do dia','Agregar atracción':'Adicionar atração','Tu día está libre.':'Seu dia está livre.','Agregá atracciones para armar tu recorrido.':'Adicione atrações para montar seu percurso.',
      'Se agregan a tu itinerario en el próximo horario libre.':'São adicionadas ao seu itinerário no próximo horário livre.','Agregar':'Adicionar','Tranquila':'Tranquila','Moderada':'Moderada','Alta':'Alta','Extrema':'Extrema','· espera ~':'· espera ~',
      'Más de 1.200 lugares en el predio, en 4 sectores. Consultá la disponibilidad en tiempo real.':'Mais de 1.200 vagas no complexo, em 4 setores. Consulte a disponibilidade em tempo real.',
      'Estado actual en vivo':'Status atual ao vivo','Próxima actualización:':'Próxima atualização:','Actualizar':'Atualizar','Sector':'Setor','Completo':'Lotado','Casi lleno':'Quase cheio','Disponible':'Disponível','libres':'livres',
      '¿Incluido en tu ticket?':'Incluído no seu ingresso?','Se abona aparte':'Pago à parte','Incluido':'Incluído','Tarifas y medios de pago':'Tarifas e meios de pagamento','Por hora (sin ticket)':'Por hora (sem ingresso)','Día completo':'Dia inteiro','Con Acqua Plus':'Com Acqua Plus','Sin cargo':'Sem custo','Efectivo':'Dinheiro','Mapa de sectores':'Mapa de setores','Accesibilidad':'Acessibilidade',
      '40 espacios reservados para personas con discapacidad, ubicados junto al acceso peatonal. Presentá tu credencial al ingresar.':'40 vagas reservadas para pessoas com deficiência, ao lado do acesso de pedestres. Apresente sua credencial na entrada.',
      'Estamos en Córdoba, a minutos de la ciudad y con acceso directo desde la autopista.':'Estamos em Córdoba, a minutos da cidade e com acesso direto pela autoestrada.',
      'Predio Infinito Water Park, Córdoba. Acceso directo desde la autopista Córdoba–Rosario, salida señalizada.':'Complexo Infinito Water Park, Córdoba. Acesso direto pela autoestrada Córdoba–Rosario, saída sinalizada.',
      'En auto':'De carro','Desde el centro de Córdoba, 25 minutos por autopista. Estacionamiento propio con más de 1.200 lugares.':'25 minutos do centro de Córdoba pela autoestrada. Estacionamento próprio com mais de 1.200 vagas.',
      'Transporte público':'Transporte público','Líneas de colectivo con parada en el ingreso del predio. Consultá horarios de temporada en la app.':'Linhas de ônibus com parada na entrada do complexo. Consulte os horários de temporada no app.',
      'Remis, Uber y micros':'Táxi, Uber e ônibus','Zona de ascenso y descenso señalizada. Espacio dedicado para micros de turismo y colegios.':'Área de embarque e desembarque sinalizada. Espaço dedicado para ônibus de turismo e escolas.',
      'Resolvé tus dudas antes de tu visita. Si necesitás más ayuda, escribinos.':'Tire suas dúvidas antes da visita. Se precisar de mais ajuda, escreva para nós.',
      '¿Todavía tenés dudas?':'Ainda tem dúvidas?','Nuestro equipo te responde por WhatsApp o desde el formulario de contacto.':'Nossa equipe responde pelo WhatsApp ou pelo formulário de contato.',
      '¿Tenés una consulta? Escribinos y te respondemos a la brevedad.':'Tem uma dúvida? Escreva para nós e respondemos em breve.',
      'Escribinos':'Escreva para nós','Nombre':'Nome','Asunto':'Assunto','Mensaje':'Mensagem','Tu nombre':'Seu nome','¿Sobre qué nos escribís?':'Sobre o que é?','Contanos tu consulta...':'Conte sua dúvida...',
      'Enviar consulta':'Enviar mensagem','¡Mensaje enviado!':'Mensagem enviada!','Gracias por escribirnos. Te respondemos dentro de las 48 horas hábiles.':'Obrigado por escrever. Respondemos em até 48 horas úteis.','Enviar otra consulta':'Enviar outra mensagem','Viernes a Domingo · 9:30 a 20:00':'Sexta a Domingo · 9:30 às 20:00',
      'Noticias y novedades':'Notícias e novidades','Todo lo que pasa en Infinito Water Park, en un solo lugar.':'Tudo o que acontece no Infinito Water Park, em um só lugar.',
      'Novedades':'Novidades','Tips':'Dicas','Enterate antes que nadie':'Fique sabendo antes de todos','Suscribite y recibí novedades, promos y aperturas de temporada.':'Inscreva-se e receba novidades, promoções e aberturas de temporada.','Tu email':'Seu e-mail','Suscribirme':'Inscrever-me',
      'Inauguramos la nueva Torre de Caída Libre':'Inauguramos a nova Torre de Queda Livre','Temporada 2025–2026: todo lo que tenés que saber':'Temporada 2025–2026: tudo o que você precisa saber','La pulsera cashless llega a todo el parque':'A pulseira cashless chega a todo o parque','Cómo aprovechar tu día en la Piscina de Olas':'Como aproveitar seu dia na Piscina de Ondas','Descuentos especiales para colegios y grupos':'Descontos especiais para escolas e grupos','Sumamos nuevas opciones en Buen Este':'Novas opções gastronômicas em Buen Este','Récord de visitantes en el fin de semana de apertura':'Recorde de visitantes no fim de semana de abertura',
      '40 metros de adrenalina pura llegan a la zona Chuncanas. La caída más extrema del parque ya está operativa para esta temporada.':'40 metros de pura adrenalina chegam à zona Chuncanas. A queda mais extrema do parque já está em operação nesta temporada.','Horarios, nuevas atracciones y experiencias que te esperan este verano.':'Horários, novas atrações e experiências que esperam por você neste verão.','Pagá sin efectivo en cualquier punto de venta con tu pulsera Infinito.':'Pague sem dinheiro em qualquer ponto de venda com sua pulseira Infinito.','Los mejores horarios y consejos para disfrutar el espejo de agua más grande.':"Os melhores horários e dicas para curtir o maior espelho d'água.",'Tarifas y coordinación para grupos de más de 15 personas y turismo estudiantil.':'Tarifas e coordenação para grupos de mais de 15 pessoas e turismo estudantil.','Más variedad gastronómica en el corazón del parque para todos los gustos.':'Mais variedade gastronômica no coração do parque para todos os gostos.','Miles de familias disfrutaron del arranque de la temporada en Córdoba.':'Milhares de famílias aproveitaram o início da temporada em Córdoba.',
      '15 de diciembre de 2025':'15 de dezembro de 2025','2 de diciembre de 2025':'2 de dezembro de 2025','20 de noviembre de 2025':'20 de novembro de 2025','8 de noviembre de 2025':'8 de novembro de 2025','28 de octubre de 2025':'28 de outubro de 2025','15 de octubre de 2025':'15 de outubro de 2025','5 de octubre de 2025':'5 de outubro de 2025',
      // ---- Login / Registro (B1) ----
      'Tu mundo de agua, siempre con vos': 'Seu mundo de água, sempre com você',
      'Guardá tus tickets, controlá tu pulsera cashless, planificá tu visita y sumá puntos InfinitoPass en cada ola.': 'Guarde seus ingressos, controle sua pulseira cashless, planeje sua visita e some pontos InfinitoPass a cada onda.',
      'Ingresá': 'Entrar', 'Registrate': 'Cadastre-se', 'Bienvenido de nuevo': 'Bem-vindo de volta',
      'Ingresá para ver tus tickets y tu pulsera.': 'Entre para ver seus ingressos e sua pulseira.',
      'Email': 'E-mail', 'Contraseña': 'Senha', '¿Olvidaste tu contraseña?': 'Esqueceu sua senha?',
      'Ingresar': 'Entrar', 'o continuá con': 'ou continue com', 'Creá tu cuenta': 'Crie sua conta',
      'Sumá +50 puntos InfinitoPass al completar tu perfil.': 'Ganhe +50 pontos InfinitoPass ao completar seu perfil.',
      'Nombre': 'Nome', 'Apellido': 'Sobrenome', 'Repetir contraseña': 'Repetir senha',
      'Acepto los términos y quiero recibir promociones de Infinito Water Park': 'Aceito os termos e quero receber promoções do Infinito Water Park',
      // ---- Dashboard huésped (B2) ----
      'Mis tickets': 'Meus ingressos', 'Mi pulsera': 'Minha pulseira', 'Planificar visita': 'Planejar visita',
      '🏄 Nivel': '🏄 Nível', 'puntos': 'pontos', 'Tu próxima visita': 'Sua próxima visita',
      'Ver ticket completo': 'Ver ingresso completo', 'Te faltan': 'Faltam',
      'pts para desbloquear el nivel': 'pts para desbloquear o nível', 'Últimas visitas': 'Últimas visitas',
      'Calificar': 'Avaliar', 'Beneficios activos': 'Benefícios ativos', '10% off próxima visita': '10% off próxima visita',
      'Locker gratis 1 día': 'Armário grátis 1 dia', 'Bonus de cumpleaños': 'Bônus de aniversário',
      // ---- Backoffice (C) ----
      'Control de acceso': 'Controle de acesso', 'Tickets & Ventas': 'Ingressos & Vendas', 'CRM': 'CRM',
      'Reportes': 'Relatórios', 'Configuración': 'Configurações', 'Cerrar sesión': 'Sair', 'Gerente General': 'Gerente Geral',
      'Buscar visitante, ticket, patente…': 'Buscar visitante, ingresso, placa…', 'Parque ABIERTO': 'Parque ABERTO',
      'Dashboard ejecutivo': 'Dashboard executivo',
      'Rendimiento comercial del día':'Desempenho comercial do dia','Exportar CSV':'Exportar CSV','Vendidos hoy':'Vendidos hoje','Boletería':'Bilheteria','Reembolsos':'Reembolsos','Ventas por hora':'Vendas por hora','Mix por tipo':'Mix por tipo','Detalle de ventas':'Detalhe de vendas',
      'Panel de atracciones':'Painel de atrações',
      'Gestión de estacionamiento':'Gestão de estacionamento',
      'Gastronomía & F&B':'Gastronomia & F&B',
      'CRM de visitantes':'CRM de visitantes',
      'Gamificación InfinitoPass':'Gamificação InfinitoPass',
      'Reportes & Analytics':'Relatórios & Analytics',
      'Configuración del sistema':'Configurações do sistema',
      'Torniquete 3 · Acceso Norte':'Catraca 3 · Acesso Norte',
      'POS · Mostaza':'PDV · Mostaza',
      'Chuncanas · Operador: Juan T.':'Chuncanas · Operador: Juan T.',
      'Seguridad & Emergencias':'Segurança & Emergências',
      'Puesto Guardavidas':'Posto de salva-vidas','Piscina de Olas · Carla M. ·':'Piscina de Ondas · Carla M. ·','En servicio':'Em serviço','Capacidad de mi zona':'Capacidade da minha zona','de ocupación':'de ocupação','Alta':'Alta','Moderada':'Moderada','Solicitar apoyo':'Solicitar apoio','Alertas y mensajes':'Alertas e mensagens','Central: rotación de turno en 25 min.':'Central: rotação de turno em 25 min.','Ocupación creciente en sector oeste.':'Ocupação crescente no setor oeste.','Control de cloro OK.':'Controle de cloro OK.','Incidente reportado a central. Apoyo en camino.':'Incidente reportado à central. Apoio a caminho.','Tipo: Médico leve':'Tipo: Médico leve','Tipo: Rescate acuático':'Tipo: Resgate aquático','Tipo: Conducta / seguridad':'Tipo: Conduta / segurança','Tipo: Otro':'Tipo: Outro','Describí la situación…':'Descreva a situação…','Enviar reporte':'Enviar relatório','Apoyo solicitado a zona contigua':'Apoio solicitado à zona vizinha','EMERGENCIA enviada a central y seguridad':'EMERGÊNCIA enviada à central e segurança',
      'Limpieza & Mantenimiento':'Limpeza & Manutenção','Turno tarde · Equipo B ·':'Turno da tarde · Equipe B ·','Reportar problema':'Reportar problema','Pendientes':'Pendentes','En progreso':'Em andamento','Completadas':'Concluídas','Checklist de tareas':'Checklist de tarefas','Completada':'Concluída','En curso':'Em curso','Sin iniciar':'Não iniciada','Pendiente':'Pendente','Limpieza de baños sector Olas':'Limpeza de banheiros setor Ondas','Reposición de cloro pileta principal':'Reposição de cloro piscina principal','Control de toboganes Chuncanas':'Controle de toboáguas Chuncanas','Vaciado de cestos zona gastronómica':'Esvaziamento de lixeiras área gastronômica','Limpieza de vestuarios':'Limpeza de vestiários','Revisión de bombas río lento':'Revisão de bombas rio lento','Reporte enviado a mantenimiento central.':'Relatório enviado à manutenção central.','Describí el problema…':'Descreva o problema…','Adjuntar foto':'Anexar foto','Central de monitoreo ·':'Central de monitoramento ·','EMERGENCIA ACTIVA':'EMERGÊNCIA ATIVA','Alerta':'Alerta','Todo normal':'Tudo normal','Normal':'Normal','guardias ·':'guardas ·','personas':'pessoas','Activar alerta':'Ativar alerta','Emergencia activa':'Emergência ativa','Comunicaciones':'Comunicações','Mensaje a todas las zonas…':'Mensagem para todas as zonas…','Protocolo de evacuación':'Protocolo de evacuação','Activar alarma sonora y detener todas las atracciones.':'Ativar alarme sonoro e parar todas as atrações.','Guiar a los visitantes a los puntos de encuentro señalizados.':'Conduzir os visitantes aos pontos de encontro sinalizados.','Confirmar evacuación por zona y reportar a central.':'Confirmar evacuação por zona e reportar à central.','Ver protocolo completo':'Ver protocolo completo','Pausa técnica':'Pausa técnica','Detenida · Emergencia':'Parada · Emergência','Espera (min)':'Espera (min)','En cola':'Na fila','Enviados turno':'Enviados no turno','Enviar usuario':'Enviar usuário','Emergencia':'Emergência','Reportar incidente':'Reportar incidente','Historial del turno':'Histórico do turno','Tanda enviada (4 personas)':'Lote enviado (4 pessoas)','Tanda enviada (3 personas)':'Lote enviado (3 pessoas)','Pausa técnica (2 min)':'Pausa técnica (2 min)','Incidente reportado':'Incidente reportado','ALERTA DE EMERGENCIA enviada':'ALERTA DE EMERGÊNCIA enviado','Confirmar emergencia':'Confirmar emergência','Se enviará una alerta inmediata a seguridad, guardavidas y backoffice. La atracción se detiene automáticamente.':'Um alerta imediato será enviado à segurança, salva-vidas e back office. A atração para automaticamente.','Confirmar alerta':'Confirmar alerta','Cajero: Pablo S.':'Caixa: Pablo S.','Combos':'Combos','Hamburguesas':'Hambúrgueres','Bebidas':'Bebidas','Postres':'Sobremesas','Pedido actual':'Pedido atual','Tocá un producto para agregarlo.':'Toque em um produto para adicionar.','Pulsera':'Pulseira','Cobrar':'Cobrar','¡Cobrado!':'Cobrado!','Ingresá el código del ticket':'Digite o código do ingresso','Validar':'Validar','Simular escaneo (demo)':'Simular leitura (demo)','Escaneá o ingresá un código':'Escaneie ou digite um código','para validar el acceso.':'para validar o acesso.','Acceso válido':'Acesso válido','Ticket inválido':'Ingresso inválido','Código no reconocido o ya utilizado.':'Código não reconhecido ou já utilizado.','Verificá e intentá nuevamente.':'Verifique e tente novamente.','Ingresos del turno':'Entradas do turno','Ritmo actual':'Ritmo atual','Parámetros generales de la plataforma':'Parâmetros gerais da plataforma','General':'Geral','Nombre del parque':'Nome do parque','Capacidad máxima':'Capacidade máxima','Idioma por defecto':'Idioma padrão','Moneda':'Moeda','Integraciones y notificaciones':'Integrações e notificações','Procesamiento de pagos online':'Processamento de pagamentos online','Notificaciones y soporte':'Notificações e suporte','Email transaccional':'E-mail transacional','Envío de tickets y comprobantes':'Envio de ingressos e comprovantes','Notificaciones push':'Notificações push','Alertas en la app del huésped':'Alertas no app do hóspede','Seguro de lluvia automático':'Seguro de chuva automático','Reprogramación por clima':'Remarcação por clima','Usuarios y roles':'Usuários e funções','Agregar usuario':'Adicionar usuário','Operaciones':'Operações','Guardar cambios':'Salvar alterações','¡Guardado!':'Salvo!','Análisis del rendimiento de la temporada':'Análise do desempenho da temporada','Hoy':'Hoje','Semana':'Semana','Mes':'Mês','Temporada':'Temporada','Visitantes por día':'Visitantes por dia','Últimos 14 días':'Últimos 14 dias','Ingresos por día':'Receita por dia','En millones ARS':'Em milhões ARS','Mix de tickets':'Mix de ingressos','Distribución por tipo':'Distribuição por tipo','NPS por semana':'NPS por semana','Origen por provincia':'Origem por província','Top 6 provincias':'Top 6 províncias','Ocupación por hora y día':'Ocupação por hora e dia','Heatmap semanal':'Heatmap semanal','Programa de fidelización y puntos':'Programa de fidelização e pontos','Usuarios registrados':'Usuários cadastrados','Activos este mes':'Ativos este mês','Puntos otorgados hoy':'Pontos concedidos hoje','Tasa de canje':'Taxa de resgate','Distribución de niveles':'Distribuição de níveis','Leaderboard global':'Ranking global','Catálogo de canjes':'Catálogo de resgates','Nueva recompensa':'Nova recompensa','10% descuento próxima entrada':'10% de desconto no próximo ingresso','Upgrade a Acqua Plus':'Upgrade para Acqua Plus','Locker un día gratis':'Armário grátis por um dia','Combo gastronómico premium':'Combo gastronômico premium','Acceso VIP Cabaña 1 día':'Acesso VIP Cabana 1 dia','Entrada Acqua Fun gratis':'Ingresso Acqua Fun grátis','24.847 registrados · 8.392 activos este mes':'24.847 cadastrados · 8.392 ativos este mês','Todos':'Todos','Frecuentes':'Frequentes','Dormidos':'Inativos','Capitanes':'Capitães','Colegios':'Escolas','Visitantes registrados':'Visitantes cadastrados','Nivel':'Nível','Visitas':'Visitas','Última visita':'Última visita','Gasto total':'Gasto total','Campañas activas':'Campanhas ativas','Nueva campaña':'Nova campanha','Campaña':'Campanha','Segmento':'Segmento','Enviados':'Enviados','Conversión':'Conversão','Enviar mensaje':'Enviar mensagem','Agregar nota':'Adicionar nota','Puntos':'Pontos','Consumo y operación gastronómica · Hoy':'Consumo e operação gastronômica · Hoje','Ventas F&B hoy':'Vendas F&B hoje','Transacciones':'Transações','Local top':'Local top','Stock crítico':'Estoque crítico','Pedidos en cola':'Pedidos na fila','Ventas':'Vendas','Preparando':'Preparando','Listo':'Pronto','Entregado':'Entregue','Plano del playón en tiempo real':'Mapa do pátio em tempo real','Ocupados':'Ocupados','Libres':'Livres','de 1.200 lugares':'de 1.200 vagas','ocupación':'ocupação','Estadía prom.':'Permanência méd.','Ingresos hoy':'Receita hoje','Sector C al 95%.':'Setor C em 95%.','Se recomienda redirigir ingresos al Sector B.':'Recomenda-se redirecionar entradas para o Setor B.','Activar señalética':'Ativar sinalização','Plano del playón':'Mapa do pátio','Libre':'Livre','Ocupado':'Ocupado','Discapacidad':'Deficiência','Buscar por patente':'Buscar por placa','Buscar':'Buscar','Vehículo encontrado':'Veículo encontrado','Patente no encontrada':'Placa não encontrada','Cobro: $1.500/hora. ¿Registrar ingreso manual?':'Cobrança: $1.500/hora. Registrar entrada manual?','Riders hoy':'Riders hoje','Capac./h':'Cap./h','Operativa':'Operacional','Mantenimiento':'Manutenção','Detenida':'Parada','Detener':'Parar','Reactivar':'Reativar','Throughput acumulado (riders/hora)':'Throughput acumulado (riders/hora)','Mantenimiento preventivo':'Manutenção preventiva','Cambiar estado':'Mudar status','Motivo (obligatorio)':'Motivo (obrigatório)','Cancelar':'Cancelar','Confirmar':'Confirmar','Cliente':'Cliente','Tipo':'Tipo','Canal':'Canal','Monto':'Valor','Boletería manual':'Bilheteria manual','Nombre del cliente':'Nome do cliente','Efectivo / tarjeta':'Dinheiro / cartão','Emitir e imprimir':'Emitir e imprimir','Ticket emitido e impreso.':'Ingresso emitido e impresso.','Online':'Online', 'Resumen operativo en tiempo real · Hoy': 'Resumo operacional em tempo real · Hoje',
      'Visitantes': 'Visitantes', 'Ocupación': 'Ocupação', 'Ingresos': 'Receita', 'Tickets': 'Ingressos',
      'Espera prom.': 'Espera méd.', 'NPS hoy': 'NPS hoje', 'Estacionam.': 'Estacion.', 'Alertas': 'Alertas',
      'Flujo de visitantes': 'Fluxo de visitantes', 'Hoy': 'Hoje', 'Semana pasada': 'Semana passada', 'Mix de ventas': 'Mix de vendas',
      'Alertas en tiempo real': 'Alertas em tempo real', 'Resolver': 'Resolver', 'Ver': 'Ver',
      'Ocupación por zona': 'Ocupação por zona', 'Proyección de la temporada': 'Projeção da temporada',
      'Visitantes en el parque ahora': 'Visitantes no parque agora', 'de capacidad': 'de capacidade',
      '🟢 Capacidad OK': '🟢 Capacidade OK', 'Torniquetes en vivo': 'Catracas ao vivo', 'Acceso': 'Acesso',
      'hoy': 'hoje', 'Lento': 'Lento', 'Error': 'Erro', 'Simulador de escaneo QR': 'Simulador de leitura QR',
      'Simular escaneo': 'Simular leitura', 'ACCESO VÁLIDO': 'ACESSO VÁLIDO', 'TICKET INVÁLIDO': 'INGRESSO INVÁLIDO',
      'Código no reconocido o ya utilizado.': 'Código não reconhecido ou já utilizado.', 'Historial de accesos': 'Histórico de acessos',
      'Exportar CSV': 'Exportar CSV', 'Hora': 'Hora', 'Tipo': 'Tipo', 'Puerta': 'Porta',
      'Panel de Administración': 'Painel de Administração', 'Acceso restringido al personal autorizado': 'Acesso restrito ao pessoal autorizado',
      'Ingresar al panel': 'Entrar no painel', 'Acceso restringido': 'Acesso restrito',
      // ---- Atracciones (A2) ----
      'Explorá el parque': 'Explore o parque',
      'Tocá una zona en el mapa para descubrir sus atracciones, tiempos de espera y restricciones en tiempo real.': 'Toque uma zona no mapa para descobrir suas atrações, tempos de espera e restrições em tempo real.',
      'Mapa del parque': 'Mapa do parque', 'Espera baja': 'Espera baixa', 'Espera media': 'Espera média', 'Espera alta': 'Espera alta',
      'Intensidad:': 'Intensidade:', 'Menor espera': 'Menor espera', 'Detalles': 'Detalhes',
      'Tranquila': 'Tranquila', 'Moderada': 'Moderada', 'Alta': 'Alta', 'Extrema': 'Extrema',
      'Sin espera': 'Sem espera', 'Todo público': 'Livre', 'Mín.': 'Mín.',
      'Capacidad': 'Capacidade', 'Edad mínima': 'Idade mínima', 'Intensidad': 'Intensidade', 'Espera actual': 'Espera atual',
      'Mejor momento: antes de las 13 hs': 'Melhor horário: antes das 13h',
      'Agregar a mi planificador': 'Adicionar ao meu planejador', 'Agregado al planificador': 'Adicionado ao planejador',
      // ---- InfinitoPass (B6) ----
      'Cada visita te acerca a más': 'Cada visita te aproxima de mais',
      'Sumá puntos en cada visita, subí de nivel y desbloqueá beneficios exclusivos.': 'Some pontos a cada visita, suba de nível e desbloqueie benefícios exclusivos.',
      'Tu nivel': 'Seu nível', 'Los 4 niveles': 'Os 4 níveis', 'TU NIVEL ACTUAL': 'SEU NÍVEL ATUAL',
      'Cómo ganar puntos': 'Como ganhar pontos', 'Mis logros': 'Minhas conquistas', 'Catálogo de canjes': 'Catálogo de resgates',
      'Ranking semanal': 'Ranking semanal', 'Traé un amigo': 'Traga um amigo',
      'Comprar ticket': 'Comprar ingresso', 'Completar tu perfil': 'Completar seu perfil', 'Dejar una reseña': 'Deixar uma avaliação',
      'Foto con hashtag': 'Foto com hashtag', 'Visitar en tu cumpleaños': 'Visitar no seu aniversário', 'Referir un amigo': 'Indicar um amigo',
      'Primera ola': 'Primeira onda', 'Maratonista (5 visitas)': 'Maratonista (5 visitas)', 'Rey del tobogán': 'Rei do toboágua',
      'Foodie Infinito': 'Foodie Infinito', 'Familia Infinita': 'Família Infinita', 'Cumpleañero': 'Aniversariante',
      'Rider nocturno': 'Rider noturno', 'Fotógrafo oficial': 'Fotógrafo oficial', 'Obtenido': 'Conquistado', 'Bloqueado': 'Bloqueado',
      '10% off próxima entrada': '10% off próximo ingresso', 'Upgrade a Acqua Plus': 'Upgrade para Acqua Plus',
      'Locker un día gratis': 'Armário grátis por um dia', 'Combo gastronómico premium': 'Combo gastronômico premium',
      'Acceso VIP Cabaña 1 día': 'Acesso VIP Cabana 1 dia', 'Entrada Acqua Fun gratis': 'Ingresso Acqua Fun grátis',
      'Canjear': 'Resgatar', 'Faltan pts': 'Faltam pts', '(vos)': '(você)', 'Copiar': 'Copiar', '¡Copiado!': 'Copiado!',
      'Acceso al programa · Descuentos básicos': 'Acesso ao programa · Descontos básicos', '10% off · Locker con descuento': '10% off · Armário com desconto',
      '15% off · Acceso rápido 1 día · Combo bonus': '15% off · Acesso rápido 1 dia · Combo bônus', '20% off · Cabaña VIP · Beneficios premium': '20% off · Cabana VIP · Benefícios premium',
      'Compartí tu link y ganá': 'Compartilhe seu link e ganhe', '200 puntos': '200 pontos', 'por cada amigo que compre su entrada.': 'por cada amigo que comprar o ingresso.'
    }
  };

  // Reverse map: cualquier traducción -> español canónico
  var TO_ES = {};
  ['en', 'pt'].forEach(function (l) {
    var d = DICT[l];
    for (var es in d) { if (d.hasOwnProperty(es)) TO_ES[d[es]] = es; }
  });

  var cur = localStorage.getItem(LANG_KEY) || 'es';
  if (!LOCALES[cur]) cur = 'es';

  function canonEs(t) { return TO_ES.hasOwnProperty(t) ? TO_ES[t] : t; }
  function target(es) {
    if (cur === 'es') return es;
    var d = DICT[cur];
    return (d && d.hasOwnProperty(es)) ? d[es] : es;
  }
  function t(esString) { return target(esString); }

  function translateNode(n) {
    if (!n) return;
    if (n.nodeType === 3) {
      var raw = n.nodeValue;
      if (!raw || !raw.trim()) return;
      var lead = (raw.match(/^\s*/) || [''])[0];
      var trail = (raw.match(/\s*$/) || [''])[0];
      var es = canonEs(raw.trim());
      var out = lead + target(es) + trail;
      if (n.nodeValue !== out) n.nodeValue = out;
    } else if (n.nodeType === 1) {
      var tag = n.tagName;
      if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'CANVAS' || tag === 'SVG' || tag === 'svg') return;
      if (n.id === 'infinito-lang') return;
      if (n.hasAttribute && n.hasAttribute('placeholder')) {
        var ph = n.getAttribute('placeholder');
        if (ph && ph.trim()) {
          var pes = canonEs(ph.trim());
          var pout = target(pes);
          if (ph !== pout) n.setAttribute('placeholder', pout);
        }
      }
      var c = n.firstChild;
      while (c) { var next = c.nextSibling; translateNode(c); c = next; }
    }
  }

  function translateAll() { if (document.body) translateNode(document.body); }

  var scheduled = false;
  var pending = [];
  var observer = new MutationObserver(function (muts) {
    for (var i = 0; i < muts.length; i++) {
      var m = muts[i];
      if (m.type === 'characterData') pending.push(m.target);
      else if (m.addedNodes) for (var j = 0; j < m.addedNodes.length; j++) pending.push(m.addedNodes[j]);
    }
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(function () {
        scheduled = false;
        var items = pending; pending = [];
        for (var k = 0; k < items.length; k++) { try { translateNode(items[k]); } catch (e) {} }
      });
    }
  });

  // ---------- Selector de idioma ----------
  function injectSwitcher() {
    if (!document.body || document.getElementById('infinito-lang')) return;
    var bar = document.createElement('div');
    bar.id = 'infinito-lang';
    bar.style.cssText = 'position:fixed;left:18px;bottom:18px;z-index:130;display:flex;align-items:center;gap:3px;background:rgba(255,255,255,.94);backdrop-filter:blur(12px);border:1px solid rgba(26,58,92,.12);border-radius:999px;padding:5px 6px;box-shadow:0 6px 22px rgba(26,58,92,.18);font-family:Poppins,Inter,system-ui,sans-serif';
    var globe = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    globe.setAttribute('viewBox', '0 0 24 24'); globe.setAttribute('width', '17'); globe.setAttribute('height', '17');
    globe.style.cssText = 'margin:0 4px 0 4px;flex-shrink:0';
    globe.innerHTML = '<g fill="none" stroke="#1A7DAF" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"/></g>';
    bar.appendChild(globe);
    ['es', 'en', 'pt'].forEach(function (l) {
      var b = document.createElement('button');
      b.setAttribute('data-l', l);
      b.textContent = l.toUpperCase();
      b.style.cssText = 'border:none;cursor:pointer;font-family:Poppins,sans-serif;font-weight:700;font-size:12.5px;padding:6px 11px;border-radius:999px;transition:all .18s;background:transparent;color:#8EA9BE';
      b.addEventListener('click', function () { setLang(l); });
      bar.appendChild(b);
    });
    document.body.appendChild(bar);
    updateSwitcher();
  }
  function updateSwitcher() {
    var bar = document.getElementById('infinito-lang');
    if (!bar) return;
    var btns = bar.querySelectorAll('button');
    for (var i = 0; i < btns.length; i++) {
      var active = btns[i].getAttribute('data-l') === cur;
      btns[i].style.background = active ? 'linear-gradient(135deg,#29ABE2,#1A7DAF)' : 'transparent';
      btns[i].style.color = active ? '#fff' : '#8EA9BE';
    }
  }

  function setLang(l) {
    if (!LOCALES[l]) l = 'es';
    cur = l;
    localStorage.setItem(LANG_KEY, l);
    translateAll();
    updateSwitcher();
    try { window.dispatchEvent(new CustomEvent('infinito:lang', { detail: { lang: l } })); } catch (e) {}
  }

  function start() {
    translateAll();
    injectSwitcher();
    observer.observe(document.documentElement, { subtree: true, childList: true, characterData: true });
  }

  window.InfinitoI18n = {
    setLang: setLang,
    t: t,
    get lang() { return cur; },
    get locale() { return LOCALES[cur] || 'es-AR'; }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
