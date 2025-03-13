import { RouterProvider } from 'react-router-dom';

import router from './router/AppRoutes';

const App = () => (
  <RouterProvider router={router} />
);

export default App;
