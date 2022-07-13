import { FC } from "react";
import { capitalize } from "../helpers/stringFunctions";
import { Tag, TagType } from "../types";

type TagElementProps = {
  tag: Tag;
  deleteTag: Function;
  isRemovable: boolean;
};

const TagElement: FC<TagElementProps> = ({ tag, isRemovable, deleteTag }) => {
  return (
    <>
      <li
        className="group inline-flex justify-center items-center px-2 py-1 mr-4 bg-gray-100 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-full transition	"
        id={`${tag.name}-${tag.id}`}
      >
        <div data-cy="tagTitle">{capitalize(tag.name)}</div>
        {isRemovable && (
          <button
            data-cy="deleteTagButton"
            onClick={() => {
              deleteTag({
                id: tag.id,
                type: tag.type.split("-")[1] as TagType,
              });
            }}
            className="hidden group-hover:block pl-2 text-gray-500 hover:text-black"
          >
            ✕
          </button>
        )}
      </li>
    </>
  );
};

export default TagElement;
