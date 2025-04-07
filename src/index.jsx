import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/app';
import './styles.css';
import { Provider } from 'react-redux';
import store from '@services/store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
	<StrictMode>
		<DndProvider backend={HTML5Backend}>
			<Provider store={store}>
				<App />
			</Provider>
		</DndProvider>
	</StrictMode>
);
