import './App.css';
import MainContainer from './components/MainContainer';
import Login  from "./components/Login.jsx"
import {Routes,Route} from "react-router-dom"
import ChatArea from './components/ChatArea.jsx';
import Welcome from './components/Welcome.jsx';
import Users from './components/Users.jsx';
import CreateGroups from './components/CreateGroups.jsx';
import Groups from './components/Groups.jsx';

function App() {
  return (
   <>
    <div className="App">
    {/* <MainContainer /> */}
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="app" element={<MainContainer />}>
          <Route path="welcome" element={<Welcome />}></Route>
          <Route path="chat/:_id" element={<ChatArea />}></Route>
          <Route path="users" element={<Users />}></Route>
          <Route path="groups" element={<Groups />}></Route>
          <Route path="create-groups" element={<CreateGroups />}></Route>
        </Route>
      </Routes>
    {/* <Login /> */}
    </div>
   </>
  );
}

export default App;
