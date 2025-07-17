import { createContext, useContext } from "react"
import useData from "../helpers/useData"
import urlcat from "urlcat"
// import { API_ROOT } from "../consts"

export const DEFAULT_ENDPOINT = urlcat(API_ROOT, "/contemporaries")

export const SetQueryContext = createContext();
export const LoadMoreContext = createContext();


export const RequestProvider = ({ children, endpoint = DEFAULT_ENDPOINT }) => {
  /*
   * this component handles requests for contemporaries data to the server,
   * and provides this information to the interface, as well as information
   * about the progress of the request
   */
  const { onLoadMore, onSubmitQuery } = useData(endpoint);

  return (
    <SetQueryContext.Provider value={onSubmitQuery}>
      <LoadMoreContext.Provider value={onLoadMore}>
        {children}
      </LoadMoreContext.Provider>
    </SetQueryContext.Provider>
  );
}


// define some hooks the rest of the app can use to access this information
export const useSetQuery = () => useContext(SetQueryContext);
export const useOnLoadMore = () => useContext(LoadMoreContext);

export default RequestProvider;