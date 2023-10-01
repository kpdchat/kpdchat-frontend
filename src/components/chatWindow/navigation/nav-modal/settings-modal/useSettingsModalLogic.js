import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectLoader, selectUser} from '../../../../../store/selectors';
import i18n from 'i18next';
import {setLoaderHide, setLoaderShow, setWindowChatClose} from '../../../../../store/actions/uiActions';
import axios from 'axios';
import {fetchUser} from '../../../../../store/actions/userActions';
import {locales} from '../../../../../extra/config/locales';
import {validateImageOnServer} from '../../../../../extra/config/validateImageOnServer';

export default function useSettingsModalLogic({setIsOpen}) {
    const user = useSelector(selectUser);
    const isLoader = useSelector(selectLoader);
    const dispatch = useDispatch();
    const [nickname, setNickname] = useState(user.nickname);
    const [nicknameError, setNicknameError] = useState('');
    const [profilePictureLink, setProfilePictureLink] = useState(user.profilePictureLink);
    const [profilePictureLinkError, setProfilePictureLinkError] = useState('');
    const [showImg, setShowImg] = useState(false);
    const profilePictureLinkRef = useRef();
    const [selectedLocale, setSelectedLocale] = useState(i18n.resolvedLanguage);
    const [change, setChange] = useState(false);
    const [modalExitSettings, setModalExitSettings] = useState(false);

    // Language User Change
    function handleLocaleChange(locale) {
        setSelectedLocale(locale);
        setChange(true);
    }

    //
    function onContentClick(e) {
        e.stopPropagation();
    }

    // Close Window Settings
    function onCloseWindowSettings() {
        if (change === false) {
            setIsOpen(prev => !prev); // Close window Settings User
            setNickname(user.nickname);
            setChange(false);
        } else {
            setModalExitSettings(true);
        }
    }

    // Close Window Modal Exit and Window Settings
    function onCloseSettings() {
        setIsOpen(prev => !prev); // Close window Settings User
        setNickname(user.nickname);
        setChange(false);
    }

    // Back to Window Settings
    function onCloseModalExit() {
        setModalExitSettings(false);
    }

    // Nickname validation
    function validateNicknameSettings(value) {
        if (!value) {
            setNicknameError('registration.error-message');
        } else if (value.length < 4 || value.length > 12) {
            setNicknameError('registration.input-nickname-error');
        } else {
            setNicknameError('');
        }
    }

    // Change Nickname User
    function onChangeNicknameSettings(e) {
        const checkingForSpaces = e.target.value.replace(/[^a-zA-Z0-9?!_\-@^*'.,:;"{}#$%&()=+<>/|]/g, '');
        setNickname(checkingForSpaces);
        validateNicknameSettings(e.target.value);
        setChange(true);
    }

    // Change Avatar User
    function validateImageValueSettings(value) {
        setProfilePictureLinkError('');
        if (!value) {
            setProfilePictureLinkError('registration.error-message');
        }
    }

    // Change Users Link in Textarea
    async function onChangeTextareaInputSettings(e) {
        setProfilePictureLink(e.target.value);
        dispatch(setLoaderShow());
        validateImageValueSettings(e.target.value);
        setChange(true);

        if (e.target.value && (await validateImageOnServer(e.target.value))) {
            dispatch(setLoaderHide());
        } else {
            dispatch(setLoaderHide());
            setProfilePictureLinkError('registration.input-pictureLink-error');
        }
    }

    // Insert Dog Links
    function onePickAvatar(url) {
        setProfilePictureLink(url);
        setChange(true);
        setProfilePictureLinkError('');
    }

    // Show Standarts Avatars
    function onShowAvatars() {
        setShowImg(!showImg);
    }

    // Exit Chat
    function onExitChat() {
        localStorage.removeItem('user');
        setIsOpen(prev => !prev);
        dispatch(setWindowChatClose())
    }

    // Submit To Server Data
    async function onSubmitDataToServer() {
        if (change === false || nicknameError || profilePictureLinkError) return;

        try {
            dispatch(setLoaderShow());
            const imageSettingsIsValid = await validateImageOnServer(profilePictureLink);
            if (imageSettingsIsValid) {
                const updateUser = {
                    id: user.id,
                    nickname,
                    profilePictureLink,
                    localization: locales[selectedLocale].value,
                    theme: user.theme
                }
                await axios.put('https://kpdchat.onrender.com/api/users', updateUser);
                dispatch(fetchUser(user.id));
                setChange(false);
            }
        } catch (e) {
            console.log(e);
        } finally {
            dispatch(setLoaderHide());
        }
    }

    useEffect(() => {
        profilePictureLinkRef.current.style.height = 'auto';
        profilePictureLinkRef.current.style.height = profilePictureLinkRef.current.scrollHeight + 4 + 'px';
    }, [profilePictureLink]);

    return {
        onCloseWindowSettings,
        onContentClick,
        onChangeNicknameSettings,
        onSubmitDataToServer,
        onChangeTextareaInputSettings,
        onePickAvatar,
        onShowAvatars,
        onExitChat,
        handleLocaleChange,
        onCloseSettings,
        onCloseModalExit,
        user,
        nickname,
        nicknameError,
        profilePictureLink,
        profilePictureLinkError,
        showImg,
        profilePictureLinkRef,
        isLoader,
        selectedLocale,
        change,
        modalExitSettings
    }
}
