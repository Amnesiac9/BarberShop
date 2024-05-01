
import { Badge, Button, DatePicker, Flex, Form, Input, Radio, Select, Space, Typography } from 'antd';
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

// interface Service {
//     name: string,
//     price: string,
// }

interface TimeSlot {
    time: dayjs.Dayjs;
    booked: boolean;
}

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};






function BookAppointment() {

    const [form] = Form.useForm<FieldType>();
    // const [serviceSelected, setServiceSelected] = React.useState(false);
    const [timeSlots, setTimeSlots] = React.useState<TimeSlot[]>([])
    const bookedTimes = React.useRef<Map<string, boolean>>(new Map())
    const [dateAdd, setDateAdd] = React.useState(0)


    const dateValue = Form.useWatch('date', form)
    const serviceValue = Form.useWatch('service', form);
    const emailValue = Form.useWatch('email', form)

    const now = dayjs();
    const firstAvailableDay = now.hour() > 17 ? now.set('hour', 0).set('minute', 0).set('second', 0).add(1, 'day') : now
    // const firstAvailableDay = now.set('hour', 10)


    // TODO: This don't work
    const incrementDate = () => {
        setDateAdd(dateAdd + 1)
    }


    useEffect(() => {
        const fetchAvailableTimeslots = async () => {
            if (dateValue === undefined) {
                // console.log('dateValue is undefined')
                return;
            }
            // console.log('dateValue:', dateValue.format())
            try {

                let currentDate = dateValue

                if (dateValue.isSame(dayjs(), 'day')) {
                    currentDate = currentDate.set('hour', dayjs().hour())
                }

                // Grab the dif between the selected time and the start time of the day. Subtract that from our available hours.
                const availableHours = 8
                const todayStartTime = dayjs(dateValue).set('hour', 9).set('minute', 0).set('second', 0)
                const dateValueDifFromStartTime = currentDate.diff(todayStartTime, 'hour')
                let hoursLeft = availableHours - dateValueDifFromStartTime

                // If our hours left is > 8 or < 0, set to those maximums.
                hoursLeft = hoursLeft > 8 ? 8 : hoursLeft
                hoursLeft = hoursLeft < 0 ? 0 : hoursLeft


                // console.log('currentSelectedDate:', currentDate.format())
                // console.log('todayStartTime:', todayStartTime.format())
                // console.log('todayEndTime:', todayEndTime.format())
                // console.log('dateValueDifFromStartTime:', dateValueDifFromStartTime)
                // console.log('hours left:', hoursLeft)
                // console.log('available hours:', availableHours)


                // Generate timeslots, randomly generate booked days (closer to today more likely).
                // Persist in memory in a map.
                // These would normally be stored in a db.
                // TODO: Grab user booked dates from internal storage?
                const daysFromToday = dateValue.diff(dayjs(), 'days')
                const timeslots: TimeSlot[] = [];
                for (let i = 0; i < 8; ++i) {

                    const timeslot: TimeSlot = {
                        time: todayStartTime.add(i, 'hour'),
                        booked: i < 8 - hoursLeft
                    }
                    if (bookedTimes.current.has(timeslot.time.format())) {
                        timeslot.booked = bookedTimes.current.get(timeslot.time.format()) || false
                    } else {
                        const number = Math.random() * (100 - (daysFromToday * 2)) + 1
                        //console.log(number)
                        if (number > 60) {
                            timeslot.booked = true
                        }
                        bookedTimes.current.set(timeslot.time.format(), timeslot.booked)
                    }
                    timeslots.push(timeslot)
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
                        <Form.Item<FieldType> required label='Service' name="service"
                            rules={[{ required: true, message: 'Please select a service.' }]}
                        >
                            <Select>
                                <Select.Option value='demo'>Demo</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item<FieldType> required label='Select a date' name="date" initialValue={firstAvailableDay}
                            rules={[{ required: true, message: 'Please select a date.' }]}
                        >
                            <DatePicker
                                minDate={firstAvailableDay}
                                maxDate={firstAvailableDay.add(30, 'day')}
                            />
                        </Form.Item>

                        {/* serviceValue && */}
                        {dateValue && (
                            <Form.Item<FieldType> required label='Time Slot' name='time'
                                rules={[{ required: true, message: 'Please select a time slot.' }]}
                            >
                                <Radio.Group size='large' >
                                    <Space key={'space'} direction='horizontal' wrap={true} size='middle' >
                                        {timeSlots.map((time, index) => (
                                            <Badge key={'badge-' + index} showZero={time.booked} size='small' count={time.booked ? 'Booked' : 0} offset={[-30, 0]}>
                                                <Radio.Button key={'radio-' + index} disabled={time.booked} value={time.time}>{time.time.format('hh:mm A')}</Radio.Button>
                                            </Badge>
                                        ))}
                                        {/* //TODO: Fix this button. Maybe paginate instead... */}
                                        <Button onClick={() => incrementDate()} type='text'>Next Day...</Button>
                                    </Space>
                                </Radio.Group>
                            </Form.Item>
                        )}
                        <Form.Item<FieldType> label='Contact email' name="email">
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button disabled={!serviceValue || !dateValue} style={{ marginTop: '25px' }} type='primary' htmlType="submit" size='large'>Submit</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            {/* <Typography>
                <pre>Email Value: {emailValue}</pre>
                <pre>Service Value: {serviceValue || ''}</pre>
                <pre>Date Value: {dateValue?.format() ?? ''}</pre>
                <pre>Available Times: {timeSlots.length}</pre>
            </Typography> */}
        </div>

    )
}

export default BookAppointment
