"use client";

import { useEffect, useRef } from "react";

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const savedSelectionRef = useRef<Range | null>(null);

  // Sync innerHTML when external value changes
  useEffect(() => {
    if (!editorRef.current) return;
    if (editorRef.current.innerHTML !== (value || "")) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const saveSelection = () => {
    if (typeof window === "undefined") return;
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    savedSelectionRef.current = sel.getRangeAt(0);
  };

  const restoreSelection = () => {
    if (typeof window === "undefined") return;
    const range = savedSelectionRef.current;
    if (!range) return;
    const sel = window.getSelection();
    if (!sel) return;
    sel.removeAllRanges();
    sel.addRange(range);
  };

  const handleInput = () => {
    if (!editorRef.current) return;
    saveSelection();
    onChange(editorRef.current.innerHTML);
  };

  const applyCommand = (command: string, value?: string) => {
    if (typeof document === "undefined") return;
    if (editorRef.current) editorRef.current.focus();
    restoreSelection();
    document.execCommand(command, false, value);
    handleInput();
  };

  const handleLink = () => {
    const url = window.prompt("Enter URL", "https://");
    if (url) applyCommand("createLink", url);
  };

  const handleImage = () => {
    const url = window.prompt("Enter image URL", "https://");
    if (url) applyCommand("insertImage", url);
  };

  const removeBackgroundColor = () => {
    if (typeof document === "undefined" || !editorRef.current) return;
    editorRef.current.focus();
    restoreSelection();
    
    const sel = window.getSelection();
    const hasSelection = sel && sel.rangeCount > 0;
    let range: Range | null = null;
    
    if (hasSelection) {
      range = sel!.getRangeAt(0);
    }
    
    // Collect all elements that need processing
    const elementsToProcess = new Set<HTMLElement>();
    
    if (hasSelection && range && !range.collapsed) {
      // If there's a text selection, process only selected elements
      const container = range.commonAncestorContainer;
      
      if (container.nodeType === Node.ELEMENT_NODE) {
        elementsToProcess.add(container as HTMLElement);
      } else if (container.nodeType === Node.TEXT_NODE && container.parentElement) {
        elementsToProcess.add(container.parentElement);
      }
      
      // Find all elements in the selection
      const walker = document.createTreeWalker(
        editorRef.current,
        NodeFilter.SHOW_ELEMENT,
        null
      );
      
      let node;
      while ((node = walker.nextNode())) {
        const element = node as HTMLElement;
        if (range.intersectsNode(element)) {
          elementsToProcess.add(element);
        }
      }
    } else if (hasSelection && range && range.collapsed) {
      // If cursor is positioned but nothing selected, check parent elements
      let current: Node | null = range.startContainer;
      while (current && current !== editorRef.current) {
        if (current.nodeType === Node.ELEMENT_NODE) {
          const el = current as HTMLElement;
          if (el.style.backgroundColor || 
              el.getAttribute("style")?.includes("background-color") ||
              el.getAttribute("style")?.includes("background:")) {
            elementsToProcess.add(el);
          }
        }
        current = current.parentElement;
      }
    } else {
      // If no selection, process all elements in the editor that have background
      const allElements = editorRef.current.querySelectorAll("*");
      allElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        if (htmlEl.style.backgroundColor || 
            htmlEl.style.background ||
            htmlEl.getAttribute("style")?.includes("background-color") ||
            htmlEl.getAttribute("style")?.includes("background:")) {
          elementsToProcess.add(htmlEl);
        }
      });
    }
    
    // Remove background color from all found elements
    elementsToProcess.forEach((element) => {
      // Remove inline style background-color
      element.style.backgroundColor = "";
      element.style.background = "";
      
      // Process style attribute
      const styleAttr = element.getAttribute("style");
      if (styleAttr) {
        // Remove background-color and background from style string
        const styleParts = styleAttr.split(";").filter((part) => {
          const trimmed = part.trim().toLowerCase();
          return !trimmed.startsWith("background-color") && 
                 !trimmed.startsWith("background:") &&
                 trimmed !== "";
        });
        
        const newStyle = styleParts.join(";").trim();
        if (newStyle) {
          element.setAttribute("style", newStyle);
        } else {
          element.removeAttribute("style");
        }
      }
    });
    
    // Also try execCommand as a fallback for better browser compatibility
    try {
      if (hasSelection && range && !range.collapsed) {
        document.execCommand("hiliteColor", false, "transparent");
      }
    } catch (e) {
      // Ignore execCommand errors, manual removal should work
    }
    
    handleInput();
  };

  const isEmpty = !value || value.trim() === "" || value === "<p><br></p>";

  return (
    <div className="border border-gray-300 rounded-md bg-white overflow-hidden shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-700">

        {/* Undo / Redo */}
        <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyCommand("undo")}
          className="cursor-pointer px-2 py-1 rounded hover:bg-gray-200">Undo</button>
        <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyCommand("redo")}
          className="cursor-pointer px-2 py-1 rounded hover:bg-gray-200">Redo</button>

        <span className="mx-1 h-4 w-px bg-gray-300" />

        {/* Font Size */}
        <select
          className="rounded border border-gray-300 bg-white px-1 py-1 text-xs"
          defaultValue="3"
          onChange={(e) => applyCommand("fontSize", e.target.value)}
        >
          <option value="2">Small</option>
          <option value="3">Normal</option>
          <option value="4">Large</option>
          <option value="5">XL</option>
        </select>

        {/* Font Family */}
        <select
          className="rounded border border-gray-300 bg-white px-1 py-1 text-xs"
          defaultValue="default"
          onChange={(e) => {
            if (e.target.value !== "default") {
              applyCommand("fontName", e.target.value);
            }
          }}
        >
          <option value="default">Font</option>
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times</option>
        </select>

        <span className="mx-1 h-4 w-px bg-gray-300" />

        {/* Text Color */}
        <input type="color" className="h-4 w-4 border cursor-pointer"
          onChange={(e) => applyCommand("foreColor", e.target.value)} />

        {/* Highlight Color */}
        <input type="color" className="h-4 w-4 border cursor-pointer"
          onChange={(e) => applyCommand("hiliteColor", e.target.value)} />
        <button 
          onMouseDown={(e) => e.preventDefault()} 
          onClick={removeBackgroundColor}
          className="cursor-pointer px-2 py-1 rounded hover:bg-gray-200 text-xs"
          title="Remove Background Color"
        >
          No BG
        </button>

        <span className="mx-1 h-4 w-px bg-gray-300" />

        {/* Basic Styles */}
        <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyCommand("bold")}
          className="cursor-pointer px-2 py-1 rounded font-semibold hover:bg-gray-200">B</button>
        <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyCommand("italic")}
          className="cursor-pointer px-2 py-1 rounded italic hover:bg-gray-200">I</button>
        <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyCommand("underline")}
          className="cursor-pointer px-2 py-1 rounded underline hover:bg-gray-200">U</button>
        <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyCommand("strikeThrough")}
          className="cursor-pointer px-2 py-1 rounded line-through hover:bg-gray-200">S</button>

        <span className="mx-1 h-4 w-px bg-gray-300" />

        {/* Lists */}
        <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyCommand("insertUnorderedList")}
          className="cursor-pointer px-2 py-1 rounded hover:bg-gray-200">• List</button>
        <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyCommand("insertOrderedList")}
          className="cursor-pointer px-2 py-1 rounded hover:bg-gray-200">1. List</button>

        <span className="mx-1 h-4 w-px bg-gray-300" />

        {/* Alignment */}
        <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyCommand("justifyLeft")}
          className="cursor-pointer px-2 py-1 rounded hover:bg-gray-200">Left</button>
        <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyCommand("justifyCenter")}
          className="cursor-pointer px-2 py-1 rounded hover:bg-gray-200">Center</button>
        <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyCommand("justifyRight")}
          className="cursor-pointer px-2 py-1 rounded hover:bg-gray-200">Right</button>
        <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyCommand("justifyFull")}
          className="cursor-pointer px-2 py-1 rounded hover:bg-gray-200">Justify</button>

        <span className="mx-1 h-4 w-px bg-gray-300" />

        {/* Link & Image */}
        <button onMouseDown={(e) => e.preventDefault()} onClick={handleLink}
          className="cursor-pointer px-2 py-1 rounded hover:bg-gray-200">Link</button>
        <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyCommand("unlink")}
          className="cursor-pointer px-2 py-1 rounded hover:bg-gray-200">Unlink</button>
        <button onMouseDown={(e) => e.preventDefault()} onClick={handleImage}
          className="cursor-pointer px-2 py-1 rounded hover:bg-gray-200">Image</button>

        {/* Clear formatting */}
        <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyCommand("removeFormat")}
          className="cursor-pointer px-2 py-1 rounded hover:bg-gray-200">Clear</button>
      </div>

      {/* Editable Area */}
      <div
        ref={editorRef}
        className="min-h-[160px] max-h-[480px] overflow-y-auto px-3 py-2 leading-relaxed text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 prose prose-sm [&_*]:max-w-full"
        contentEditable
        onInput={handleInput}
        onKeyUp={saveSelection}
        onMouseUp={saveSelection}
        suppressContentEditableWarning
      />

      {/* Placeholder */}
      {isEmpty && placeholder && (
        <div className="pointer-events-none -mt-[150px] px-3 py-2 text-sm text-gray-400">
          {placeholder}
        </div>
      )}
    </div>
  );
}
