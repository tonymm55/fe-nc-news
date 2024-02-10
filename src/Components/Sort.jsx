import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Sort({ sort, setSort, order, setOrder }) {
  const navigate = useNavigate();

  const handleSort = (event) => {
    setSort(event.target.value);
  };
  const handleOrder = (event) => {
    setOrder(event.target.value);
  };

  useEffect(() => {
    if (order === "" && sort !== "") navigate(`?sort_by=${sort}`);
    else if (order !== "" && sort === "") navigate(`?order=${order}`);
    else if (order !== "" && sort !== "")
      navigate(`?sort_by=${sort}&order=${order}`);
  }, [sort, order, navigate]); //navigate?

  return (
    <div className="sortArticles">
      <p>
        Sort by
        <span>
          <select name="sort" onChange={handleSort}>
            <option value="created_at">Date</option>
            <option value="comment_count">Comments</option>
            <option value="votes">Votes</option>
          </select>
        </span>
      </p>
      <p>
        Order by
        <span>
          <select name="order" onChange={handleOrder}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </span>
      </p>
    </div>
  );
}
