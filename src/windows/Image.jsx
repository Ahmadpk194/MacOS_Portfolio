import React from 'react'
import { WindowControls } from '#components'
import WindowWrapper from '#hoc/WindowWrapper'
import useWindowStore from '#store/window'

const Image = () => {
    const { windows } = useWindowStore()
    const data = windows?.imgfile?.data

    if (!data) return null

    const { name, imageUrl } = data

    return (
        <>
            <div id="window-header">
                <WindowControls target={'imgfile'} />
                <h2>{name}</h2>
            </div>

            <div className="image-file p-4">
                {imageUrl && (
                    <img src={imageUrl} alt={name} className="max-w-full h-auto" />
                )}
            </div>
        </>
    )
}

const ImageWindow = WindowWrapper(Image, 'imgfile')

export default ImageWindow
