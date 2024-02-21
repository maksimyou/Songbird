import React, { Children, useEffect, useRef, useState } from 'react'
import './Modal.scss'
import hidden from '../../assets/eye-password-hidden.png'
import show from '../../assets/eye-password-visibled.png'


import { UserContextFunc } from '../../Context/UserContext'
function Modal() {
    const { setIsMessageError, isMessageError, setConfirmMail2, setConfirmMail, generationCodeApi, toggleModal, setToggleModal, isUserId, postConfirmationApi, confirmMail, confirmMail2, loginApi, registrationApi, isAuth, setIsAuth, loginUserAuth, isFirstName } = UserContextFunc()
    const [modeModal, setModeModal] = useState(false)
    const [name, setName] = useState(true)
    const [password, setPassword] = useState(true)
    const [mail, setMail] = useState(true)
    const [value1, setValue1] = useState(false)
    const [value2, setValue2] = useState(false)
    const [value3, setValue3] = useState(false)
    const [value4, setValue4] = useState(false)
    const [modalSwitch, setModalSwitch] = useState(true)
    const [showPassword, setShowPassword] = useState(true)
    const [code, setCode] = useState('')
    const [reg, setReg] = useState()
    const [log, setLog] = useState()
    const [confirm, setConfirm] = useState()
    const [confirm2, setConfirm2] = useState()


    const [userData, setUserData] = useState({
        name: '',
        password: '',
        email: ''
    })
    const ref1 = useRef()
    const ref2 = useRef()
    const ref3 = useRef()
    const ref4 = useRef()
    const ref5 = useRef()



    const clearValue = () => {
        setValue1(false);
        setValue2(false);
        setValue3(false);
        setValue4(false);
        ref1.current.value = '';
        ref2.current.value = '';
        setName(true)
        setPassword(true)
        setMail(true)
        setCode('')
        setModalSwitch(true)
        setIsMessageError('')
    }



    const clearValue2 = () => {
        setValue1(false);
        setValue2(false);
        setValue3(false);
        setValue4(false);
        ref3.current.value = '';
        ref4.current.value = '';
        ref5.current.value = '';
        setName(true)
        setPassword(true)
        setMail(true)
        setCode('')
        setModalSwitch(false)
        setIsMessageError('')

    }



    const CheckingPassword = (str) => {

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (passwordRegex.test(str)) {
            setPassword(true)
            setValue2(true)
            setUserData({ ...userData, password: str })
        } else {
            setPassword(false)
            setValue2(false)
            setUserData({ ...userData, password: str })

        }
    }


    const CheckingWorldName = (str) => {
        if (str.length >= 1) {
            setName(true)
            setValue1(true)
            setUserData({ ...userData, name: str })
        } else {
            setName(false)
            setValue1(false)
            setUserData({ ...userData, name: str })
        }

    }


    //const CheckingWorldSurname = (str) => {
    //    if (str.length >= 1) {
    //        setSurName(true)
    //        setUserData({ ...userData, lastName: str })
    //    } else {
    //        setSurName(false)
    //        setUserData({ ...userData, lastName: str })
    //    }

    //}


    //const CheckingPhone = (str) => {
    //    const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

    //    if (phoneRegex.test(str)) {
    //        setPhone(true)
    //        setUserData({ ...userData, phone: str })
    //    } else {
    //        setPhone(false)
    //        setUserData({ ...userData, phone: str })
    //    }
    //}


    const CheckingMail = (str) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex.test(str)) {
            setMail(true)
            setValue3(true)
            setUserData({ ...userData, email: str })
            console.log(userData)
        } else {
            setMail(false)
            setValue3(false)
            setUserData({ ...userData, email: str })
        }
    }

    const CheckingCode = (str) => {
        const emailRegex = /\d/;

        if (emailRegex.test(str)) {
            setValue4(true)
        } else {
            setValue4(false)
        }
    }


    const closeCleareModal = () => {
        setPassword(true);
        setName(true);
        setMail(true);
        setToggleModal(false);
        setConfirmMail(false);
        setConfirmMail2(false);
        setIsMessageError('');
    }


    useEffect(() => {
        //if (reg) { registrationApi(userData); setToggleModal(false); setReg(false) }
        //if (log) { loginApi(userData); setToggleModal(false); setLog(false) }

        if (reg) { setIsMessageError(''); registrationApi(userData); setReg(false) }
        if (log) { setIsMessageError(''); loginApi(userData); setLog(false) }
        if (confirm) { setIsMessageError(''); postConfirmationApi({ code: code, id: isUserId.id }); setConfirm(false) }
        if (confirm2) { setIsMessageError(''); generationCodeApi({ id: isUserId.id }); setConfirm2(false) }

        //if (confirm) { postConfirmationApi({ code: code, id: isUserId.id }); setToggleModal(false); setConfirm(false) }

    }, [reg, log, confirm, confirm2])
    return (
        <>
            {
                toggleModal ?
                    <div className='modal-container animate__animated animate__fadeIn'>
                        < div onClick={() => {
                            closeCleareModal()
                        }} className="close-model" ></div >
                        <div className="modal-content">
                            <div className="title-model-switch">
                                <div onClick={() => { setModeModal(true); if (modalSwitch) { clearValue2() } }} className={modeModal ? "join-model" : "join-model action-model"}>Вход</div>
                                <div onClick={() => { setModeModal(false); if (!modalSwitch) { clearValue() } }} className={modeModal ? "reg-model action-model2" : "reg-model"}>Регистрация</div>
                            </div>
                            {
                                modeModal ? confirmMail2 ? <form className="form-modal2">
                                    <div className="confirm-mail">Подтверждение почты</div>
                                    <div className="your-email"><span>Профиль не подтвержден.</span> <br /> На вашу почту отправлен код</div>
                                    <div className="form-modal2-code">
                                        <span className='your-code'>Код:</span>
                                        <input value={code} onChange={(e) => { CheckingCode(e.target.value); setCode(e.target.value) }} className="code-modal" placeholder='Введите код' />
                                    </div>
                                    <div onClick={() => setConfirm2(true)} className="confirm-again">Отправить еще раз</div>
                                    <div className="message-error">{isMessageError}</div>
                                    <button onClick={(e) => { if (value4) { e.preventDefault(); setConfirm(true) } }} className='registration-modal confirm-mail-btn'>Отправить</button>
                                </form> : <form className='form-modal' action="#">
                                    {/*<input onInput={(e) => CheckingLogin(e.target.value)} className={login ? 'login-modal' : 'login-modal login-modal-red'} placeholder='Введите логин' type="text" name=""  />*/}
                                    <input ref={ref1} onBlur={(e) => CheckingMail(e.target.value)} className={mail ? 'email-modal' : 'email-modal error-red'} placeholder='Введите email' type="email" name="" />
                                    {mail ? '' : <div className="modal-error">Введеный Email не корректный</div>}
                                    <input ref={ref2} onBlur={(e) => CheckingPassword(e.target.value)} className={password ? 'password-modal' : 'password-modal error-red'} placeholder='Введите пароль' type="password" name="" />
                                    {password ? '' : <div className="modal-error">Ваш пароль должен содержать до 8 символов верхнего и нижнего регистров, а так же цифры.</div>}
                                    <div className="message-error">{isMessageError}</div>
                                    <button onClick={(e) => { if (value2 && value3) { e.preventDefault(); setLog(true) } }} className='registration-modal'><span>Вход</span></button>
                                </form> : confirmMail ? <form className="form-modal2">
                                    <div className="confirm-mail">Подтверждение почты</div>
                                    <div className="your-email">На вашу почту отправлен код</div>
                                    <div className="form-modal2-code">
                                        <span className='your-code'>Код:</span>
                                        <input value={code} onChange={(e) => { CheckingCode(e.target.value); setCode(e.target.value) }} className="code-modal" placeholder='Введите код' />
                                    </div>
                                    <div onClick={() => setConfirm2(true)} className="confirm-again">Отправить еще раз</div>
                                    <div className="message-error">{isMessageError}</div>
                                    <button onClick={(e) => { if (value4) { e.preventDefault(); setConfirm(true) } }} className='registration-modal confirm-mail-btn'>Отправить</button>
                                </form> : <form className='form-modal' action="#">
                                    {/*<input className='login-modal' placeholder='Введите логин' type="text" name=""  />*/}
                                    <input ref={ref3} onBlur={(e) => CheckingWorldName(e.target.value)} className={name ? 'name-modal' : 'name-modal error-red'} placeholder='Введите имя' type="text" name="" />
                                    {name ? '' : <div className="modal-error">Введенное имя не корректно</div>}
                                    <div className="password-modal-wrap">
                                        <input ref={ref4} onBlur={(e) => CheckingPassword(e.target.value)} className={password ? 'password-modal' : 'password-modal error-red'} placeholder='Введите пароль' type={showPassword ? "password" : "text"} name="" />
                                        <img onClick={() => setShowPassword(!showPassword)} src={showPassword ? show : hidden} alt="" />

                                    </div>
                                    {password ? '' : <div className="modal-error">Ваш пароль должен содержать до 8 символов верхнего и нижнего регистров, а так же цифры.</div>}
                                    <input ref={ref5} onBlur={(e) => CheckingMail(e.target.value)} className={password ? 'email-modal' : 'email-modal error-red'} placeholder='Введите email' type="email" name="" />
                                    {mail ? '' : <div className="modal-error">Введеный Email не корректный</div>}
                                    <div className="message-error">{isMessageError}</div>
                                    <button onClick={(e) => { if (value1 && value2 && value3) { e.preventDefault(); setReg(true) } }} className='registration-modal'><span>Зарегистрироваться</span></button>
                                </form>
                            }
                        </div>
                    </div > : ''
            }
        </>

    )
}

export default Modal


