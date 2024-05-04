
import { Badge, Button, DatePicker, Form, Input, Radio, Result, Select, Space } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import type { FormProps } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React, { useEffect } from 'react';

import Divider from '../components-styled/Divider.styled';
import InfoCard from '../components-styled/InfoCard.styled';
import { Service, fetchServices } from '../utils/fetchServices';

dayjs.extend(customParseFormat);


type FieldType = {
    name?: string;
    email?: string;
    date?: dayjs.Dayjs;
    service?: string;
    time?: string;
};


interface TimeSlot {
    time: dayjs.Dayjs;
    booked: boolean;
}



const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};




function BookPage(props: { remount: () => void }) {

    const [form] = Form.useForm<FieldType>();
    const [showSuccess, setShowSuccess] = React.useState(false);
    const [openPicker, setOpenPicker] = React.useState(false);
    const [services, setServices] = React.useState<Service[]>([])
    const [selectedService, setSelectedService] = React.useState<Service>()
    const [timeSlots, setTimeSlots] = React.useState<TimeSlot[]>([]);
    const bookedTimes = React.useRef<Map<string, boolean>>(new Map());
    const booking = React.useRef<FieldType>();


    const dateValue = Form.useWatch('date', form)
    const serviceValue = Form.useWatch('service', form);
    const timeValue = Form.useWatch('time', form);
    // const nameValue = Form.useWatch('name', form)
    //const emailValue = Form.useWatch('email', form)

    const now = dayjs();
    const firstAvailableDay = now.hour() > 17 ? now.set('hour', 0).set('minute', 0).set('second', 0).add(1, 'day') : now
    //const [customDateValue, setCustomDateValue] = React.useState(firstAvailableDay)
    // const firstAvailableDay = now.set('hour', 10)


    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        booking.current = values
        booking.current.service = selectedService?.name + '$' + selectedService?.price
        setShowSuccess(true);
    };

    // This was pretty annoying, same problem as with Ant Design's menu component,
    // they don't expose an obvious way to trigger then click event or effect the value and trigger the updates that happen from that change.
    // This uses a querySelectorAll (Since the date buttons in the date picker are hidden)
    // and then loops over them to find the next day based on the title.
    // If it can't find it, it's because the date picker hasn't loaded in thos elements, so instead we load them
    // this is kind of hacky and I don't like it since it pops up on screen.
    const incrementDate = () => {
        if (dateValue === undefined) {
            console.log('dateValue undefined')
            return
        }

        const nextDay = dateValue.add(1, 'day').format('YYYY-MM-DD')
        console.log('datequery:', nextDay)

        const antPickerCells = document.querySelectorAll(`.ant-picker-cell`) as NodeListOf<HTMLElement> //td[title="${date}"]
        if (antPickerCells.length === 0) {
            setOpenPicker(true)
            console.log("antPickerCells is 0 length. Opening picker to load in cells.")
            return;
        }

        antPickerCells.forEach((e: HTMLElement) => {
            if (e.title === nextDay) {
                e.click()
                return
            }
        })

    }

    useEffect(() => {
        // Update our services from a JSON file.
        fetchServices(setServices)
    }, [])


    useEffect(() => {
        if (openPicker === true) {
            setOpenPicker(false)
        } else {
            incrementDate()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openPicker])



    useEffect(() => {
        const fetchAvailableTimeslots = async () => {
            if (dateValue === undefined) {
                // console.log('dateValue is undefined')
                return;
            }
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
                // These would normally be stored in a db and fetched.
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
            <h1 id='bookapp'>Book Appointment</h1>
            {!showSuccess && (
                <div style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center', justifyItems: 'center', display: 'flex' }}>
                    <div style={{ width: '85%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <Form form={form} size='large' layout='horizontal' style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: 600 }}
                            onFinish={onFinish} onFinishFailed={onFinishFailed}
                        >
                            <Form.Item<FieldType> required label='Select a date' name="date" initialValue={firstAvailableDay}
                                rules={[{ required: true, message: 'Please select a date.' }]}
                            >
                                <DatePicker allowClear={false} open={openPicker == true ? true : undefined} //defaultOpen 
                                    minDate={firstAvailableDay}
                                    maxDate={firstAvailableDay.add(30, 'day')}
                                />
                            </Form.Item>

                            {dateValue && (
                                <Form.Item<FieldType> required label='Time Slot' name='time'
                                    rules={[{ required: true, message: 'Please select a time slot.' }]}
                                >
                                    <Radio.Group size='large' >
                                        <Space key={'space'} direction='horizontal' wrap={true} size='middle' >
                                            {timeSlots.map((time, index) => (
                                                <Badge key={'badge-' + index} showZero={time.booked} size='small' count={time.booked ? 'Booked' : 0} offset={[-30, 0]}>
                                                    <Radio.Button key={'radio-' + index} disabled={time.booked} value={time.time.format('hh:mm A')}>{time.time.format('hh:mm A')}</Radio.Button>
                                                </Badge>
                                            ))}
                                            <Button onClick={incrementDate} type='text'>Next Day...</Button>
                                        </Space>
                                    </Radio.Group>
                                </Form.Item>
                            )}
                            <Form.Item<FieldType> required label='Service' name="service"
                                rules={[{ required: true, message: 'Please select a service.' }]}
                            >
                                <Select onChange={(value: string) => {
                                    console.log('value', value)
                                    setSelectedService(services[parseInt(value.split('$')[1])])
                                    console.log('services length', services.length)
                                }}>
                                    {services.map((service, index) => (
                                        <Select.Option key={'service-' + index} value={service.name + '$' + index}>${service.price} - {service.name}</Select.Option>
                                    ))}
                                    {/* <Select.Option value='demo'>Demo</Select.Option> */}
                                </Select>
                            </Form.Item>
                            <Form.Item<FieldType> required label='Name' name="name"
                                rules={[{ required: true, message: 'Please enter your name.' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item<FieldType> label='Email' name="email"
                                rules={[{ type: 'email' }]}>
                                <Input />
                            </Form.Item>

                            {serviceValue && (
                                <>
                                    <Divider />
                                    <InfoCard $size='large'>
                                        <p>
                                            {selectedService?.name}
                                        </p>
                                        <p><strong>${selectedService?.price}</strong></p>
                                        <p>{dateValue?.format('DD/MM/YYYY')} {timeValue ? `@ ${timeValue}` : ''}</p>
                                    </InfoCard>
                                </>
                            )}
                            <Divider />
                            <Form.Item>
                                <Button //disabled={!serviceValue || !dateValue || !timeValue || !nameValue}
                                    style={{ marginTop: '25px' }}
                                    type='primary'
                                    htmlType="submit"
                                    size='large'>Book!
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>

            )}
            {showSuccess && (
                <Result
                    icon={<SmileOutlined />}
                    title={`You are all booked! See you soon!`}
                    extra={
                        <div>
                            <Divider />
                            <h5>Details</h5>
                            <InfoCard $align='left'>

                                <p><strong>Service: </strong>{booking.current?.service?.split('$')[0]}</p>
                                <p><strong>Price:</strong> ${booking.current?.service?.split('$')[1]}</p>
                                <p><strong>Date:</strong> {booking.current?.date?.format('DD/MM/YYYY')} {booking.current?.time ? `@ ${booking.current?.time}` : ''}</p>
                                <p><strong>Location:</strong> 42 West Wallaby Way, Sydney, AU </p>
                            </InfoCard>
                            <Divider />
                            <Button size='large' type="primary" onClick={() => {
                                setShowSuccess(false)
                                props.remount()
                                //window.location.reload()
                            }}>Back</Button>
                        </div>
                    }
                />
            )}
        </div>
    )
}

export default BookPage
