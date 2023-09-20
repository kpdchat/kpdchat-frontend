import {
    ACTION_SET_USER_CHATS,
    // ACTION_SET_PUBLIC_CHATS,
    ACTION_ADD_USER_CHAT,
    ACTION_RENDER_CHAT_LIST,
    ACTION_SET_JOIN_CHAT,
    ACTION_SET_LEAVE_CHAT,
    ACTION_CLEAN_LEAVE_CHAT,

} from '../actions/chatActions'





const initialState = {
    userChats: [],
    publicChats: [],
    renderList: [],
    listName: '',
    joinChat: {},
    leaveChat: {}
}

export default function chatReducer(state = initialState, { type, payload }) {
    switch (type) {
        // case ACTION_SET_PUBLIC_CHATS: {
        //     return {
        //         ...state,
        //         publicChats: payload,
                
        //     }
        // }
        case ACTION_SET_USER_CHATS: {
            return {
                ...state,
                userChats: payload,
            }
        }
        case ACTION_RENDER_CHAT_LIST: {
            return {
                ...state,
                renderList: payload.list,
                listName: payload.name
            }
        }
        case ACTION_ADD_USER_CHAT: {
            return {
                ...state,
                userChats: [
                    ...state.userChats,
                    payload
                ],
            }
        }
        case ACTION_SET_JOIN_CHAT: { ///???????
            return {
                ...state,
                joinChat: payload
            }
        }
        case ACTION_SET_LEAVE_CHAT: { 
            return {
                ...state,
                leaveChat: payload
            }
        }
        case ACTION_CLEAN_LEAVE_CHAT: { 
            return {
                ...state,
                leaveChat: {}
            }
        }
        // case ACTION_CREATE_FOLDER: {
        //     return {
        //         ...state,
        //         user: {
        //             ...state.user,
        //             folders: [
        //                 ...state.user.folders,
        //                 payload
        //             ]
        //         },
        //     }
        // }
        // case ACTION_DELETE_FOLDER: {
        //     const newList = state.user.folders.filter(el => el.id !== payload.id)
        //     return {
        //         ...state,
        //         user: {
        //             ...state.user,
        //             folders: newList
        //         },
        //     }
        // }
        // case ACTION_SET_EDIT_FOLDER: {
        //     return {
        //         ...state,
        //         editFolder: payload,
        //     }
        // }
        // case ACTION_SET_DELETE_FOLDER: {
        //     return {
        //         ...state,
        //         deleteFolder: payload,
        //     }
        // }
        // case ACTION_UPDATE_FOLDER: {
        //     const newList = state.user.folders.map(el => el.id === payload.id ? payload : el)
        //     return {
        //         ...state,
        //         user: {
        //             ...state.user,
        //             folders: newList
        //         },
        //         editFolder: {},
        //     }
        // }
        // case ACTION_CLEAR_FOLDER: {
        //     return {
        //         ...state,
        //         editFolder: {},
        //         deleteFolder: {},
        //     }
        // }
        default: return state
    }
}