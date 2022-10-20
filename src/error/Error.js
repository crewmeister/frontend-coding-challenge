import React from "react";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {error: false, errorInfo: null};
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <div style={{display: "flex", justifyContent: "center"}}>
                    <h2>Something went wrong.</h2>
                    <Link to={"/"}>
                        <Button
                            color="primary"
                            variant="contained"
                        >
                            Go Home
                        </Button>
                    </Link>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
