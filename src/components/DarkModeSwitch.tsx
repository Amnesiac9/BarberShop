
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Switch } from 'antd';

function DarkModeSwitch(props: { checked: boolean; onChange: () => void; }) {
    return (
        <Switch checked={props.checked} checkedChildren={<MoonOutlined />} unCheckedChildren={<SunOutlined />} onChange={() => props.onChange()} />
    )
}

export default DarkModeSwitch
