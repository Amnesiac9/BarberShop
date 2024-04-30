
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
    time?: string;
};

interface Service {
    name: string,
    price: string,
}

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


    const dateValue = Form.useWatch('date', form)
    const serviceValue = Form.useWatch('service', form);
    const emailValue = Form.useWatch('email', form)

    const now = dayjs();
    const firstAvailableDay = now.hour() > 17 ? now.set('hour', 9).set('minute', 0).set('second', 0).add(1, 'day') : now


    useEffect(() => {



        const fetchAvailableTimeslots = async () => {
            if (dateValue === undefined) {
                console.log('dateValue is undefined')
                return;
            }
            console.log('dateValue:', dateValue.format())
            try {

                // starting hour is 9
                // ending hour is 17
                const todayEndTime = dayjs(dateValue).set('hour', 17).set('minute', 0);
                const hoursLeft = -(dateValue.diff(todayEndTime, 'hour'))
                // console.log('todayEndTime:', todayEndTime.format())
                // console.log('hours left:', hoursLeft)


                const timeslots: dayjs.Dayjs[] = [];
                for (let i = 0; i < hoursLeft; ++i) {
                    const date = dateValue.add(i, 'hour')
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
                        <Form.Item<FieldType> required label='Select a date' name="date" initialValue={firstAvailableDay}
                            rules={[{ required: true, message: 'Please select a date.' }]}
                        >
                            <DatePicker
                                minDate={firstAvailableDay}
                                maxDate={firstAvailableDay.add(30, 'day')}
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

                        {serviceValue && dateValue && (
                            <Form.Item<FieldType> required label='Time Slot' name='time'
                                rules={[{ required: true, message: 'Please select a time slot.' }]}
                            >
                                <Input />
                            </Form.Item>
                        )}

                        <Form.Item>
                            <Button disabled={!serviceValue || !dateValue} style={{ marginTop: '25px' }} type='primary' htmlType="submit" size='large'>Submit</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <Typography>
                <pre>Email Value: {emailValue}</pre>
                <pre>Service Value: {serviceValue || ''}</pre>
                <pre>Date Value: {dateValue?.format() ?? ''}</pre>
                <pre>Available Times: {timeSlots.length}</pre>
            </Typography>
        </div>

    )
}

export default BookAppointment
