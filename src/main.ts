import { sayHello } from './greet';

function showHello(domName: string, name: string) {
  const elt = document.getElementById(domName) as HTMLElement; 
  elt.innerText = sayHello(name);
}

showHello('greeting', 'TypeScript');
