import React from 'react'
import Link from 'next/link'
const MenuItem = ({item:{title,link}}) => (
    <li>
        <Link href={link}>
            {title}
        </Link>
    </li>
)

export default MenuItem