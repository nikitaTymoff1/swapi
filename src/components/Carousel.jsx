import React from 'react';
import {Link} from "react-router-dom";
import List from "./list";
class Carousel extends React.Component {
    render() {
        return (
            <div className={`carousel`}>
                <Link onClick={()=>{this.props.func[0]('prev')}} to={`/${this.props.active}/${this.props.page + 1}`}>
                    <div className={`prev-btn main-btn`}/>
                </Link>
                <List arr={this.props.arr
                    ? this.props.arr
                    : null}
                      func={this.props.func[1]}
                      active={this.props.chosenOption}
                      activeOption={this.props.active}
                      currentPage={this.props.page}
                />
                <Link onClick={()=>{this.props.func[0]('next')}} to={`/${this.props.active}/${this.props.page + 1}`}>
                    <div className={`next-btn main-btn`}/>
                </Link>
            </div>
        )
    }
}
export default Carousel