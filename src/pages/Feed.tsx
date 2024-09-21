import { useState, useEffect } from "react";
import BackgroundGradient from "@/components/ui/backgroundGradient";
import { Loader } from "@/components/ui/Loader";
import CreatePost from "@/components/blocks/CreatePost";
import SortButtons from "@/components/blocks/posts/SortButtons";
import usePosts from "@/hooks/usePosts";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/features/user/userSlice";
import PostsList from "@/components/blocks/posts/PostsList";

function Posts() {
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<string>("recent");
  const [prevScrollY, setPrevScrollY] = useState<number>(0);

  const { posts, isLoading, error, hasNextPage } = usePosts({ sort, page });

  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Infinite scroll logic
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
          document.documentElement.scrollHeight &&
        hasNextPage &&
        !isLoading
      ) {
        setPrevScrollY(window.scrollY);
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isLoading]);

  // Restore scroll position
  useEffect(() => {
    if (!isLoading && prevScrollY > 0 && page > 1) {
      window.scrollTo(0, prevScrollY);
    }
  }, [isLoading, prevScrollY, page]);

  // Handlers for sorting
  const handleSortRecent = () => {
    setSort("recent");
    setPage(1);
    window.scrollTo(0, 0);
  };

  const handleSortVoted = () => {
    setSort("voted");
    setPage(1);
    window.scrollTo(0, 0);
  };

  return (
    <div className="mx-auto pt-24 p-4 max-w-screen-2xl dark:backdrop-blur-3xl min-h-screen overflow-hidden">
      <BackgroundGradient />
      <div className="flex flex-col items-center md:grid md:grid-cols-5 gap-4">
        {/* Create Post and Sort Buttons */}
        <div className="col-span-1 flex flex-col gap-8 self-start">
          {isAuthenticated && <CreatePost />}
          <SortButtons
            sort={sort}
            onSortRecent={handleSortRecent}
            onSortVoted={handleSortVoted}
          />
        </div>
        {/* Post Cards */}
        <div className="md:col-span-4">
          {isLoading && page === 1 ? (
            <Loader message="Fetching posts..." />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="grid gap-4 max-h-[90vh] overflow-scroll">
              <PostsList posts={posts} />
              {isLoading && page > 1 && (
                <Loader message="Loading more posts..." />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Posts;
