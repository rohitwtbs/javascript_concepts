// ==================== CREATIONAL PATTERNS ====================

// 1. SINGLETON PATTERN
// Ensures a class has only one instance and provides global access to it
class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connectionString: string;

  private constructor(connectionString: string) {
    this.connectionString = connectionString;
    console.log("Database connected to:", connectionString);
  }

  public static getInstance(connectionString: string): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection(connectionString);
    }
    return DatabaseConnection.instance;
  }

  public query(sql: string): void {
    console.log("Executing query:", sql);
  }
}

// Usage:
// const db1 = DatabaseConnection.getInstance("localhost:5432");
// const db2 = DatabaseConnection.getInstance("localhost:5432"); // Same instance as db1


// 2. FACTORY PATTERN
// Creates objects without specifying their exact classes
interface Vehicle {
  drive(): void;
  stop(): void;
}

class Car implements Vehicle {
  drive(): void {
    console.log("Driving a car");
  }
  stop(): void {
    console.log("Car stopped");
  }
}

class Bike implements Vehicle {
  drive(): void {
    console.log("Riding a bike");
  }
  stop(): void {
    console.log("Bike stopped");
  }
}

class VehicleFactory {
  static createVehicle(type: string): Vehicle {
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

// Usage:
// const vehicle = VehicleFactory.createVehicle("car");
// vehicle.drive();


// 3. BUILDER PATTERN
// Separates construction of complex objects from their representation
interface HouseConfig {
  walls?: boolean;
  roof?: boolean;
  windows?: boolean;
  door?: boolean;
}

class House {
  private walls: boolean = false;
  private roof: boolean = false;
  private windows: boolean = false;
  private door: boolean = false;

  displayStructure(): void {
    console.log(
      `House with walls: ${this.walls}, roof: ${this.roof}, windows: ${this.windows}, door: ${this.door}`
    );
  }

  setWalls(hasWalls: boolean): void {
    this.walls = hasWalls;
  }
  setRoof(hasRoof: boolean): void {
    this.roof = hasRoof;
  }
  setWindows(hasWindows: boolean): void {
    this.windows = hasWindows;
  }
  setDoor(hasDoor: boolean): void {
    this.door = hasDoor;
  }
}

class HouseBuilder {
  private house: House = new House();

  public buildWalls(): HouseBuilder {
    this.house.setWalls(true);
    return this;
  }

  public buildRoof(): HouseBuilder {
    this.house.setRoof(true);
    return this;
  }

  public buildWindows(): HouseBuilder {
    this.house.setWindows(true);
    return this;
  }

  public buildDoor(): HouseBuilder {
    this.house.setDoor(true);
    return this;
  }

  public build(): House {
    return this.house;
  }
}

// Usage:
// const house = new HouseBuilder()
//   .buildWalls()
//   .buildRoof()
//   .buildDoor()
//   .build();
// house.displayStructure();


// ==================== STRUCTURAL PATTERNS ====================

// 4. ADAPTER PATTERN
// Converts interface of a class into another interface expected by clients
class LegacyPaymentSystem {
  processPaymentLegacy(amount: number): void {
    console.log(`Legacy system processing: $${amount}`);
  }
}

interface ModernPaymentInterface {
  pay(amount: number): void;
}

class PaymentAdapter implements ModernPaymentInterface {
  private legacySystem: LegacyPaymentSystem;

  constructor(legacySystem: LegacyPaymentSystem) {
    this.legacySystem = legacySystem;
  }

  pay(amount: number): void {
    this.legacySystem.processPaymentLegacy(amount);
  }
}

// Usage:
// const legacy = new LegacyPaymentSystem();
// const adapter = new PaymentAdapter(legacy);
// adapter.pay(100);


// 5. DECORATOR PATTERN
// Attaches additional responsibilities to objects dynamically
interface Coffee {
  getCost(): number;
  getDescription(): string;
}

class SimpleCoffee implements Coffee {
  getCost(): number {
    return 5;
  }
  getDescription(): string {
    return "Simple Coffee";
  }
}

class MilkDecorator implements Coffee {
  private coffee: Coffee;

  constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  getCost(): number {
    return this.coffee.getCost() + 2;
  }

  getDescription(): string {
    return this.coffee.getDescription() + ", Milk";
  }
}

class SugarDecorator implements Coffee {
  private coffee: Coffee;

  constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  getCost(): number {
    return this.coffee.getCost() + 1;
  }

  getDescription(): string {
    return this.coffee.getDescription() + ", Sugar";
  }
}

// Usage:
// let coffee: Coffee = new SimpleCoffee();
// coffee = new MilkDecorator(coffee);
// coffee = new SugarDecorator(coffee);
// console.log(coffee.getDescription(), "Cost:", coffee.getCost());


// 6. FACADE PATTERN
// Provides unified, simplified interface to set of interfaces in a subsystem
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

class HomeTheaterFacade {
  private dvdPlayer: DVDPlayer;
  private projector: Projector;
  private amplifier: Amplifier;

  constructor(dvdPlayer: DVDPlayer, projector: Projector, amplifier: Amplifier) {
    this.dvdPlayer = dvdPlayer;
    this.projector = projector;
    this.amplifier = amplifier;
  }

  watchMovie(movie: string): void {
    console.log("Starting movie experience...");
    this.amplifier.on();
    this.amplifier.setVolume(5);
    this.projector.on();
    this.projector.setInput("DVD");
    this.dvdPlayer.on();
    this.dvdPlayer.play(movie);
  }

  endMovie(): void {
    console.log("Ending movie experience...");
    this.dvdPlayer.off();
    this.projector.off();
    this.amplifier.off();
  }
}

// Usage:
// const dvd = new DVDPlayer();
// const projector = new Projector();
// const amplifier = new Amplifier();
// const homeTheater = new HomeTheaterFacade(dvd, projector, amplifier);
// homeTheater.watchMovie("Inception");
// homeTheater.endMovie();


// 7. PROXY PATTERN
// Provides a surrogate or placeholder for another object to control access
interface Image {
  display(): void;
}

class RealImage implements Image {
  private filename: string;

  constructor(filename: string) {
    this.filename = filename;
    this.loadImage();
  }

  private loadImage(): void {
    console.log(`Loading image from disk: ${this.filename}`);
  }

  display(): void {
    console.log(`Displaying image: ${this.filename}`);
  }
}

class ProxyImage implements Image {
  private filename: string;
  private realImage: RealImage | null = null;

  constructor(filename: string) {
    this.filename = filename;
  }

  display(): void {
    if (!this.realImage) {
      this.realImage = new RealImage(this.filename);
    }
    this.realImage.display();
  }
}

// Usage:
// const image1 = new ProxyImage("photo.jpg");
// const image2 = new ProxyImage("photo.jpg");
// image1.display(); // Loads and displays
// image2.display(); // Just displays (already loaded)


// ==================== BEHAVIORAL PATTERNS ====================

// 8. OBSERVER PATTERN
// Defines one-to-many dependency between objects so that state change in one notifies others
interface Observer {
  update(temperature: number, humidity: number): void;
}

class WeatherStation {
  private temperature: number = 0;
  private humidity: number = 0;
  private observers: Observer[] = [];

  attach(observer: Observer): void {
    this.observers.push(observer);
  }

  detach(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notifyObservers(): void {
    this.observers.forEach((observer) =>
      observer.update(this.temperature, this.humidity)
    );
  }

  setMeasurements(temperature: number, humidity: number): void {
    this.temperature = temperature;
    this.humidity = humidity;
    this.notifyObservers();
  }
}

class WeatherDisplay implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  update(temperature: number, humidity: number): void {
    console.log(
      `${this.name}: Temperature ${temperature}°C, Humidity ${humidity}%`
    );
  }
}

// Usage:
// const station = new WeatherStation();
// const display1 = new WeatherDisplay("Living Room");
// const display2 = new WeatherDisplay("Bedroom");
// station.attach(display1);
// station.attach(display2);
// station.setMeasurements(25, 60);


// 9. STRATEGY PATTERN
// Defines family of algorithms, encapsulates each one, and makes them interchangeable
interface PaymentStrategy {
  pay(amount: number): void;
}

class CreditCardPayment implements PaymentStrategy {
  private cardNumber: string;

  constructor(cardNumber: string) {
    this.cardNumber = cardNumber;
  }

  pay(amount: number): void {
    console.log(`Paid $${amount} using Credit Card ending in ${this.cardNumber.slice(-4)}`);
  }
}

class PayPalPayment implements PaymentStrategy {
  private email: string;

  constructor(email: string) {
    this.email = email;
  }

  pay(amount: number): void {
    console.log(`Paid $${amount} using PayPal account ${this.email}`);
  }
}

class CryptoCurrencyPayment implements PaymentStrategy {
  private walletAddress: string;

  constructor(walletAddress: string) {
    this.walletAddress = walletAddress;
  }

  pay(amount: number): void {
    console.log(`Paid $${amount} using Cryptocurrency to ${this.walletAddress}`);
  }
}

class ShoppingCart {
  private paymentStrategy: PaymentStrategy | null = null;

  setPaymentStrategy(strategy: PaymentStrategy): void {
    this.paymentStrategy = strategy;
  }

  checkout(amount: number): void {
    if (!this.paymentStrategy) {
      throw new Error("Payment strategy not set");
    }
    this.paymentStrategy.pay(amount);
  }
}

// Usage:
// const cart = new ShoppingCart();
// cart.setPaymentStrategy(new CreditCardPayment("1234567890123456"));
// cart.checkout(100);
// cart.setPaymentStrategy(new PayPalPayment("user@example.com"));
// cart.checkout(50);


// 10. COMMAND PATTERN
// Encapsulates request as object allowing you to parameterize clients with different requests
interface Command {
  execute(): void;
  undo(): void;
}

class Light {
  private isOn: boolean = false;

  turnOn(): void {
    this.isOn = true;
    console.log("Light is ON");
  }

  turnOff(): void {
    this.isOn = false;
    console.log("Light is OFF");
  }

  getStatus(): boolean {
    return this.isOn;
  }
}

class TurnOnCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute(): void {
    this.light.turnOn();
  }

  undo(): void {
    this.light.turnOff();
  }
}

class TurnOffCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute(): void {
    this.light.turnOff();
  }

