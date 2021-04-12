const Button = (props) => {
    // onClick={this.onLoginSubmit} className="ui inverted green button"
    return (
        <button {...props}>{props.children}</button>
    )
}

Button.defaultProps = {
    className:"ui inverted green button"
};

export default Button;
