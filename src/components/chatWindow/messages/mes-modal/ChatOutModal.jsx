import React from "react"
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { setModalClose } from "../../../../store/actions/uiActions"
import { selectLeaveChat, selectUser } from "../../../../store/selectors";
import { cleanChat, fetchLeaveChat } from "../../../../store/actions/chatActions";

export default function ChatOutModal() {
    const user = useSelector(selectUser)
    const chat = useSelector(selectLeaveChat)
    const dispatch = useDispatch()
    const { t } = useTranslation()

    function onCloseClick() {
        dispatch(setModalClose())
        dispatch(cleanChat())
    }


    function onLeaveClick() {
        const data = {
            "userId": user.id,
            "publicChatId": chat.id
        }
        dispatch(fetchLeaveChat(data))
        dispatch(setModalClose())

    }

    return (
        <div className="modal-container modal-chat" >
            <div className="modal-chat__content">
                <div className="modal-chat__header">
                    <h3 className="text-inter-18-600">Вийти з чату</h3>
                    <MdClose
                        className="modal-chat__close cursor-pointer"
                        size={24} onClick={onCloseClick} />
                </div>

                <div className="flex-container">
                    <img src={chat.chatPictureLink} />
                    <div className="modal-chat__about">

                        <p className="text-inter-18-600">{chat?.title}</p>
                        <p className="text-inter-14-400">{chat?.members?.length} учасників будуть за вами  сумувати </p>

                    </div>
                </div>
                <button
                    className="text-inter-18-600 cursor-pointer"
                    onClick={onLeaveClick} >Вийти</button>
            </div>
        </div>
    )
}
