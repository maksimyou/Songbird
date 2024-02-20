import React from 'react'
import './BreadCrumbs.scss'
import { Link } from 'react-router-dom'
import arrow from '../../assets/icon-right-arrow.png'
function BreadCrumbs({ textLink, location }) {

    const pathnames = location.pathname.split('/').filter((el) => el);
    console.log(pathnames);
    return (
        <div className='bread-crumbs-container'>
            <div className="bread-crumbs-content">
                <Link to={'/'} className="bread-crumbs-text">Главная</Link>
                <img src={arrow} alt="" />
                {pathnames.map((e, i) => {
                    const routeTo = `/${pathnames.slice(0, i + 1).join("/")}`;

                    if (pathnames.length - 1 !== i) {
                        return <>
                            <Link to={routeTo} className="bread-crumbs-text">{textLink[i]}</Link>
                            <img src={arrow} alt="" />
                        </>
                    } else {
                        return <>
                            <Link to={routeTo} className="bread-crumbs-text">{textLink[i]}</Link>
                        </>
                    }
                })}

            </div>
        </div>
    )
}

export default BreadCrumbs