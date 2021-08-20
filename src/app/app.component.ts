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
    this.persons = []
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  addPerson() {
    this.persons = [...this.persons, { name: this.newPerson.toUpperCase() } as Person];
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
    let collectionFrom = [...this.persons];
    let collectionTo = [...this.persons];
    while (collectionFrom.length > 0) {
      const number1 = Math.floor(Math.random() * (collectionFrom.length));
      let number2 = Math.floor(Math.random() * (collectionTo.length));
      while (collectionFrom[number1].name == collectionTo[number2].name && collectionTo.length > 1) {
        number2 = Math.floor(Math.random() * (collectionTo.length));
      }
      if (collectionFrom[number1].name == collectionTo[number2].name && this.persons.length > 1) {
        this.randomPairs = [];
        collectionFrom = [...this.persons];
        collectionTo = [...this.persons];
      }
      else {
        const person1 = collectionFrom[number1];
        const person2 = collectionTo[number2];
        this.randomPairs.push({ p1: person1, p2: person2 });
        collectionFrom.splice(collectionFrom.indexOf(person1), 1);
        collectionTo.splice(collectionTo.indexOf(person2), 1);
      }
    }

    this.randomPairs = [...this.randomPairs];
  }

}
