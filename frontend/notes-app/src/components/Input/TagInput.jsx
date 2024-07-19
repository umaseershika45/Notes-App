import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const addNewTag = () => {
        if (inputValue.trim() !== "") {
            setTags([...tags, inputValue.trim()]);
            setInputValue("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            addNewTag();
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div>
            {tags?.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap mt-2">
                    {tags.map((tag, index) => (
                        <span 
                            key={index} 
                            className="bg-blue-100 text-blue-700 rounded px-2 py-1 flex items-center"
                        >
                            #{tag}
                            <button 
                                onClick={() => handleRemoveTag(tag)}
                                className="ml-1 text-blue-700 hover:text-blue-900"
                            >
                                <MdClose />
                            </button>
                        </span>
                    ))}
                </div>
            )}
            <div className="flex items-center gap-4 mt-3">
                <input 
                    type="text" 
                    className="text-sm bg-transparent border px-3 rounded outline-none" 
                    placeholder="Add tags"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                <button 
                    className="w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700"
                    onClick={addNewTag}
                >
                    <MdAdd className="text-2xl text-blue-700 hover:text-white" />
                </button>
            </div>
        </div>
    );
};

export default TagInput;
