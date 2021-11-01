// => useState가 실행되는 횟수만큼 state갯수 만들어줌
let setStateCounter = 0;
const states = [];
// let state = undefined;
let renderCount = 0;

function useState(initVal) {
  const key = setStateCounter;
  if(states.length === key) {
    states.push(initVal);
  }
  const state = states[key]; 
  //setState 실행될때마다 render()실행
  const setState = newVal => {
    states[key] = newVal;
    render();
  }

  setStateCounter += 1; //1, 2
  return [state, setState];
}

function Counter() {
  const [count, setCount] = useState(1); //[1, setState()=>{}]
  //DOM에서 onclick 이벤트 발생시 호출
  window.counter = () => setCount(count + 1); //setState(2); => state = 2;

  return `<div>
  <span>count: ${count}</span>
    <button onclick="counter()">증가</button>
  </div>`;
}

function Dog() {
  const [dog, setDog] = useState('강아지');

  //DOM에서 onclick 이벤트 발생시 호출
  window.sound = () => setDog(dog + '멍!');

  return `<div>
  <span>count: ${dog}</span>
    <button onclick="sound()">sound</button>
  </div>`;
}

//setState(state 변경 감지) => render 실행
function render(){
  const $app = document.querySelector('#app');
  $app.innerHTML = `
    <div>
      <span>renderCount: ${renderCount}</span>
    </div>
    <div>${Counter()}<div>
    <div>${Dog()}</div>`;
    renderCount+=1;
    setStateCounter = 0;
}

render();