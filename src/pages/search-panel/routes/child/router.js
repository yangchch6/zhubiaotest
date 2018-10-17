import React from 'react';
import {Route} from 'mirrorx';

import {
    CtSearchPanel
} from '../../container';

export default ({match}) => (
    <div className="templates-route">
        <Route exact path={'/'} component={CtSearchPanel}/>
        <Route exact path={`${match.url}search-panel`} component={CtSearchPanel} />
    </div>
)