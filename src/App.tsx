import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  HomePage,
  PostsPage,
  PostPage,
  EditPostPage,
  AddPostPage,
} from './pages/index';

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/posts" element={<PostsPage />} />
      <Route path="/add-post" element={<AddPostPage />} />
      <Route path="/edit/post/:id" element={<EditPostPage />} />
      <Route path="/post/:id" element={<PostPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
