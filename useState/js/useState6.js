//동시에 여러 setState가 실행될 때, render가 2번 실행됨 => 좋지 않은 코드
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
    // 기존 state와 같을 경우
    if(state === newVal) return;
    //배열, 객체일때 비교
    // if(JSON.stringify(state) === JSON.stringify(newVal)) return;

    states[key] = newVal;
    render();
  }

  setStateCounter += 1; //1, 2
  return [state, setState];
}

function multiChange() {
  const [count, setCount] = useState(1);
  const [dog, setDog] = useState('멍1');

  function countDog(num){
    setCount(num);
    setDog('멍!'+ num);
  }

  window.increment = () => countDog(count+1);
  window.decrement = () => countDog(count-1);

  return `<div>
    <div>${count}번 ${dog}</div>
    <button onClick="increment()">increment</button>
    <button onClick="decrement()">decrement</button>
  </div>`;
}

//setState(state 변경 감지) => render 실행
function render(){
  const $app = document.querySelector('#app');
  $app.innerHTML = `
    <div>
      <span>renderCount: ${renderCount}</span>
    </div>
    <div>${multiChange()}<div>`;
    renderCount+=1;
    setStateCounter = 0;
}

render();