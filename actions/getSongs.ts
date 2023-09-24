import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { Song } from '@/types'

// const dummyProm = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		resolve(true)
// 	}, 10000)
// })

const getSongs = async (): Promise<Song[]> => {
	// await dummyProm

	const supabase = createServerComponentClient({
		cookies: cookies,
	})

	const { data, error } = await supabase
		.from('songs')
		.select('*')
		.order('created_at', { ascending: false })

	if (error) {
		console.log(error.message)
	}

	return (data as any) || []
}

export default getSongs
