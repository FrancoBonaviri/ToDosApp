import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MainLayout } from './components/main/MainLayout';
import { AuthPage } from './components/auth/AuthPage';
import { useSelector } from 'react-redux';


function App() {

  const { token } = useSelector(state => state.user)
  



  return (
    token ? 
    <MainLayout /> :
    <AuthPage />
  );
}

export default App;
