import axios from "axios";
import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import RecentPost from "../Component/RecentPost";

const Search = () => {
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  console.log(`Api ${API_BASE_URL}`);
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorised",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm") || "";
    const sortFromUrl = urlParams.get("sort") || "desc";
    const categoryFromUrl = urlParams.get("category") || "uncategorised";

    setSidebarData({
      searchTerm: searchTermFromUrl,
      sort: sortFromUrl,
      category: categoryFromUrl,
    });

    const fetchPosts = async () => {
      try {
        setLoading(true);
        const searchQuery = urlParams.toString();
        const res = await axios.get(
          `${API_BASE_URL}/post/getposts?${searchQuery}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser?.token}`,
            },
          }
        );
        setPosts(res.data.posts);
        setShowMore(res.data.posts.length === 9);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [location.search, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    navigate(`/search?${urlParams.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen ">
      {/* Sidebar */}
      <aside className="w-full md:w-80 p-4 border-r shadow-sm md:sticky md:top-0 md:h-screen overflow-y-auto">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="searchTerm"
              className="block text-sm font-medium mb-1"
            >
              Search Term:
            </label>
            <TextInput
              id="searchTerm"
              type="text"
              placeholder="Search..."
              value={sidebarData.searchTerm}
              onChange={(e) =>
                setSidebarData((prev) => ({
                  ...prev,
                  searchTerm: e.target.value,
                }))
              }
            />
          </div>

          <div>
            <label htmlFor="sort" className="block text-sm font-medium mb-1">
              Sort:
            </label>
            <Select
              id="sort"
              value={sidebarData.sort}
              onChange={(e) =>
                setSidebarData((prev) => ({
                  ...prev,
                  sort: e.target.value || "desc",
                }))
              }
            >
              <option value="desc">Oldest</option>
              <option value="asc">Latest</option>
            </Select>
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium mb-1"
            >
              Category:
            </label>
            <Select
              id="category"
              value={sidebarData.category}
              onChange={(e) =>
                setSidebarData((prev) => ({
                  ...prev,
                  category: e.target.value || "uncategorised",
                }))
              }
            >
              <option value="uncategorised">No selection</option>
              <option value="react">React.js</option>
              <option value="javascript">JavaScript</option>
              <option value="next">Next.js</option>
            </Select>
          </div>

          <Button type="submit" outline gradientDuoTone="purpleToPink">
            Apply Filters
          </Button>
        </form>
      </aside>

      {/* Results Section */}
      <main className="flex-1 p-4">
        <h1 className="text-2xl font-semibold mb-4">Post Results</h1>

        {loading ? (
          <p className="text-center text-sm">Loading...</p>
        ) : posts.length > 0 ? (
          <div className="flex flex-wrap gap-4 justify-center">
            {posts.map((post) => (
              <RecentPost key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No posts found.</p>
        )}
      </main>
    </div>
  );
};

export default Search;
