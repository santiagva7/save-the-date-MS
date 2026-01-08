/*
   PRUEBA AUTOMÁTICA DE MOTORES Y L298N
   Secuencia automática para verificar funcionamiento
   Sin necesidad de comandos externos
*/

// === PINES L298N ===
const int ENA = 6;  // Enable Motor A (PWM)
const int IN1 = 8;  // Motor A Dirección 1
const int IN2 = 7;  // Motor A Dirección 2
const int IN3 = 4;  // Motor B Dirección 1
const int IN4 = 2;  // Motor B Dirección 2
const int ENB = 5;  // Enable Motor B (PWM)

// === CONFIGURACIÓN ===
const int VELOCIDAD_PRUEBA = 180;  // Velocidad para pruebas (0-255)
const int TIEMPO_MOVIMIENTO = 3000; // 3 segundos por movimiento
const int TIEMPO_PAUSA = 1000;      // 1 segundo de pausa
const int CICLOS_TOTALES = 3;       // Número de ciclos completos

int cicloActual = 0;

void setup() {
  // Configurar todos los pines como salida
  pinMode(ENA, OUTPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);
  pinMode(ENB, OUTPUT);

  // Inicializar comunicación serial
  Serial.begin(9600);
  
  Serial.println("═══════════════════════════════════");
  Serial.println("    PRUEBA AUTOMÁTICA DE MOTORES");
  Serial.println("═══════════════════════════════════");
  Serial.println("⚠️  ASEGÚRATE DE TENER BATERÍAS CONECTADAS");
  Serial.println("🔋 Alimentación externa necesaria para motores");
  Serial.println();
  
  // Configurar velocidad inicial
  analogWrite(ENA, VELOCIDAD_PRUEBA);
  analogWrite(ENB, VELOCIDAD_PRUEBA);
  
  // Detener motores al inicio
  detenerMotores();
  
  Serial.println("Iniciando pruebas en 3 segundos...");
  delay(3000);
  
  Serial.println("🚀 INICIANDO SECUENCIA DE PRUEBAS");
  Serial.println();
}

void loop() {
  if (cicloActual < CICLOS_TOTALES) {
    cicloActual++;
    
    Serial.print("🔄 CICLO ");
    Serial.print(cicloActual);
    Serial.print(" de ");
    Serial.println(CICLOS_TOTALES);
    Serial.println("─────────────────────────────");
    
    // Secuencia completa de pruebas
    ejecutarSecuenciaPruebas();
    
    Serial.println();
    Serial.println("✅ Ciclo completado");
    Serial.println();
    
    if (cicloActual < CICLOS_TOTALES) {
      Serial.println("⏳ Pausa entre ciclos - 5 segundos");
      delay(5000);
    }
  } else {
    // Finalizar pruebas
    Serial.println("🎉 TODAS LAS PRUEBAS COMPLETADAS");
    Serial.println("═══════════════════════════════════");
    Serial.println("Verificaciones realizadas:");
    Serial.println("✓ Ambos motores adelante");
    Serial.println("✓ Ambos motores atrás");
    Serial.println("✓ Motor izquierdo individual");
    Serial.println("✓ Motor derecho individual");
    Serial.println("✓ Giro a la izquierda");
    Serial.println("✓ Giro a la derecha");
    Serial.println("✓ Control de velocidad");
    Serial.println();
    Serial.println("🛑 Motores detenidos - FIN DE PRUEBAS");
    
    // Detener motores y terminar
    detenerMotores();
    while(true) {
      // Loop infinito para evitar repetir pruebas
      delay(1000);
    }
  }
}

