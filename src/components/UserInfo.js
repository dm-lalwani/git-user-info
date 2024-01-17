import { useState } from "react";

const UserInfo = () => {
  const [gitSearch, setGitSearch] = useState("");
  const [repoList, setRepoList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getUserInfo(userURL) {
    setIsLoading(true);
    try {
      const data = await fetch(userURL);
      if (!data.ok) {
        // Check for non-200 status codes
        setError("Failed to fetch data");
      }
      const json = await data.json();
      setRepoList(json);
      console.log(repoList);
    } catch (error) {
      setError("Error fetching data");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <h1>This is a User Info Page</h1>
      <input
        type="text"
        placeholder="Enter Username"
        value={gitSearch}
        onChange={(e) => {
          setGitSearch(e.target.value);
        }}
      />
      <button
        onClick={() => {
          const userURL = "https://api.github.com/users/" + gitSearch;
          getUserInfo(userURL);
        }}
      >
        Display User Info
      </button>
      <div className="repo-list">
        {isLoading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : repoList ? (
          <table border={1}>
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(repoList).map(([key, value], index) => (
                <tr key={index}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2>No data to display</h2>
        )}
      </div>
    </>
  );
};

export default UserInfo;
