import { useState } from "react";

const RepoInfo = () => {
  const [gitSearch, setGitSearch] = useState("");
  const [repoList, setRepoList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getRepoNames(repoURL) {
    setIsLoading(true);
    try {
      const data = await fetch(repoURL);
      console.log(data);
      if (!data.ok) {
        // Check for non-200 status codes
        setError("Failed to fetch data");
      }
      const json = await data.json();
      setRepoList(json);
    } catch (error) {
      setError("Error fetching repos");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <h1>This is a User's Repo List Page</h1>
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
          const repoURL =
            "https://api.github.com/users/" + gitSearch + "/repos";
          getRepoNames(repoURL);
        }}
      >
        Display Repo List
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
                <th>Repo List</th>
                <th>Repo URL</th>
              </tr>
            </thead>
            <tbody>
              {repoList.map((repo) => (
                <tr key={repo?.id}>
                  <td>{repo?.name}</td>
                  <td>
                    <a
                      href={repo?.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {repo?.html_url}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2>No repos to display</h2>
        )}
      </div>
    </>
  );
};

export default RepoInfo;
