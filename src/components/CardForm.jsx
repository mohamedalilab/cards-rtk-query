import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelEdit,
  selectEditingId,
  selectCardById,
} from "../features/cardsSlice";
import { addNewCard, updateCard } from "../features/cardsApi";
import { COLORS } from "../constants/colors";

const CardForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  // get selected card id
  const editingId = useSelector(selectEditingId);
  // get card by its id
  const editingCard = useSelector((state) =>
    editingId ? selectCardById(state, editingId) : null
  );
  // form data state
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    color: COLORS[0],
  });

  // handle form data change
  function handleFormData(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  // handle rest form data
  function resetFormData() {
    setFormData({ title: "", description: "", color: COLORS[0] });
  }

  React.useEffect(() => {
    if (editingCard) {
      const { id, ...data } = editingCard;
      setFormData(data);
    } else {
      resetFormData();
    }
  }, [editingCard]);

  // handle cancel editing mode & reset form data
  const handleCancel = () => {
    // set id to null
    dispatch(cancelEdit());
    // reset form values
    resetFormData();
  };

  // handle submit form & add new card request
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const trimmedTitle = formData?.title.trim();
      // check if there is title
      if (!trimmedTitle) {
        alert("title is required");
        return;
      }
      // if editing id is true then update card, else add new card
      if (editingId) {
        await dispatch(
          updateCard({ id: editingId, trimmedTitle, ...formData })
        ).unwrap();
      } else {
        await dispatch(addNewCard({ trimmedTitle, ...formData })).unwrap();
      }
    } catch (err) {
      console.log(err);
      window.alert(err.message);
    } finally {
      handleCancel();
      setLoading(false);
    }
  }

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4 text-(--color-text-main)">
        {editingId ? "Edit Card" : "Add New Card"}
      </h2>

      <input
        type="text"
        name="title"
        value={formData?.title}
        onChange={handleFormData}
        className="form-input"
        placeholder="Card title"
      />

      <textarea
        name="description"
        value={formData?.description}
        onChange={handleFormData}
        className="form-input resize-y"
        placeholder="Description"
        rows="3"
      />

      <div className="mb-4">
        <span className="block mb-2 text-sm text-(--color-text-muted)">
          Choose color:
        </span>
        <div className="flex gap-2 flex-wrap">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              name="color"
              value={c}
              className={`w-8 h-8 rounded-full border-2 cursor-pointer hover:scale-110 transition-transform ${
                formData?.color === c
                  ? "border-(--color-border-active) scale-110 shadow-sm"
                  : "border-transparent"
              }`}
              style={{ backgroundColor: c }}
              onClick={handleFormData}
              aria-label={`Select color ${c}`}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button type="submit" className="btn-primary" disabled={loading}>
          {editingId ? "Update" : "Add"} Card {loading && "..."}
        </button>
        {editingId && (
          <button
            type="button"
            className="btn-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default CardForm;
