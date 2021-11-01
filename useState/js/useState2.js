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
  //DOM에서 onclick 호출
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