import React, { PropTypes } from 'react';
import { Header } from '../src/containers';


export default class App extends React.Component {
    static propTypes = {
        children: PropTypes.any.isRequired  
    };

    static getPath() {
        return '/';
    }
    
    render() {
        return (
            <div>
                <Header />
                { this.props.children }
            </div>
        );
    }
}
