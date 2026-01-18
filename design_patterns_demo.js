// ==================== CREATIONAL PATTERNS ====================

// 1. SINGLETON PATTERN
class DatabaseConnection {
  static instance = null;

  constructor(connectionString) {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance;
    }
    this.connectionString = connectionString;
    console.log("Database connected to:", connectionString);
    DatabaseConnection.instance = this;
  }

  static getInstance(connectionString) {
    if (!DatabaseConnection.instance) {
      new DatabaseConnection(connectionString);
    }
    return DatabaseConnection.instance;
  }

  query(sql) {
    console.log("Executing query:", sql);
  }
}

// 2. FACTORY PATTERN
class Car {
  drive() {
    console.log("🚗 Driving a car");
  }
  stop() {
    console.log("🚗 Car stopped");
  }
}

class Bike {
  drive() {
    console.log("🏍️ Riding a bike");
  }
  stop() {
    console.log("🏍️ Bike stopped");
  }
}

class VehicleFactory {
  static createVehicle(type) {
    switch (type) {
      case "car":
        return new Car();
      case "bike":
        return new Bike();
      default:
        throw new Error("Unknown vehicle type");
    }
  }
}

// 3. BUILDER PATTERN
class House {
  constructor() {
    this.walls = false;
    this.roof = false;
    this.windows = false;
    this.door = false;
  }

  displayStructure() {
    console.log(
      `🏠 House with walls: ${this.walls}, roof: ${this.roof}, windows: ${this.windows}, door: ${this.door}`
    );
  }

  setWalls(hasWalls) {
    this.walls = hasWalls;
  }
  setRoof(hasRoof) {
    this.roof = hasRoof;
  }
  setWindows(hasWindows) {
    this.windows = hasWindows;
  }
  setDoor(hasDoor) {
    this.door = hasDoor;
  }
}

class HouseBuilder {
  constructor() {
    this.house = new House();
  }

  buildWalls() {
    this.house.setWalls(true);
    return this;
  }

  buildRoof() {
    this.house.setRoof(true);
    return this;
  }

  buildWindows() {
    this.house.setWindows(true);
    return this;
  }

  buildDoor() {
    this.house.setDoor(true);
    return this;
  }

  build() {
    return this.house;
  }
}

// ==================== STRUCTURAL PATTERNS ====================

// 4. ADAPTER PATTERN
class LegacyPaymentSystem {
  processPaymentLegacy(amount) {
    console.log(`💳 Legacy system processing: $${amount}`);
  }
}

class PaymentAdapter {
  constructor(legacySystem) {
    this.legacySystem = legacySystem;
  }

  pay(amount) {
    this.legacySystem.processPaymentLegacy(amount);
  }
}

// 5. DECORATOR PATTERN
class SimpleCoffee {
  getCost() {
    return 5;
  }
  getDescription() {
    return "Simple Coffee";
  }
}

class MilkDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  getCost() {
    return this.coffee.getCost() + 2;
  }

  getDescription() {
    return this.coffee.getDescription() + ", Milk";
  }
}

class SugarDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  getCost() {
    return this.coffee.getCost() + 1;
  }

  getDescription() {
    return this.coffee.getDescription() + ", Sugar";
  }
}

// 6. FACADE PATTERN
class DVDPlayer {
  on() {
    console.log("   📀 DVD Player is on");
  }
  off() {
    console.log("   📀 DVD Player is off");
  }
  play(movie) {
    console.log(`   📀 Playing movie: ${movie}`);
  }
}

class Projector {
  on() {
    console.log("   🎬 Projector is on");
  }
  off() {
    console.log("   🎬 Projector is off");
  }
  setInput(input) {
    console.log(`   🎬 Input set to: ${input}`);
  }
}

class Amplifier {
  on() {
    console.log("   🔊 Amplifier is on");
  }
  off() {
    console.log("   🔊 Amplifier is off");
  }
  setVolume(level) {
    console.log(`   🔊 Volume set to: ${level}`);
  }
}

