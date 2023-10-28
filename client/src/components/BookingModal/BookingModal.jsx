import React, { useContext, useState } from 'react'

// Mantine
import { Button, Modal } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import '@mantine/dates/styles.css';

// useMutation (Apollo Client)
import { useMutation } from 'react-query'

// User Detail Context
import UserDetailContext from '../../context/UserDetailContext'

// Book Visit
import { bookVisit } from '../../utils/api'

// Toastify
import { toast } from 'react-toastify'

// dayjs
import dayjs from 'dayjs'

const BookingModal = ({ opened, setOpened, email, propertyId }) => {

    // Book Visit Button Value
    const [value, setValue] = useState(null)

    // User Detail Context
    const { userDetails: { token }, setUserDetails } = useContext(UserDetailContext)
    

    // Handler Booking Success
    const handleBookingSuccess = () => {

        toast.success("You have booked your visit", {
            position: "bottom-right"
        });

        setUserDetails((prev) => ({
            ...prev,
            bookings: [
                ...prev.bookings,
                {
                    id: propertyId,
                    date: dayjs(value).format('DD/MM/YYYY')
                }
            ]
        }))

    }

    // Mutate
    const { mutate, isLoading } = useMutation({
        mutationFn: () => bookVisit(value, propertyId, email, token),
        onSuccess: () => handleBookingSuccess(),
        onError: ({response}) => toast.error(response.data.message),
        onSettled: () => setOpened(false)
    })

    return (
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="Select your date of visit"
            centered
        >

            <div className='flexColCenter' style={{gap: "1rem"}}>
                <DatePicker value={value} onChange={setValue} minDate={new Date()} />
                <Button disabled={!value || isLoading} onClick={() => mutate()}>
                    Book Visit
                </Button>
            </div>

        </Modal>
    )
}

export default BookingModal