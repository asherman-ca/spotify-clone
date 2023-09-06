'use client'

import { useEffect, useState } from 'react'

import Modal from '@/components/Modal'
import AuthModal from '@/components/AuthModal'

const ModalProvider = () => {
	const [isMounted, setIsMounted] = useState(false)
	// trick to prevent SSR of modal, which creates hydration errors
	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) return null

	return (
		<>
			<AuthModal />
			{/* <Modal isOpen={false} /> */}
		</>
	)
}

export default ModalProvider