void ejecutarSecuenciaPruebas() {
  // 1. AMBOS MOTORES ADELANTE
  Serial.println("1️⃣  Ambos motores ADELANTE");
  ambosAdelante();
  delay(TIEMPO_MOVIMIENTO);
  
  detenerMotores();
  Serial.println("   ⏸️  Pausa");
  delay(TIEMPO_PAUSA);
  
  // 2. AMBOS MOTORES ATRÁS
  Serial.println("2️⃣  Ambos motores ATRÁS");
  ambosAtras();
  delay(TIEMPO_MOVIMIENTO);
  
  detenerMotores();
  Serial.println("   ⏸️  Pausa");
  delay(TIEMPO_PAUSA);
  
  // 3. SOLO MOTOR IZQUIERDO
  Serial.println("3️⃣  Solo MOTOR IZQUIERDO");
  soloMotorIzquierdo();
  delay(TIEMPO_MOVIMIENTO);
  
  detenerMotores();
  Serial.println("   ⏸️  Pausa");
  delay(TIEMPO_PAUSA);
  
  // 4. SOLO MOTOR DERECHO
  Serial.println("4️⃣  Solo MOTOR DERECHO");
  soloMotorDerecho();
  delay(TIEMPO_MOVIMIENTO);
  
  detenerMotores();
  Serial.println("   ⏸️  Pausa");
  delay(TIEMPO_PAUSA);
  
  // 5. GIRO IZQUIERDA (tanque)
  Serial.println("5️⃣  Giro IZQUIERDA (estilo tanque)");
  giroIzquierda();
  delay(TIEMPO_MOVIMIENTO);
  
  detenerMotores();
  Serial.println("   ⏸️  Pausa");
  delay(TIEMPO_PAUSA);
  
  // 6. GIRO DERECHA (tanque)
  Serial.println("6️⃣  Giro DERECHA (estilo tanque)");
  giroDerecha();
  delay(TIEMPO_MOVIMIENTO);
  
  detenerMotores();
  Serial.println("   ⏸️  Pausa");
  delay(TIEMPO_PAUSA);
  
  // 7. PRUEBA DE VELOCIDAD
  Serial.println("7️⃣  Prueba de VELOCIDADES");
  pruebaVelocidades();
}

void pruebaVelocidades() {
  int velocidades[] = {100, 150, 200, 255};
  int numVelocidades = 4;
  
  for (int i = 0; i < numVelocidades; i++) {
    Serial.print("   Velocidad: ");
    Serial.println(velocidades[i]);
    
    analogWrite(ENA, velocidades[i]);
    analogWrite(ENB, velocidades[i]);
    
    ambosAdelante();
    delay(1500); // 1.5 segundos por velocidad
    
    detenerMotores();
    delay(500); // Pausa corta entre velocidades
  }
  
  // Restaurar velocidad original
  analogWrite(ENA, VELOCIDAD_PRUEBA);
  analogWrite(ENB, VELOCIDAD_PRUEBA);
}

// === FUNCIONES DE MOVIMIENTO ===

void ambosAdelante() {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
}

void ambosAtras() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
}

void soloMotorIzquierdo() {
  // Solo motor izquierdo adelante
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
}

void soloMotorDerecho() {
  // Solo motor derecho adelante
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
}

void giroIzquierda() {
  // Motor izquierdo atrás, derecho adelante
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
}

void giroDerecha() {
  // Motor izquierdo adelante, derecho atrás
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
}

void detenerMotores() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
}

/*
  🔧 CONEXIONES REQUERIDAS:
  
  L298N → Arduino:
  ENA → Pin 6
  IN1 → Pin 8
  IN2 → Pin 7
  IN3 → Pin 4
  IN4 → Pin 2
  ENB → Pin 5
  
  Alimentación:
  VCC → 5V Arduino
  GND → GND Arduino
  +12V → Batería positiva
  GND → Batería negativa
  
  Motores:
  OUT1, OUT2 → Motor Izquierdo
  OUT3, OUT4 → Motor Derecho
  
  🚨 IMPORTANTE:
  - Baterías externas necesarias para motores
  - USB solo para programación y serial
  - Verificar polaridad de baterías
*/