
import { Button, DatePicker, Form, Input, Select, Typography } from 'antd';
import type { FormProps } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React, { useEffect } from 'react';

dayjs.extend(customParseFormat);

// const dateFormat = 'YYYY-MM-DD';

type FieldType = {
    email?: string;
    date?: dayjs.Dayjs;
    service?: string;
    // time?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};


function BookAppointment() {

    const [form] = Form.useForm<FieldType>();
    const [serviceSelected, setServiceSelected] = React.useState(false);
    const [timeSlots, setTimeSlots] = React.useState<dayjs.Dayjs[]>([])
    const now = dayjs();

    const dateValue = Form.useWatch('date', form)
    const serviceValue = Form.useWatch('service', form);
    const emailValue = Form.useWatch('email', form)



    useEffect(() => {



        const fetchAvailableTimeslots = async () => {
            if (dateValue === undefined) {
                console.log('dateValue is undefined')
                return;
            }
            console.log('dateValue:', dateValue)
            try {



                const timeslots: dayjs.Dayjs[] = [];
                for (let i = 0; i <= 10; ++i) {
                    const date = dayjs(dateValue).add(i, 'hour')
                    timeslots.push(date)
                }
                setTimeSlots(timeslots)
            } catch (error) {
                console.error("while trying to load images: ", error)
            }
        }
        fetchAvailableTimeslots()

    }, [dateValue, serviceValue])




    return (
        <div>
            <h2>Book Appointment</h2>
            <div style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center', justifyItems: 'center', display: 'flex' }}>
                <div style={{ width: '85%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <Form form={form} size='large' layout='horizontal' style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: 600 }}
                        onFinish={onFinish} onFinishFailed={onFinishFailed}
                    >
                        <Form.Item<FieldType> required label='Select a date' name="date" initialValue={now}
                            rules={[{ required: true, message: 'Please select a date.' }]}
                        >
                            <DatePicker
                                minDate={now}
                                maxDate={now.add(30, 'day')}
                            />
                        </Form.Item>
                        <Form.Item<FieldType> required label='Service' name="service"
                            rules={[{ required: true, message: 'Please select a service.' }]}
                        >
                            <Select>
                                <Select.Option value='demo'>Demo</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item<FieldType> label='Contact email' name="email">
                            <Input />
                        </Form.Item>

                        {serviceSelected && (
                            <Form.Item<FieldType> required label='Time Slot' name='time'
                                rules={[{ required: true, message: 'Please select a time slot.' }]}
                            >
                                <Input />
                            </Form.Item>
                        )}

                        <Form.Item>
                            <Button disabled={serviceSelected} style={{ marginTop: '25px' }} type='primary' htmlType="submit" size='large'>Submit</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <Typography>
                <pre>Email Value: {emailValue}</pre>
                <pre>Service Value: {serviceValue || ''}</pre>
                <pre>Date Value: {dateValue?.format()}</pre>
            </Typography>
        </div>

    )
}

export default BookAppointment
