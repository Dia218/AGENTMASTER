import{ UserInfoForm, KeywordAlert, ScrapedArticles,} from '../component/chart/User';
import './css/UserPage.css'
import Header from "../component/Header";

function UserPage() {
  return (
    <div className="App">
      <header className="mb-4"><Header /></header>
      <div className="container userPage border">
        <UserInfoForm/>
        <ScrapedArticles/>
      </div>
    </div>

  );
}

export default UserPage;