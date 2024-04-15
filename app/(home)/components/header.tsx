import "../styles/header.scss"
import  React from 'react'
import Image from 'next/image'

const Header = () => {
    return ( 
        <header>
            <div className="content-header">
                <div className="logo">
                    <h1>MKS</h1>
                    <span>Sistemas</span>
                </div>

                <div className="car">
                    <button>
                        <Image src="/Vector.png" alt="Car Icon" width={19} height={18}/>
                        <div className="quantity-items">
                            <span>0</span>
                        </div>
                    </button>
                </div>
            </div>
        </header>
     );
}
 
export default Header;