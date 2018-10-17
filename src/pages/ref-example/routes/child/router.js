import React from 'react';
import { Route } from 'mirrorx';

// 导入节点

import {
    ConnectedRef
} from '../../container';

export default ({ match }) => (
    <div className="templates-route">

        {/*配置根路由记载节点*/}
        {<Route exact path={'/'} component={ConnectedRef} />}

        {/*配置节点路由*/}
        <Route exact path={`${match.url}refExample`} component={ConnectedRef} />

    </div>
)