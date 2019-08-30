import React from 'react';
import {Link} from 'react-router-dom';

class List extends React.Component{
    activeOption;
    currentPage;
    render() {
        return(
            <div className={`list`}>
                {
                    this.props.arr ?
                        this.props.arr.map((item, index) =>
                            <Link key={item.name} to={`/${this.props.activeOption}/${this.props.currentPage}/${index + 1}`}>
                                <button
                                    className={`button${index}`}
                                    onClick={this.props.func}
                                    style={this.props.active === index ? {
                                        background:`#5fdde3`,
                                        transform: `scale(1.1,1.1)`,
                                        color: `#272c33`} : null}
                                >{item.name ? item.name : item.title}
                                </button>
                            </Link>) :
                        'loading...'
                }
               </div>

        )
    }
}

export default List;