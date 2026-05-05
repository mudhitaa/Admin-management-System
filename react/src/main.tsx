/* (document.getElementById('root')!).innerHTML = "hello world"; */

import { createRoot } from "react-dom/client";
import './assets/css/global.css'
import RouterConfig from "./router/Router";
import AuthProvider from "./context/provider/AuthProvider";
import { Toaster } from "sonner";
import {Provider} from "react-redux"
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./config/store";
import store from "./config/store";


/* comp name ->capital letter compulsory return */



createRoot(document.getElementById('root')!).render(
    <>
    
    <AuthProvider>
        <Provider store ={store}>
            <PersistGate loading ={null} persistor={persistor}>
                <Toaster richColors/>
                <RouterConfig/>
            </PersistGate>
        </Provider>
    </AuthProvider>
    </>
    
)