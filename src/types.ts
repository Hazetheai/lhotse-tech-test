export type TagType = "general" | "certificates" | "portfolio";

export type Tag = {
  id: number;
  name: string;
  type: `supplierBranch-${TagType}`;
};

export type Supplier = {
  name: string;
  "tags-general": Array<Tag>;
  "tags-certificates": Array<Tag>;
  "tags-portfolio": Array<Tag>;
};
