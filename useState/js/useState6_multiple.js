//requestAnimationFrame : 디스플레이 주사율에 따라 1초동안 실행되는 횟수
//보통 매끄러운 화면: 60fps(frame per second) -> 1초에 60프레임 
//동시에 여러 setState가 실행될 때, render가 2번 실행됨
// => requestAnimationFrame을 render에 적용해서
// 1프레임 이내로 발생하는 모든 변화를 모아서 실행시켜줌
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

function requestFrame(callback) {
  let frameCallback = -1;
  return () => {
    //이전 callback cancel
    // clearTimeout(frameCallback);
    cancelAnimationFrame(frameCallback);

    //setTimeout은 프레임을 신경쓰지 않고 동작하기 때문에 코드가 복잡해지면 자연스럽지 못함
    // frameCallback = setTimeout(callback, timer);
    frameCallback = requestAnimationFrame(callback);
  }
}

//setState(state 변경 감지) => render 실행
const render = requestFrame(() => {
  const $app = document.querySelector('#app');
  $app.innerHTML = `
    <div>
      <span>renderCount: ${renderCount}</span>
    </div>
    <div>${multiChange()}<div>`;
    renderCount+=1;
    setStateCounter = 0;
});

render();