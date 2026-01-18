// Import all design patterns
import {
  // Creational
  DatabaseConnection,
  VehicleFactory,
  HouseBuilder,
  // Structural
  PaymentAdapter,
  SimpleCoffee,
  MilkDecorator,
  SugarDecorator,
  HomeTheaterFacade,
  // Behavioral
  WeatherStation,
  WeatherDisplay,
  ShoppingCart,
  CreditCardPayment,
  PayPalPayment,
  CryptoCurrencyPayment,
  RemoteControl,
  TurnOnCommand,
  TurnOffCommand,
  Light,
  TCPConnection,
  EstablishedState,
  JSONProcessor,
  CSVProcessor,
  AuthenticationHandler,
  AuthorizationHandler,
  LoggingHandler,
} from "./design_pattern";

console.log("========== DESIGN PATTERNS DEMONSTRATION ==========\n");

// 1. SINGLETON PATTERN
console.log("1. SINGLETON PATTERN");
console.log("-------------------");
const db1 = DatabaseConnection.getInstance("postgresql://localhost:5432");
const db2 = DatabaseConnection.getInstance("postgresql://localhost:5432");
console.log("Same instance?", db1 === db2);
db1.query("SELECT * FROM users");
console.log();

// 2. FACTORY PATTERN
console.log("2. FACTORY PATTERN");
console.log("------------------");
const car = VehicleFactory.createVehicle("car");
const bike = VehicleFactory.createVehicle("bike");
car.drive();
car.stop();
bike.drive();
bike.stop();
console.log();

// 3. BUILDER PATTERN
console.log("3. BUILDER PATTERN");
console.log("------------------");
const luxuryHouse = new HouseBuilder()
  .buildWalls()
  .buildRoof()
  .buildWindows()
  .buildDoor()
  .build();
luxuryHouse.displayStructure();
console.log();

// 4. ADAPTER PATTERN
console.log("4. ADAPTER PATTERN");
console.log("------------------");
class LegacyPaymentSystem {
  processPaymentLegacy(amount: number): void {
    console.log(`Legacy system processing: $${amount}`);
  }
}
const legacySystem = new LegacyPaymentSystem();
const adapter = new PaymentAdapter(legacySystem);
adapter.pay(150);
console.log();

// 5. DECORATOR PATTERN
console.log("5. DECORATOR PATTERN");
console.log("--------------------");
let coffee = new SimpleCoffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);
console.log(`Coffee: ${coffee.getDescription()}`);
console.log(`Total Cost: $${coffee.getCost()}`);
console.log();

// 6. FACADE PATTERN
console.log("6. FACADE PATTERN");
console.log("-----------------");
class DVDPlayer {
  on(): void {
    console.log("DVD Player is on");
  }
  off(): void {
    console.log("DVD Player is off");
  }
  play(movie: string): void {
    console.log(`Playing movie: ${movie}`);
  }
}
class Projector {
  on(): void {
    console.log("Projector is on");
  }
  off(): void {
    console.log("Projector is off");
  }
  setInput(input: string): void {
    console.log(`Input set to: ${input}`);
  }
}
class Amplifier {
  on(): void {
    console.log("Amplifier is on");
  }
  off(): void {
    console.log("Amplifier is off");
  }
  setVolume(level: number): void {
    console.log(`Volume set to: ${level}`);
  }
}
const dvd = new DVDPlayer();
const projector = new Projector();
const amplifier = new Amplifier();
const homeTheater = new HomeTheaterFacade(dvd, projector, amplifier);
homeTheater.watchMovie("Inception");
homeTheater.endMovie();
console.log();

// 7. OBSERVER PATTERN
console.log("7. OBSERVER PATTERN");
console.log("-------------------");
const station = new WeatherStation();
const display1 = new WeatherDisplay("Living Room");
const display2 = new WeatherDisplay("Bedroom");
station.attach(display1);
station.attach(display2);
station.setMeasurements(25, 60);
console.log();

// 8. STRATEGY PATTERN
console.log("8. STRATEGY PATTERN");
console.log("-------------------");
const cart = new ShoppingCart();
cart.setPaymentStrategy(new CreditCardPayment("1234567890123456"));
cart.checkout(100);
cart.setPaymentStrategy(new PayPalPayment("user@example.com"));
cart.checkout(50);
cart.setPaymentStrategy(new CryptoCurrencyPayment("0x1234567890abcdef"));
cart.checkout(75);
console.log();

// 9. COMMAND PATTERN
console.log("9. COMMAND PATTERN");
console.log("------------------");
const light = new Light();
const remote = new RemoteControl();
remote.pressButton(new TurnOnCommand(light));
remote.pressButton(new TurnOffCommand(light));
remote.undo();
console.log();

// 10. STATE PATTERN
console.log("10. STATE PATTERN");
console.log("-----------------");
const connection = new TCPConnection(new EstablishedState());
connection.request();
console.log();

// 11. TEMPLATE METHOD PATTERN
console.log("11. TEMPLATE METHOD PATTERN");
console.log("---------------------------");
const jsonProcessor = new JSONProcessor();
jsonProcessor.process('{"name": "John", "age": 30}');
console.log();
const csvProcessor = new CSVProcessor();
csvProcessor.process("name,age,email");
console.log();

// 12. CHAIN OF RESPONSIBILITY PATTERN
console.log("12. CHAIN OF RESPONSIBILITY PATTERN");
console.log("-----------------------------------");
const auth = new AuthenticationHandler();
const authz = new AuthorizationHandler();
const logging = new LoggingHandler();
auth.setNext(authz).setNext(logging);
const request = { user: { isAdmin: true } };
auth.handle(request);
console.log();

console.log("========== END OF DEMONSTRATION ==========");
