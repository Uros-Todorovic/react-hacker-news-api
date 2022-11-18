import { SET_LOADING, SET_STORIES, REMOVE_STORY, HANDLE_PAGE, HANDLE_SEARCH } from './actions';

const reducer = (state, action) => {
	switch (action.type) {
		case SET_LOADING:
			return { ...state, isLoading: true };
			break;

		case SET_STORIES:
			return { ...state, isLoading: false, hits: action.payload.hits, nbPages: action.payload.nbPages };
			break;

		case REMOVE_STORY:
			return { ...state, hits: state.hits.filter((story) => action.payload.id !== story.objectID) };
			break;

		case HANDLE_SEARCH:
			return { ...state, query: action.payload.query, page: 0 };
			break;

		case HANDLE_PAGE:
			if (action.payload.value === 'inc') {
				let nextPage = state.page + 1;
				if (nextPage > state.nbPages - 1) {
					nextPage = 0;
				}
				return { ...state, page: nextPage };
			}
			if (action.payload.value === 'dec') {
				let prevPage = state.page - 1;
				if (prevPage < 0) {
					prevPage = state.nbPages - 1;
				}
				return { ...state, page: prevPage };
			}

			break;

		default:
			throw new Error(`no matching action ${action.type} action type`);
			break;
	}
};
export default reducer;
