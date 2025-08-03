import Header from "./shared/components/Header";
import AppRoutes from "./shared/routes/AppRoutes";
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1">
        <AppRoutes />
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default App;