  undo(): void {
    this.light.turnOn();
  }
}

class RemoteControl {
  private commands: Command[] = [];
  private lastCommand: Command | null = null;

  pressButton(command: Command): void {
    command.execute();
    this.commands.push(command);
    this.lastCommand = command;
  }

  undo(): void {
    if (this.lastCommand) {
      this.lastCommand.undo();
      this.lastCommand = null;
    }
  }
}

// Usage:
// const light = new Light();
// const remote = new RemoteControl();
// remote.pressButton(new TurnOnCommand(light));
// remote.pressButton(new TurnOffCommand(light));
// remote.undo();


// 11. STATE PATTERN
// Allows object to alter its behavior when internal state changes
interface State {
  handle(context: TCPConnection): void;
}

class EstablishedState implements State {
  handle(context: TCPConnection): void {
    console.log("Connection is established. Ready to send/receive data.");
  }
}

class ListenState implements State {
  handle(context: TCPConnection): void {
    console.log("Connection is listening. Waiting for incoming connections.");
  }
}

class ClosedState implements State {
  handle(context: TCPConnection): void {
    console.log("Connection is closed.");
  }
}

class TCPConnection {
  private state: State;

  constructor(state: State) {
    this.state = state;
  }

  setState(state: State): void {
    this.state = state;
  }

