import { BrowserRouter as Router , Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import ImageUploadPage from './ImageUploadPage';
import ComparisonResultPage from './ComparisonResultPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ImageUploadPage} />
        <Route path="/result" component={ComparisonResultPage} />
      </Switch>
    </Router>
  );
}

export default App;
