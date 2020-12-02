import { Store, Dispatch } from 'redux';
import { isInfoAlertThreeLoaded, loadInfoAlertThree, LoadActions, LoadActionsAction } from '../../redux/modules/infoAlertThree';

async function preloadData(store: Store, dispatch: Dispatch): Promise<void> {
	const infoLoaded = isInfoAlertThreeLoaded(store.getState().infoAlertThree);
	if (!infoLoaded) {
		await store.dispatch<any>(loadInfoAlertThree());
	}
}

export { preloadData };
