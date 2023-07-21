//css 문제로 인한 깨짐&App 작성 방식의 차이가 큼으로 인해 현재는 임시로 App을 나눠놓았지만
//이후 수정하여 하나로 합칠 예정입니다. 

import './App.css';
import App_chart from './App_chart';
//import App_news from './App_news';

function App() {
  return (
    <App_chart />
  );
}

export default App;