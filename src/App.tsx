import { useState } from 'react';
import { CardList } from './Components/CardList/cardList';
import { FormUnControl } from './Components/Forms/formUnControl';
import { FormUseHook } from './Components/Forms/formUseHook';
import { Portal } from './Components/Portal/portal';
import './App.scss';

function App() {
  const [isHookModalOpen, setIsHookModalOpen] = useState(false);
  const [isUncontrolledModalOpen, setIsUncontrolledModalOpen] = useState(false);

  return (
    <div className="wrapper">
      <div className="wrapper_content">
        <div className="nav">
          <button className="nav-btn" onClick={() => setIsHookModalOpen(true)}>
            UseHookForm
          </button>
          <button
            className="nav-btn"
            onClick={() => setIsUncontrolledModalOpen(true)}
          >
            UnControlledForm
          </button>
        </div>
        <Portal
          isOpen={isHookModalOpen}
          onClose={() => setIsHookModalOpen(false)}
          title="Controlled Form (React Hook Form)"
        >
          <FormUseHook onSuccess={() => setIsHookModalOpen(false)} />
        </Portal>

        <Portal
          isOpen={isUncontrolledModalOpen}
          onClose={() => setIsUncontrolledModalOpen(false)}
          title="Uncontrolled Form (useRef)"
        >
          <FormUnControl onSuccess={() => setIsUncontrolledModalOpen(false)} />
        </Portal>

        <CardList />
      </div>
    </div>
  );
}

export default App;
