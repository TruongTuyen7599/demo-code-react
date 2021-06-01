
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Contact from './pages/Contact/Contact';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Header from './components/Home/Header/Header';
import Login from './pages/Login/Login';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Profile from './pages/Profile/Profile';
import TodolistRFC from './pages/Todolist/TodolistRFC';
import Todolist from './pages/Todolist/Todolist';
import ToDoListRedux from './pages/Todolist/ToDoListRedux';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path='/home' exact component={Home}></Route>
        <Route path='/about' exact component={About}></Route>
        <Route path='/contact' exact component={Contact}></Route>
        <Route path='/login' exact component={Login}></Route>
        <Route path='/detail/:id' exact component={Login}></Route>
        <Route path='/profile' component={Profile}></Route>
        <Route path='/todolistrfc' component={TodolistRFC}></Route>
        <Route path='/todolist' component={Todolist}></Route>
        <Route path='/todolistredux' component={ToDoListRedux}></Route>
        <Route path='/' exact component={Home}></Route>
        <Route path='*' component={PageNotFound}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
