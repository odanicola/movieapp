import React, {Component} from 'react';
import { Provider } from 'react-redux';
import App from '../App';
import NavigationService from '../utils/navigationservice';
import store from '../store';

class Setup extends Component {
    render() {
        return (
            <Provider store={store}>
                <App ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                }}/>
            </Provider>
        );
    }
}

export default Setup;
