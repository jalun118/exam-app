import {
  AddNewQuestion,
  UNSAFE_SetStateCreateQuestion,
} from "@/lib/features/dashboard/createQuetionSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import CardQuestion from "./card-question";

export default function ListQuestion() {
  const listQuestion = useAppSelector(
    (state) => state.create_question.questions,
  );
  const dispatch = useAppDispatch();

  function handleOnEndDrag(result: DropResult<string>) {
    if (!result.destination) return;
    const items = Array.from(listQuestion);
    const [reorderItem] = items.splice(result.source.index, 1);
    items.splice(result.destination?.index ?? 0, 0, reorderItem);

    dispatch(UNSAFE_SetStateCreateQuestion(items));
  }

  return (
    <div className="mt-4">
      <DragDropContext onDragEnd={(r) => handleOnEndDrag(r)}>
        <Droppable droppableId="question-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {listQuestion.map((data_quest, index) => (
                <Draggable
                  key={data_quest.id}
                  draggableId={data_quest.id}
                  index={index}
                >
                  {(provided) => (
                    <CardQuestion
                      data_question={data_quest}
                      index_question={index}
                      provided={provided}
                      key={data_quest.id}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="mt-6">
        <button
          onClick={() => dispatch(AddNewQuestion())}
          className="inline-flex w-full items-center justify-center rounded-lg border border-gray-400 bg-white px-3 py-3 text-gray-600 shadow-sm active:bg-gray-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <span>Add Question</span>
        </button>
      </div>
    </div>
  );
}
