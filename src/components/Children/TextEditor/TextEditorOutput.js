import React from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

export function TextEditorOutput({ textContent }) {

    return (
        <ReactMarkdown
            >
            { textContent }
        </ReactMarkdown>
    )
}