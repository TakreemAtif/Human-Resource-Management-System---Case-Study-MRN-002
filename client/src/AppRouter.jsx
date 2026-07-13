import {Routes, Route} from 'react-router';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';

export default function AppRouter (){
    return(
        <Routes >
            <Route path="/" element={<HomeView />}/>
            <Route path="/login" element={<LoginView />}/>
            <Route path="/register" element={<RegisterView />}/>
        </Routes>
    )
} 