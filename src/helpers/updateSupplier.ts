import { Supplier, TagType } from "../types";

export default function updateSupplier(
  supplier: Supplier,
  payload: { name?: string; type: TagType; id?: number }
) {
  const _supplier = { ...supplier };
  // Add Element
  if (!payload.id && payload.name) {
    _supplier[`tags-${payload.type}`] = [
      ...supplier[`tags-${payload.type}`],
      {
        // Hacky way of getting the highest value of existing ids - Would normally opt for UUID
        id:
          supplier[`tags-${payload.type}`].length <= 0
            ? 1
            : supplier[`tags-${payload.type}`]
                .slice()
                .sort((a, b) => a.id - b.id)[
                supplier[`tags-${payload.type}`].length - 1
              ].id + 1,
        name: payload.name,
        type: `supplierBranch-${payload.type}`,
      },
    ];
    // Remove Element
  } else if (payload.id && !payload.name) {
    _supplier[`tags-${payload.type}`] = [
      ...supplier[`tags-${payload.type}`].filter((tag) => {
        return tag.id !== payload.id;
      }),
    ];
  }

  return _supplier;
}
