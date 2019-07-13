import React from 'react';
import mapUrl from 'rootSrc/resource/map.gif'
import 'rootSrc/less/navHome.less';
class NavHome extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='nav-home'>
                <div className="home-box">
                    <img src={mapUrl} alt=""/>
                </div>
            </div>
        )
    }
}
export default NavHome