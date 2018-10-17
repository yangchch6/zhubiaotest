import React from 'react';
import { Route } from 'mirrorx';

// 导入节点

import {
    ConnectedFormValidate
} from '../../container';

export default ({ match }) => (
    <div className="templates-route">

        {/*配置根路由记载节点*/}
        {<Route exact path={'/'} component={ConnectedFormValidate} />}

        {/*配置节点路由*/}
        <Route exact path={`${match.url}form_validate`} component={ConnectedFormValidate} />

    </div>
)