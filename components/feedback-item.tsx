/* eslint-disable react/display-name */
import { IFormData } from "@/types"
import { FC, memo } from "react"

export const FeedbackItem: FC<IFormData> = memo(({ email, feedback, id, onClick }) => {
    return <div>
        <h3>{feedback}</h3>
        <button onClick={() => { onClick(id ?? '') }}>Show  Details</button>
    </div>
})