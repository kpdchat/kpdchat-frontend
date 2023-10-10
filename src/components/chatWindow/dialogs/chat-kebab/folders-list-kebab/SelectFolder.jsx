import React from "react";
import { MdDone } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { DotSpinner } from '@uiball/loaders'
import { icons } from "../../../../../extra/config/folder-icons";
import { selectChat, selectUi } from "../../../../../store/selectors";
import { fetchUpdateKebabFolder } from "../../../../../store/actions/folderActions";


export default function SelectFolder({ folder }) {
    const dispatch = useDispatch()
    const chat = useSelector(selectChat)
    const { loaderId, isActiveLoader } = useSelector(selectUi)
    
    function onRemoveFolderClick(e) {
        e.stopPropagation()

        if (isActiveLoader) {
            return
        }

        const publicChatsId = folder.publicChats
            .map(el => el.id)
            .filter(el => el !== chat.id)
        const updateFolder = {
            "id": folder.id,
            "title": folder.title,
            "iconTag": folder.iconTag,
            "chatIds": publicChatsId
        }

        dispatch(fetchUpdateKebabFolder(updateFolder))
    }

    return (
        <div
            className="chat-kebab__row chat-kebab__row_folders cursor-pointer"
            onClick={onRemoveFolderClick}>
            <div className="flex-container">
                {icons[folder.iconTag]}
                <p className="text-inter-16-400">{folder.title}</p>
            </div>
            <div
                className={isActiveLoader && loaderId === folder.id ? null : 'display-none'}>
                <DotSpinner
                    size={20}
                    speed={0.9}
                    color="#5750A8"
                />
            </div>

            <MdDone
                color="#5750A8"
                size={24}
                className={isActiveLoader && loaderId === folder.id ? 'display-none' : null} />
        </div>
    )
}
