import Meta from "antd/es/card/Meta";
import Card from "../components-styled/Card.styled"
import Divider from "../components-styled/Divider.styled"
import { Alert, Tooltip } from 'antd';
import React from "react";

function Address() {

    const [showAlert, setShowAlert] = React.useState(false);

    const copyClick = () => {
        navigator.clipboard.writeText('42 West Wallaby Way, Sydney, AU');
        setShowAlert(true);

        setTimeout(() => {
            setShowAlert(false);
        }, 2000)
    }

    return (
        <div>
            <Tooltip title="Click to copy!">
                <Card $center hoverable onClick={copyClick}>
                    <h2>Street Address</h2>
                    <Divider />
                    <Meta description='42 West Wallaby Way, Sydney, AU' />
                    <br />
                </Card>
            </Tooltip>
            {showAlert && (
                <Alert
                    message="Copied!"
                    type="success"
                    showIcon
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 9999, // Ensure the alert appears above other elements
                    }}
                />
            )}
        </div>
    )
}

export default Address;
