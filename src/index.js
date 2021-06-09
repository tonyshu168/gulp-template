const unique = require('uniq'),
      a = require('./modules/a.js'),
      add = require('./modules/b.js');

console.log('a: ', a.name);

var value = add( 8, 8);

console.log('index entry...');

var data = [1, 2, 2, 3, 4, 5, 5, 5, 6];

console.log(unique(data));

const fun = () => {
  console.log('allow func');
}

fun();