class HomeTheaterFacade {
  constructor(dvdPlayer, projector, amplifier) {
    this.dvdPlayer = dvdPlayer;
    this.projector = projector;
    this.amplifier = amplifier;
  }

  watchMovie(movie) {
    console.log("🎥 Starting movie experience...");
    this.amplifier.on();
    this.amplifier.setVolume(5);
    this.projector.on();
    this.projector.setInput("DVD");
    this.dvdPlayer.on();
    this.dvdPlayer.play(movie);
  }

  endMovie() {
    console.log("🎥 Ending movie experience...");
    this.dvdPlayer.off();
    this.projector.off();
    this.amplifier.off();
  }
}

// 7. PROXY PATTERN
class RealImage {
  constructor(filename) {
    this.filename = filename;
    this.loadImage();
  }

  loadImage() {
    console.log(`📸 Loading image from disk: ${this.filename}`);
  }

  display() {
    console.log(`📸 Displaying image: ${this.filename}`);
  }
}

class ProxyImage {
  constructor(filename) {
    this.filename = filename;
    this.realImage = null;
  }

  display() {
    if (!this.realImage) {
      this.realImage = new RealImage(this.filename);
    }
    this.realImage.display();
  }
}

// ==================== BEHAVIORAL PATTERNS ====================

// 8. OBSERVER PATTERN
class WeatherStation {
  constructor() {
    this.temperature = 0;
    this.humidity = 0;
    this.observers = [];
  }

  attach(observer) {
    this.observers.push(observer);
  }

  detach(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notifyObservers() {
    this.observers.forEach((observer) =>
      observer.update(this.temperature, this.humidity)
    );
  }

  setMeasurements(temperature, humidity) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.notifyObservers();
  }
}

class WeatherDisplay {
  constructor(name) {
    this.name = name;
  }

  update(temperature, humidity) {
    console.log(
      `🌡️  ${this.name}: Temperature ${temperature}°C, Humidity ${humidity}%`
    );
  }
}

// 9. STRATEGY PATTERN
class CreditCardPayment {
  constructor(cardNumber) {
    this.cardNumber = cardNumber;
  }

  pay(amount) {
    console.log(
      `💳 Paid $${amount} using Credit Card ending in ${this.cardNumber.slice(-4)}`
    );
  }
}

class PayPalPayment {
  constructor(email) {
    this.email = email;
  }

  pay(amount) {
    console.log(`💰 Paid $${amount} using PayPal account ${this.email}`);
  }
}

class CryptoCurrencyPayment {
  constructor(walletAddress) {
    this.walletAddress = walletAddress;
  }

  pay(amount) {
    console.log(
      `₿ Paid $${amount} using Cryptocurrency to ${this.walletAddress}`
    );
  }
}

class ShoppingCart {
  constructor() {
    this.paymentStrategy = null;
  }

  setPaymentStrategy(strategy) {
    this.paymentStrategy = strategy;
  }

  checkout(amount) {
    if (!this.paymentStrategy) {
      throw new Error("Payment strategy not set");
    }
    this.paymentStrategy.pay(amount);
  }
}

// 10. COMMAND PATTERN
class Light {
  constructor() {
    this.isOn = false;
  }

  turnOn() {
    this.isOn = true;
    console.log("💡 Light is ON");
  }

  turnOff() {
    this.isOn = false;
    console.log("💡 Light is OFF");
  }

  getStatus() {
    return this.isOn;
  }
}

class TurnOnCommand {
  constructor(light) {
    this.light = light;
  }

  execute() {
    this.light.turnOn();
  }

  undo() {
    this.light.turnOff();
  }
}

class TurnOffCommand {
  constructor(light) {
    this.light = light;
  }

  execute() {
    this.light.turnOff();
  }

  undo() {
    this.light.turnOn();
  }
}

class RemoteControl {
  constructor() {
    this.commands = [];
    this.lastCommand = null;
  }

  pressButton(command) {
    command.execute();
    this.commands.push(command);
    this.lastCommand = command;
  }

  undo() {
    if (this.lastCommand) {
      this.lastCommand.undo();
      this.lastCommand = null;
    }
  }
}

