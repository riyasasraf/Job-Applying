import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function JsonPasteModal({ isOpen, onClose, onSubmit }) {
  const [jsonText, setJsonText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!jsonText.trim()) {
      setError("Please paste some JSON content");
      return;
    }

    try {
      // Validate JSON
      const parsedJson = JSON.parse(jsonText);
      onSubmit(parsedJson);
      setJsonText(""); // Clear the textarea
      setError("");
    } catch (err) {

      setError("Invalid JSON format. Please check your syntax."+ err);
    }
  };

  const handleClose = () => {
    setJsonText("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full rounded-lg bg-white p-6 shadow-xl">
          {/* Close button */}
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-semibold text-gray-900">
              Paste JSON Content
            </Dialog.Title>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 rounded-full p-1"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <Dialog.Description className="text-sm text-gray-600 mb-4">
            Paste your JSON content below and click submit to process it.
          </Dialog.Description>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="json-content"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                JSON Content
              </label>
              <textarea
                id="json-content"
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                placeholder='Paste your JSON here, e.g., {"key": "value", "array": [1, 2, 3]}'
                className="w-full h-48 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
                autoFocus
              />
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit JSON
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
