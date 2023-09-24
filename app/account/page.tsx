// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
// import React from 'react'
// import { cookies } from 'next/headers'

// const page = async () => {
// 	const supabase = createServerComponentClient({
// 		cookies: cookies,
// 	})

// 	const { data: sessionData, error: sessionError } =
// 		await supabase.auth.getSession()

// 	return <div>page</div>
// }

// export default page

import Header from '@/components/Header'

import AccountContent from './components/AccountContent'

const Account = () => {
	return (
		<div
			className='
        bg-neutral-900 
        rounded-lg 
        h-full 
        w-full 
        overflow-hidden 
        overflow-y-auto
      '
		>
			<Header className='from-bg-neutral-900'>
				<div className='mb-2 flex flex-col gap-y-6'>
					<h1 className='text-white text-3xl font-semibold'>
						Account Settings
					</h1>
				</div>
			</Header>
			<AccountContent />
		</div>
	)
}

export default Account
