import React from 'react';

class List extends React.Component{
    arr;
    render() {
        return(
            <div className={`list`}>
                {
                    this.props.arr ?
                        this.props.arr.map((item, index) =>
                            <button
                                key={item.name}
                                className={`button${index}`}
                                onClick={this.props.func}
                                style={this.props.active === index ? {
                                    background:`#5fdde3`,
                                    transform: `scale(1.1,1.1)`,
                                    color: `#272c33`} : null}
                            >{item.name}
                            </button>) :
                        'loading...'
                }
               </div>
        )
    }
}

export default List;