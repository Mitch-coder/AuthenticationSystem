import React,{useState,useEffect} from 'react';
import './App.css';
import ScaleLoader from 'react-spinners/ScaleLoader';
import LoginPage from './components/loginPage';
import { Redirect } from 'react-router'
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  const [loading,setLoading] = useState(false);
  useEffect(()=>{setLoading(true);setTimeout(()=>{setLoading(false)},3000)},[])
  return (
    <Router>
        
      <div className="App">
      {
          loading?
          <ScaleLoader size={30} color={"#37EDC6"} loading={loading}></ScaleLoader>
          :
      <Switch>
      <Route path="/login"> 
     <LoginPage>
     </LoginPage>
     </Route>
      <Route path="/profile"> 
      <h2>Hola Usuario</h2>
      </Route>
      <Route path="/"> 
        <Redirect to="/login"/>  
      </Route>
      </Switch>
      }
    </div>
    </Router>
  );
}

export default App;
