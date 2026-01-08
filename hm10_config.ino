
/*
   COMUNICADOR SERIAL GENÉRICO
   Para comunicación directa con módulos seriales
   Compatible con HM-10, HC-05, ESP32, etc.
*/

#include <SoftwareSerial.h>

SoftwareSerial BT(0, 1); // RX=0, TX=1

void setup() {
  Serial.begin(9600);   // Monitor serie
  BT.begin(9600);       // Velocidad del módulo
  
  Serial.println("════════════════════════════════");
  Serial.println("   COMUNICADOR SERIAL");
  Serial.println("════════════════════════════════");
  Serial.println("Envía comandos al módulo conectado");
  Serial.println("Escribe comandos en el monitor serie");
  Serial.println("════════════════════════════════");
  Serial.println();
  
  delay(1000);
  
  // Test automático de conexión
  Serial.println("Probando conexión...");
  BT.print("AT");
  delay(500);
  
  if (BT.available()) {
    Serial.print("✓ Módulo responde: ");
    while (BT.available()) {
      Serial.write(BT.read());
    }
    Serial.println();
  } else {
    Serial.println("❌ No hay respuesta del módulo");
    Serial.println("Verifica las conexiones y velocidad");
  }
  Serial.println();
}

void loop() {
  // Enviar comandos del Serial Monitor al módulo
  if (Serial.available()) {
    String comando = Serial.readString();
    comando.trim(); // Quitar espacios y saltos de línea
    
    Serial.print("Enviando: ");
    Serial.println(comando);
    
    BT.print(comando);
    delay(500); // Esperar respuesta
    
    // Mostrar respuesta del módulo
    if (BT.available()) {
      Serial.print("Respuesta: ");
      while (BT.available()) {
        Serial.write(BT.read());
        delay(2);
      }
      Serial.println();
    } else {
      Serial.println("Sin respuesta");
    }
    Serial.println("────────────────────");
  }
  
  // Mostrar datos espontáneos del módulo
  if (BT.available()) {
    Serial.print("Módulo: ");
    while (BT.available()) {
      Serial.write(BT.read());
      delay(2);
    }
    Serial.println();
  }
}

/*
  COMUNICADOR SERIAL GENÉRICO
  
  Útil para comunicarse con cualquier módulo que use AT commands
  o comunicación serial básica.
  
  Simplemente conecta el módulo y envía comandos desde el Serial Monitor.
*/