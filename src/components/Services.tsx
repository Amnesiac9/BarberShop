import { FacebookOutlined } from '@ant-design/icons';
import { Button } from 'antd';

function Services() {
    return (
        //TODO: Loop through services and show a nice table
        <div>services

            <div>

                <Button type='link'>
                    Check us out on Facebook!
                    <FacebookOutlined />
                </Button>
            </div>
        </div>

    )
}

export default Services
