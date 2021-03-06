/* eslint-disable @typescript-eslint/camelcase */
// Must be the first import



if (process.env.NODE_ENV === 'development') {
    // Must use require here as import statements are only allowed
    // to exist at the top of a file.
    require("preact/debug");

}

// const poly = require("preact-cli/lib/lib/webpack/polyfills");
import "notyf/notyf.min.css";

import { render, h, Component, ComponentChild, Fragment } from 'preact';

import ConnectedMap from "./components/map";
import ConnectedZigbeeTable from "./components/zigbee";
import Router, { CustomHistory, route } from 'preact-router';

// import ConnectedDiscovery from "./components/discovery";
// import ConnectedLogViewer from "./components/log-viewer";
// import ConnectedCodeEditor from "./components/code-editor";
import ConnectedDevicePage from "./components/device-page";
import store from "./store";
import { Provider } from "unistore/preact";
import { createHashHistory } from 'history';




import './mqtt';
import ConnectedSettingsPage from "./components/settings";
import NavBar from "./components/navbar";


class Main extends Component {
    settingsConfigured(): boolean {
        const { settings } = store.getState();
        return !!settings.mqtt_host;
    }
    handleRoute = (e): void => {

        switch (e.url) {
            case '/settings':
                break;
            default:
                if (!this.settingsConfigured()) {

                    route('/settings', true);
                }
                break;
        }
    };

    render(): ComponentChild {
        return (
            <Provider store={store}>
                <Fragment>
                    <NavBar />
                    <Router history={(createHashHistory() as unknown as CustomHistory)} onChange={this.handleRoute}>
                        <ConnectedZigbeeTable path="/" />
                        <ConnectedMap path="/map" />
                        <ConnectedDevicePage path="/device/:dev" />
                        <ConnectedSettingsPage path="/settings" />
                    </Router>
                </Fragment>

            </Provider>

        );
    }

}


render(<Main />, document.body);

// const DiscoveryApp: FunctionalComponent<{}> = () => (
//     <Provider store={store}><ConnectedDiscovery /></Provider>
// );
// const LogViewerApp: FunctionalComponent<{}> = () => (
//     <Provider store={store}><ConnectedLogViewer /></Provider>
// );
// const CodeEditorApp: FunctionalComponent<{}> = () => (
//     <Provider store={store}><ConnectedCodeEditor /></Provider>
// );

// const initWidgets = (): void => {
    // habitat(ZigbeeTableApp).render({
    //     selector: "[data-widget-host=\"zigbee\"]",
    //     clean: true
    // });

    // habitat(DevicePageApp).render({
    //     selector: "[data-widget-host=\"device-page\"]",
    //     clean: true
    // });

    // habitat(MapApp).render({
    //     selector: "[data-widget-host=\"map\"]",
    //     clean: true
    // });

    // habitat(DiscoveryApp).render({
    //     selector: "[data-widget-host=\"discovery\"]",
    //     clean: true
    // });
    // habitat(LogViewerApp).render({
    //     selector: "[data-widget-host=\"log-viewer\"]",
    //     clean: true
    // });

    // habitat(CodeEditorApp).render({
    //     selector: "[data-widget-host=\"code-editor\"]",
    //     clean: true
    // });


// };
// document.addEventListener("DOMContentLoaded", initWidgets);