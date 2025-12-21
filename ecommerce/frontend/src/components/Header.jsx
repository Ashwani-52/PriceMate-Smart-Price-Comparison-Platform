import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, LayoutDashboard, Package, Sparkles } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const Header = () => {
    const { user } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(logout());
    };

    const [searchTerm, setSearchTerm] = React.useState('');
    const navigate = useNavigate();
    const [showDepartments, setShowDepartments] = React.useState(false);
    const [showAccountMenu, setShowAccountMenu] = React.useState(false);
    const accountTimeoutRef = React.useRef(null);
    const departmentTimeoutRef = React.useRef(null);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/products?search=${searchTerm}`);
        }
    };

    const handleDepartmentEnter = () => {
        if (departmentTimeoutRef.current) clearTimeout(departmentTimeoutRef.current);
        setShowDepartments(true);
    };

    const handleDepartmentLeave = () => {
        departmentTimeoutRef.current = setTimeout(() => setShowDepartments(false), 200);
    };

    const handleAccountEnter = () => {
        if (accountTimeoutRef.current) clearTimeout(accountTimeoutRef.current);
        setShowAccountMenu(true);
    };

    const handleAccountLeave = () => {
        accountTimeoutRef.current = setTimeout(() => setShowAccountMenu(false), 300);
    };

    return (
        <header className="sticky top-0 z-50 glass border-b border-white/20 shadow-lg">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between gap-8">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition"></div>
                            <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-2.5 rounded-xl">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="text-2xl font-bold gradient-text">PriceMate</span>
                            <span className="text-xs text-gray-500 font-medium">Smart Price Comparison</span>
                        </div>
                    </Link>

                    <div className="flex-1 max-w-2xl">
                        <form onSubmit={handleSearch} className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition"></div>
                            <div className="relative flex items-center bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 group-hover:border-blue-300 transition">
                                <input
                                    type="text"
                                    placeholder="Search products, categories, brands..."
                                    className="flex-1 py-3 px-6 text-gray-900 focus:outline-none bg-transparent"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button type="submit" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 hover:from-blue-700 hover:to-indigo-700 transition flex items-center justify-center">
                                    <Search className="w-5 h-5" />
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="flex items-center gap-4">
                        <div
                            className="relative group"
                            onMouseEnter={handleDepartmentEnter}
                            onMouseLeave={handleDepartmentLeave}
                        >
                            <button className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl hover:bg-blue-50 transition">
                                <Menu className="w-5 h-5 text-gray-700" />
                                <span className="text-xs font-medium text-gray-600">Menu</span>
                            </button>

                            {showDepartments && (
                                <div className="absolute top-full left-0 mt-2 w-64 glass rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
                                    <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                                        <h3 className="font-bold text-sm">All Departments</h3>
                                    </div>
                                    <ul className="py-2">
                                        {['Electronics', 'Office Supplies', 'Furniture', 'IT Peripherals', 'Appliances'].map(cat => (
                                            <li key={cat}>
                                                <Link to={`/products?category=${cat}`} className="block px-4 py-2.5 hover:bg-blue-50 hover:text-blue-600 text-sm font-medium transition">
                                                    {cat}
                                                </Link>
                                            </li>
                                        ))}
                                        <li className="border-t mt-2 pt-2">
                                            <Link to="/products" className="block px-4 py-2 font-bold text-blue-600 hover:underline text-sm">
                                                View All →
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        {user && user.role === 'admin' && (
                            <Link to="/admin/dashboard" className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl hover:bg-indigo-50 transition group">
                                <LayoutDashboard className="w-5 h-5 text-indigo-600" />
                                <span className="text-xs font-medium text-indigo-600">Admin</span>
                            </Link>
                        )}

                        {user ? (
                            <div 
                                className="relative"
                                onMouseEnter={handleAccountEnter}
                                onMouseLeave={handleAccountLeave}
                            >
                                <button className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl hover:bg-blue-50 transition">
                                    <User className="w-5 h-5 text-gray-700" />
                                    <span className="text-xs font-medium text-gray-600">Account</span>
                                </button>

                                {showAccountMenu && (
                                    <div className="absolute top-full right-0 mt-2 w-56 glass rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
                                        <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                                            <p className="font-bold text-sm">Hi, {user.name}</p>
                                            <p className="text-xs opacity-90 truncate">{user.email}</p>
                                        </div>
                                        <ul className="py-2">
                                            <li>
                                                <Link to="/profile" className="block px-4 py-2.5 hover:bg-blue-50 hover:text-blue-600 text-sm font-medium transition">
                                                    My Profile
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/my-orders" className="flex items-center px-4 py-2.5 hover:bg-blue-50 hover:text-blue-600 text-sm font-medium transition">
                                                    <Package className="w-4 h-4 mr-2" />
                                                    My Orders
                                                </Link>
                                            </li>
                                            <li className="border-t mt-2 pt-2">
                                                <button onClick={onLogout} className="w-full text-left px-4 py-2.5 hover:bg-red-50 text-red-600 font-medium text-sm transition">
                                                    Sign Out
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link to="/login" className="px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded-xl transition">
                                    Sign In
                                </Link>
                                <Link to="/register" className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition">
                                    Join Free
                                </Link>
                            </div>
                        )}

                        <Link to="/cart" className="relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl hover:bg-emerald-50 transition group">
                            <ShoppingCart className="w-5 h-5 text-gray-700 group-hover:text-emerald-600" />
                            <span className="text-xs font-medium text-gray-600 group-hover:text-emerald-600">Cart</span>
                            {cartItems.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg animate-pulse">
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white">
                <div className="container mx-auto px-6 py-3">
                    <div className="flex items-center gap-8 text-sm font-medium">
                        <Link to="/products" className="flex items-center gap-2 hover:text-blue-200 transition">
                            <Menu className="w-4 h-4" /> All Products
                        </Link>
                        <span className="text-blue-200">|</span>
                        <Link to="/products?category=Electronics" className="hover:text-blue-200 transition">Electronics</Link>
                        <Link to="/products?category=Office" className="hover:text-blue-200 transition">Office</Link>
                        <Link to="/products?category=Furniture" className="hover:text-blue-200 transition">Furniture</Link>
                        <Link to="/products?category=IT Peripherals" className="hover:text-blue-200 transition">IT & Tech</Link>
                        <Link to="/products?category=Appliances" className="hover:text-blue-200 transition">Appliances</Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
