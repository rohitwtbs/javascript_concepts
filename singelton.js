// Singleton Car class
class Car {
  constructor(model) {
    if (Car.instance) {
      return Car.instance;
    }
    this.model = model;
    Car.instance = this;
  }

  drive() {
    console.log(`Driving a ${this.model}`);
  }
}

// Usage example:
const car1 = new Car('Tesla');
car1.drive(); // Driving a Tesla

const car2 = new Car('BMW');
car2.drive(); // Driving a Tesla (singleton)

console.log(car1 === car2); // true