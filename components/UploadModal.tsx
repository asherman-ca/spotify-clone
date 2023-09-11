import useUploadModal from '@/hooks/useUploadModal'
import { FC } from 'react'
import Modal from './Modal'

interface UploadModalProps {}

const UploadModal: FC<UploadModalProps> = ({}) => {
	const { onClose, isOpen } = useUploadModal()
	return (
		<Modal
			title='Upload a song'
			description='Upload your own song to the library.'
			isOpen={isOpen}
			onChange={onClose}
		>
			thing
		</Modal>
	)
}

export default UploadModal
