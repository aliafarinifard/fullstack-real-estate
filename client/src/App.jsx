import React, { Suspense, useState } from 'react';

// CSS Styles
import "./App.scss";

// React Router
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// React Query
import { QueryClient, QueryClientProvider } from 'react-query';

// Toastify
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

// ReactQueryDevTools
import { ReactQueryDevtools } from 'react-query/devtools'

// Components
import Website from './pages/Website';
import Layout from './components/Layout/Layout';
import Properties from './pages/Properties/Properties';
import Property from './pages/Property/Property';
import Bookings from './pages/Bookings/Bookings';
import Favourites from './pages/Favourites/Favourites';

// User DS Context
import UserDetailContext from './context/UserDetailContext';

const App = () => {

    const queryClient = new QueryClient();

    const [userDetails, setUserDetails] = useState({
        favourites: [],
        bookings: [],
        token: null
    });

    return (
        <div>
            <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Routes>
                                <Route element={<Layout />}>
                                    <Route path='/' element={<Website />} />

                                    {/* Properties Route */}
                                    <Route path='/properties'>
                                        <Route index element={<Properties />} />
                                        <Route path=':propertyId' element={<Property />} />
                                    </Route>
                                    
                                    {/* Bookings Route */}
                                    <Route path='/bookings' element={<Bookings />} />

                                    {/* Favourites Route */}
                                    <Route path='/favourites' element={<Favourites />} />
                                </Route>
                            </Routes>
                        </Suspense>
                    </BrowserRouter>
                    <ToastContainer />
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </UserDetailContext.Provider>
        </div>
    );
};

export default App;