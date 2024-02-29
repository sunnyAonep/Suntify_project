import React, { createContext, useState } from 'react'

export const audioContext = createContext()

export default function AudioProvider({children}) {
    const [audio ,setAudio] = useState();

    const shared = {
        audio,
        setAudio,
    }
    return <audioContext.Provider value={shared}>{children}</audioContext.Provider>;
}
