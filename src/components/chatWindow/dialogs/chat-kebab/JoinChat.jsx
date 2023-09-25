import React from "react"
import { MdOutlineGroupAdd } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setChatToJoin } from "../../../../store/actions/chatActions";
import { setModalOpen } from "../../../../store/actions/uiActions";

export default function JoinChat({ menuRef, style, chat }) {
    const dispatch = useDispatch()

    function onJoinChatClick() {
        dispatch(setChatToJoin(chat))
        dispatch(setModalOpen('join-chat'))
    }
    
    return (
        <div ref={menuRef} style={style}>
            <div className="chat-kebab__row cursor-pointer" onClick={onJoinChatClick}>
                <MdOutlineGroupAdd size={24} />
                <p className="text-inter-16-400">Приєднатись</p>
            </div>
        </div>
    )
}