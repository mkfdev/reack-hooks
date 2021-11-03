//함수화
function ReactApp() {
  const options = {
    setStateCounter: 0, //useState 실행 횟수
    renderCount: 0, //렌더링 횟수
    states: [],
    root: null,
    rootComponent: null,
  }
  
  function useState(initVal) {
    const key = options.setStateCounter;
    if(options.states.length === key) {
      options.states.push(initVal);
    }
    const state = options.states[key]; 
    //setState 실행될때마다 render()실행
    const setState = newVal => {
      // 기존 state와 같을 경우
      if(options.state === newVal) return;
      //배열, 객체일때 비교
      // if(JSON.stringify(state) === JSON.stringify(newVal)) return;
      options.states[key] = newVal;
      _render();
    }
  
    options.setStateCounter += 1; //1, 2
    return [state, setState];
  }

  //setState(state 변경 감지) => render 실행
  const _render = requestFrame(() => {
    const {rootComponent, root} = options;

    if(!rootComponent || !root) return;

    root.innerHTML = rootComponent();
    
    options.renderCount+=1;
    options.setStateCounter = 0;
  });

  //처음 컴포넌트 생성 render 1회 실행
  function render(rootComponent, root){
    options.rootComponent = rootComponent;
    options.root = root;
    _render();
  }

  return {useState, render};
}

const {useState, render} = ReactApp();

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

const App = () => `
  <div>${multiChange()}<div>
`;

render(App, document.querySelector('#app'));