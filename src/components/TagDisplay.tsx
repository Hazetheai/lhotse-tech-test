import { FC, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import updateSupplier from "../helpers/updateSupplier";
import useKeyPress from "../hooks/useKeyPress";
import { Supplier, TagType } from "../types";
import TagElement from "./TagElement";
import TagListBox from "./TagListBox";

interface Props {
  supplier?: Supplier;
}

const suggestedTagsPortfolio = ["European", "Eco-friendly", "German"];
const suggestedTagsCertifications = ["ISO 9001", "Vegan", "Organic"];

const TagDisplay: FC<Props> = ({ supplier }) => {
  const [isInserting, setIsInserting] = useState({
    general: false,
    certificates: false,
    portfolio: false,
  });
  const escapePress = useKeyPress("Escape");

  useEffect(() => {
    setIsInserting({
      certificates: false,
      general: false,
      portfolio: false,
    });
  }, [escapePress]);

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    tagType: TagType,
    name?: string
  ) {
    if (e.key === "Enter" || e.code === "Enter") {
      mutation.mutate({ type: tagType, name: name || e.currentTarget.value });
      setIsInserting({ ...isInserting, [tagType]: false });
    }

    if (e.key === "Tab" || e.code === "Tab") {
      e.preventDefault();
      mutation.mutate({ type: tagType, name: name || e.currentTarget.value });
      setIsInserting({ ...isInserting, [tagType]: true });
      e.currentTarget.value = "";
    }
  }

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (newTag: { id?: number; name?: string; type: TagType }) => {
      const previousSupplierData = queryClient.getQueryData(
        "supplier"
      ) as Supplier;

      const newSupplierData = updateSupplier(previousSupplierData, {
        name: newTag.name,
        type: newTag.type,
        id: newTag.id,
      });
      return newSupplierData;
      // Placeholder for real mutatable data source
      // const res = await axios.post("/api/supplier", newTag);
    },
    {
      onMutate: async (newTag) => {
        await queryClient.cancelQueries("supplier");

        const previousSupplierData = queryClient.getQueryData(
          "supplier"
        ) as Supplier;

        const newSupplierData = updateSupplier(previousSupplierData, {
          name: newTag.name,
          type: newTag.type,
          id: newTag.id,
        });

        queryClient.setQueryData("supplier", newSupplierData);

        return { previousSupplierData, newSupplierData };
      },

      onError: (err, newTodo, context) => {
        queryClient.setQueryData("supplier", context?.newSupplierData);
      },

      onSettled: (data, error, variables, context) => {
        // Placeholder for mutatable data Source
        // queryClient.invalidateQueries("supplier");

        queryClient.setQueryData("supplier", context?.newSupplierData);
      },
    }
  );

  if (!supplier?.name) {
    return <div>Loading Suppliers...</div>;
  }

  return (
    <div className="transition">
      <div className="inline-block">
        <h1 className="text-3xl py-3">
          <span className="text-blue-600">★ </span>
          {supplier.name}
        </h1>
        <hr className="" />
      </div>
      <div data-cy="tags-general" className="tags-general py-4">
        <h3 className="text-sm text-gray-400 py-2">General</h3>

        <ul className="inline-flex">
          {supplier["tags-general"].map((tag, idx, arr) => {
            return (
              <TagElement
                deleteTag={mutation.mutate}
                isRemovable={arr.length >= 2}
                tag={tag}
                key={`${tag.name}-${tag.id}`}
              />
            );
          })}
          {isInserting.general && (
            <li className="group inline-flex justify-center items-center px-2 py-1 mr-4 bg-white text-gray-800 border border-transparent hover:border-gray-500 focus:border-blue-500 text-sm font-medium rounded-full transition	">
              <input
                data-cy="general-input"
                autoFocus
                onKeyDown={(e) => handleKeyDown(e, "general")}
                className="border-none"
              />
            </li>
          )}
          <li className="group inline-flex justify-center items-center px-2 py-1 mr-4 bg-white text-gray-800 border border-transparent hover:border-gray-500 text-sm font-medium rounded-full transition	">
            <button
              data-cy="addTagBtn"
              onClick={() => setIsInserting({ ...isInserting, general: true })}
              className="border-none"
            >
              + New Tag
            </button>
          </li>
        </ul>
      </div>

      <div data-cy="tags-certificates" className="tags-certificates py-4">
        <h3 className="text-sm text-gray-400 py-2">Certifications</h3>
        <ul>
          {supplier["tags-certificates"].map((tag, idx, arr) => {
            return (
              <TagElement
                deleteTag={mutation.mutate}
                isRemovable={arr.length >= 2}
                tag={tag}
                key={`${tag.name}-${tag.id}`}
              />
            );
          })}
          {isInserting.certificates && (
            <li className="relative group inline-flex justify-center items-center px-2 py-1 mr-4 bg-white text-gray-800 border hover:border-gray-500 focus:border-blue-500 outline-none text-sm font-medium rounded-full transition	">
              <TagListBox
                tagType="certificates"
                handleKeyDown={handleKeyDown}
                tags={suggestedTagsCertifications}
              />
            </li>
          )}
          <li className="group inline-flex justify-center items-center px-2 py-1 mr-4 bg-white text-gray-800 border border-transparent hover:border-gray-500 text-sm font-medium rounded-full transition	">
            <button
              data-cy="addTagBtn"
              onClick={() =>
                setIsInserting({ ...isInserting, certificates: true })
              }
              className="border-none"
            >
              + New Tag
            </button>
          </li>
        </ul>
      </div>
      <div data-cy="tags-portfolio" className="tags-portfolio py-4">
        <h3 className="text-sm text-gray-400 py-2">Portfolio</h3>
        <ul>
          {supplier["tags-portfolio"].map((tag, idx, arr) => {
            return (
              <TagElement
                deleteTag={mutation.mutate}
                isRemovable={arr.length >= 2}
                tag={tag}
                key={`${tag.name}-${tag.id}`}
              />
            );
          })}
          {isInserting.portfolio && (
            <li className="relative group inline-flex justify-center items-center px-2 py-1 mr-4 bg-white text-gray-800 border hover:border-gray-500 focus:border-blue-500 outline-none text-sm font-medium rounded-full transition	">
              <TagListBox
                tagType="portfolio"
                handleKeyDown={handleKeyDown}
                tags={suggestedTagsPortfolio}
              />
            </li>
          )}
          <li className="group inline-flex justify-center items-center px-2 py-1 mr-4 bg-white text-gray-800 border border-transparent hover:border-gray-500 text-sm font-medium rounded-full transition	">
            <button
              data-cy="addTagBtn"
              onClick={() =>
                setIsInserting({ ...isInserting, portfolio: true })
              }
              className="border-none"
            >
              + New Tag
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TagDisplay;
