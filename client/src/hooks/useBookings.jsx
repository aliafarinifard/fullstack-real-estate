import React, { useContext, useEffect, useRef } from 'react'

// User Context
import UserDetailContext from '../context/UserDetailContext'

// useQuery
import { useQuery } from 'react-query'

// useAuth0
import { useAuth0 } from '@auth0/auth0-react'

// getAllFav api.js
import { getAllBookings } from '../utils/api'

const useBookings = () => {

    // Context
    const { userDetails, setUserDetails } = useContext(UserDetailContext)
    const queryRef = useRef()
    const { user } = useAuth0()




    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: "allBookings",
        queryFn: () => getAllBookings(user?.email, userDetails?.token),
        onSuccess: (data) =>
            setUserDetails((prev) => ({ ...prev, bookings: data })),
        enabled: user !== undefined,
        staleTime: 30000,
    })



    queryRef.current = refetch;



    useEffect(() => {
        queryRef.current && queryRef.current();
    }, [userDetails?.token])




    return { data, isError, isLoading, refetch };
}

export default useBookings