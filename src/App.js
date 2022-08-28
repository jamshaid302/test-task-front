import './App.css';
import Error404 from './components/404';
import LoginForm from './components/user/login';
import SignupForm from "./components/user/signup";
import Dashboard from "./components/dashboard/dashboard";
import ProductTable from "./components/products/products";
import CategoryTable from "./components/categories/categories";
import AddProductForm from "./components/products/addproduct";
import ProductUpdateForm from "./components/products/updateproduct";
import CategoryUpdateForm from "./components/categories/updatecategory";
import AddCategory from "./components/categories/addcategory";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

function App() {
  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path='/'  element={<LoginForm />}></Route>
            <Route path='/signup'  element={<SignupForm />}></Route>
            <Route path='/dashboard'  element={<Dashboard />}></Route>
            <Route path='/products'  element={<ProductTable />}></Route>
            <Route path='/category'  element={<CategoryTable />}></Route>
            <Route path='/addproduct'  element={<AddProductForm />}></Route>
            <Route path='/addcategory'  element={<AddCategory />}></Route>
            <Route path='/updateproduct/:id'  element={<ProductUpdateForm />}></Route>
            <Route path='/updatecategory/:id'  element={<CategoryUpdateForm />}></Route>
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
