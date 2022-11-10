import BasicTable from './components/BasicTable'
import { StyledEngineProvider } from '@mui/material/styles'
import ModalWindow from './components/ModalWindow'

function App(): JSX.Element {
  return (
    <div className="App">
      <StyledEngineProvider injectFirst>
        <BasicTable />
        <ModalWindow />
      </StyledEngineProvider>
    </div>
  )
}

export default App
