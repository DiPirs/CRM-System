import { LoadingOutlined } from '@ant-design/icons'
import { Flex, Spin } from 'antd'

export default function LoadingSpinner() {
	return (
		<Flex align='center' gap='middle' content='center'>
			<Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
		</Flex>
	)
}
