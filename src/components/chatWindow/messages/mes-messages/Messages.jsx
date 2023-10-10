import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import MesDate from "./MesDate";
import SelfMessage from "./SelfMessage";
import AnotherMessage from "./AnotherMessage";
import { selectDataForMessages, selectFilterByDateMessageList } from "../../../../store/selectors";

export default function Messages() {
    const { user } = useSelector(selectDataForMessages)
    const sortChatList = useSelector(selectFilterByDateMessageList)
    const messageRef = useRef()
    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight
        }
    }, [messageRef, sortChatList.length])
    // console.log(user);
    // console.log(sortChatList);
    return (
        <div
            ref={messageRef}
            className="messages__window-mes window-mes scroll-bar">
            {sortChatList?.length ? sortChatList.map(data => {
                if (data.date) {
                    return <MesDate key={data.date} date={data.date} />
                } else if (data?.userProfile?.id === user.id) {
                    return <SelfMessage key={data.id} message={data} />
                } else {
                    return <AnotherMessage key={data.id} message={data} />
                }
            }) : null}
        </div>

    )
}