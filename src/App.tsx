import './styles/main.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Password } from './components/organisms/AccountSettings/Password';
import { PersonalInformation } from './components/organisms/AccountSettings/PersonalInformation';
import { AuthRoute } from './components/organisms/AuthRoute/AuthRoute';
import { NonAuthRoute } from './components/organisms/AuthRoute/NonAuthRoute';
import { LoginPage } from './pages/Auth/LoginPage';
import { RegisterPage } from './pages/Auth/RegisterPage';
import {
  HomePage,
  PostsPage,
  PostPage,
  EditPostPage,
  AddPostPage,
  AccountsSettingsPage,
} from './pages/index';

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<AuthRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<PostsPage />}>
          <Route path=":modal/:id" element={<PostsPage />} />
        </Route>
        <Route path="/add-post" element={<AddPostPage />} />
        <Route path="/edit/post/*" element={<EditPostPage />}>
          <Route path=":id" element={<EditPostPage />} />
          <Route path=":modal/:id" element={<EditPostPage />} />
        </Route>
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/post/preview" element={<PostPage />} />
        <Route element={<AccountsSettingsPage />}>
          <Route path="/account/settings" element={<PersonalInformation />} />
          <Route path="/account/password" element={<Password />} />
        </Route>
      </Route>

      <Route element={<NonAuthRoute />}>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
