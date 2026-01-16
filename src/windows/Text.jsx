import React from 'react'
import { WindowControls } from '#components'
import WindowWrapper from '#hoc/WindowWrapper'
import useWindowStore from '#store/window'

const Text = () => {
    const { windows } = useWindowStore()
    const data = windows?.txtfile?.data

    if (!data) return null

    const { name, image, imageUrl, subtitle, description } = data

    return (
        <>
            <div id="window-header">
                <WindowControls target={'txtfile'} />
                <h2>{name}</h2>
            </div>

            <div className="text-file p-6">
                {(image || imageUrl) && (
                    <div className="mb-4">
                        <img src={image || imageUrl} alt={name} className="max-w-xs" />
                    </div>
                )}

                {subtitle && <h4 className="mb-3">{subtitle}</h4>}

                <div className="space-y-3">
                    {Array.isArray(description)
                        ? description.map((p, i) => <p key={i}>{p}</p>)
                        : <p>{description}</p>
                    }
                </div>
            </div>
        </>
    )
}

const TextWindow = WindowWrapper(Text, 'txtfile')

export default TextWindow
