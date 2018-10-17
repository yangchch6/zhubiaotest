import mirror, { actions, connect } from "mirrorx";
import SearchPanelC from './components/SearchPanel'
import model from './model'

//注入Model
if(!(model.name in mirror.actions)){    mirror.model(model);};


export const CtSearchPanel = connect((state) => state.searchPanel)(SearchPanelC);
