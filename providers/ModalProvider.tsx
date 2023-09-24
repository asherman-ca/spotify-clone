'use client'

import { useEffect, useState } from 'react'

import Modal from '@/components/Modal'
import AuthModal from '@/components/AuthModal'
import UploadModal from '@/components/UploadModal'
import SubscribeModal from '@/components/SubscribeModal'
import { ProductWithPrice } from '@/types'

interface ModalProviderProps {
	products: ProductWithPrice[]
}

const ModalProvider: React.FC<ModalProviderProps> = ({ products }) => {
	const [isMounted, setIsMounted] = useState(false)
	// trick to prevent SSR of modal, which creates hydration errors
	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) return null

	return (
		<>
			<AuthModal />
			<SubscribeModal products={products} />
			<UploadModal />
		</>
	)
}

export default ModalProvider
