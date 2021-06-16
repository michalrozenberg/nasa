import './App.css';
import MenuSite from './components/MenuSite';
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyCtG2sdqY8WXk_hqL0XuKj1ynV5aE1j6dI",
  authDomain: "projectnasa-fb393.firebaseapp.com",
  projectId: "projectnasa-fb393",
  storageBucket: "projectnasa-fb393.appspot.com",
  messagingSenderId: "22814098941",
  appId: "1:22814098941:web:ef460ef814bc7114c68594"

})


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  return (
    <div className="App">
      <MenuSite></MenuSite>
    </div>
  );
}

export default App;
