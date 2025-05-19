import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TextAlign from "@tiptap/extension-text-align"
import Heading from "@tiptap/extension-heading"
import Highlight from "@tiptap/extension-highlight"
import BulletList from "@tiptap/extension-bullet-list"
import OrderedList from "@tiptap/extension-ordered-list"
import ImageResize from "tiptap-extension-resize-image"
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import ToolBar from "./ToolBar"
import { useEffect } from "react"
import HardBreak from "@tiptap/extension-hard-break"



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
                levels: [1, 2, 3, 4, 5, 6],
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
            Table.configure({
                resizable: true,
                allowTableNodeSelection: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
            HardBreak.configure({
                HTMLAttributes: {
                    class: 'inline-block',
                },
            }),
        ],
        immediatelyRender: true,
        content: defaultValue,
        editorProps: {
            attributes: {
                class: "min-h-[300px] border focus:border-primary outline-none rounded-md py-2 px-3",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML().replace(/<p><\/p>/g, '<p>&nbsp;</p>'))
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