"use client"

import * as React from "react"
import { ItemInstance } from "@headless-tree/core"
import { ChevronDownIcon } from "lucide-react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

interface TreeContextValue<T = any> {
    indent: number
    currentItem?: ItemInstance<T>
    tree?: any
}

const TreeContext = React.createContext<TreeContextValue>({
    indent: 20,
    currentItem: undefined,
    tree: undefined,
})

function useTreeContext<T = any>() {
    return React.useContext(TreeContext) as TreeContextValue<T>
}

interface TreeProps extends React.HTMLAttributes<HTMLDivElement> {
    indent?: number
    tree?: any
}

function Tree({ indent = 20, tree, className, ...props }: TreeProps) {
    const containerProps =
        tree && typeof tree.getContainerProps === "function"
            ? tree.getContainerProps()
            : {}
    const mergedProps = { ...props, ...containerProps }

    const mergedStyle = {
        ...mergedProps.style,
        "--tree-indent": `${indent}px`,
    } as React.CSSProperties

    return (
        <TreeContext.Provider value={{ indent, tree }}>
            <div
                data-slot="tree"
                style={mergedStyle}
                className={cn("flex flex-col", className)}
                {...mergedProps}
            />
        </TreeContext.Provider>
    )
}

interface TreeItemProps<T = any>
    extends React.HTMLAttributes<HTMLButtonElement> {
    item: ItemInstance<T>
    indent?: number
    asChild?: boolean
}

function TreeItem<T = any>({
    item,
    className,
    asChild,
    children,
    ...props
}: Omit<TreeItemProps<T>, "indent">) {
    const { indent } = useTreeContext<T>()

    const itemProps = typeof item.getProps === "function" ? item.getProps() : {}
    const mergedProps = { ...props, ...itemProps }

    const mergedStyle = {
        ...mergedProps.style,
        "--tree-padding": `${item.getItemMeta().level * indent}px`,
    } as React.CSSProperties

    const Comp = asChild ? Slot : "button"

    return (
        <TreeContext.Provider value={{ indent, currentItem: item }}>
            <Comp
                data-slot="tree-item"
                style={mergedStyle}
                className={cn(
                    "z-10 ps-(--tree-padding) outline-hidden select-none not-last:pb-0.5 focus:z-20 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-left",
                    className
                )}
                aria-expanded={typeof item.isExpanded === 'function' ? item.isExpanded() : undefined}
                {...mergedProps}
            >
                {children}
            </Comp>
        </TreeContext.Provider>
    )
}

interface TreeItemLabelProps<T = any>
    extends React.HTMLAttributes<HTMLSpanElement> {
    item?: ItemInstance<T>
}

function TreeItemLabel<T = any>({
    item: propItem,
    children,
    className,
    ...props
}: TreeItemLabelProps<T>) {
    const { currentItem } = useTreeContext<T>()
    const item = propItem || currentItem

    if (!item) return null

    const isFolder = typeof item.isFolder === "function" ? item.isFolder() : false
    const isExpanded = typeof item.isExpanded === "function" ? item.isExpanded() : false
    const isSelected = typeof item.isSelected === "function" ? item.isSelected() : false

    return (
        <span
            data-slot="tree-item-label"
            className={cn(
                "bg-transparent hover:bg-white/5 flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors text-white/40 hover:text-white not-in-data-[folder=true]:ps-8 [&_svg]:pointer-events-none [&_svg]:shrink-0",
                isSelected && "bg-white/5 text-[#C8FF00] font-bold",
                className
            )}
            {...props}
        >
            {isFolder && (
                <ChevronDownIcon className={cn("size-3.5 transition-transform duration-200 text-white/20", isExpanded ? "rotate-0" : "-rotate-90")} />
            )}
            {children ||
                (typeof item.getItemName === "function" ? item.getItemName() : null)}
        </span>
    )
}

export { Tree, TreeItem, TreeItemLabel }
