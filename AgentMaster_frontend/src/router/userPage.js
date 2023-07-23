import{ UserInfoForm, KeywordAlert, ScrapedArticles,} from '../component/chart/User';

function UserPage() {
  return (
  <div className="App">
    <div className="container border">
      <UserInfoForm />
      <KeywordAlert />
      <ScrapedArticles/>
    </div>
  </div>

  );
}

export default UserPage;