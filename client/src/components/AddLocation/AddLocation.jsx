import React from 'react'

// Style
import "./AddLocation.scss"

// Mantine
import { useForm } from '@mantine/form'
import { Button, Group, Select, TextInput } from "@mantine/core";

// validateString common.js
import { validateString } from '../../utils/common'

// getAll - useCountries_Hook
import useCountries from '../../hooks/useCountries';

// Components
import Map from '../Map/Map'

const AddLocation = ({ propertyDetails, setPropertyDetails, nextStep }) => {

    const { getAll } = useCountries()

    const form = useForm({

        initialValues: {
            country: propertyDetails?.country,
            city: propertyDetails?.city,
            address: propertyDetails?.address,
        },

        validate: {
            country: (value) => validateString(value),
            city: (value) => validateString(value),
            address: (value) => validateString(value),
        },

    })

    const { country, city, address } = form.values;



    const handleSubmit = () => {
        const { hasErrors } = form.validate();
        if (!hasErrors) {
            setPropertyDetails((prev) => ({ ...prev, city, country, address }))
            nextStep()
        }
    }



    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
            }}
        >
            <div className='addLocation'>

                {/* left side */}
                {/* inputs */}
                <div className='flexCenter formInputs' style={{ gap: "1rem" }}>

                    <Select
                        w={"100%"}
                        withAsterisk
                        label="Country"
                        clearable
                        searchable
                        data={getAll()}
                        {
                        ...form.getInputProps("country", { type: "input" })
                        }
                    />

                    <TextInput
                        w={"100%"}
                        withAsterisk
                        label="City"
                        {...form.getInputProps("city", { type: "input" })}
                    />

                    <TextInput
                        w={"100%"}
                        withAsterisk
                        label="Address"
                        {...form.getInputProps("address", { type: "input" })}
                    />

                </div>

                {/* right side */}
                <div className='map'>
                    <Map
                        country={country}
                        city={city}
                        address={address}
                    />
                </div>

            </div>

            <Group position="center" mt={"xl"}>
                <Button type='submit'>Next Step</Button>
            </Group>

        </form>
    )
}

export default AddLocation