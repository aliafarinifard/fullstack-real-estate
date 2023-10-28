import React, { useContext, useEffect, useState } from 'react'

// AiFillHeart
import { AiFillHeart } from 'react-icons/ai'

// useAuthCheck Hook
import useAuthCheck from '../../hooks/useAuthCheck'

// useMutation
import { useMutation } from 'react-query'

// useAuth0
import { useAuth0 } from '@auth0/auth0-react'

// User Context
import UserDetailContext from '../../context/UserDetailContext'

// To Fav api.js
import { toFav } from '../../utils/api'

// checkFavourites & updateFavourites common.js
import { checkFavourites, updateFavourites } from '../../utils/common'

const Heart = ({ id }) => {

    const [heartColor, setHeartColor] = useState("white")
    const { validateLogin } = useAuthCheck()
    const { user } = useAuth0()


    const {
        userDetails: { favourites, token },
        setUserDetails,
    } = useContext(UserDetailContext);


    useEffect(() => {
        setHeartColor(() => checkFavourites(id, favourites))
    }, [favourites])


    const { mutate } = useMutation({
        mutationFn: () => toFav(id, user?.email, token),
        onSuccess: () => {
            setUserDetails((prev) => (
                {
                    ...prev,
                    favourites: updateFavourites(id, prev.favourites)
                }
            ))
        }
    })



    const handleLike = () => {

        if (validateLogin()) {
            mutate()
            setHeartColor((prev) => prev === "#fa3e5f" ? "white" : "#fa3e5f")
        }

    }


    return (
        <AiFillHeart size={24} color={heartColor} onClick={(e) => {
            e.stopPropagation()
            handleLike()
        }} />
    )
}

export default Heart