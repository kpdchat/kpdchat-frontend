import React, { useEffect } from "react"
import { MdOutlineCreateNewFolder, MdArrowForward } from "react-icons/md";
import { PiDoorOpen, PiTrashBold } from "react-icons/pi";
export default function FolderChatKebab({ menuRef, style, chat, setStyle }) {
    useEffect(() => {
        if (style.top === '-10px') {
            setStyle({
                ...style,
                top: '-80px'
            })
        }
    })

    // const menuRef = useRef()
    return (
        <div ref={menuRef} style={style}>
            <div className="chat-kebab__row cursor-pointer">
                <MdOutlineCreateNewFolder size={24} />
                <p className="text-inter-16-400">Додати до папки</p>
                <MdArrowForward className="chat-kebab__arrow" size={24} />
            </div>
            <div className="chat-kebab__row cursor-pointer">
                <PiDoorOpen size={24} />
                <p className="text-inter-16-400">Вийти з чату</p>
            </div>
            <div className="chat-kebab__row cursor-pointer">
                <PiTrashBold size={24} />
                <p className="text-inter-16-400">Видалити з папки</p>
            </div>
        </div>
    )
}