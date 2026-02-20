import React from "react";
import { useDispatch } from "react-redux";
import { deleteCard, setEditingId } from "../features/cardsSlice";

function SingleCard({ card }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const handleDelete = async () => {
    setLoading(true);
    try {
      await dispatch(deleteCard(card.id)).unwrap();
    } catch (error) {
      window.alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    dispatch(setEditingId(card.id));
  };

  return (
    <div className="card-container" style={{ backgroundColor: card.color }}>
      <div className="flex-1">
        <h3 className="text-xl font-bold mb-2 drop-shadow-sm">{card.title}</h3>
        <p className="text-sm opacity-95 leading-relaxed">{card.description}</p>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          className="btn-icon bg-white/90 text-gray-800 hover:bg-white"
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          className="btn-icon bg-red-500/90 text-white hover:bg-red-500"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? "Delete..." : "Delete"}
        </button>
      </div>
    </div>
  );
}

export default SingleCard;
