import InputTextArea from "@/components/admin/InputTextArea";
import {
  AddNewOption,
  DeleteOption,
  DeleteQuestion,
  EditOption,
  EditQuestion,
  iQuestion,
  UNSAFE_SetStateCreateQuestionOption,
} from "@/lib/features/dashboard/createQuetionSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";

const TEXT_ALFABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function GetTextAlfa(index: number): string {
  return TEXT_ALFABET.charAt(index);
}

export default function CardQuestion({
  provided,
  data_question,
  index_question,
}: {
  index_question: number;
  provided: DraggableProvided;
  data_question: iQuestion;
}) {
  const dispatch = useAppDispatch();

  function handleOnEndDragOption(result: DropResult<string>) {
    if (!result.destination) return;
    const items = Array.from(data_question.options);
    const [reorderItem] = items.splice(result.source.index, 1);
    items.splice(result.destination?.index ?? 0, 0, reorderItem);

    dispatch(
      UNSAFE_SetStateCreateQuestionOption({
        options: items,
        question_pos: index_question,
      }),
    );
  }

  return (
    <div
      ref={provided.innerRef}
      key={data_question.id}
      id={data_question.id}
      {...provided.draggableProps}
      className="relative mt-2 w-full rounded-xl border border-gray-400 bg-white px-4 pb-4 shadow-sm md:px-5 md:pb-5 md:pt-1"
    >
      <div className="mb-2 flex items-center justify-center">
        <span className="text-gray-400" {...provided.dragHandleProps}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 9h16.5m-16.5 6.75h16.5"
            />
          </svg>
        </span>
      </div>
      <div className="flex w-full">
        <span className="mr-2 text-lg">{index_question + 1}.</span>
        <div className="relative w-full break-words">
          <InputTextArea
            title="title for question"
            value={data_question.question}
            name={"question-" + (index_question + 1)}
            onTyping={(v) =>
              dispatch(
                EditQuestion({
                  pos_question: index_question,
                  replace_value: v,
                }),
              )
            }
            className="m-0 block h-[calc(1.75rem+0.5rem+2px)] w-full resize-none whitespace-normal text-wrap border-b-2 border-x-transparent border-b-gray-400 border-t-transparent bg-transparent p-0 pb-2 text-lg text-gray-800 outline-none focus:border-blue-500 focus:border-x-transparent focus:border-b-blue-500 focus:border-t-transparent focus:ring-0 disabled:pointer-events-none disabled:opacity-50 dark:border-b-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:border-b-neutral-600 dark:focus:ring-neutral-600"
          ></InputTextArea>
        </div>
      </div>
      <DragDropContext onDragEnd={(r) => handleOnEndDragOption(r)}>
        <Droppable droppableId={"question-list-" + data_question.id}>
          {(provided) => (
            <div
              className="ml-2.5 mt-3"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {data_question.options.map((data, index_option) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id}
                  index={index_option}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      id={data.id}
                      className="mb-3 mt-1 flex w-full items-start"
                      {...provided.draggableProps}
                    >
                      <div
                        className="mr-2 flex select-none items-center text-base"
                        {...provided.dragHandleProps}
                      >
                        <span className="mr-1.5 flex">
                          <svg
                            className="ms-auto size-4 shrink-0 text-gray-500 dark:text-neutral-500"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="9" cy="12" r="1"></circle>
                            <circle cx="9" cy="5" r="1"></circle>
                            <circle cx="9" cy="19" r="1"></circle>
                            <circle cx="15" cy="12" r="1"></circle>
                            <circle cx="15" cy="5" r="1"></circle>
                            <circle cx="15" cy="19" r="1"></circle>
                          </svg>
                        </span>
                        <span className="flex">
                          {GetTextAlfa(index_option)}.
                        </span>
                      </div>
                      <div className="relative w-full break-words">
                        <InputTextArea
                          title="title for question"
                          value={data.option}
                          name={"option-" + GetTextAlfa(index_option)}
                          onTyping={(v) =>
                            dispatch(
                              EditOption({
                                pos_option: index_option,
                                pos_question: index_question,
                                replace_value: v,
                              }),
                            )
                          }
                          className="m-0 block h-[calc(1.5rem+0.25rem+2px)] w-full resize-none whitespace-normal text-wrap border-b-2 border-x-transparent border-b-gray-400 border-t-transparent bg-transparent p-0 pb-1 text-base text-gray-800 outline-none focus:border-blue-500 focus:border-x-transparent focus:border-b-blue-500 focus:border-t-transparent focus:ring-0 disabled:pointer-events-none disabled:opacity-50 dark:border-b-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:border-b-neutral-600 dark:focus:ring-neutral-600"
                        ></InputTextArea>
                      </div>
                      <button
                        onClick={() =>
                          dispatch(
                            DeleteOption({
                              pos_option: index_option,
                              pos_question: index_question,
                            }),
                          )
                        }
                        className="ml-2 flex items-center justify-center rounded-md p-1 text-red-600 hover:bg-gray-100"
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
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() =>
            dispatch(AddNewOption({ pos_question: index_question }))
          }
          className="flex items-center rounded-md px-2 py-1 text-blue-500 active:bg-gray-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="mr-2 size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <span>Add Option</span>
        </button>
        <Menu
          as="div"
          className="absolute bottom-4 right-3 inline-block text-left"
        >
          <div>
            <MenuButton className="flex aspect-square items-center justify-center rounded-full bg-white p-1 ring-0 ring-gray-100 transition duration-75 ease-in-out active:bg-gray-100 active:ring-4">
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
                  d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                />
              </svg>
            </MenuButton>
          </div>

          <MenuItems
            transition
            anchor="top end"
            className="absolute z-10 w-40 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="py-1">
              <MenuItem>
                <button
                  onClick={() =>
                    dispatch(DeleteQuestion({ pos_question: index_question }))
                  }
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                >
                  Delete
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}
