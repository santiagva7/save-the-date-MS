/*
   PRUEBA BÁSICA DE MOTORES Y L298N
   Sin módulo Bluetooth - Solo Arduino y motores
   Secuencia automática simple
*/

// === PINES L298N ===
const int ENA = 6;  // Enable Motor A
const int IN1 = 8;  // Motor A Dirección 1  
const int IN2 = 7;  // Motor A Dirección 2
const int IN3 = 4;  // Motor B Dirección 1
const int IN4 = 2;  // Motor B Dirección 2
const int ENB = 5;  // Enable Motor B

// === CONFIGURACIÓN ===
const int VELOCIDAD = 200;       // Velocidad motores (0-255)
const int TIEMPO_ACCION = 2000;  // 2 segundos por acción
const int TIEMPO_PAUSA = 1000;   // 1 segundo de pausa

void setup() {
  // Configurar pines como salida
  pinMode(ENA, OUTPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);
  pinMode(ENB, OUTPUT);

  // Inicializar Serial para monitoring
  Serial.begin(9600);
  
  // Configurar velocidad motores
  analogWrite(ENA, VELOCIDAD);
  analogWrite(ENB, VELOCIDAD);
  
  // Detener motores al inicio
  detenerMotores();
  
  Serial.println("===============================");
  Serial.println("   PRUEBA MOTORES Y L298N");
  Serial.println("===============================");
  Serial.println("⚠️  Conecta baterías al L298N");
  Serial.println("🔄 Iniciando en 3 segundos...");
  Serial.println();
  
  delay(3000);
}

void loop() {
  Serial.println("🚀 INICIANDO SECUENCIA DE PRUEBAS");
  Serial.println();
  
  // 1. ADELANTE
  Serial.println("1. ADELANTE - 2 segundos");
  adelante();
  delay(TIEMPO_ACCION);
  
  detenerMotores();
  Serial.println("   PARAR");
  delay(TIEMPO_PAUSA);
  
  // 2. ATRÁS
  Serial.println("2. ATRÁS - 2 segundos");
  atras();
  delay(TIEMPO_ACCION);
  
  detenerMotores();
  Serial.println("   PARAR");
  delay(TIEMPO_PAUSA);
  
  // 3. IZQUIERDA
  Serial.println("3. IZQUIERDA - 2 segundos");
  izquierda();
  delay(TIEMPO_ACCION);
  
  detenerMotores();
  Serial.println("   PARAR");
  delay(TIEMPO_PAUSA);
  
  // 4. DERECHA
  Serial.println("4. DERECHA - 2 segundos");
  derecha();
  delay(TIEMPO_ACCION);
  
  detenerMotores();
  Serial.println("   PARAR");
  delay(TIEMPO_PAUSA);
  
  Serial.println("✅ CICLO COMPLETADO");
  Serial.println("⏳ Pausa 5 segundos antes del próximo ciclo");
  Serial.println();
  
  delay(5000); // Pausa antes de repetir
}

// === FUNCIONES DE MOVIMIENTO ===

void adelante() {
  // Ambos motores hacia adelante
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
}

void atras() {
  // Ambos motores hacia atrás
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
}

void izquierda() {
  // Motor derecho adelante, izquierdo parado
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
}

void derecha() {
  // Motor izquierdo adelante, derecho parado
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
}

void detenerMotores() {
  // Todos los motores parados
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
}

/*
  === CONEXIONES REQUERIDAS ===
  
  L298N a Arduino:
  ENA → Pin 6 (PWM)
  IN1 → Pin 8
  IN2 → Pin 7  
  IN3 → Pin 4
  IN4 → Pin 2
  ENB → Pin 5 (PWM)
  
  Alimentación:
  L298N VCC → Arduino 5V
  L298N GND → Arduino GND
  L298N +12V → Batería + (7.4V-12V)
  L298N GND → Batería -
  
  Motores:
  OUT1, OUT2 → Motor Izquierdo
  OUT3, OUT4 → Motor Derecho
  
  === NOTAS ===
  - ⚡ Baterías externas OBLIGATORIAS
  - 🔌 USB solo para programar y Serial Monitor
  - 🔄 Ciclo infinito para pruebas continuas
  - 📺 Abre Serial Monitor para ver progreso
*/