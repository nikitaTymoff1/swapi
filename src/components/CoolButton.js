import React from 'react';

class CoolButton extends React.Component{
    render() {
        return(
            <button className={this.props.name + ` box`}
                    onClick={this.props.func}
                    style={this.props.name === this.props.active
                        ? {
                            height: `40px`,
                            width: `16vw`,
                            background: `#85dbe4`,
                            color: `#282c34`}
                        : {}
                    }

            >
                {this.props.name.toUpperCase()}
            </button>
        )
    }
}

export default CoolButton;