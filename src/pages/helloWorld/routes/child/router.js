import React from 'react';
import { Route } from 'mirrorx';

// 导入节点

import {
    ConnectedHello
} from '../../container';

export default ({ match }) => (
    <div className="templates-route">

        {/*配置根路由记载节点*/}
        {<Route exact path={'/'} component={ConnectedHello} />}

        {/*配置节点路由*/}
        <Route exact path={`${match.url}/helloworld`} component={ConnectedHello} />

    </div>
)