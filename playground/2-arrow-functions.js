/* arrow functions */

// normal function
// const square = function(x) {
//   return x * x;
// };

// arrow function
// const square = (x) => {
//     return x * x;
// }

// arrow function + concise body
// const square = x => x * x;

// console.log(square(3));

// normal function at the end binds its own this which
// makes use loose the reference to this.name
// const event = {
//   name: 'Birthday Party',
//   guestList: ['Foo', 'Bar', 'Baz'],
//   printGuestList() {
//     console.log(`Guest list for ${this.name}`)
//     this.guestList.forEach(function(guest) {
//       console.log(`${guest} is attending ${this.name}`)
//     })
//   },
// }

// won't work; arrow functions don't bind this
// const event = {
//   name: 'Birthday Party',
//   printGuestList: () => {
//     console.log(`Guest list for ${this.name}`)
//   },
// }

// take advantage of not binding this...
const event = {
  name: 'Birthday Party',
  guestList: ['Foo', 'Bar', 'Baz'],
  printGuestList() {
    console.log(`Guest list for ${this.name}`)
    this.guestList.forEach(guest => console.log(`${guest} is attending ${this.name}`))
  },
}

event.printGuestList()
