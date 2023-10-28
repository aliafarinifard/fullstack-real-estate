import React, { useEffect, useRef, useState } from 'react'

// Style
import "./UploadImage.scss"

// AiOutlineCloudUpload Icon
import { AiOutlineCloudUpload } from 'react-icons/ai'

// Mantine
import { Button, Group } from "@mantine/core";


const UploadImage = ({ propertyDetails, setPropertyDetails, nextStep, prevStep }) => {

    const [imageURL, setImageURL] = useState(propertyDetails.image)

    const cloudinaryRef = useRef()
    const widgetRef = useRef()


    const handleNext = () => {
        setPropertyDetails((prev) => ({...prev, image: imageURL}))
        nextStep();
    }


    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName: "dhzhlrtdn",
                uploadPreset: "ialzuy3w",
                maxFile: 1

            },
            (err, result) => {
                if (result.event === "success") {
                    setImageURL(result.info.secure_url)
                }
            }
        )
    }, [])


    return (
        <div className="flexCenter uploadWrapper">
            {
                !imageURL ? (
                    <div className='flexCenter uploadZone'
                        onClick={() => widgetRef.current?.open()}
                    >
                        <AiOutlineCloudUpload size={50} color='grey' />
                        <span>Upload Image</span>
                    </div>
                ) : (
                    <div className="uploadImage"
                        onClick={() => widgetRef.current?.open()}
                    >
                        <img src={imageURL} alt="upload image" />
                    </div>
                )
            }

            <Group position="center" mt={"xl"}>
                <Button variant='default' onClick={prevStep}>Back</Button>
                <Button onClick={handleNext} disabled={!imageURL}>Next</Button>
            </Group>

        </div>
    )
}

export default UploadImage