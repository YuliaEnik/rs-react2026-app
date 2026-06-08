import { FormUseHook } from './Components/Forms/formUseHook';
import './App.css';
import { FormUnControl } from './Components/Forms/formUnControl';
import { CardList } from './Components/CardList/cardList';

function App() {
  return (
    <>
      <FormUnControl />
      <FormUseHook />;
      <CardList />
    </>
  );
}

export default App;
