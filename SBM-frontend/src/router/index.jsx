import { createBrowserRouter } from 'react-router-dom';

import App from '@/App';

import Dashboard from '@/pages/Dashboard/Dashboard';
import Alarms from '@/pages/Alarms/Alarms';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'alarms', element: <Alarms /> },
    ],
  },
]);

export default router;