'use client'

import uniqid from 'uniqid'
import useUploadModal from '@/hooks/useUploadModal'
import { FC, useState } from 'react'
import Modal from './Modal'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Input from './Input'
import Button from './Button'
import { toast } from 'react-hot-toast'
import { useUser } from '@/hooks/useUser'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'

interface UploadModalProps {}

const UploadModal: FC<UploadModalProps> = ({}) => {
	const supabaseClient = useSupabaseClient()
	const router = useRouter()
	const { onClose, isOpen } = useUploadModal()
	const [isLoading, setIsLoading] = useState(false)
	const { user } = useUser()

	const { register, handleSubmit, reset, formState } = useForm<FieldValues>({
		defaultValues: {
			author: '',
			title: '',
			song: null,
			image: null,
		},
	})

	const onChange = (open: Boolean) => {
		if (!open) {
			reset()
			onClose()
		}
	}

	const onSubmit: SubmitHandler<FieldValues> = async (values) => {
		try {
			setIsLoading(true)
			const imageFile = values.image?.[0]
			const songFile = values.song?.[0]

			if (!imageFile || !songFile || !user) {
				return toast.error('Missing fields')
			}

			const uniqueID = uniqid()

			const { data: songData, error: songError } = await supabaseClient.storage
				.from('songs')
				.upload(`song-${values.title}-${uniqueID}`, songFile, {
					cacheControl: '3600',
					upsert: false,
				})

			if (songError) {
				setIsLoading(false)
				return toast.error('Failed song upload')
			}

			// Upload image
			const { data: imageData, error: imageError } =
				await supabaseClient.storage
					.from('images')
					.upload(`image-${values.title}-${uniqueID}`, imageFile, {
						cacheControl: '3600',
						upsert: false,
					})

			if (imageError) {
				setIsLoading(false)
				return toast.error('Failed image upload')
			}

			// Create record
			const { error: supabaseError } = await supabaseClient
				.from('songs')
				.insert({
					user_id: user.id,
					title: values.title,
					author: values.author,
					image_path: imageData.path,
					song_path: songData.path,
				})

			if (supabaseError) {
				return toast.error(supabaseError.message)
			}

			router.refresh()
			// setIsLoading(false)
			toast.success('Song created!')
			reset()
			onClose()
		} catch (error) {
			toast.error('Something went wrong')
		} finally {
			setIsLoading(false)
			console.log('done')
		}
	}

	return (
		<Modal
			title='Upload a song'
			description='Upload an MP3 file'
			isOpen={isOpen}
			onChange={onChange}
		>
			<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
				{formState.errors.title && <span>title field is required</span>}
				<Input
					id='title'
					disabled={isLoading}
					placeholder='Song title'
					{...register('title', { required: true })}
				/>
				{formState.errors.author && <span>author field is required</span>}
				<Input
					id='author'
					disabled={isLoading}
					placeholder='Song author'
					{...register('author', { required: true })}
				/>
				<div>
					<div className='pb-1'>Select a song file</div>
					<Input
						id='song'
						type='file'
						disabled={isLoading}
						accept='.mp3'
						{...register('song', { required: true })}
					/>
				</div>
				<div>
					<div className='pb-1'>Select an image</div>
					<Input
						id='image'
						type='file'
						disabled={isLoading}
						accept='image/*'
						{...register('image', { required: true })}
					/>
				</div>
				<Button type='submit' disabled={isLoading}>
					Upload
				</Button>
			</form>
		</Modal>
	)
}

export default UploadModal