// 11. STATE PATTERN
class EstablishedState {
  handle(context) {
    console.log(
      "🔗 Connection is established. Ready to send/receive data."
    );
  }
}

class ListenState {
  handle(context) {
    console.log("🔗 Connection is listening. Waiting for incoming connections.");
  }
}

class ClosedState {
  handle(context) {
    console.log("🔗 Connection is closed.");
  }
}

class TCPConnection {
  constructor(state) {
    this.state = state;
  }

  setState(state) {
    this.state = state;
  }

  request() {
    this.state.handle(this);
  }
}

// 12. TEMPLATE METHOD PATTERN
class DataProcessor {
  process(data) {
    this.parseData(data);
    this.validateData();
    this.processData();
  }

  parseData(data) {
    throw new Error("parseData must be implemented");
  }
  validateData() {
    throw new Error("validateData must be implemented");
  }
  processData() {
    throw new Error("processData must be implemented");
  }
}

class JSONProcessor extends DataProcessor {
  constructor() {
    super();
    this.parsedData = null;
  }

  parseData(data) {
    this.parsedData = JSON.parse(data);
    console.log("📝 JSON data parsed");
  }

  validateData() {
    console.log("✓ JSON data validated");
  }

  processData() {
    console.log("⚙️ JSON data processed:", this.parsedData);
  }
}

class CSVProcessor extends DataProcessor {
  constructor() {
    super();
    this.parsedData = [];
  }

  parseData(data) {
    this.parsedData = data.split(",");
    console.log("📝 CSV data parsed");
  }

  validateData() {
    console.log("✓ CSV data validated");
  }

  processData() {
    console.log("⚙️ CSV data processed:", this.parsedData);
  }
}

// 13. CHAIN OF RESPONSIBILITY PATTERN
class AbstractHandler {
  constructor() {
    this.nextHandler = null;
  }

  setNext(handler) {
    this.nextHandler = handler;
    return handler;
  }

  handle(request) {
    this.processRequest(request);
    if (this.nextHandler) {
      this.nextHandler.handle(request);
    }
  }

  processRequest(request) {
    throw new Error("processRequest must be implemented");
  }
}

class AuthenticationHandler extends AbstractHandler {
  processRequest(request) {
    console.log("🔐 Authenticating user...");
    if (!request.user) {
      console.log("❌ Authentication failed");
      throw new Error("User not authenticated");
    }
    console.log("✓ Authentication passed");
  }
}

class AuthorizationHandler extends AbstractHandler {
  processRequest(request) {
    console.log("🔑 Authorizing user...");
    if (!request.user.isAdmin) {
      console.log("❌ Authorization failed");
      throw new Error("User not authorized");
    }
    console.log("✓ Authorization passed");
  }
}

class LoggingHandler extends AbstractHandler {
  processRequest(request) {
    console.log("📋 Logging request:", request);
  }
}

// ==================== DEMONSTRATION ====================

console.log("\n");
console.log("╔════════════════════════════════════════════════════╗");
console.log("║     DESIGN PATTERNS DEMONSTRATION IN JAVASCRIPT   ║");
console.log("╚════════════════════════════════════════════════════╝");
console.log("\n");

// 1. SINGLETON PATTERN
console.log("1️⃣  SINGLETON PATTERN");
console.log("───────────────────────────────────");
const db1 = DatabaseConnection.getInstance("postgresql://localhost:5432");
const db2 = DatabaseConnection.getInstance("postgresql://localhost:5432");
console.log("Same instance?", db1 === db2);
db1.query("SELECT * FROM users");
console.log();

// 2. FACTORY PATTERN
console.log("2️⃣  FACTORY PATTERN");
console.log("───────────────────────────────────");
const car = VehicleFactory.createVehicle("car");
const bike = VehicleFactory.createVehicle("bike");
car.drive();
car.stop();
bike.drive();
bike.stop();
console.log();

