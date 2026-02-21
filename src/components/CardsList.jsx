import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCardsError,
  selectCardsIds,
  selectCardsStatus,
} from "../features/cardsSlice";
import { fetchCards } from "../features/cardsApi";
import SingleCard from "./SingleCard";

function CardsList() {
  // get ids instead of all cards data
  const cardsIds = useSelector(selectCardsIds);
  const cardsStatus = useSelector(selectCardsStatus);
  const cardsError = useSelector(selectCardsError);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (cardsStatus === "idle") {
      dispatch(fetchCards());
    }
  }, [cardsStatus, dispatch]);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {cardsStatus === "loading" && (
        <h3 className="text-center text-xl font-medium text-(--color-text-muted) py-8">
          Loading cards...
        </h3>
      )}
      {cardsStatus === "failed" && (
        <h3 className="text-center text-xl font-medium text-red-500 py-8">
          Error: {cardsError.message}
        </h3>
      )}
      {cardsStatus === "succeeded" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardsIds?.length > 0 ? (
            cardsIds.map((id) => {
              console.log(id);
              return <SingleCard key={id} cardId={id} />;
            })
          ) : (
            <p className="col-span-full text-center p-12 text-(--color-text-faint) text-lg">
              No cards yet. Add one above!
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default CardsList;
