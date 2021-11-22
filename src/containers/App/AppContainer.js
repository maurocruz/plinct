import AppLayout from '../../components/AppLayout'

const AppContainer = ({ children, props }) => {
  return (
    <AppLayout>
      {children}
    </AppLayout>
  )
}

export default AppContainer
