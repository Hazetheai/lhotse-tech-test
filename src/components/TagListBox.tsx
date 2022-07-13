import { FC, KeyboardEvent, useState } from "react";
import { Combobox } from "@headlessui/react";
import { TagType } from "../types";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  tags: Array<string>;
  tagType: TagType;
  handleKeyDown: (
    event: React.KeyboardEvent<HTMLInputElement>,
    type: TagType,
    name?: string
  ) => void;
}

const TagListBox: FC<Props> = ({ tags, tagType, handleKeyDown }) => {
  const [selectedPerson, setSelectedPerson] = useState("");
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? tags
      : tags.filter((person) => {
          return person.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox value={selectedPerson} onChange={setSelectedPerson}>
      <Combobox.Input
        data-cy="restricted-input"
        autoFocus
        autoComplete="false"
        className={"outline-none"}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (
            tags.find(
              (tag) => tag.toLowerCase() === e.currentTarget.value.toLowerCase()
            )
          ) {
            handleKeyDown(e, tagType);
          }
        }}
      />
      <Combobox.Options
        className={
          "absolute top-8 z-10 mt-1 bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
        }
      >
        {filteredOptions.map((tag) => (
          <Combobox.Option
            className={({ active }) =>
              classNames(
                active ? "text-white bg-indigo-600" : "text-gray-900",
                "cursor-default select-none relative py-2 pl-3 pr-5"
              )
            }
            key={tag}
            value={tag}
          >
            {({ active, selected }) => (
              <div
                className={`${
                  active ? "bg-blue-500 text-white" : "bg-white text-black"
                }`}
                data-cy="restricted-input-option"
                onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                  if (active) {
                    e.preventDefault();
                    // @ts-ignore
                    handleKeyDown(e, tagType, tag);
                  }
                }}
              >
                {tag}
              </div>
            )}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
};

export default TagListBox;