  request(): void {
    this.state.handle(this);
  }
}

// Usage:
// const connection = new TCPConnection(new ClosedState());
// connection.request();
// connection.setState(new EstablishedState());
// connection.request();


// 12. TEMPLATE METHOD PATTERN
// Defines skeleton of algorithm in method, deferring steps to subclasses
abstract class DataProcessor {
  protected abstract parseData(data: string): void;
  protected abstract validateData(): void;
  protected abstract processData(): void;

  public process(data: string): void {
    this.parseData(data);
    this.validateData();
    this.processData();
  }
}

class JSONProcessor extends DataProcessor {
  private parsedData: any;

  protected parseData(data: string): void {
    this.parsedData = JSON.parse(data);
    console.log("JSON data parsed");
  }

  protected validateData(): void {
    console.log("JSON data validated");
  }

  protected processData(): void {
    console.log("JSON data processed:", this.parsedData);
  }
}

class CSVProcessor extends DataProcessor {
  private parsedData: string[];

  protected parseData(data: string): void {
    this.parsedData = data.split(",");
    console.log("CSV data parsed");
  }

  protected validateData(): void {
    console.log("CSV data validated");
  }

  protected processData(): void {
    console.log("CSV data processed:", this.parsedData);
  }
}

// Usage:
// const jsonProcessor = new JSONProcessor();
// jsonProcessor.process('{"name": "John"}');
// const csvProcessor = new CSVProcessor();
// csvProcessor.process("name,age,email");


// 13. CHAIN OF RESPONSIBILITY PATTERN
// Passes request along chain of handlers
interface RequestHandler {
  setNext(handler: RequestHandler): RequestHandler;
  handle(request: any): void;
}

abstract class AbstractHandler implements RequestHandler {
  protected nextHandler: RequestHandler | null = null;

  setNext(handler: RequestHandler): RequestHandler {
    this.nextHandler = handler;
    return handler;
  }

  handle(request: any): void {
    this.processRequest(request);
    if (this.nextHandler) {
      this.nextHandler.handle(request);
    }
  }

  protected abstract processRequest(request: any): void;
}

class AuthenticationHandler extends AbstractHandler {
  protected processRequest(request: any): void {
    console.log("Authenticating user...");
    if (!request.user) {
      console.log("Authentication failed");
      throw new Error("User not authenticated");
    }
  }
}

class AuthorizationHandler extends AbstractHandler {
  protected processRequest(request: any): void {
    console.log("Authorizing user...");
    if (!request.user.isAdmin) {
      console.log("Authorization failed");
      throw new Error("User not authorized");
    }
  }
}

class LoggingHandler extends AbstractHandler {
  protected processRequest(request: any): void {
    console.log("Logging request:", request);
  }
}

// Usage:
// const auth = new AuthenticationHandler();
// const authz = new AuthorizationHandler();
// const logging = new LoggingHandler();
// auth.setNext(authz).setNext(logging);
// const request = { user: { isAdmin: true } };
// auth.handle(request);


export {
  // Creational
  DatabaseConnection,
  VehicleFactory,
  HouseBuilder,
  House,
  // Structural
  PaymentAdapter,
  SimpleCoffee,
  MilkDecorator,
  SugarDecorator,
  HomeTheaterFacade,
  ProxyImage,
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
  TCPConnection,
  EstablishedState,
  JSONProcessor,
  CSVProcessor,
  AuthenticationHandler,
  AuthorizationHandler,
  LoggingHandler,
};
