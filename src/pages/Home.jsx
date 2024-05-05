import { useNavigate } from "react-router-dom";
import { getPost, logout } from "../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Post from "../component/post";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(getPost(token, setPosts, page));
    console.log("posts", posts);
  }, [page]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(logout(navigate));
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div className="min-w-screen min-h-screen bg-gray-900 flex flex-col items-center justify-center px-5 py-5 relative">
      <button
        onClick={handleSubmit}
        className="fixed top-2 right-2 block bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-4 py-2 font-semibold"
      >
        Log Out
      </button>

      <div className="mt-12 flex flex-col items-center justify-center gap-6">
        {posts.length > 0 &&
          posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
      </div>

      <div className="mt-4 flex justify-center items-center">
        {page > 0 && (
          <button
            onClick={handlePrevPage}
            className="mr-4 t text-3xl ext-blue-500 hover:text-blue-700 font-bold text-xl"
          >
            <FaArrowLeft/>
          </button>
        )}
        <span className="text-xl font-bold text-white">{page + 1}</span>
        <button
          onClick={handleNextPage}
          className="ml-4 text-blue-500 hover:text-blue-700 font-bold text-xl"
        >
          <FaArrowRight/>
        </button>
      </div>
    </div>
  );
}

export default Home;
