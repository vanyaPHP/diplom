import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import IndexPage from "./pages/IndexPage";
import ProfilePage from "./pages/ProfilePage";
import {UserContextProvider} from "./UserContext";
import Logout from "./pages/Logout";
import ProductDetails from "./components/Product/ProductDetails";
import {useEffect} from "react";
import ProductDelete from "./components/Product/ProductDelete";
import ChatsIndexPage from "./pages/ChatsIndexPage";
import DealDetails from "./components/Profile/Deals/DealDetails";

function App() {
    useEffect(() => {

    }, []);

  return (
      <UserContextProvider>
          <Routes>
              <Route index path="/" element={<IndexPage />} />
              <Route path="/categories/:category_id" element={<IndexPage />} />
              <Route path="/products/delete/:id" element={<ProductDelete />}/>
              <Route path="/product-details/:id" element={<ProductDetails />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile/:subpage?/:action?/:name?" element={<ProfilePage />} />
              <Route path="/chats/:id?" element={<ChatsIndexPage />}/>
          </Routes>
      </UserContextProvider>
  );
}

export default App;
