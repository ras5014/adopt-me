import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // React router
import { Link } from "react-router-dom"; // No Page refresh (Using "<a></a>" refreshes the page)
import { QueryClient, QueryClientProvider } from "react-query"; // We use this to have a cache memory (Use this instead of useEffect or custom hook)
import SearchParams from "./components/SearchParams"; // We use React query to load pages faster because stores results in cache
import Details from "./components/Details";

const App = () => {
  // React Query Setup
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        catchTime: Infinity,
      },
    },
  });
  // React Query Setup End

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>

        <Routes>
          <Route path="/details/:id" element={<Details />}></Route>
          <Route path="/" element={<SearchParams />}></Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;

/*
StaleTime is a duration (in milliseconds) which indicates how long the fetched data is considered fresh. 
During this time, React Query will not refetch the data when a component remounts or re-renders. 
It's a way to optimize performance and reduce unnecessary network requests.

staleTime: Infinity: By setting staleTime to Infinity, you are telling React Query that the fetched data should never be considered stale. 
This means that once data is fetched, React Query will not automatically refetch it, 
regardless of how many times the component re-renders or remounts. 
This can be beneficial for data that doesn't change often or where you want to manage refetching manually.

CacheTime is the duration (in milliseconds) that inactive query data is kept in the cache. 
When a query is not actively used by any component (i.e., it becomes inactive), React Query starts a timer equal to cacheTime. 
After this time elapses, the query data is garbage collected and removed from the cache.

cacheTime: Infinity: Setting cacheTime to Infinity means that the query data will never be automatically removed from the cache. 
This is useful if you want the data to persist throughout the user's session, even if it's not actively being used. However, 
this approach can lead to higher memory usage, especially if you are caching a large amount of data or a large number of queries.
*/

/*
React Query doesn't require you to use async/await directly in your components when fetching data because it internally manages asynchronous 
operations for you. This is part of its design to simplify data fetching and state management in React applications.
*/
