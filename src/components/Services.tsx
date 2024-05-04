import { FacebookOutlined } from '@ant-design/icons';
import { Button, List, Spin } from 'antd';
import { Service, fetchServices } from '../utils/fetchServices';
import React from 'react';
import InfoCard from '../components-styled/InfoCard.styled';

function Services() {

    const [services, setServices] = React.useState<Service[]>([])

    React.useEffect(() => {
        fetchServices(setServices)
    }, [])


    if (services.length < 0) {
        return (<Spin size='large' />)
    }

    return (
        //TODO: Loop through services and show a nice table
        <div>
            <div>
                <h3>Services</h3>
                <InfoCard $nowrap>
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
                </InfoCard>

                <Button type='link'>
                    Check us out on Facebook!
                    <FacebookOutlined />
                </Button>
            </div>
        </div>

    )
}

export default Services
