import * as queries from './tasks.qry';
import * as mutations from './tasks.mut';
import * as prefetches from './tasks.pre';

const tasks = {
    qry: queries,
    mut: mutations,
    pre: prefetches
}

export default tasks;
