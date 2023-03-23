import React from 'react'
import { createRoot } from 'react-dom/client'
import 'antd/dist/reset.css';
import './styles/index.css'

import { RouterProvider,router } from "@/router"

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
