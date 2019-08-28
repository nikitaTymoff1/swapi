import React from 'react';
import {Link} from "react-router-dom";

class CoolButton extends React.Component{
    render() {
        return(
            <Link to={`/${this.props.name}/${this.props.pages}`}>
                <button className={this.props.name + ` box`}
                        onClick={this.props.func}
                        style={this.props.name === this.props.active
                            ? {
                                transform: `scale(1.1,1.1)`,
                                background: `#85dbe4` ,
                                color: `#282c34`
                            }
                            : {}
                        }
                >
                    {this.props.name.toUpperCase()}
                </button>
            </Link>
        )
    }
}

export default CoolButton;