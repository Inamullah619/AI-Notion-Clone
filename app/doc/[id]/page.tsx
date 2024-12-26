"use client";

import Document from "@/components/Document";

const DocumentPage = ({
  params: { id },
}: {
  params: {
    id: string;
  };
}) => {
  console.log(id);
  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <Document id={id} />
    </div>
  );
};

export default DocumentPage;
