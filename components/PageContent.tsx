import { Song } from '@/types'
import { FC } from 'react'

interface PageContentProps {
	songs: Song[]
}

const PageContent: FC<PageContentProps> = ({ songs }) => {
	return <div>PageContent</div>
}

export default PageContent
