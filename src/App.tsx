import { framer, CanvasNode } from "framer-plugin"
import { useState, useEffect } from "react"
import { Squeak } from "squeak-react"
import "./App.css"

framer.showUI({
    position: "top right",
    width: 400,
    height: 600,
})

function useSelection() {
    const [selection, setSelection] = useState<CanvasNode[]>([])

    useEffect(() => {
        return framer.subscribeToSelection(setSelection)
    }, [])

    return selection
}

export function App() {
    const selection = useSelection()
    const layer = selection.length === 1 ? "layer" : "layers"

    const handleAddSvg = async () => {
        await framer.addSVG({
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="#999" d="M20 0v8h-8L4 0ZM4 8h8l8 8h-8v8l-8-8Z"/></svg>`,
            name: "Logo.svg",
        })
    }

    return (
        <main>
            <div style={{ marginBottom: '20px' }}>
                <p>
                    Squeak Plugin - You have {selection.length} {layer} selected.
                </p>
                <button className="framer-button-primary" onClick={handleAddSvg}>
                    Insert Logo
                </button>
            </div>

            <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px' }}>
                <h3>Squeak Q&A Component</h3>
                <Squeak
                    apiHost="https://squeak-dev.vercel.app"
                    organizationId="c9ae6352-fb1b-4385-9dc0-f0d2a662f1c9"
                    onSubmit={() => console.log('Question submitted')}
                    onLoad={() => console.log('Squeak loaded')}
                    onSignUp={() => console.log('User signed up')}
                    topics={true}
                    limit={10}
                />
            </div>
        </main>
    )
}
