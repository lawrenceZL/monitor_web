import React from 'react'

import {Route} from 'react-router-dom'

import Monitor from './monitor';


class Page extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div >
                <Route path="/view/:qrcode" component={Monitor}/>
            </div>
        );
    }
}

export default Page;