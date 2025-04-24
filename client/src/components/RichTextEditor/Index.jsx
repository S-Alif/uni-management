import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TextAlign from "@tiptap/extension-text-align"
import Heading from "@tiptap/extension-heading"
import Highlight from "@tiptap/extension-highlight"
import BulletList from "@tiptap/extension-bullet-list"
import OrderedList from "@tiptap/extension-ordered-list"
import ImageResize from "tiptap-extension-resize-image"
import ToolBar from "./ToolBar"
import { useEffect } from "react"



export default function RichTextEditor({ defaultValue = "<p>write product description</p>", onChange }) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: false,
                bulletList: false,
                orderedList: false,
                image: false,
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Heading.configure({
                levels: [1, 2, 3],
            }),
            OrderedList.configure({
                HTMLAttributes: {
                    class: "list-decimal ml-3",
                },
            }),
            BulletList.configure({
                HTMLAttributes: {
                    class: "list-disc ml-3",
                },
            }),
            Highlight,
            ImageResize,
        ],
        immediatelyRender: true,
        content: defaultValue,
        editorProps: {
            attributes: {
                class: "min-h-[300px] border focus:border-primary outline-none rounded-md py-2 px-3",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })


    useEffect(() => {
        if (editor && editor.getHTML() !== defaultValue) {
            editor.commands.setContent(defaultValue);
        }
    }, [defaultValue, editor])


    return (
        <div>
            <ToolBar editor={editor} />
            <EditorContent editor={editor} className="detail-content" />
        </div>
    )
}