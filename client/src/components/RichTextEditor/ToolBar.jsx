import { Grid2x2Check, Grid2x2Plus, Grid2x2X, Heading4, Heading5, Heading6, List, Minus, SquareX, Table, Table2, TableCellsMerge, TableCellsSplit, TableProperties, TicketX } from "lucide-react"
import { Toggle } from "../ui/toggle"
import {
    Heading1,
    Heading2,
    Heading3,
    Bold,
    Italic,
    Strikethrough,
    AlignCenter,
    AlignLeft,
    AlignRight,
    Highlighter,
    Upload,
} from "lucide-react";
import { ListOrdered } from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"



export default function ToolBar({ editor }) {
    if (!editor) return null
    const addImage = () => {
        const url = window.prompt("Enter image URL")
        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }

    const Options = [
        {
            icon: <Heading1 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            pressed: editor.isActive("heading", { level: 1 }),
            name: "Heading 1",
        },
        {
            icon: <Heading2 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            pressed: editor.isActive("heading", { level: 2 }),
            name: "Heading 2",
        },
        {
            icon: <Heading3 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            pressed: editor.isActive("heading", { level: 3 }),
            name: "Heading 3",
        },
        {
            icon: <Heading4 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
            pressed: editor.isActive("heading", { level: 4 }),
            name: "Heading 4",
        },
        {
            icon: <Heading5 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
            pressed: editor.isActive("heading", { level: 5 }),
            name: "Heading 5",
        },
        {
            icon: <Heading6 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
            pressed: editor.isActive("heading", { level: 6 }),
            name: "Heading 6",
        },
        {
            icon: <Bold className="size-4" />,
            onClick: () => editor.chain().focus().toggleBold().run(),
            pressed: editor.isActive("bold"),
            name: "Bold",
        },
        {
            icon: <Italic className="size-4" />,
            onClick: () => editor.chain().focus().toggleItalic().run(),
            pressed: editor.isActive("italic"),
            name: "Italic",
        },
        {
            icon: <Strikethrough className="size-4" />,
            onClick: () => editor.chain().focus().toggleStrike().run(),
            pressed: editor.isActive("strike"),
            name: "Strike through",
        },
        {
            icon: <Minus className="size-4" />,
            onClick: () => editor.chain().focus().setHorizontalRule().run(),
            pressed: editor.isActive("horizontalRule"),
            name: "Horizontal Rule",
        },
        {
            icon: <Table className="size-4" />,
            onClick: () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
            pressed: editor.isActive("table"),
            name: "Table",
        },
        {
            icon: <Table2 className="size-4" />,
            onClick: () => editor.chain().focus().addColumnBefore().run(),
            pressed: editor.isActive("addColumnBefore"),
            name: "Add column before",
        },
        {
            icon: <TableProperties className="size-4" />,
            onClick: () => editor.chain().focus().addColumnAfter().run(),
            pressed: editor.isActive("addColumnAfter"),
            name: "Add column after",
        },
        {
            icon: <Grid2x2X className="size-4" />,
            onClick: () => editor.chain().focus().deleteColumn().run(),
            pressed: editor.isActive("deleteColumn"),
            name: "Delete column",
        },
        {
            icon: <Grid2x2Check className="size-4" />,
            onClick: () => editor.chain().focus().addRowBefore().run(),
            pressed: editor.isActive("addRowBefore"),
            name: "Add row before",
        },
        {
            icon: <Grid2x2Plus className="size-4" />,
            onClick: () => editor.chain().focus().addRowAfter().run(),
            pressed: editor.isActive("addRowAfter"),
            name: "Add row after",
        },
        {
            icon: <SquareX className="size-4" />,
            onClick: () => editor.chain().focus().deleteRow().run(),
            pressed: editor.isActive("deleteRow"),
            name: "Delete row",
        },
        {
            icon: <TicketX className="size-4" />,
            onClick: () => editor.chain().focus().deleteTable().run(),
            pressed: editor.isActive("deleteTable"),
            name: "Delete table",
        },
        {
            icon: <TableCellsMerge className="size-4" />,
            onClick: () => editor.chain().focus().mergeCells().run(),
            pressed: editor.isActive("mergeCells"),
            name: "Merge cells",
        },
        {
            icon: <TableCellsSplit className="size-4" />,
            onClick: () => editor.chain().focus().splitCell().run(),
            pressed: editor.isActive("splitCell"),
            name: "Split cell",
        },
        {
            icon: <AlignLeft className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("left").run(),
            pressed: editor.isActive({ textAlign: "left" }),
            name: "Align Left",
        },
        {
            icon: <AlignCenter className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("center").run(),
            pressed: editor.isActive({ textAlign: "center" }),
            name: "Align Center",
        },
        {
            icon: <AlignRight className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("right").run(),
            pressed: editor.isActive({ textAlign: "right" }),
            name: "Align Right",
        },
        {
            icon: <List className="size-4" />,
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            pressed: editor.isActive("bulletList"),
            name: "Bullet List",
        },
        {
            icon: <ListOrdered className="size-4" />,
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            pressed: editor.isActive("orderedList"),
            name: "Ordered List",
        },
        {
            icon: <Highlighter className="size-4" />,
            onClick: () => editor.chain().focus().toggleHighlight().run(),
            pressed: editor.isActive("highlight"),
            name: "Highlight",
        },
        {
            icon: <Upload className="size-4" />,
            onClick: () => addImage(),
            pressed: editor.isActive("image"),
            name: "Upload image",
        },
    ]

    return (
        <div className="border flex gap-1 flex-wrap rounded-md p-1.5 mb-1 bg-slate-50 space-x-1 sticky top-10 z-50">
            {Options.map((option, i) => (
                <TooltipProvider key={i}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle
                                size="sm"
                                pressed={option.pressed}
                                onPressedChange={() => option.onClick()}
                                className={`hover:bg-primary hover:text-white ${option.pressed && "!bg-primary !text-white"}`}
                                // type="button"
                            >
                                {option.icon}
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                        <p>{option?.name}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ))}
        </div>
    );
}