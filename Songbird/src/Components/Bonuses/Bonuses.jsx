import React from 'react'
import './Bonuses.scss'
import { UserContextFunc } from '../../Context/UserContext'
import { useEffect } from 'react';
import { useState } from 'react';


function Bonuses() {
    const [devBonuses, setDevBonuses] = useState(false)
    const { isSettingBonuses, updateAddSettingBonuses, getSettingBonuses, setIsSettingBonuses } = UserContextFunc();



    const hundlerFuncSetBounuses = (id, str) => {
        console.log(str)
        let arr = [...isSettingBonuses];
        arr[id].percent = str
        console.log(arr)

        setIsSettingBonuses(arr)
        console.log(isSettingBonuses)
    }

    useEffect(() => {
        getSettingBonuses()
    }, [])

    useEffect(() => {
        if (devBonuses) { updateAddSettingBonuses({ list: isSettingBonuses }); setDevBonuses(false) }
    }, [devBonuses])



    return (
        <div className='bonuses-container'>
            <div className="bonuses-content">
                <div className="bonuses-content-title">Настройка бонусов за заказы</div>
                <div className="bonuses-content-inputs">
                    {
                        isSettingBonuses.map((e, id) =>
                            <> <div key={id} className="bonuses-input">
                                <span>{e.text}</span>
                                <input onChange={(e) => {
                                    hundlerFuncSetBounuses(id, e.target.value)
                                }} value={isSettingBonuses[id].percent} type="text" placeholder='' />
                                <span>%</span>
                            </div>
                            </>
                        )
                    }
                </div>
                <button onClick={() => setDevBonuses(true)} className='bonuses-content-btn'>Сохранить</button>
            </div>
        </div>
    )
}

export default Bonuses