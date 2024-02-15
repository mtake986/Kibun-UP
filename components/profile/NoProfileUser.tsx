import React from 'react'

type Props = {
  uid: string
}
const NoProfileUser = ({uid}: Props) => {
  return (
    <div>No user found with user id of <span className="underline-offset-2 underline">{uid}</span></div>
  )
}

export default NoProfileUser