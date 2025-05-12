import "clsx";
function useQuery(client, query, options) {
  let results = void 0;
  let fetching = true;
  let fetchingLocal = true;
  let fetchingRemote = false;
  let error = void 0;
  return {
    get fetching() {
      return fetching;
    },
    get fetchingLocal() {
      return fetchingLocal;
    },
    get fetchingRemote() {
      return fetchingRemote;
    },
    get results() {
      return results;
    },
    get error() {
      return error;
    }
  };
}
export {
  useQuery as u
};
