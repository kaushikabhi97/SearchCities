import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SearchTable from './SearchTable.jsx';
import "./PageStyle.css"


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SearchTable />
  </StrictMode>,
)
