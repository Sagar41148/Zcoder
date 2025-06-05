import React from "react";

type EditorFooterProps = {
  handleSubmit: () => void;
};

const EditorFooter: React.FC<EditorFooterProps> = ({ handleSubmit }) => {
  return (
    <div className="flex justify-end">
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 mt-4 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default EditorFooter;
