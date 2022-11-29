const pokemon = {
    firstname: 'Pika',
    lastname: 'Chu ',
    getPokeName: function() {
        var fullname = this.firstname + ' ' + this.lastname;
        return fullname;
    }
};

const pokemonName = function(this: any) {
    console.log(this.getPokeName() + 'I choose you!');
};

const logPokemon = pokemonName.bind(pokemon); 

logPokemon(); 

















// const pokemon = {
//     firstname: 'Pika',
//     lastname: 'Chu ',
//     getPokeName: function() {
//         var fullname = this.firstname + ' ' + this.lastname;
//         return fullname;
//     }
// };

// const pokemonName = function(this: any, snack: string, hobby: string) {
//     console.log(this.getPokeName() + 'I choose you!');
//     console.log(this.getPokeName() + ' loves ' + snack + ' and ' + hobby);
// };

// const logPokemon = pokemonName.bind(pokemon); 

// logPokemon('sushi', 'algorithms'); 
















// const pokemon = {
//     firstname: 'Pika',
//     lastname: 'Chu ',
//     getPokeName: function () {
//       var fullname = this.firstname + ' ' + this.lastname;
//       return fullname;
//     },
//   };
  
//   const pokemonName = function (this: any, snack: string, hobby: string) {
//     console.log(this.getPokeName() + ' loves ' + snack + ' and ' + hobby);
//   };
  
//   pokemonName.call(pokemon, 'sushi', 'algorithms'); 
//   pokemonName.apply(pokemon, ['sushi', 'algorithms']); 
  