// 3. BUILDER PATTERN
console.log("3️⃣  BUILDER PATTERN");
console.log("───────────────────────────────────");
const luxuryHouse = new HouseBuilder()
  .buildWalls()
  .buildRoof()
  .buildWindows()
  .buildDoor()
  .build();
luxuryHouse.displayStructure();
console.log();

// 4. ADAPTER PATTERN
console.log("4️⃣  ADAPTER PATTERN");
console.log("───────────────────────────────────");
const legacySystem = new LegacyPaymentSystem();
const adapter = new PaymentAdapter(legacySystem);
adapter.pay(150);
console.log();

// 5. DECORATOR PATTERN
console.log("5️⃣  DECORATOR PATTERN");
console.log("───────────────────────────────────");
let coffee = new SimpleCoffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);
console.log(`☕ Coffee: ${coffee.getDescription()}`);
console.log(`💵 Total Cost: $${coffee.getCost()}`);
console.log();

// 6. FACADE PATTERN
console.log("6️⃣  FACADE PATTERN");
console.log("───────────────────────────────────");
const dvd = new DVDPlayer();
const projector = new Projector();
const amplifier = new Amplifier();
const homeTheater = new HomeTheaterFacade(dvd, projector, amplifier);
homeTheater.watchMovie("Inception");
homeTheater.endMovie();
console.log();

// 7. PROXY PATTERN
console.log("7️⃣  PROXY PATTERN");
console.log("───────────────────────────────────");
const image1 = new ProxyImage("photo.jpg");
const image2 = new ProxyImage("photo.jpg");
image1.display();
image2.display(); // Reuses cached instance
console.log();

// 8. OBSERVER PATTERN
console.log("8️⃣  OBSERVER PATTERN");
console.log("───────────────────────────────────");
const station = new WeatherStation();
const display1 = new WeatherDisplay("Living Room");
const display2 = new WeatherDisplay("Bedroom");
station.attach(display1);
station.attach(display2);
station.setMeasurements(25, 60);
console.log();

// 9. STRATEGY PATTERN
console.log("9️⃣  STRATEGY PATTERN");
console.log("───────────────────────────────────");
const cart = new ShoppingCart();
cart.setPaymentStrategy(new CreditCardPayment("1234567890123456"));
cart.checkout(100);
cart.setPaymentStrategy(new PayPalPayment("user@example.com"));
cart.checkout(50);
cart.setPaymentStrategy(new CryptoCurrencyPayment("0x1234567890abcdef"));
cart.checkout(75);
console.log();

// 10. COMMAND PATTERN
console.log("🔟 COMMAND PATTERN");
console.log("───────────────────────────────────");
const light = new Light();
const remote = new RemoteControl();
remote.pressButton(new TurnOnCommand(light));
remote.pressButton(new TurnOffCommand(light));
console.log("Undo last command:");
remote.undo();
console.log();

// 11. STATE PATTERN
console.log("1️⃣1️⃣  STATE PATTERN");
console.log("───────────────────────────────────");
const connection = new TCPConnection(new ClosedState());
connection.request();
connection.setState(new EstablishedState());
connection.request();
console.log();

// 12. TEMPLATE METHOD PATTERN
console.log("1️⃣2️⃣  TEMPLATE METHOD PATTERN");
console.log("───────────────────────────────────");
const jsonProcessor = new JSONProcessor();
jsonProcessor.process('{"name": "John", "age": 30}');
console.log();
const csvProcessor = new CSVProcessor();
csvProcessor.process("name,age,email");
console.log();

// 13. CHAIN OF RESPONSIBILITY PATTERN
console.log("1️⃣3️⃣  CHAIN OF RESPONSIBILITY PATTERN");
console.log("───────────────────────────────────");
const auth = new AuthenticationHandler();
const authz = new AuthorizationHandler();
const logging = new LoggingHandler();
auth.setNext(authz).setNext(logging);
const request = { user: { isAdmin: true } };
auth.handle(request);
console.log();

console.log("╔════════════════════════════════════════════════════╗");
console.log("║            END OF DEMONSTRATION                    ║");
console.log("╚════════════════════════════════════════════════════╝\n");
