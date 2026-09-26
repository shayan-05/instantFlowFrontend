import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import store from './store/store.js'
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import Protected from './components/AuthLayout.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import UserPage from './pages/UserPage.jsx'
import RecentUserPage from './pages/RecentUserPage.jsx'
import AllUserPage from './pages/AllUserPage.jsx'
import Home from './pages/Home.jsx'


const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/login",
        element:(
          <Protected authentication={false}>
            <LoginPage/>
          </Protected>
        )
      },
      {
        path:"/signup",
        element:(
          <Protected authentication={false}>
            <SignupPage/>
          </Protected>
        )
      },
      {
        path:"/all-user",
        element:(
          <Protected authentication={true}>
            <AllUserPage/>
          </Protected>
        ),
        
      },
      {
        path:"/recent-user",
        element:(
          <Protected authentication={true}>
            <RecentUserPage/>
          </Protected>
        ),
        
      },
      {
        path: "/:username",
        element: (
            <Protected authentication={true}>
                <UserPage />
            </Protected>
        )
      }
      
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>

    </Provider>
  </React.StrictMode>,
)
