import * as queries from './tasks.qry';
import * as mutations from './tasks.mut';
import * as prefetches from './tasks.pre';

export const tasksService = {
	qry: queries,
	mut: mutations,
	pre: prefetches
};
