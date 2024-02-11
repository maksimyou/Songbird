import React, { Children, useEffect, useRef, useState } from 'react'
import './Modal.scss'


import { UserContextFunc } from '../../Context/UserContext'
function Modal({ toggleModal, setToggleModal }) {
    const { loginApi, registrationApi, isAuth, setIsAuth, loginUserAuth, userFirstName, isFirstName } = UserContextFunc()
    const [modeModal, setModeModal] = useState(false)
    const [name, setName] = useState(true)
    const [password, setPassword] = useState(true)
    const [mail, setMail] = useState(true)
    const [value1, setValue1] = useState('')
    const [value2, setValue2] = useState('')
    const [value3, setValue3] = useState('')
    const [reg, setReg] = useState()
    const [log, setLog] = useState()

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
        ref1.current.value = '';
        ref2.current.value = '';
        setName(true)
        setPassword(true)
        setMail(true)
    }
    const clearValue2 = () => {
        setValue1(false);
        setValue2(false);
        setValue3(false);
        ref3.current.value = '';
        ref4.current.value = '';
        ref5.current.value = '';
        setName(true)
        setPassword(true)
        setMail(true)
    }


    //const CheckingLogin = (str) => {

    //    const regex = /^[a-zA-Z0-9]+$/;
    //    console.log(str)

    //    if (regex.test(str)) {
    //        setLogin(true)
    //        setValue1(true)
    //        setUserData({ ...userData, login: str })
    //        console.log(userData)
    //    } else {
    //        setLogin(false)
    //        setValue1(false)
    //        setUserData({ ...userData, login: str })
    //    }
    //}


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

    useEffect(() => {
        if (reg) { registrationApi(userData); setToggleModal(false); setReg(false) }
        if (log) { loginApi(userData); setToggleModal(false); setLog(false) }
    }, [reg, log])

    return (
        <>
            {
                toggleModal ?
                    <div className='modal-container animate__animated animate__fadeIn'>
                        < div onClick={() => { setToggleModal(false) }} className="close-model" ></div >
                        <div className="modal-content">
                            <div className="title-model-switch">
                                <div onClick={() => { setModeModal(true); clearValue2() }} className={modeModal ? "join-model" : "join-model action-model"}>Вход</div>  <div onClick={() => { setModeModal(false); clearValue() }} className={modeModal ? "reg-model action-model2" : "reg-model"}>Регистрация</div>
                            </div>
                            {
                                modeModal ? <form className='form-modal' action="#">
                                    {/*<input onInput={(e) => CheckingLogin(e.target.value)} className={login ? 'login-modal' : 'login-modal login-modal-red'} placeholder='Введите логин' type="text" name="" id="" />*/}
                                    <input ref={ref1} onBlur={(e) => CheckingMail(e.target.value)} className={mail ? 'email-modal' : 'email-modal error-red'} placeholder='Введите email' type="email" name="" id="" />
                                    {mail ? '' : <div className="modal-error">Введеный Email не корре́ктный"</div>}
                                    <input ref={ref2} onBlur={(e) => CheckingPassword(e.target.value)} className={password ? 'password-modal' : 'password-modal error-red'} placeholder='Введите пароль' type="password" name="" id="" />
                                    {password ? '' : <div className="modal-error">Введеный пароль не корре́ктный"</div>}
                                    <button onClick={(e) => { if (value2 && value3) { e.preventDefault(); setLog(true) } }} className='registration-modal'><span>Вход</span></button>
                                </form> : <form className='form-modal' action="#">
                                    {/*<input className='login-modal' placeholder='Введите логин' type="text" name="" id="" />*/}
                                    <input ref={ref3} onBlur={(e) => CheckingWorldName(e.target.value)} className={name ? 'name-modal' : 'name-modal error-red'} placeholder='Введите имя' type="text" name="" id="" />
                                    {name ? '' : <div className="modal-error">Введенное имя не корре́ктно"</div>}
                                    <input ref={ref4} onBlur={(e) => CheckingPassword(e.target.value)} className={password ? 'password-modal' : 'password-modal error-red'} placeholder='Введите пароль' type="password" name="" id="" />
                                    {password ? '' : <div className="modal-error">Введеный пароль не корре́ктный"</div>}
                                    <input ref={ref5} onBlur={(e) => CheckingMail(e.target.value)} className={password ? 'email-modal' : 'email-modal error-red'} placeholder='Введите email' type="email" name="" id="" />
                                    {mail ? '' : <div className="modal-error">Введеный Email не корре́ктный"</div>}
                                    {/*<input className='tel-modal' placeholder='Введите ваш номер телефона' type="text" name="" id="" />*/}
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


