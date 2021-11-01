//1. 바닐라 자바스크립트로 useState 만들기
//React
//- state가 변경되면 다시 렌더링이 된다.
//- 재랜더링 되어 컴포넌트가 다시 실행되어도 state값이 초기화되지 않고 유지 된다.


// 잘못된 예
// state값이 계속 초기화될 때,
// 즉 useState가 실행될 때마다 count가 1로 초기화가 된다.
// 해결 => state값을 외부에서 관리해준다. (useState2.js)

let renderCount = 0;

function useState(initVal) {
  let state = initVal; //1
  //setState 실행될때마다 render()실행
  const setState = newVal => {
    state = newVal;
    render();
  }

  return [state, setState];
}

function Counter() {
  const [count, setCount] = useState(1); //[1, setState()=>{}]
  //DOM에서 호출
  window.counter = () => setCount(count + 1); //setState(2); => state = 2;

  return `<div>
  <span>count: ${count}</span>
    <button onclick="counter()">증가</button>
  </div>`;
}


//setState(state 변경 감지) => render 실행
function render(){
  const $app = document.querySelector('#app');
  $app.innerHTML = `
    <div>
      <span>renderCount: ${renderCount}</span>
    </div>
    ${Counter()}`;
    renderCount+=1;
}

render();