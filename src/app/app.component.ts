import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';


interface Person {
  name: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  persons: Person[] = [];
  selectedPerson: Person = {} as Person;;
  newPerson: string = '';
  randomPairs: { p1: Person, p2: Person }[] = []

  constructor(private primengConfig: PrimeNGConfig) {
    this.persons = [{ name: "Kuba" }, { name: "Wiki" }]
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  addPerson() {
    this.persons = [...this.persons, { name: this.newPerson } as Person];
    this.newPerson = '';
    this.randomPairs = [];
    this.selectedPerson = {} as Person;
  }

  deletePerson() {
    this.persons.splice(this.persons.indexOf(this.selectedPerson), 1);
    this.persons = [...this.persons];
    this.randomPairs = [];
    this.selectedPerson = {} as Person;
  }

  losujPary() {
    this.randomPairs = [];
    const collection = [...this.persons];
    while (collection.length > 0) {
      if (collection.length != 1) {
        const number1 = Math.floor(Math.random() * (collection.length));
        let number2 = number1;
        while (number2 == number1) {
          number2 = Math.floor(Math.random() * (collection.length));
        }
        const person1 = collection[number1]
        const person2 = collection[number2]
        this.randomPairs.push({ p1: person1, p2: person2 });
        collection.splice(collection.indexOf(person1), 1);
        collection.splice(collection.indexOf(person2), 1);
      }
      else {
        this.randomPairs.push({ p1: collection[0], p2: {} as Person });
        collection.splice(0, 1);
      }

    }

    this.randomPairs = [...this.randomPairs];
  }

}
