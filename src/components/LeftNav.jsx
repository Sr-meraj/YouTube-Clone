import React, { Fragment } from 'react'
import {useNavigate} from 'react-router-dom'
import { categories } from "../utilities/constants";
import LeftNavMenuItem from './LeftNavMenuItem';
import { useData } from '../context/contextApi';

function LeftNav() {
  const {selectedCategory, setSelectedCategory, mobileMenu} = useData();
  const navigate = useNavigate()


  const clickHandler = (name, type)=>{
    switch (type) {
      case 'category':
        return setSelectedCategory(name)
        break;
      case 'home':
        return setSelectedCategory(name)
        break;
      case 'menu':
        return false
        break;
    
      default:
        break;
    }
  }

  return (
    <div className={`md:block w-[240px] overflow-y-auto h-full py-4 dark:bg-black absolute md:relative z-10 translate-x-[-240px] md:translate-x-[0px] transition-all ${mobileMenu ? "translate-x-0" : ''}`}>
      <div className="flex px-5 flex-col">
        {
          categories.map((item)=>{
            return(
              <Fragment key={item.name}>
                <LeftNavMenuItem
                  text={item?.type === 'home'? 'Home' : item.name}
                  icon={item.icon}
                  action={()=>{clickHandler(item?.name, item.type); navigate('/')}}
                  className={`${selectedCategory === item.name ? "bg-black/10 dark:bg-white/[0.3]" : ''}`}
                 />
                 {
                  item.divider && (
                    <hr className="my-5 border-black/20 dark:border-white/[0.2]" />
                  )
                 }
              </Fragment>
            );
          })
        }
      </div>
    </div>
  )
}

export default LeftNav
