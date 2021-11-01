//잘못된예
//useState와 Component가 여러개일때
//하나의 state 변수로 두개의 state를 관리하기 떄문에 똑같은 값을 출력함
// => useState가 실행되는 횟수만큼 state갯수 만들어줌

// state는 외부에서 관리해준다
// undefined일 때만 init값을 할당해준다. (단 한번만 할당하도록)
let state = undefined;
let renderCount = 0;
function useState(initVal) {
  if(state === undefined) {
    state = initVal;
  }
  //setState 실행될때마다 render()실행
  const setState = newVal => {
    state = newVal;
    render();
  }

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
  window.sound = () => setDog(dog + '멍!'); //setState(2); => state = 2;

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
    <div>${Dog()}</div>`
    renderCount+=1;
}

render();