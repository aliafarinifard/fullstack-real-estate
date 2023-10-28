import React, { useState } from 'react'

// Mantine
import { Container, Modal, Stepper } from '@mantine/core'

// Components
import AddLocation from '../AddLocation/AddLocation'
import UploadImage from '../UploadImage/UploadImage'
import BasicDetails from '../BasicDetails/BasicDetails'
import Facilities from '../Facilities/Facilities'

// user useAuth0
import { useAuth0 } from '@auth0/auth0-react'

const AddPropertyModal = ({ opened, setOpened }) => {

    // Stepper Active
    const [active, setActive] = useState(0)

    // user Auth0
    const { user } = useAuth0()




    // Property Details
    const [propertyDetails, setPropertyDetails] = useState({

        title: "",
        description: "",
        price: 0,
        country: "",
        city: "",
        address: "",
        image: null,
        facilities: {
            bedrooms: 0,
            parkings: 0,
            bathrooms: 0,
        },
        userEmail: user?.email

    })


    // next Step
    const nextStep = () => {
        setActive((current) => (current < 4 ? current + 1 : current))
    }

    // prev Step
    const prevStep = () => {
        setActive((current) => (current > 0 ? current - 1 : current))
    }




    return (
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            closeOnClickOutside
            size={"90rem"}
        >

            <Container h={"40rem"} w={"100%"}>
                <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false}>
                    <Stepper.Step label="Location" description="Address">
                        <AddLocation
                            nextStep={nextStep}
                            propertyDetails={propertyDetails}
                            setPropertyDetails={setPropertyDetails}
                        />
                    </Stepper.Step>
                    <Stepper.Step label="Images" description="Upload">
                        <UploadImage
                            prevStep={prevStep}
                            nextStep={nextStep}
                            propertyDetails={propertyDetails}
                            setPropertyDetails={setPropertyDetails}
                        />
                    </Stepper.Step>
                    <Stepper.Step label="Basics" description="Details">
                        <BasicDetails
                            prevStep={prevStep}
                            nextStep={nextStep}
                            propertyDetails={propertyDetails}
                            setPropertyDetails={setPropertyDetails}
                        />
                    </Stepper.Step>
                    <Stepper.Step label="Basics" description="Details">
                        <Facilities
                            prevStep={prevStep}
                            propertyDetails={propertyDetails}
                            setPropertyDetails={setPropertyDetails}
                            setOpened={setOpened}
                            setActiveStep={setActive}
                        />
                    </Stepper.Step>
                    <Stepper.Completed>
                        Completed, click back button to get to previous step
                    </Stepper.Completed>
                </Stepper>
            </Container>

        </Modal>
    )
}

export default AddPropertyModal