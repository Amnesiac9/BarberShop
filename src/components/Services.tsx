import { FacebookOutlined } from '@ant-design/icons';
import { Button, List, Spin } from 'antd';
import { Service, fetchServices } from '../utils/fetchServices';
import React from 'react';
import Card from '../components-styled/Card.styled';

function Services() {

    const [services, setServices] = React.useState<Service[]>([])

    React.useEffect(() => {
        fetchServices(setServices)
    }, [])


    if (services.length < 0) {
        return (<Spin size='large' />)
    }

    return (
        <div>
            {/* <h3>Services</h3> */}
            <Card $center title='Services'>
                <List
                    // grid={{
                    //     gutter: 16,
                    //     xs: 1,
                    //     sm: 2,
                    //     md: 4,
                    //     lg: 4,
                    //     xl: 6,
                    //     xxl: 3,
                    // }}
                    dataSource={services}
                    renderItem={(item, index) => (
                        <List.Item key={index}>
                            <List.Item.Meta
                                title={'$' + item.price}
                                description={item.name}
                            />
                        </List.Item>
                    )}
                />
            </Card>

            <Button type='link'>
                Check us out on Facebook!
                <FacebookOutlined />
            </Button>
        </div>
    )
}

export default Services
